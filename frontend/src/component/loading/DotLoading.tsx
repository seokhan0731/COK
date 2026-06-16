import { motion } from 'framer-motion';
import clsx from 'clsx';

const DURATION = 1.6;
const STRAGGER = 0.24;

const COLORS = ['bg-zinc-300', 'bg-primary-emerald', 'bg-primary-blue'];

const Dot = ({ delay, color }: { delay: number; color: string }) => (
  <motion.div
    className={clsx('w-2 h-2 rounded-full', color)}
    animate={{ scale: [1, 1.5, 1] }}
    transition={{
      duration: DURATION,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

const LoadingDots = ({ className }: { className?: string }) => (
  <div className={clsx(className, 'flex gap-4')}>
    {COLORS.map((color, i) => (
      <Dot key={color} delay={i * STRAGGER} color={color} />
    ))}
  </div>
);

export default LoadingDots;
