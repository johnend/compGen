#!/usr/bin/env node

import yargs from 'yargs';
import fs from 'fs';

const options = yargs
  .usage('Usage: -n <name>')
  .option('n', {
    alias: 'name',
    describe: 'component name',
    type: 'string',
    demandOption: true,
  })
  .option('p', {
    alias: 'page',
    describe:
      'ensure the generated tsx file is named page.tsx, for Next 13 pages',
    type: 'boolean',
    demandOption: false,
  })
  .option('t', {
    alias: 'test',
    describe: 'include a test file',
    type: 'boolean',
    demandOption: false,
  })
  .option('s', {
    alias: 'story',
    describe: 'include a storybook stories file',
    type: 'boolean',
    demandOption: false,
  }).argv;

const creating = `Creating your ${options.name} component files!`;
const dir = options.name;

const tsBoilerplate = `
import styles from './${options.name}.module.scss';

type Props = {};
const ${options.name} = (props: Props) => {
  return (
    <div>index</div>
  );
};
export default ${options.name};
`;

const jestBoilerplate = `
  import {render, screen} from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import '@testing-library/jest-dom';
  import ${options.name} from './${options.name}';

  test('loads and displays greeting', async () => {
    // ARRANGE
    render(<${options.name} />);

    // ACT

    // ASSERT

  });
`;

const storyBoilerplate = (storyComponent) => `
import { withDesign } from 'storybook-addon-designs';
import { Meta } from '@storybook/react';
import ${storyComponent} from './${storyComponent}';

export default {
  title: 'Formation/Core/${storyComponent}',
  component: ${storyComponent},
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'UPDATE WITH FIGMA URL',
    },
  },
  argTypes: {}
} as Meta<typeof ${storyComponent}>
;

export const ${storyComponent}_Default = {
  args: {},
};
`;

console.log(creating);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

fs.writeFile(
  `${dir}/${options.name}.module.scss`,
  '@use "@/styles/variables" as *;',
  function (err) {
    if (err) throw err;
    console.log('💅 Sass file is created successfully.');
  }
);

if (!options.page) {
  fs.writeFile(`${dir}/${options.name}.tsx`, tsBoilerplate, function (err) {
    if (err) throw err;
    console.log('💻 TSX file is created successfully.');
  });
} else {
  fs.writeFile(`${dir}/page.tsx`, tsBoilerplate, function (err) {
    if (err) throw err;
    console.log('💻 TSX page file is created successfully.');
  });
}

if (options.test) {
  fs.writeFile(
    `${dir}/${options.name}.test.tsx`,
    jestBoilerplate,
    function (err) {
      if (err) throw err;
      console.log('🧪 Test file is created successfully.');
    }
  );
}

if (options.story) {
  fs.writeFile(
    `${dir}/${options.name}.stories.tsx`,
    storyBoilerplate(options.name),
    function (err) {
      if (err) throw err;
      console.log('📕 Story file is created successfully.');
    }
  );
  fs.writeFile(
    `${dir}/index.ts`,
    `export { default } from './${options.name}';`,
    function (err) {
      if (err) throw err;
      console.log('📑 Index file created successfully');
    }
  );
}
