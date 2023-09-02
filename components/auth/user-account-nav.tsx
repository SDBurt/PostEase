
import { User } from "next-auth"
import ThemedUserButton from "../themed-user-button"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  
  return (
    <div className="flex space-x-2 items-center">
      <ThemedUserButton />
    </div>
  )
}
