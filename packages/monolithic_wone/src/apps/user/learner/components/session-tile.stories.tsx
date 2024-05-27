import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SessionTile from "./session-tile";
import sessionImageURL from "Assets/images/reacrdingThumbPH.jpg";
export default {
  title: "Components/Tile",
  component: SessionTile,
} as ComponentMeta<typeof SessionTile>;

const Template: ComponentStory<typeof SessionTile> = (args) => (
  <SessionTile {...args} />
);

export const Session = Template.bind({});
Session.args = {
  id: "2121",
  imageURL: sessionImageURL,
  pillar: "Energy",
  service: "Resilience",
  title: "Yoga session",
  subtitle: "With Reeva Misra",
  day: "Fri 9 july",
  time: "7pm – 8pm",
  variant: "primary",
};
