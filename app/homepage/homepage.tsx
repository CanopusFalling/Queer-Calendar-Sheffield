import OverflowScroll from "@/app/components/overflow-scroll/overflowScroll";
import Banner from "./banner";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function Homepage() {
  return (
    <main className="flex flex-col">
      <Banner />
      <section className="my-4 mb-8 m-auto max-w-xl px-4">
        <h2 className="mb-3 w-fit text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-green-300 via-blue-400 to-purple-500">
          About
        </h2>
        <p className="mb-2">
          Queer Calendar Sheffield is a volunteer-run project dedicated to
          connecting individuals with LGBTQ+ community events. Its primary
          purpose is to curate and archive LGBTQ+ events in the city, making
          them searchable and information about events more easily accessible.
        </p>
        <p className="mb-4">
          For this reason we place a high importance on the{" "}
          <Link
            href="/accessibility"
            className=" font-bold text- text-blue-800 dark:text-blue-400 underline visited:text-purple-600 visited:dark:text-purple-400"
          >
            accessibility
          </Link>{" "}
          of the website and any information we provide. The code for this
          project is also fully open source so anyone with a little bit of
          knowledge can make their own version for their area. Get in touch,
          view the code that makes this website run or read our accessibility
          statement using the links below.
        </p>
        <GradientButton href="/contact">Contact Us</GradientButton>
        <GradientButton href="/accessibility">
          Accessibility Statement
        </GradientButton>
        <GradientButton href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield">
          View Project GitHub
        </GradientButton>
      </section>
    </main>
  );
}

const GradientButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 mb-2 rounded-2xl"
    >
      <div className="text-lg bg-white/[0.7] dark:bg-black/[0.7] hover:dark:bg-black/[0.5] transition-all text-center font-extrabold w-full py-2 px-4">
        {children}
      </div>{" "}
    </Link>
  );
};
