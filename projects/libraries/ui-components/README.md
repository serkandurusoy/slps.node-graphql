# libraries/ui-components

Run `yarn run start` and visit http://localhost:9001 in your browser.

If you want to deploy storybook as a static site, run `yarn run build` and copy over the
`dist/storybook` directory to a static site hosting service

There is a prebuilt version live at http://components.sloops.waat.eu for acceptance testing

In order to import into other projects as a proper node module, you should use
[npm-link](https://docs.npmjs.com/cli/link)

```sh
yarn run build-npm
yarn link
cd ../../apps/app-name
yarn link "@sloops/library-ui-components"
```

This of course requires you to also have declared `@sloops/library-ui-components` as a dependency
on the consuming application's `package.json`.
