import type { Meta, StoryObj } from "@storybook/react"

import Tweet, { TweetText } from "@/components/admin/posts/twitter/tweet"

const meta = {
  title: "Admin/Posts/Twitter/Tweet",
  component: Tweet,
  tags: ["autodocs"],
} satisfies Meta<typeof Tweet>

export default meta

const text =
  "lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum lacinia egestas. Aliquam ullamcorper facilisis orci, in maximus magna maximus eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce non diam vitae nulla finibus vehicula vitae hendrerit lorem. Cras id massa sed tellus sodales ultricies. Integer a massa viverra, sagittis eros sit amet, rutrum magna. Donec ac felis mauris. Nam faucibus arcu non porttitor pharetra. Nullam feugiat augue ante, a dignissim lectus finibus id. Pellentesque id massa eu augue gravida scelerisque ut eu massa. Phasellus fermentum et ligula in pretium. Sed mollis pellentesque nisi, sed elementum nibh. Cras ut rutrum velit. Donec eros erat, tincidunt nec nibh non, malesuada tincidunt ex. Sed tincidunt, massa quis pellentesque malesuada, mauris libero feugiat tellus, et congue justo odio tempus arcu. Etiam eu magna metus. Praesent nec eleifend nisl."

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    userName: "Lorem Ipsum",
    handle: "loremipsum",
    createdAt: new Date(),
    children: <TweetText text={text} />,
  },
}

export const AsThread: Story = {
  args: {
    userName: "Lorem Ipsum",
    handle: "loremipsum",
    createdAt: new Date(),
    children: <TweetText text={text} />,
    isThread: true,
  },
}
