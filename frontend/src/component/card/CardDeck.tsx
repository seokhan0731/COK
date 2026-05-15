// frontend/src/components/cards/CardDeck.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../util/cn'

import Member1 from '../../asset/member_image/조인흠.png'
import Member2 from '../../asset/member_image/김석환.png'
import Member3 from '../../asset/member_image/오주노.png'

type MemberDataType = {
  path: string
  name: string
  role: string[]
}

const MemberData: MemberDataType[] = [
  { path: Member1, name: '조인흠', role: ['Frontend'] },
  { path: Member2, name: '김석환', role: ['Backend', 'AI'] },
  { path: Member3, name: '오주노', role: ['Frontend'] },
]

const CARD_W = 200
const CARD_H = 280
const CARD_OFFSET = 12
const SCALE_FACTOR = 0.05

const CardDeck = () => {
  const [order, setOrder] = useState([0, 1, 2])
  const [isFlipping, setIsFlipping] = useState(false)

  const n = MemberData.length
  const containerW = CARD_W + CARD_OFFSET * (n - 1)
  const containerH = CARD_H + CARD_OFFSET * (n - 1)

  const handleClick = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]])
      setIsFlipping(false)
    }, 380)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative cursor-pointer select-none"
        style={{ width: containerW, height: containerH, perspective: '800px' }}
        onClick={handleClick}
      >
        {order.map((memberIdx, stackPos) => {
          const isTop = stackPos === 0
          const isLeaving = isTop && isFlipping

          return (
            <motion.div
              key={memberIdx}
              className="absolute rounded-2xl overflow-hidden border border-border shadow-xl bg-white"
              style={{
                width: CARD_W,
                height: CARD_H,
                top: 0,
                left: 0,
                zIndex: isLeaving ? n + 1 : n - stackPos,
                transformStyle: 'preserve-3d',
              }}
              animate={
                isLeaving
                  ? { rotateY: -90, opacity: 0, x: 0, y: 0, scale: 1 }
                  : {
                      rotateY: 0,
                      opacity: 1,
                      x: stackPos * CARD_OFFSET,
                      y: stackPos * CARD_OFFSET,
                      scale: 1 - stackPos * SCALE_FACTOR,
                    }
              }
              transition={
                isLeaving
                  ? { duration: 0.38, ease: 'easeIn' }
                  : { type: 'spring', stiffness: 260, damping: 22 }
              }
            >
              <div className="w-full overflow-hidden" style={{ height: '70%' }}>
                <img
                  src={MemberData[memberIdx].path}
                  alt={MemberData[memberIdx].name}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
              <div
                className={cn(
                  'p-3 bg-white transition-opacity duration-150',
                  isTop && !isFlipping ? 'opacity-100' : 'opacity-0',
                )}
              >
                <p className="font-bold text-base leading-tight">
                  {MemberData[memberIdx].name}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {MemberData[memberIdx].role.map((r) => (
                    <span
                      key={r}
                      className="px-2 py-0.5 rounded-full bg-primary-blue/10 border border-primary-blue/20 text-xs font-medium text-primary-blue"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 items-center">
        {MemberData.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              order[0] === i ? 'w-4 bg-primary-blue' : 'w-2 bg-border',
            )}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400">클릭하여 다음 카드 보기</p>
    </div>
  )
}

export default CardDeck
