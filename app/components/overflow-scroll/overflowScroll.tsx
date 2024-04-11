export interface OverflowScrollProps {
  title?: string;
}

export default function OverflowScroll({ title }: OverflowScrollProps) {
  return (
    <div className="flex flex-row overflow-x-scroll scroll-smooth m-2 gap-4 snap-x">
      <div className="p-10 bg-pink-700 rounded-xl"> hello! </div>
    </div>
  );
}
