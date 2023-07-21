import { Contributor } from './contributor';
import contributorsData from './contributors.json';

const Contributors: React.FC = () => {
    return (
        <div className="lg:gap-xl-12 grid gap-x-6 md:grid-cols-3 xl:grid-cols-4">
            {contributorsData.map((contributor: Contributor, index: number) => (
                <div key={index} className="mb-12">
                    {/* <img
                        src={contributor.avatarUrl}
                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20"
                        alt={contributor.name}
                        style={{ maxWidth: '100px' }}
                        /> */}

                    <p className="mb-2 font-bold">{contributor.name}</p>
                    <p className="text-neutral-500 dark:text-neutral-300">{contributor.role}</p>
                </div>
            ))}
        </div>
    );
};

export default Contributors;
