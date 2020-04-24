import { ObjectID } from 'mongodb';
import { GraphQLDateTime } from 'graphql-iso-date';
import { appUrls, jwt, encryptor, sendEmail } from '../helpers';
import { Users, Businesses } from '../api';

/*
  TODO: store created JWT tokens and check incoming token in the database for additional layer
  of security. This is needed because user might want to invalidate existing logins from
  stolen or compromised devices which would still have a valid token up to 1 day.

  TODO: incorporate schemas, data loader, service facade
 */

const resolvers = {
  DateTime: GraphQLDateTime,
  User: {
    profile: async (user, args, { appId, currentUser, databases }) => {
      if (user && user.id && appId && currentUser) {
        return Users.findProfileByUserId({ userId: user.id }, databases);
      }
      return null;
    },
  },
  Query: {
    me: async (root, { userId }, { appId, currentUser, databases }) => {
      if (userId && currentUser && userId === currentUser.id && appId) {
        return Users.findById({ id: parseInt(userId, 10) }, databases);
      }
      return null;
    },
    user: async (root, { userId }, { appId, currentUser, databases }) => {
      if (userId && appId && currentUser) {
        if (
          userId === currentUser.id
          || currentUser.isAdministrator
          || currentUser.isRetailerAdministrator
          || currentUser.isSalesManager
        ) {
          return Users.findById({ id: parseInt(userId, 10) }, databases);
        }
        return null;
      }
      return null;
    },
    users: async (root, args, { appId, currentUser, databases }) => {
      if (appId && currentUser) {
        return Users.findByApp({ appId }, databases);
      }
      return [];
    },
    teamList: async (root, args, { appId, currentUser, databases }) => {
      if (appId && currentUser && currentUser.isSalesManager) {
        return Users.findByManager({ manager: currentUser.id }, databases);
      }
      return [];
    },
    retrieveInvitation: async (root, { pendingInvitation }, { appId, currentUser, databases }) => {
      if (appId && !currentUser) {
        const user = await Users.findByPendingInvitation({ pendingInvitation }, databases);
        const {
          isAdministrator,
          isRetailerAdministrator,
          isRetailer,
          isSalesManager,
          isSalesRepresentative,
        } = user;
        const appMatches = (appId === 'admin' && (isAdministrator))
          || (appId === 'retailer' && (isRetailer || isRetailerAdministrator))
          || (appId === 'sales' && (isSalesRepresentative || isSalesManager));
        if (!appMatches) return null;
        return user;
      }
      return null;
    },
    business: async (root, { businessId }, { appId, databases }) => {
      if (businessId && appId) {
        return Businesses.findById({ businessId }, databases);
      }
      return null;
    },
    myBusiness: async (root, args, { appId, currentUser, databases }) => {
      if (currentUser && appId) {
        return Businesses.findByUserId({ userId: currentUser.id }, databases);
      }
      return null;
    },
  },
  Mutation: {
    httpBasicAuth: (root, { password: { digest: password, algorithm } }) => {
      if (algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      const authenticated = password === process.env.HTTP_BASIC_PASSWORD;
      return {
        authenticated,
        rejected: !authenticated,
      };
    },
    forgotPassword: async (root, { email }, { appId, currentUser, databases }) => {
      if (currentUser) throw new Error('Already logged in');
      const user = await Users.findByEmail({ email }, databases);
      if (!user) throw new Error('User not found');
      if (!user.enabled) throw new Error('User account is disabled');
      const {
        isAdministrator,
        isRetailerAdministrator,
        isRetailer,
        isSalesManager,
        isSalesRepresentative,
      } = user;
      const appMatches = (appId === 'admin' && (isAdministrator))
      || (appId === 'retailer' && (isRetailer || isRetailerAdministrator))
      || (appId === 'sales' && (isSalesRepresentative || isSalesManager));
      if (!appMatches) throw new Error('Can not reset password through this app');
      const passwordResetToken = await Users.generatePasswordResetToken({
        email,
        appId,
        userId: user.id,
      }, databases);
      const resetLink = passwordResetToken && `${appUrls[appId]}/reset-password/${passwordResetToken}`;
      const emailResponse = resetLink && await sendEmail(
        email,
        'Reset your password',
        `You have requested to reset your password.
        
        Please visit the following url to set a new password.
        
        ${resetLink}`,
      );
      return emailResponse === 202;
    },
    resetPassword: async (root, { password, resetToken }, { appId, currentUser, databases }) => {
      if (currentUser) throw new Error('Already logged in');
      if (password.algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      const tokenDoc = await Users.findPasswordResetTokenById({ id: resetToken }, databases);
      if (!tokenDoc) throw new Error('Link has expired');
      const {
        email: tokenEmail,
        userId: tokenUserId,
        appId: tokenAppId,
      } = tokenDoc;
      const user = await Users.findById({ id: tokenUserId }, databases);
      if (!user) throw new Error('User not found');
      if (!user.enabled) throw new Error('User account is disabled');
      if (user.email !== tokenEmail) throw new Error('Email address has changed after reset request');
      if (appId !== tokenAppId) throw new Error('Can not reset password through this app');
      const result = await Users.updateById({
        id: tokenUserId,
        doc: {
          emailVerified: true,
          password: await encryptor.encrypt(password),
        },
      }, databases);
      if (result !== 1) throw new Error('Could not set new password');
      const {
        id,
      } = user;
      return {
        token: jwt.create({ id }),
      };
    },
    changePassword: async (root, {
      oldPassword,
      newPassword,
    }, { appId, currentUser, databases }) => {
      if (!currentUser) throw new Error('Must be logged in');
      if (oldPassword.algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      if (newPassword.algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      if (!currentUser.enabled) throw new Error('User account is disabled');
      const {
        id,
        isAdministrator,
        isRetailerAdministrator,
        isRetailer,
        isSalesManager,
        isSalesRepresentative,
      } = currentUser;
      const appMatches = (appId === 'admin' && (isAdministrator))
        || (appId === 'retailer' && (isRetailer || isRetailerAdministrator))
        || (appId === 'sales' && (isSalesRepresentative || isSalesManager));
      if (!appMatches) throw new Error('Can not change password through this app');
      const passwordCorrect = await encryptor.verify(oldPassword, currentUser.password);
      if (!passwordCorrect) throw new Error('Password incorrect');
      // TODO: check appropriate role against the appId
      const result = await Users.updateById({
        id,
        doc: {
          password: await encryptor.encrypt(newPassword),
        },
      }, databases);
      if (result !== 1) throw new Error('Could not set new password');
      return true;
    },
    login: async (root, { email, password }, { appId, currentUser, databases }) => {
      if (!appId) throw new Error('Can not login through this app');
      if (currentUser) throw new Error('Already logged in');
      if (password.algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      const user = await Users.findByEmail({ email }, databases);
      if (!user) throw new Error('User not found');
      if (!user.enabled) throw new Error('User account is disabled');
      const {
        password: userPassword,
        id,
      } = user;
      const passwordCorrect = await encryptor.verify(password, userPassword);
      if (!passwordCorrect) throw new Error('Password incorrect');
      return {
        token: jwt.create({ id }),
      };
    },
    refreshToken: (root, { token }) => ({
      token: jwt.refresh(token),
    }),
    registerAsRetailer: async (root, {
      firstName,
      lastName,
      address,
      email,
      password,
    }, { appId, currentUser, databases }) => {
      if (appId !== 'retailer') throw new Error('Can not register through this app');
      if (currentUser) throw new Error('Already logged in');
      if (password.algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      const user = await Users.insert({
        firstName,
        lastName,
        email,
        enabled: true,
        isAdministrator: false,
        isSalesManager: false,
        isRetailerAdministrator: false,
        business: '',
        emailVerified: false,
        isCustomer: false,
        isRetailer: true,
        isSalesRepresentative: false,
        pendingInvitation: '',
        password: await encryptor.encrypt(password),
        createdAt: new Date(),
        activatedAt: new Date(),
        profile: {
          address,
        },
      }, databases);
      const emailResponse = await sendEmail(email, 'Welcome to Sloops', 'You are now registered at Sloops.');
      const {
        id,
      } = user;
      return {
        token: jwt.create({ id }),
        welcomeEmailSent: emailResponse === 202,
      };
    },
    updateAccountSettings: async (root, {
      firstName,
      lastName,
      email,
      phoneNumbers,
      address,
    }, { appId, currentUser, databases }) => {
      if (!currentUser) throw new Error('Must be logged in');
      if (!currentUser.enabled) throw new Error('User account is disabled');
      const {
        id,
        isAdministrator,
        isRetailerAdministrator,
        isRetailer,
        isSalesManager,
        isSalesRepresentative,
      } = currentUser;
      const appMatches = (appId === 'admin' && (isAdministrator))
        || (appId === 'retailer' && (isRetailer || isRetailerAdministrator))
        || (appId === 'sales' && (isSalesRepresentative || isSalesManager));
      if (!appMatches) throw new Error('Can not change password through this app');
      const result = await Users.updateById({
        id,
        doc: {
          firstName,
          lastName,
          email,
          profile: {
            phoneNumbers,
            address,
          },
        },
      }, databases);
      if (result !== 1) throw new Error('Could not update account settings');
      return true;
    },
    toggleUserEnabledDisabled: async (root, { userId }, { currentUser, databases }) => {
      if (userId === currentUser.id) throw new Error('Can not change own status');
      const isAdministrator = await Users.hasRole({ id: currentUser.id, role: 'isAdministrator' }, databases);
      const user = await Users.findById({ id: userId }, databases);
      const currentUserIsUsersManager = currentUser.isSalesManager
        && user.isSalesRepresentative
        && currentUser.id === user.manager;
      if (!(isAdministrator || currentUserIsUsersManager)) throw new Error('You must be an administrator or the user\'s manager');
      // TODO: implement server side checks for the client side logic
      // ie: don't allow if no other active sales managers when this one has a team, etc...
      const result = await Users.updateById({
        id: userId,
        doc: {
          enabled: !user.enabled,
        },
      }, databases);
      if (result !== 1) throw new Error('User not found');
      return true;
    },
    reassignTeamManager: async (root, {
      oldManagerId,
      newManagerId,
    }, { currentUser, databases }) => {
      const isAdministrator = await Users.hasRole({ id: currentUser.id, role: 'isAdministrator' }, databases);
      // TODO: implement server side checks for the client side logic
      // ie: new is enabled and is salesmanager, etc...
      if (!isAdministrator) throw new Error('You must be an administrator.');
      const updatedCount = await Users.reassignTeamManager({
        oldManagerId,
        newManagerId,
      }, databases);
      return !!updatedCount;
    },
    sendInvitations: async (root, {
      invitations,
      role,
      manager: managerId,
    }, { appId, currentUser, databases }) => {
      const appMatches = (appId === 'admin' && ['isAdministrator'].includes(role))
        || (appId === 'retailer' && ['isRetailer', 'isRetailerAdministrator'].includes(role))
        || (appId === 'sales' && ['isSalesManager', 'isSalesRepresentative'].includes(role));
      if (!appMatches) throw new Error('Can not send these invitations through this app');

      if (
        (role === 'isSalesRepresentative' && !managerId)
        || (role !== 'isSalesRepresentative' && managerId)
      ) throw new Error('Sales managers are required for sales representative role');

      if (managerId) {
        const manager = await Users.findById({ id: parseInt(managerId, 10) }, databases);
        if (!manager) throw new Error('Manager not found');
        if (!manager.isSalesManager) throw new Error('Provided manager is not a sales manager');
      }

      if (
        !(currentUser.isAdministrator || currentUser.isSalesManager)
      ) throw new Error('You are not allowed to send invitations');

      const emails = invitations.map(invitation => invitation.email);
      const emailSearchResult = await Promise.all(emails.map(email =>
        Users.findByEmail({ email }, databases)));
      const existingUsers = emailSearchResult
        .filter(user => !!user)
        .map(user => user.email);
      if (existingUsers.length) {
        throw new Error(`${existingUsers.join(', ')} already have existing Sloops accounts.`);
      }

      const users = await Promise.all(invitations.map(({
        firstName,
        lastName,
        email,
      }) => Users.insert({
        firstName,
        lastName,
        email,
        manager: managerId && parseInt(managerId, 10),
        enabled: true,
        isAdministrator: role === 'isAdministrator',
        isSalesManager: role === 'isSalesManager',
        isRetailerAdministrator: role === 'isRetailerAdministrator',
        business: '',
        emailVerified: false,
        isCustomer: false,
        isRetailer: role === 'isRetailer',
        isSalesRepresentative: role === 'isSalesRepresentative',
        pendingInvitation: (new ObjectID()).toString(),
        password: '',
        createdAt: new Date(),
        activatedAt: undefined,
        profile: {},
      }, databases)));

      if (!users || users.length === 0) throw new Error('Could not create invitations');

      const result = await Promise.all(users.map(({ email, pendingInvitation }) => {
        const invitationLink = `${appUrls[appId]}/accept-invitation/${pendingInvitation}`;
        return invitationLink && sendEmail(
          email,
          'You are invited to Sloops',
          `You are invited to join Sloops.
        
          Please visit the following url to accept the invitation.
          
          ${invitationLink}`,
        );
      }));

      // TODO: also check email responses for 202 and try catch the whole block for errors
      if (!result || result.length === 0) throw new Error('Could not send invitations');
      return true;
    },
    cancelInvitation: async (root, { userId }, { currentUser, databases }) => {
      const isAdministrator = await Users.hasRole({ id: currentUser.id, role: 'isAdministrator' }, databases);
      const user = await Users.findById({ id: userId }, databases);
      const currentUserIsUsersManager = currentUser.isSalesManager
        && user.isSalesRepresentative
        && currentUser.id === user.manager;
      if (!(isAdministrator || currentUserIsUsersManager)) throw new Error('You must be an administrator or the user\'s manager');
      if (user.pendingInvitation.length === 0) throw new Error('This user has already accepted the invitation');
      const result = await Users.removeById({ id: userId }, databases);
      if (result !== 1) throw new Error('User not found');
      return true;
    },
    acceptInvitation: async (root, {
      firstName,
      lastName,
      address,
      password,
      pendingInvitation,
    }, { appId, currentUser, databases }) => {
      if (currentUser) throw new Error('Already logged in');
      if (password.algorithm !== 'sha-256') throw new Error('Wrong hashing algorithm');
      const user = await Users.findByPendingInvitation({ pendingInvitation }, databases);
      if (!user) throw new Error('Invitation has been cancelled');
      const {
        id,
        isAdministrator,
        isRetailerAdministrator,
        isRetailer,
        isSalesManager,
        isSalesRepresentative,
      } = user;
      const appMatches = (appId === 'admin' && (isAdministrator))
        || (appId === 'retailer' && (isRetailer || isRetailerAdministrator))
        || (appId === 'sales' && (isSalesRepresentative || isSalesManager));
      if (!appMatches) throw new Error('Can not accept invitation through this app');
      const doc = {
        firstName,
        lastName,
        emailVerified: true,
        password: await encryptor.encrypt(password),
        pendingInvitation: '',
        activatedAt: new Date(),
        profile: {
          address,
        },
      };
      const result = await Users.updateById({ id, doc }, databases);
      if (result !== 1) throw new Error('Could not accept invitation');
      const emailResponse = await sendEmail(user.email, 'Welcome to Sloops', 'You are now registered at Sloops.');
      return {
        token: jwt.create({ id }),
        welcomeEmailSent: emailResponse === 202,
      };
    },
    updateMyBusiness: async (root, { business }, {
      appId,
      currentUser,
      databases,
      cloudStorage,
    }) => {
      if (appId !== 'retailer') throw new Error('Cannot edit business through this app');
      if (!currentUser.isRetailer) throw new Error('You must be a retailer');
      const businessId = currentUser.business;
      const result = await Businesses.updateByUserId({
        userId: currentUser.id,
        business: {
          ...business,
          userId: currentUser.id,
          storeType: 'offline',
          ...(!businessId && { createdAt: new Date() }),
        },
      }, databases);
      if (!businessId) {
        await Users.updateById({
          id: currentUser.id,
          doc: {
            business: result,
          },
        }, databases);
      }
      process.nextTick(async () => {
        const cloudStorageDomain = process.env.GOOGLE_CLOUD_STORAGE_DOMAIN;
        const finalFiles = [
          ...business.pictures,
          ...(business.logo ? [business.logo] : []),
        ].map(file => file.split(`https://${cloudStorageDomain}/`)[1]);
        const storedFilesResponse = await cloudStorage.getFiles({
          prefix: `business/${businessId || result}/`,
        });
        storedFilesResponse[0].forEach((file) => {
          if (!finalFiles.includes(file.name)) {
            try {
              file.delete();
            } catch (ignore) { /**/ }
          }
        });
      });
      return result;
    },
    getSignedUploadUrl: async (root, {
      fileName,
      fileType,
      targetType,
      targetArgs,
    }, { currentUser, cloudStorage }) => {
      if (!currentUser) throw new Error('Must be logged in');
      if (!currentUser.enabled) throw new Error('User account is disabled');
      const cloudStorageDomain = process.env.GOOGLE_CLOUD_STORAGE_DOMAIN;
      if (![
        'BUSINESS_LOGO',
        'BUSINESS_PICTURE',
      ].includes(targetType)) throw new Error('Invalid target type');
      const folder = {
        BUSINESS_LOGO: (argsArray) => {
          if (argsArray.length) throw new Error('Invalid number of target arguments');
          const businessId = currentUser.business;
          if (!businessId) throw new Error('Current user does not have a business');
          return `business/${businessId}/logo/`;
        },
        BUSINESS_PICTURE: (argsArray) => {
          if (argsArray.length) throw new Error('Invalid number of arguments');
          const businessId = currentUser.business;
          if (!businessId) throw new Error('Current user does not have a business');
          return `business/${businessId}/pictures/`;
        },
      }[targetType](targetArgs);
      const filePathAndName = `${folder}${fileName}`;
      const file = cloudStorage.file(filePathAndName);
      const signedUrlResponse = await file.getSignedUrl({
        action: 'write',
        contentType: fileType,
        expires: Date.now() + (60 * 1000),
      });
      return {
        uploadUrl: signedUrlResponse[0],
        downloadUrl: `https://${cloudStorageDomain}/${filePathAndName}`,
      };
    },
  },
};

export default resolvers;
