
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }: {children: React.ReactNode}) {
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