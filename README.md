# Storybook Addon Persona

This adds a persona switcher to the Storybook toolbar that allows users to view the Storybook as different personas.

This was motivated by a need to have different sets of stories visible for different kinds of users, without having to deploy
multiple builds of a storybook.

For instance, a user consuming the Storybook may only wish to see documentation; a developer may wish to additionally
see individual stories, and QA will want to see everything.

## Install

```shell
npm install storybook-addon-persona
```

Add `storybook-addon-persona` to your addons array in the config object at `.storybook/main.ts`

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-docs',
    "storybook-addon-persona" // <-- add it here
  ],
};

export default config;
```

## Usage

Out of the box, this addon comes with three personas:

1. **Default**

   Can view items only with a type of `docs` (ie, `.mdx` pages).
2. **Dev**

   Can view items of all types, so long as they have the `dev` tag.
3. **QA**

   Completely unfiltered

User preferences are persisted in `localStorage`.

### Configuration

To provide your own personas, set config in your `manager.ts` file:

```ts
// .storybook/manager.ts

import { addons } from "storybook/manager-api";

addons.setConfig({
  personas: [] // <-- add your personas here
})
```
Each persona requires an `id` and `name`. Basic filtering can be achieved through setting permitted `types` and `tags`.

If this is insufficient, a custom callback `filter` function can also be provided that is passed a Storybook index entry.
