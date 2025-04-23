import type { Meta, StoryObj } from "@storybook/react";
import { Shimmer } from "./Shimmer";
import React from "react";
import { expect, within } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Shimmer> = {
  title: "Shimmer/ShimmerComponenet",
  component: Shimmer,
  decorators: [(Story) => (
    <div style={{ margin: '3em' }}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      {Story()}
    </div>
  ),
  ],
  parameters: {/* ... */ },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("shimmer")).toBeInTheDocument();

  },
} satisfies Meta<typeof Shimmer>;

export default meta;
type Story = StoryObj<typeof Shimmer>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    className: 'bg-slate-300 bg-slate-100 h-[100px]'
  },
  render: function Render(args) {
    return <Shimmer {...args} />
  },
};
