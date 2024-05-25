import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import FeedbackCard from "./feedback-card";
import ProfilePic from "Assets/images/avatar/avatar.jpg";
import calendarIcon from "Assets/icon-calendar.svg";
import clockIcon from "Assets/icon-clock-time.svg";
export default {
  title: "Components/FeedbackCard",
  component: FeedbackCard,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof FeedbackCard>;

const Template: ComponentStory<typeof FeedbackCard> = (args) => (
  <FeedbackCard {...args} />
);

export const Large = Template.bind({});
Large.args = {
  feedbackImage: ProfilePic,
  calendarIcon: calendarIcon,
  clockIcon: clockIcon,
  name: "Stephen Harris",
  sessionTitle: "Yoga session",
  day: "Fri 9 july",
  time: "7pm – 8pm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna libero, rutrum vel neque sit amet, pretium bibendum ipsum.",
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  feedbackImage: ProfilePic,
  calendarIcon: calendarIcon,
  clockIcon: clockIcon,
  name: "Stephen Harris",
  sessionTitle: "Yoga session",
  day: "Fri 9 july",
  time: "7pm – 8pm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna libero, rutrum vel neque sit amet, pretium bibendum ipsum.",
  size: "small",
};

export const Mini = Template.bind({});
Mini.args = {
  feedbackImage: ProfilePic,
  calendarIcon: calendarIcon,
  clockIcon: clockIcon,
  name: "Stephen Harris",
  sessionTitle: "Yoga session",
  day: "Fri 9 july",
  time: "7pm – 8pm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna libero, rutrum vel neque sit amet, pretium bibendum ipsum.",
  size: "mini",
};

const Clicked = Template.bind({});
Clicked.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("div"));
  await waitFor(() => expect(args.onClick).toHaveBeenCalled());
};
