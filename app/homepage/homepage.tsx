import { BsGenderTrans } from "react-icons/bs";

export default function Homepage() {
  return (
    <main className="flex flex-col">
      <section className="w-full bg-gradient-to-br  from-green-300 via-blue-400 to-purple-500">
        <div className="bg-white/[0.7] dark:bg-black/[0.7] py-10 text-center font-extrabold">
          <div className="mb-4 text-9xl bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 text-transparent bg-clip-text brightness-75 dark:brightness-100">
            QCS
          </div>
          <h1 className="text-4xl">Queer Calendar Sheffield</h1>
        </div>
      </section>
      <section className="flex flex-row flex-wrap gap-4 m-auto my-6 max-w-3xl">
        <Panel
          icon={<BsGenderTrans />}
          title={"Trans Events"}
          gradient={{ from: "5BCEFA", via: "F5A9B8", to: "FFFFFF" }}
        />
      </section>
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
