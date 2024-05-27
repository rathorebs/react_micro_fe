import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Schedule from "./index";

export default {
  title: "Pages/Schedule",
  component: Schedule,
} as ComponentMeta<typeof Schedule>;

const Template: ComponentStory<typeof Schedule> = (args) => <Schedule />;

export const Page = Template.bind({});
