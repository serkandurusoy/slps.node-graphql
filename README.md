# Sloops
This is a consolidated mono repo for Sloops applications.

Please check relevant README.md files for details regarding individual projects and/or top level
directories.

You should have [nvm](https://github.com/creationix/nvm) installed using

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

We are using `yarn` as our primary package manager, although a certain `npm` version is also required
just in case a project-wide switch is required.

Yarn can be installed following the [official instructions](https://yarnpkg.com/en/docs/install) which,
for debian based linux distros are:

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt remove cmdtest && sudo apt-get install yarn
```

To begin development

```sh
git clone https://github.com/mvpspace/sloops.git
cd sloops
nvm use
git checkout develop
git pull
yarn install
git checkout -b new-branch-name
cd projects/path-to-project
yarn run start
```
The initial `yarn install` command will make sure you have the correct `yarn`, `node` and `npm`
versions installed, and will also install npm dependencies for the individual projects

If you run `yarn run start` at the root of the repository, it will install all dependencies and then
start all of the applications at once. This should be helpful for testing locally.

Please follow conventions for branch naming with the format
`[feature/enhancement/bugfix/hotfix]/#[ticket-number]/[some-explanatory-title]` for example
`feature/#22/component-lib-and-storybook`


The `nvm use` command might ask you to install a specific version of node, in that case, please follow
the instructions.

It helps if you set the global default for nvm node version so that you don't have change it for
every bash session. To do this, simply run:

```sh
nvm alias default x.x.x
```

where _x.x.x_ is the version number provided within the `.nvmrc` file

Although we are currently using yarn, it is also a good idea to keep your `npm` updated:

```sh
cd sloops
nvm use
yarn install -g npm
```
