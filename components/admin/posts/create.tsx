import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/db/actions";

export function CreatePost() {

  async function submitHandler() {
    'use server'
    // console.log("CREATE CLICKED")
    const payload = {
      title: new Date().toISOString(),
      text: "this is a test post text",
    }
    // console.log({payload})
    await createPost(payload)
  }


  return (
    <form action={submitHandler}>
      <Button type="submit">
        Create Post
      </Button>
    </form>


    
  )
}

export default CreatePost