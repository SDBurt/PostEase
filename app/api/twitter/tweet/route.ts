import { auth, currentUser } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }
) {
  try {

    // const user = await currentUser()
    const user = await auth()
    // const verifiedExternalAccounts = user.externalAccounts.filter(account => account.verification.status === 'verified')
    
    // const twitterAccount = verifiedExternalAccounts.find(account => account.provider === "oauth_twitter")

    
    const token = await user.getToken()
    
    const requestParams = {
      "ids": "1261326399320715264,1278347468690915330", // Edit Tweet IDs to look up
      // "tweet.fields": "lang,author_id", // Edit optional query parameters here
      // "user.fields": "created_at" // Edit optional query parameters here
    }

    const endpointURL = "https://api.twitter.com/2/tweets?" + new URLSearchParams(requestParams);
    // const endpointURL = "https://api.twitter.com/2/users/me"

    console.log(endpointURL)

    const res = await fetch(endpointURL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    console.log(await res.json())

    const data = {
      status: "OK",
      data: []
  }

    return new Response(JSON.stringify(data), { status: 200 })

  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify(e.message), { status: 500 })
  }
}