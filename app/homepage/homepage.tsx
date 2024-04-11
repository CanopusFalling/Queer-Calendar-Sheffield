import OverflowScroll from "@/app/components/overflow-scroll/overflowScroll";
import Banner from "./banner";

export default function Homepage() {
  return (
    <main className="flex flex-col">
      <Banner />
      <section>
        <h2 className="m-2 text-2xl font-bold mb-3">Browse Event Categories</h2>
        <OverflowScroll />
      </section>
    </main>
  );
}
