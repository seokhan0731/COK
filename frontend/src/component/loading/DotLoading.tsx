import clsx from 'clsx'
import { motion } from 'framer-motion'

type Props = {
  className?: string
}

const Dot = ({ delay }: { delay: number }) => (
  <motion.span
    className="w-2.5 h-2.5 rounded-full bg-primary-blue"
    animate={{
      scale: [1, 1.5, 1],
      background: ['#d4d4d4', 'var(--color-primary-blue)', '#d4d4d4'],
    }}
    transition={{
      duration: 1.8,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
)

const LoadingDots = ({ className }: Props) => (
  <div className={clsx(className, 'flex gap-2.5')}>
    <Dot delay={0} />
    <Dot delay={0.6} />
    <Dot delay={1.2} />
  </div>
)

export default LoadingDots
