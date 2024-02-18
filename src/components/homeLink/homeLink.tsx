import Link from "next/link";
import { sans } from "@/fonts/fonts";
import classNames from "classnames";

export default function HomeLink() {
  return (
    <Link
      className={classNames(
        sans.className,
        "inline-block scale-100 text-2xl font-black active:scale-100",
      )}
      style={{
        opacity: 1,
        transition: "transform 0.2s ease-in-out 0s, opacity 0.2s linear 0.4s",
      }}
      href="/"
    >
      <span>overreacted</span>
    </Link>
  );
}
