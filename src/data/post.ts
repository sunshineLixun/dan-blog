import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { pinyin } from "pinyin-pro";
import { isChinese } from "@/lib/utils";

export interface PostDetail {
  meta: {
    title: string;
    date: string;
    spoiler: string;
    slug: string;
    id: string;
  };
  content: string;
}

const rootDirectory = path.join(process.cwd(), "src", "posts");

export const getPostBySlug = async (dir: string) => {
  const filePath = path.join(rootDirectory, dir, "/index.mdx");

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  const { data } = matter(fileContent);

  const id = isChinese(dir)
    ? pinyin(dir, {
        toneType: "none",
        separator: "-",
      })
    : dir;

  return {
    meta: { ...data, slug: dir, id },
    content: fileContent,
  } as PostDetail;
};

export const getAllPostsMeta = async () => {
  const dirs = fs
    .readdirSync(rootDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  let datas = await Promise.all(
    dirs.map(async (dir) => {
      const { meta, content } = await getPostBySlug(dir);
      return { meta, content };
    }),
  );

  datas.sort((a, b) => {
    return Date.parse(a.meta.date) < Date.parse(b.meta.date) ? 1 : -1;
  });
  return datas;
};

export async function getPost(slug: string) {
  const posts = await getAllPostsMeta();
  if (!slug) throw new Error("not found");
  const post = posts.find((post) => post.meta.slug === slug);
  if (!post) {
    throw new Error("not found");
  }
  return post;
}
