import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  imageUrl?: string | null
  name?: string | null
}

export function UserAvatar({ imageUrl, name, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {imageUrl ? (
        <AvatarImage alt="Picture" src={imageUrl} />
      ) : (
        <AvatarFallback>
          {name ? (
            <span className="sr-only">{name}</span>
          ) : (
            <span className="sr-only">User</span>
          )}
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
