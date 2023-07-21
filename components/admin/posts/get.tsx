'use client'

import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/db/actions";

export function GetPosts() {

  async function onClickHandler() {
    console.log("GET CLICKED")
    await getPosts()
  }


  return (
    <Button onClick={onClickHandler}>
      Get All Posts
    </Button>
  )
}

export default GetPosts