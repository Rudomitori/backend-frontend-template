import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ComboBoxInput } from 'components/uikit/inputs/dropdown/ComboBoxInput';
import { defaultExclude } from '../../.storybook/preview';
const StoryComponent = ComboBoxInput;

export default {
  title: 'Example/ComboBox',
  component: StoryComponent,
  args: {
    options: [
      'qwe',
      'zxc',
      'asd',
      'asjhgj',
      'asbnm',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ],
    required: true,
  } as Partial<React.ComponentProps<typeof StoryComponent>>,
  parameters: {
    controls: {
      exclude: [
        ...defaultExclude,
        'onValueChanged',
      ] as (keyof React.ComponentProps<typeof StoryComponent>)[],
    },
  },
} as Meta<typeof StoryComponent>;

export const Default = {
  render: (args: React.ComponentProps<typeof StoryComponent>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value ?? '');
    return (
      <StoryComponent
        {...args}
        value={value}
        onValueChanged={(value) => {
          setValue(value as any);
        }}
      />
    );
  },
};
export const WithSearch = {
  render: (args: React.ComponentProps<typeof StoryComponent>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value ?? '');
    return (
      <StoryComponent
        {...args}
        enableSearch={true}
        value={value}
        onValueChanged={(value) => {
          setValue(value as any);
        }}
      />
    );
  },
};
