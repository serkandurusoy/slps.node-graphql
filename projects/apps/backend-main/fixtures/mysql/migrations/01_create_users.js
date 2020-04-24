exports.up = async (knex, Promise) => Promise.all([
  // knex.schema.createTable('users', (table) => {
  //   table.increments();
  // }),
  // knex.schema.dropTableIfExists('users'),
  knex.schema.raw(`
    CREATE TABLE \`users\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
      \`enabled\` tinyint(1) unsigned NOT NULL DEFAULT '1',
      \`emailVerified\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`email\` varchar(255) NOT NULL DEFAULT '',
      \`password\` varchar(255) NOT NULL DEFAULT '',
      \`firstName\` varchar(255) NOT NULL DEFAULT '',
      \`lastName\` varchar(255) NOT NULL DEFAULT '',
      \`isAdministrator\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`isSalesManager\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`isSalesRepresentative\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`isRetailerAdministrator\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`isRetailer\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`business\` varchar(255) NOT NULL DEFAULT '',
      \`isCustomer\` tinyint(1) unsigned NOT NULL DEFAULT '0',
      \`pendingInvitation\` varchar(255) NOT NULL DEFAULT '',
      \`manager\` int(10) unsigned DEFAULT NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`activatedAt\` datetime DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`id_UQ\` (\`id\`),
      UNIQUE KEY \`email_UQ\` (\`email\`),
      KEY \`enabled_IX\` (\`enabled\` DESC),
      KEY \`isAdministrator_IX\` (\`isAdministrator\` DESC),
      KEY \`isSalesManager_IX\` (\`isSalesManager\` DESC),
      KEY \`isSalesRepresentative_IX\` (\`isSalesRepresentative\` DESC),
      KEY \`isRetailerAdministrator_IX\` (\`isRetailerAdministrator\` DESC),
      KEY \`isRetailer_IX\` (\`isRetailer\` DESC),
      KEY \`isCustomer_IX\` (\`isCustomer\` DESC),
      KEY \`pendingInvitation_IX\` (\`pendingInvitation\` ASC),
      KEY \`fk_manager_IX\` (\`manager\`),
      CONSTRAINT \`fk_users_manager\` FOREIGN KEY (\`manager\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `),
]);


exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
]);
