import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import SessionCard from "apps/user/learner/components/session-card";

import sessionPicture from "../../../../Assets/background/session-temp.jpg";
import videoCameraIcon from "../../../../Assets/video_camera_icon.svg";
import rightArrow from "../../../../Assets/arrow-right.svg";
import calendarIcon from "Assets/icon-calendar.svg";
import clockIcon from "Assets/icon-clock-time.svg";
export default {
  title: "Components/SessionCard",
  component: SessionCard,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof SessionCard>;

const Template: ComponentStory<typeof SessionCard> = (args) => (
  <SessionCard {...args} />
);

export const Large = Template.bind({});
Large.args = {
  dateTime: "Friday 9th July · 19:00 – 20:00",
  timeZone: "GMT",
  title: "Yoga Session",
  subtitle: "with Larissa McGoldrick",
  size: "large",
  pillar: "Energy",
  service: "Yoga",
  duration: "55min",
  imageURL: sessionPicture,
  videoCameraIcon: videoCameraIcon,
  rightArrow: rightArrow,
  clockIcon: clockIcon,
  calendarIcon: calendarIcon,
};

export const Small = Template.bind({});
Small.args = {
  date: "Friday 9th July · ",
  time: "19:00 – 20:00",
  timeZone: "GMT",
  title: "Yoga Session",
  subtitle: "with Larissa McGoldrick",
  size: "small",
  pillar: "Activity",
  service: "Mindfulness",
  duration: "55min",
  imageURL: sessionPicture,
  videoCameraIcon: videoCameraIcon,
  rightArrow: rightArrow,
  clockIcon: clockIcon,
  calendarIcon: calendarIcon,
};

export const Mini = Template.bind({});
Mini.args = {
  date: "Friday 9th July · ",
  time: "19:00 – 20:00",
  timeZone: "GMT",
  title: "Yoga Session",
  subtitle: "with Larissa McGoldrick",
  size: "mini",
  pillar: "Resilience",
  service: "Yoga",
  duration: "55min",
  imageURL: sessionPicture,
  videoCameraIcon: videoCameraIcon,
  rightArrow: rightArrow,
};

const Clicked = Template.bind({});
Clicked.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("div"));
  await waitFor(() => expect(args.onClick).toHaveBeenCalled());
};
