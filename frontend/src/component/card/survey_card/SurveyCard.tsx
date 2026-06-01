
import { OPTION_ICONS } from "./SurveyIcon"

import { motion } from "framer-motion"
import clsx from "clsx"

type Props = {
  option: {
    option_id: number
    content: string
    score: number
  }
  isSelected: boolean
  onClick: () => void
}

const SurveyCard = ({ option, isSelected, onClick }: Props) => {
    const Icon = OPTION_ICONS[option.option_id]
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={clsx(
            'flex items-center  gap-4 w-full px-3 py-8 rounded-2xl border-2 transition-colors duration-300 bg-background dark:bg-neutral-700/60 lg:min-h-32',

            isSelected ? 'border-primary-blue' : 'border-border',
            )}
        >
            <div
            className={clsx(
                'flex items-center justify-center rounded-xl text-xl p-3',
                isSelected ? 'bg-linear-to-br from-blue-400 to-primary-blue text-white' : 'bg-zinc-400/40',
            )}
            >
                <Icon />
            </div>
            <span
                className={clsx(
                    'text-base font-medium text-left',
                    isSelected ? 'text-primary-blue dark:text-' : 'text-font-black',
                )}
                >
                {option.content}
            </span>
    </motion.button>
    )

}

export default SurveyCard;
