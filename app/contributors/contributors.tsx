import Link from "next/link";

import { Contributor } from "./contributor";
import contributorsData from "./contributors.json";

import { DiGithubBadge } from "react-icons/di";
import { AiOutlineMail } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GoGlobe } from "react-icons/go";

const Contributors: React.FC = () => {
  return (
    <div className="lg:gap-xl-12 grid gap-x-6 md:grid-cols-3 xl:grid-cols-4">
      {(contributorsData as Contributor[]).map(
        (contributor: Contributor, index: number) => (
          <div key={index} id={`contributor-${index}`} className="mb-12">
            {contributor.avatarUrl ? (
              <img
                src={contributor.avatarUrl}
                className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20"
                alt={contributor.name}
                width="100px"
                height="100px"
              />
            ) : (
              <CgProfile className="mx-auto mb-4 w-20 h-20" />
            )}

            <p className="font-bold">{contributor.name}</p>
            <p className="italic">{contributor.pronouns}</p>
            <p className="text-neutral-500 dark:text-neutral-300">
              {contributor.role}
            </p>

            <div className="icon-container flex justify-center items-center">
              {contributor.email && (
                <Link
                  className="mail-badge m-2"
                  href={`mailto:${contributor.email}`}
                  aria-label={`Email ${contributor.name}`}
                >
                  <AiOutlineMail className="w-6 h-6" />
                </Link>
              )}
              {contributor.github && (
                <Link
                  className="github-badge m-2"
                  href={`https://github.com/${contributor.github}`}
                  aria-label={`Visit ${contributor.name}'s Github`}
                >
                  <DiGithubBadge className="w-7 h-7" />
                </Link>
              )}
              {contributor.website && (
                <Link
                  className="website-badge m-2"
                  href={contributor.website}
                  aria-label={`Visit ${contributor.name}'s Website`}
                >
                  <GoGlobe className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Contributors;
