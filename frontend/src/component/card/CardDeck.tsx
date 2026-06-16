// frontend/src/components/cards/CardDeck.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../util/cn';

import { useHomeMemberInfo } from '../../hook/useHome';
import LoadingSpinner from '../loading/LoadingSpinner';

const CARD_W = 200;
const CARD_H = 280;
const CARD_OFFSET = 12;
const SCALE_FACTOR = 0.05;

const CardDeck = () => {
  const { data, isPending, isError } = useHomeMemberInfo();

  // 응답: { memberInfoData: MemberInfoType[] } → 멤버 배열 추출
  const members = data?.memberInfoData ?? [];

  const [order, setOrder] = useState<number[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const n = members.length;

  // 데이터가 도착하면 카드 순서를 [0, 1, ..., n-1]로 초기화
  useEffect(() => {
    setOrder(Array.from({ length: n }, (_, i) => i));
  }, [n]);

  const containerW = CARD_W + CARD_OFFSET * Math.max(n - 1, 0);
  const containerH = CARD_H + CARD_OFFSET * Math.max(n - 1, 0);

  const handleClick = () => {
    if (isFlipping || n === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setIsFlipping(false);
    }, 380);
  };

  // 로딩 / 에러 / 빈 데이터 — 카드 영역 크기를 유지한 채 가운데에 표시
  if (isPending || isError || n === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: CARD_W + CARD_OFFSET * 2, height: CARD_H + CARD_OFFSET * 2 }}
      >
        {isPending ? (
          <LoadingSpinner className="size-10" />
        ) : (
          <p className="text-sm text-gray-400">
            {isError ? '팀원 정보를 불러오지 못했어요.' : '표시할 팀원이 없어요.'}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div
        className="relative cursor-pointer select-none"
        style={{ width: containerW, height: containerH, perspective: '800px' }}
        onClick={handleClick}
      >
        {order.map((memberIdx, stackPos) => {
          const isTop = stackPos === 0;
          const isLeaving = isTop && isFlipping;

          return (
            <motion.div
              key={memberIdx}
              className="absolute rounded-2xl overflow-hidden border border-border shadow-xl bg-card-background"
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
                  src={members[memberIdx].imageUrl}
                  alt={members[memberIdx].name}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
              <div
                className={cn(
                  'p-3 bg-card-background transition-opacity duration-150',
                  isTop && !isFlipping ? 'opacity-100' : 'opacity-0',
                )}
              >
                <p className="font-bold text-base leading-tight">{members[memberIdx].name}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {members[memberIdx].role.map((r) => (
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
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 items-center">
        {members.map((_, i) => (
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
  );
};

export default CardDeck;
