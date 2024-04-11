import { BsGenderTrans } from "react-icons/bs";

export default async function HomePage() {
  return (
    <main className="flex flex-row flex-wrap gap-4 m-auto my-6 max-w-3xl">
      <Panel
        icon={<BsGenderTrans />}
        title={"Trans Events"}
        gradient={{ from: "5BCEFA", via: "F5A9B8", to: "FFFFFF" }}
      />
    </main>
  );
}

interface PanelProps {
  icon?: React.ReactNode;
  title?: string;
  gradient?: {
    from: string;
    via: string;
    to: string;
  };
}

function Panel({ icon, title, gradient }: PanelProps) {
  return (
    <div
      className={`flex flex-grow flex-col items-center rounded-3xl p-10 bg-gradient-to-tr from-[#${gradient?.from}]/[0.6] via-[#${gradient?.via}]/[0.6] to-[#${gradient?.to}]/[0.6] dark:from-[#${gradient?.from}]/[0.3] dark:via-[#${gradient?.via}]/[0.3] dark:to-[#${gradient?.to}]/[0.3] bg-opacity-10`}
    >
      {icon && <div className="mb-6 text-6xl">{icon}</div>}
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
    </div>
  );
}
