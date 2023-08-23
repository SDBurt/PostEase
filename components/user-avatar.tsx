import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  imageUrl?: string
  name: string
}

export function UserAvatar({ imageUrl, name, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props} className="h-10 w-10">
      {imageUrl ? (
        <AvatarImage alt="Picture" src={imageUrl}/>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
