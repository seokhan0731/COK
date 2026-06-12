import { motion } from "framer-motion"
import clsx from "clsx"

import type { Repo } from "../../../type/surveyType"

type Props = {
  repo: Repo
  isSelected: boolean
  onClick: () => void
}

const RepoCard = ({ repo, isSelected, onClick }: Props) => {
    return (
        <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={clsx(
                'flex flex-col items-start gap-1 w-full px-4 py-4 rounded-2xl border-2 transition-colors duration-300',
                'bg-background dark:bg-neutral-700/60 text-left',
                isSelected ? 'border-primary-blue' : 'border-border',
            )}
        >
            <span
                className={clsx(
                    'text-base font-semibold',
                    isSelected ? 'text-primary-blue' : 'text-font-black',
                )}
            >
                {repo.name}
            </span>

            {repo.description && (
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {repo.description}
                </span>
            )}
        </motion.button>
    )
}

export default RepoCard;
