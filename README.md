## React Common Components Library

#### This branch will accommodate Vhi web shared components.
#### Storybook has been implemented to live re-build and display components in a web browser. (see https://github.com/storybookjs/storybook)
#### Rollup has been applied to the build to enable development of components using SASS. (see https://github.com/thgh/rollup-plugin-scss)

#### Recommended system requirements

```bash
Node version 16
```

#### Installation

```bash
npm i
```

#### Installing husky git hooks, which will run tests, eslint checks and automatic formatting on commits. Should be done once after 'npm i' during environment setup.

```bash
npx husky install
```

#### To build using Rollup and watch for changes

```bash
npm start
```

#### Format all js/jsx files in src/ folder with prettier

```bash
npm run format
```

#### Run eslint check

```bash
npm run lint
```

#### To build and bundle components into dist folder using Rollup

```bash
npm run build
```

#### To build Story Book components (not required as running storybook will do the same thing below)

```bash
npm run build-storybook
```

#### To run using Storybook to show your components

```bash
npm run storybook
```

#### How to test

```
npm t
```
