import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Email, InputEmailProps } from "./email";

export default {
  title: "Components/Input Fields",
  component: Email,
} as Meta;

const Template: Story<InputEmailProps> = (args) => <Email {...args} />;

export const EmailField = Template.bind({});
EmailField.args = {
  /* placeholder: 'Email',
  name: 'Email', */
};
