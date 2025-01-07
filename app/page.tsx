import Post from "@/components/Post";
import PostSection from "@/components/PostSection";
import { currentUser } from "@clerk/nextjs/server";
import WhoToFollow from "@/components/WhoToFollow";
import { getPosts } from "@/actions/postAction";
export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts()
  console.log("Here are the posts : ", posts)
  return (
    <div className="mx-3 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8">
        <div className="flex flex-col gap-y-4">
          <PostSection />
          {posts.map((map) => (
            <Post/>
          ))}
        </div>
      </div>
      <div className="lg:col-span-4"><WhoToFollow /></div>
    </div>

  );
}
