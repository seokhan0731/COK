// frontend/src/components/divs/AnimatedDiv.tsx
import { useRef, type RefObject } from 'react'
import { motion, useInView, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & {
  scrollRef?: RefObject<HTMLDivElement | null>
}

const AnimatedDiv = ({ children, scrollRef, ...props }: Props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { root: scrollRef, once: true })

  return (
    <motion.div
      ref={ref}
      {...props}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedDiv
