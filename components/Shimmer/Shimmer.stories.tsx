import type { Meta, StoryObj } from "@storybook/nextjs";
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
  render: () => <Shimmer className='bg-slate-100 h-24' />
};
