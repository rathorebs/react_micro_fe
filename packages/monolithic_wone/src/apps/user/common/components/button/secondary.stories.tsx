import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from ".";

export default {
  title: "Components/Buttons",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  tag: "a",
  href: "/signin/reset",
  children: "Don't have an account? Register",
};
