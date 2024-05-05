import OverflowScroll from "@/app/components/overflow-scroll/overflowScroll";
import Banner from "./banner";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import EventStats from "../event/event-stats";

export default function Homepage() {
  return (
    <main className="flex flex-col">
      <Banner />
      <section className="m-4 self-center max-w-xl w-full px-4 bg-red-500/20 border-red-500/80 border-4 rounded-3xl text-center p-4">
        <h2 className="text-xl font-extrabold">Temporary Update</h2>
        <p>
          The information on this calendar is heavily out of date, please don't
          rely on it at the moment. I'm working on getting new systems in place
          to get the info up to date again but I've gotta prioritise surviving
          this capitalist hellscape for a little bit while my housing is
          insecure. Hope to be able to bring good news before pride month hits,
          please don't hold your breath on that one though.
        </p>
      </section>
      <section className="my-4 mb-8 m-auto max-w-xl px-4">
        <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r">About QCS</h2>
        <hr className="mb-3 border-0 w-full h-px bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 brightness-75 dark:brightness-100" />
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
            className="font-bold text- text-blue-800 dark:text-blue-400 underline visited:text-purple-600 visited:dark:text-purple-400"
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
      <EventStats />
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
      <div className="text-lg bg-white/[0.5] hover:bg-white/[0.3] dark:bg-black/[0.7] hover:dark:bg-black/[0.5] transition-all text-center font-extrabold w-full py-2 px-4">
        {children}
      </div>{" "}
    </Link>
  );
};
