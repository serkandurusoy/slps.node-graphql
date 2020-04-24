# DEPLOY BACKEND API
## Intro
This deploy script connects to our GCE Linux Instance using SSH and SPC internally

Before being able to connect to the instance from a developer machine, you should generate
a new key-pair and apply it to your project, which allows this script to be run.

Indeed you must generate a new SSH key-pair and apply the public SSH key to our instance.

To generate a new SSH key-pair on Linux or macOS workstations and apply it to your project:

## Generate a new SSH key-pair
1. Open a terminal on your workstation and use the ssh-keygen command to generate a new key-pair.
Specify the -C flag to add a comment with the username on the instance for whom you will apply the key .
This example creates a private key file named my-ssh-key and a public key file named my-ssh-key.pub.

`ssh-keygen -t rsa -f ~/.ssh/my-ssh-key -C [USERNAME]`

where [USERNAME] is the user on the instance for whom you will apply the key.
If the user does not exist on the instance, Compute Engine automatically creates it
using the username that you specify in this command.

2. Restrict access to your my-ssh-key private key so that only you can read it and nobody can write to it.
`chmod 400 ~/.ssh/my-ssh-key`

3. Go to the metadata page for our project (spls-stg-backend-main)
[GO](https://console.cloud.google.com/compute/metadata/sshKeys?authuser=1&project=lithe-strata-174309)

4. Click SSH Keys to show a list of project-wide public SSH keys.

5. Click the Edit button so that you can modify the public SSH keys in your project.

6. Obtain the contents of the `~/.ssh/my-ssh-key.pub` public key file with the `cat` command.

`cat ~/.ssh/my-ssh-key.pub`

The terminal shows your public key in the following form:

`ssh-rsa [KEY_VALUE] [USERNAME]`

where:

- [KEY_VALUE] is the generated public key value.
- [USERNAME] is the user on the instance for whom you will apply the key.

7. Copy the output from the `cat` command and paste it as a new item in the list of SSH keys.

8. Copy the output from the cat command and paste it as a new item in the list of SSH keys.

The public key is now set to work across all of the instances in our project.*

\* If you are neither a project owner or an Admin send your public key to enrico@waat.eu


## Setting Environment Variables
Whenever there is a new environment variable, deploy script should be updated.
Additionally, the new environment variable should be introduced in compute engine

### Introducing new Environment Variables
1) In order to introduce new environment variable, first visit the following link
https://console.cloud.google.com/home/dashboard?project=slps-stg-backend-main&authuser=0
(You have to have required authorization do display this page)
2) After that, on the left hand side, there is a side navigation bar. Under the 'COMPUTE' field
hover your mouse over 'Compute Engine'.
3) When you hover, you will see an additional list of options right next to 'Compute Engine', click on 'Meta Data'
4) The Meta Data contains list of Environment Variables.You can introduce new environment variables via Editing this list

### Updating Script
1) In /scripts/deploy/backend/run.sh file, first you need to add a new entry for new environment variable
to the -RETRIEVING ENVS FROM THE SERVER- section (Just copy and paste one of the existing one and replace the env variable)
2) After that, you need to introduce the following field "ENV NEW_ENV_VARIABLE=$NEW_ENV_VARIABLE"
(check code block between 228-249)
3) And finally add the following line "rm $SERVER_TMP_DIR/NEW_ENV_VARIABLE.env ; \"
(check code block between 278-291)


## Run the deploy script
After that you can deploy executing in the specific app directory (i.e. ui-admin):
`npm run deploy-staging`

or

If you need to specify the user/key because you're getting some error message
`npm run deploy-staging <user> <key>`

Ex.
`npm run deploy-staging enrico ~/.ssh/id_rsa`
