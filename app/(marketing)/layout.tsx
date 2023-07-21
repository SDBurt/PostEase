
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomeLayout({ children }: {children: React.ReactNode}) {
  return (
    <div>
      <nav className="h-12 border-b">
        <Link href="/sign-in">Sign In</Link>
      </nav>
      <div>
        {children}
      </div>
    </div>
  )
}