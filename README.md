# compGen

A small CLI tool for generating component code.

## Installation

Clone the repo to your machine and open it in your terminal.
Run `npm i -g .` to install the package globally.

## Generating components and boilerplate

Run `generateComponent` to generate a directory and component files.

You **must** pass the `-n` flag to give the component and directory a name.

This will create:

```
  |--- Component
      |--- Component.tsx
      |--- Component.module.scss
```

### Other flags

- `-t` - will generate a test file with some basic boilerplate,
- `-s` - will generate a storybook file and an index.ts file for working in component libraries
