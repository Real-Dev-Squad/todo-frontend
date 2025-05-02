import type { Meta, StoryObj } from "@storybook/react";
import { Shimmer } from "@/components/Shimmer";
import React from "react";

const meta: Meta<typeof Shimmer> = {
  title: "Shimmer/Shimmer",
  component: Shimmer,
  tags: ['autodocs'],
} satisfies Meta<typeof Shimmer>;

export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Primary: Story = {
  args: {
    className: 'bg-slate-100 h-24'
  },
  render: (args) => <Shimmer {...args} />
};
