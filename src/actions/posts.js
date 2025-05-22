"use server";

import { getCollection } from "./lib/db";
import getAuthUser from "./lib/getAuthUser";
import { BlogPostSchema } from "./lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(state, formData) {
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = BlogPostSchema.safeParse({ title, content });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  try {
    const postsCollection = await getCollection("posts");
    const post = {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      userId: ObjectId.createFromHexString(user.userId),
    };
    await postsCollection.insertOne(post);
  } catch (error) {
    return {
      errors: { title: error.message },
    };
  }

  return redirect("/dashboard");
}

export async function updatePost(state, formData) {
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");

  if (!postId || postId.length !== 24) {
    return redirect("/");
  }

  const validatedFields = BlogPostSchema.safeParse({ title, content });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  const postsCollection = await getCollection("posts");
  const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  if (!post) {
    return redirect("/");
  }

  if (user.userId !== post.userId.toString()) {
    return redirect("/");
  }

  await postsCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
      },
    }
  );

  return redirect("/dashboard");
}

export async function deletePost(formData) {
  const user = await getAuthUser();
  if (!user || !userId) return redirect("/");

  const postId = formData.get("postId");
  if (!postId || postId.length !== 24) {
    return redirect("/");
  }

  const postsCollection = await getCollection("posts");
  const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  if (!post || !post.userId) {
    return redirect("/");
  }

  if (user.userId !== post.userId.toString()) {
    return redirect("/");
  }

  await postsCollection.findOneAndDelete({ _id: post._id });

  revalidatePath("/dashboard");
  return redirect("/dashboard");
}
