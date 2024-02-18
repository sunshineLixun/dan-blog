"use client";

export function Greeting({ person }) {
  return (
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>{person.firstName}</i>!
    </p>
  );
}
