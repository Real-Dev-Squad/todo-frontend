import type { Meta, StoryObj } from "@storybook/react";
import { ListShimmer } from "@/components/Shimmer";
import React from "react";

const meta: Meta<typeof ListShimmer> = {
    title: "Shimmer/ListShimmer",
    component: ListShimmer,
    tags: ['autodocs'],
} satisfies Meta<typeof ListShimmer>;

export default meta;
type Story = StoryObj<typeof ListShimmer>;

export const Default: Story = {
    args: {
        className: 'h-24',
        count: 2
    },
    render: (args) => {
        return <ListShimmer {...args} />
    },
};
