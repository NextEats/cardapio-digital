import { Meta, Story } from "@storybook/react";
import Button, { iButton } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary"],
      },
    },
  },
} as Meta;

const Template: Story<iButton> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Primary Button",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Secondary Button",
  variant: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "Disabled Button",
  disabled: true,
};
