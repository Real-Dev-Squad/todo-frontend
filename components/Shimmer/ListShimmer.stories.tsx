import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ListShimmer } from "@/components/shimmer";

const meta: Meta<typeof ListShimmer> = {
    title: "Shimmer/ListShimmer",
    component: ListShimmer,
    tags: ['autodocs'],
} satisfies Meta<typeof ListShimmer>;

export default meta;
type Story = StoryObj<typeof ListShimmer>;

export const Default: Story = {
    render: () => <ListShimmer className='h-24' count={2} />
};
