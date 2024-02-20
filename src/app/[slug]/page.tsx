import { getAllPostsMeta, getPost } from "@/data/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { sans } from "@/fonts/fonts";
import "./markdown.css";
import { getPostWords, readingTime } from "@/lib/utils";

export async function generateStaticParams() {
  const metas = await getAllPostsMeta();
  return metas.map((post) => {
    return { slug: post.meta.slug };
  });
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  let postComponents = {};

  try {
    postComponents = await import(
      "../../posts/" + params.slug + "/components.js"
    );
  } catch (e: any) {
    if (!e || e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }

  const words = getPostWords(post.content);
  const readTime = readingTime(words);

  return (
    <article>
      <h1
        className={[
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        {post.meta.title}
      </h1>
      <p className="mb-6 mt-2 text-[13px] text-gray-700 dark:text-gray-300">
        {new Date(post.meta.date).toLocaleDateString("cn", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>

      <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300">
        字数：{words}
      </p>
      <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300">
        预计阅读时间：{readTime}分钟
      </p>
      <div className="markdown mt-10">
        <MDXRemote
          source={post?.content || ""}
          components={{
            ...postComponents,
          }}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              // @ts-ignore
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                // @ts-ignore
                rehypeKatex,
                [
                  // @ts-ignore
                  rehypePrettyCode,
                  {
                    theme: "material-theme-palenight",
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
