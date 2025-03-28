import type { Meta, StoryObj } from "@storybook/react";
import { Shimmer } from "./Shimmer";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Shimmer> = {
  title: "Shimmer/ShimmerComponenet",
  component: Shimmer,
  decorators: [/* ... */],
  parameters: {/* ... */ },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    className: 'bg-slate-100 h-[100px]'
  },
  render: function Render(args) {
    return <Shimmer {...args} />

  },
};
