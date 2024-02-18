import Link from "next/link";
import Image from "next/image";
import HomeLink from "../homeLink/homeLink";

export default function Header() {
  return (
    <header className="mb-14 flex flex-row place-content-between">
      <HomeLink />

      <span className="relative top-[4px] italic">
        by
        <Link
          target="_blank"
          className="scale-100 active:scale-100"
          href="https://github.com/sunshineLixun"
        >
          <Image
            width={32}
            height={32}
            alt="sunshineLixun"
            src="https://avatars.githubusercontent.com/u/15700015?v=4"
            className="relative -top-1 mx-2 inline h-8 w-8 rounded-full"
          />
        </Link>
      </span>
    </header>
  );
}
