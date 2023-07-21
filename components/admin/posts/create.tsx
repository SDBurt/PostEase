'use client'

import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/db/actions";

export function CreatePost() {

  async function onClickHandler() {
    console.log("CREATE CLICKED")
    const payload = {
      title: "Test Title",
      text: "this is a test post text",
    }
    await createPost(payload)
  }


  return (
    <Button onClick={onClickHandler}>
      Create Post
    </Button>
  )
}

export default CreatePost