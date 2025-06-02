"use server";

import { z } from "zod";
import { createPostSchema } from "./schemas";
import { createClient } from "../utils/supabase/server";
import { slugify } from "../utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editPost = async ({
  postId,
  data,
}: {
  postId: string;
  data: z.infer<typeof createPostSchema>;
}) => {
  const parsedData = createPostSchema.parse(data);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (!post) {
    throw new Error("Post not found");
  }

  const isAuthor = user && user.id === post.user_id;

  if (!isAuthor) {
    throw new Error("You are not allowed to edit");
  }

  const { data: updatedPost, error} = await supabase
    .from("posts")
    .update({ ...parsedData, slug: slugify(parsedData.title) })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError();

  
    console.log('the error from query', error)

    if (!updatedPost) {
        throw new Error('Redirect not available', error)
    }

  revalidatePath("/");
  redirect(`/post/${updatedPost.slug}`)
};