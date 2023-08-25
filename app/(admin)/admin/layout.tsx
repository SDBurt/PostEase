import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import AdminLayout from "@/components/admin/layout/admin-layout"

export default async function AdminPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return <AdminLayout>{children}</AdminLayout>
}
