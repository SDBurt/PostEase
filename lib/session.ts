import { auth, currentUser } from "@clerk/nextjs";

export async function getCurrentUser() {
  const user = await currentUser();

  if (!user) {
    return null
  }

  const twitter = user.externalAccounts.find((account) => {
    return account.provider === "oauth_twitter"
  })

  return {
    // User Specific
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    image: user.imageUrl,
    email: user.emailAddresses?.find(email => email.id === user.primaryEmailAddressId)?.emailAddress,
    
    // Twitter Specific
    twitter: {
      firstName: twitter?.firstName,
      lastName: twitter?.lastName,
      imageUrl: twitter?.imageUrl,
      username: twitter?.username
    }
  };
}


export async function getAuth() {
  const user = await auth();
  
  if (!user?.userId) {
    return null
  }

  return {
    id: user.userId,
  };
}
