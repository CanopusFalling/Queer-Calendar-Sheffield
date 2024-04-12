import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full bg-gradient-to-br  from-green-300 via-blue-400 to-purple-500">
      <div className="bg-white/[0.7] dark:bg-black/[0.7] py-10 text-center font-extrabold">
        <div className="mx-auto w-fit mb-4 text-9xl bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 text-transparent bg-clip-text brightness-75 dark:brightness-100">
          QCS
        </div>
        <h1 className="text-4xl">Queer Calendar Sheffield</h1>
        <Link
          className="flex w-fit mx-auto bg-black rounded-lg p-2 px-4 m-4 animate-pulse"
          href="/event"
        >
          <span className="mx-auto w-fit text-2xl bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 text-transparent bg-clip-text brightness-75 dark:brightness-100">
            View Events Now
          </span>
        </Link>
      </div>
    </section>
  );
}
