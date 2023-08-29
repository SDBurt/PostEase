import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import PostTabs from "@/components/admin/posts/post-tabs";
import { postLinkTabs } from "@/config/admin"



export default async function PostsPageLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <PageShell>
      <PageHeader heading="Posts" text="Create and manage posts.">
      </PageHeader>
      {/* <PostTabs tabs={postLinkTabs} /> */}
      <div>{children}</div>
    </PageShell>
  )
}
