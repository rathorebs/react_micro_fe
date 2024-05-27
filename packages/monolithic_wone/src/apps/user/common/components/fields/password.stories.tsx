import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Password, InputPasswordProps } from "./password";

export default {
  title: "Components/Input Fields",
  component: Password,
} as Meta;

const Template: Story<InputPasswordProps> = (args) => <Password {...args} />;

export const PasswordField = Template.bind({});
PasswordField.args = {
  /* placeholder: 'Password',
  name: 'Password', */
};
