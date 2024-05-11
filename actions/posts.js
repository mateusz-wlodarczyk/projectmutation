"use server";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("title is required");
  }
  if (!content || content.trim().length === 0) {
    errors.push("content is required");
  }
  if (!image) {
    errors.push("image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  await storePost({
    imageUrl: "",
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/feed", "layout");
}
