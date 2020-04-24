# libraries/utils

In order to import into other projects as a proper node module, you should use
[npm-link](https://docs.npmjs.com/cli/link)

```sh
yarn run build-npm
yarn link
cd ../../apps/app-name
yarn link "@sloops/library-utils"
```

This of course requires you to also have declared `@sloops/library-utils` as a dependency
on the consuming application's `package.json`.
