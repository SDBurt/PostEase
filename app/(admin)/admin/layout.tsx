
import { UserButton, auth } from "@clerk/nextjs";

export default function AdminLayout({ children }: {children: React.ReactNode}) {

  // const { userId } = auth()

  return (
    <div>
      <nav className="h-12 border-b">
        <UserButton afterSignOutUrl="/"/>
      </nav>
      <div>
        {children}
      </div>
    </div>
  )
}