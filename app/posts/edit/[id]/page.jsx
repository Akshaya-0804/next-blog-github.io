import { updatePost } from "../../../../src/actions/posts";
import BlogForm from "../../../components/BlogForm";

import { getCollection } from "../../../../src/actions/lib/db";
import getAuthUser from "../../../../src/actions/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Edit({ params }) {
  const id = params?.id;

  if (!id) {
    return redirect("/dashboard");
  }

  const user = await getAuthUser();
  const postsCollection = await getCollection("posts");

  let post = null;

  if (id.length === 24 && postsCollection) {
    try {
      const foundPost = await postsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!foundPost) return redirect("/");

      // 🔐 Check user ownership
      if (user?.userId !== foundPost?.userId?.toString()) {
        return redirect("/");
      }

      post = JSON.parse(JSON.stringify(foundPost));
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  return (
    <div className="container w-1/2">
      <h1 className="title">Edit your post</h1>
      {post ? (
        <BlogForm handler={updatePost} post={post} />
      ) : (
        <p>Failed to fetch the data</p>
      )}
    </div>
  );
}
