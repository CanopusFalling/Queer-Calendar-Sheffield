import { Contributor } from './contributor';
import contributorsData from './contributors.json';

import { DiGithubBadge } from 'react-icons/di';
import { AiOutlineMail } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoGlobe } from 'react-icons/go';

const Contributors: React.FC = () => {
    return (
        <div className="lg:gap-xl-12 grid gap-x-6 md:grid-cols-3 xl:grid-cols-4">
            {(contributorsData as Contributor[]).map((contributor: Contributor, index: number) => (
                <div key={index} className="mb-12">
                    {contributor.avatarUrl ? (
                        <img
                            src={contributor.avatarUrl}
                            className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20"
                            alt={contributor.name}
                            style={{ maxWidth: '100px' }}
                        />
                    ) : (
                        <CgProfile className="mx-auto mb-4 w-20 h-20" />
                    )}

                    <p className="font-bold">{contributor.name}</p>
                    <p className="italic">{contributor.pronouns}</p>
                    <p className="text-neutral-500 dark:text-neutral-300">{contributor.role}</p>

                    <div className="icon-container flex justify-center items-center">
                        {contributor.email && (
                            <a className="m-2" href={`mailto:${contributor.email}`}>
                                <AiOutlineMail className="w-6 h-6" />
                            </a>
                        )}
                        {contributor.github && (
                            <a className="m-2" href={`https://github.com/${contributor.github}`}>
                                <DiGithubBadge className="w-7 h-7" />
                            </a>
                        )}
                        {contributor.website && (
                            <a className="m-2" href={contributor.website}>
                                <GoGlobe className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Contributors;
