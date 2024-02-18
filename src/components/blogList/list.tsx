import classNames from "classnames";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { getAllPostsMeta } from "@/data/post";
import { sans } from "@/fonts/fonts";

const montserrat = Montserrat({ weight: "300", subsets: ["latin"] });

export default async function BlogList() {
  const posts = await getAllPostsMeta();

  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      {posts.map((item) => {
        return (
          <Link
            className="block scale-100 py-4 hover:scale-[1.005] active:scale-100"
            style={{
              opacity: 1,
              transition:
                "transform 0.2s ease-in-out 0s, opacity 0.2s linear 0.4s",
            }}
            key={item.meta.id}
            href={"/" + item.meta.slug}
          >
            <article>
              <h2
                className={classNames(
                  sans.className,
                  "text-[28px] font-black text-[--lightLink] dark:text-[--darkLink]",
                )}
              >
                {item.meta.title}
              </h2>
              <p
                className={classNames(
                  montserrat.className,
                  "text-[13px] text-gray-700 dark:text-gray-300",
                )}
              >
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
