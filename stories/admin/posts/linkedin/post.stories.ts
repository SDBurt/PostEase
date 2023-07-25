import Post from "@/components/admin/posts/linkedin/post";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Admin/Posts/Linkedin/Post",
  component: Post,
  tags: ["autodocs"],
} satisfies Meta<typeof Post>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "Lorem Ipsum",
    headline: "loremipsum",
    createdAt: new Date().toISOString(),
    text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum lacinia egestas. Aliquam ullamcorper facilisis orci, in maximus magna maximus eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce non diam vitae nulla finibus vehicula vitae hendrerit lorem. Cras id massa sed tellus sodales ultricies. Integer a massa viverra, sagittis eros sit amet, rutrum magna. Donec ac felis mauris. Nam faucibus arcu non porttitor pharetra. Nullam feugiat augue ante, a dignissim lectus finibus id. Pellentesque id massa eu augue gravida scelerisque ut eu massa. Phasellus fermentum et ligula in pretium. Sed mollis pellentesque nisi, sed elementum nibh. Cras ut rutrum velit. Donec eros erat, tincidunt nec nibh non, malesuada tincidunt ex. Sed tincidunt, massa quis pellentesque malesuada, mauris libero feugiat tellus, et congue justo odio tempus arcu. Etiam eu magna metus. Praesent nec eleifend nisl.",
  },
};
