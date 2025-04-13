import type { Meta, StoryObj } from "@storybook/react";
import { ListShimmer } from "./Shimmer";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ListShimmer> = {
    title: "Shimmer/ListShimmer",
    component: ListShimmer,
    decorators: [/* ... */],
    parameters: {/* ... */ },
    tags: ['autodocs'],
} satisfies Meta<typeof ListShimmer>;

export default meta;
type Story = StoryObj<typeof ListShimmer>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        className: 'h-[100px]',
        count: 2
    },
    render: function Render(args) {
        return <ListShimmer {...args} />

    },
};
