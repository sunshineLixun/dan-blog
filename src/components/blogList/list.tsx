import Link from "next/link";
import Color from "colorjs.io";
import { PostDetail, getAllPostsMeta } from "@/data/post";
import { sans } from "@/fonts/fonts";

export default async function BlogList() {
  const posts = await getAllPostsMeta();

  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      {posts.map((item) => {
        return (
          <Link
            className="block scale-100 py-4 hover:scale-[1.005] active:scale-100"
            key={item.meta.id}
            href={"/" + item.meta.slug + "/"}
          >
            <article>
              <PostTitle post={item} />
              <p className="text-[13px] text-gray-700 dark:text-gray-300">
                {new Date(item.meta.date).toLocaleDateString("cn", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="mt-1">{item.meta.spoiler}</p>
            </article>
          </Link>
        );
      })}
    </div>
  );
}

function PostTitle({ post }: { post: PostDetail }) {
  let lightStart = new Color("lab(63 59.32 -1.47)");
  let lightEnd = new Color("lab(33 42.09 -43.19)");
  let lightRange = lightStart.range(lightEnd);
  let darkStart = new Color("lab(81 32.36 -7.02)");
  let darkEnd = new Color("lab(78 19.97 -36.75)");
  let darkRange = darkStart.range(darkEnd);
  let today = new Date();
  let timeSinceFirstPost = (
    today.valueOf() - new Date(2018, 10, 30).valueOf()
  ).valueOf();
  let timeSinceThisPost = (
    today.valueOf() - new Date(post.meta.date).valueOf()
  ).valueOf();
  let staleness = timeSinceThisPost / timeSinceFirstPost;

  return (
    <h2
      className={[
        sans.className,
        "text-[28px] font-black",
        "text-[--lightLink] dark:text-[--darkLink]",
      ].join(" ")}
      style={{
        // @ts-ignore
        "--lightLink": lightRange(staleness).toString(),
        "--darkLink": darkRange(staleness).toString(),
      }}
    >
      {post.meta.title}
    </h2>
  );
}
