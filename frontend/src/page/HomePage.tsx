// src/pages/HomePage.tsx

/* React */
import { useRef } from 'react';

/* Library */
import { motion } from 'framer-motion';

/* Icon */
import { FaAngleRight, FaCode, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';

/* Component */
import AnimatedDiv from '../component/div/AnimatedDiv';
import MacCard from '../component/card/MacCard';
import HomeRadarChart from '../component/chart/HomeRadarChart';
import CardDeck from '../component/card/CardDeck';

/* Data */
import { CompetencyDummyData } from '../dummy/HomeDummy';

/* Preview Image */
import previewImage from '../asset/preview/Preview.png';

/* Util */
import clsx from 'clsx';
import { useModal } from '../component/provider/ModalProvider';
import LoginModal from '../component/modal/LoginModal';

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { open } = useModal();

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          'h-[calc(100dvh-75px)] overflow-y-auto snap-y snap-mandatory',
          '[@media(max-height:700px)]:snap-none',
        )}
        ref={scrollRef}
      >
        {/* Mobile & PC Section */}
        <section
          className={clsx(
            'home-base-section',
            'flex flex-col justify-center-safe items-center-safe',
          )}
        >
          {/* background effect */}
          <div
            className={clsx(
              'absolute top-20 left-px w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
              'lg:w-96 lg:h-96',
            )}
          />
          <div
            className={clsx(
              'absolute bottom-20 right-px w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />
          {/* 바로 보이는 객체는 motion.div를 사용하여 처리함. */}
          <motion.div
            className="flex flex-col justify-center-safe items-center-safe"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-h1 font-bold">
              취업을 <span className={clsx('text-5xl text-primary-blue', 'lg:text-6xl')}>콕</span>
            </span>
            <span className="text-h1 font-bold">
              진로를 <span className={clsx('text-5xl text-primary-blue', 'lg:text-6xl')}>COK</span>
            </span>

            <button
              className={clsx(
                'inline-flex items-center justify-center mt-12 px-6 pt-3.5 pb-3 rounded-lg cursor-pointer bg-black',
                'hover:scale-105 transition-transform duration-300',
                'dark:bg-primary-blue',
              )}
              onClick={() => open(<LoginModal />)}
            >
              <span className="text-sm font-medium leading-none text-font-white">시작하기</span>
            </button>
          </motion.div>
        </section>

        {/* Mobile Section */}
        <section
          className={clsx(
            'home-base-section',
            'flex flex-col items-center-safe justify-center-safe w-full px-8',
            'lg:hidden',
          )}
        >
          {/* Background Effect */}
          <div className="absolute bottom-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue" />
          <div
            className={clsx(
              'absolute top-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />

          <div className="flex flex-col items-center-safe justify-between w-full gap-30">
            <AnimatedDiv className="flex flex-col w-full max-w-120" scrollRef={scrollRef}>
              <FaQuoteLeft className="self-start text-2xl text-primary-blue" />
              <div className="text-center text-4xl font-medium">
                <p className="text-h2 font-bold break-keep">AI 컨설턴트가 추천해 주는</p>
                <p className="text-h2 font-bold text-primary-blue break-keep">역량 키우기 로드맵</p>
              </div>
              <FaQuoteRight className="self-end-safe text-2xl text-primary-blue" />
            </AnimatedDiv>

            <AnimatedDiv className="w-full max-w-100" scrollRef={scrollRef}>
              <MacCard className="w-full" title="Planning Service">
                <div className="flex items-center-safe gap-2">
                  <span className="text-h3 font-semibold">2026년 08월</span>

                  <div className="w-fit px-3 py-1 border border-border rounded-full bg-primary-emerald/50">
                    <span className="text-sm font-semibold">진행중</span>
                  </div>
                </div>

                <div className="flex items-center-safe gap-3 p-2 mt-2 bg-card-background border-border rounded-xl">
                  <div className="p-2 bg-primary-blue/10 border border-border rounded-full">
                    <FaCode className="text-h4" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-h5 font-semibold">자격증 취득</span>
                    <span className="">리눅스 마스터 취득</span>
                  </div>

                  <button className="p-2 ml-auto bg-primary-blue/10 border border-border rounded-full ">
                    <FaAngleRight className="text-h4" />
                  </button>
                </div>

                <div className="flex items-center-safe gap-3 p-2 mt-1 bg-card-background border border-border rounded-xl">
                  <div className="p-2 bg-primary-blue/10 border border-border rounded-full">
                    <FaCode className="text-h4" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-h5 font-semibold">알고리즘 역량</span>
                    <span className="">백준 골드 달성</span>
                  </div>

                  <button className="p-2 ml-auto bg-primary-blue/10 border border-border rounded-full ">
                    <FaAngleRight className="text-h4" />
                  </button>
                </div>
              </MacCard>
            </AnimatedDiv>
          </div>
        </section>

        {/* Mobile Section */}
        <section
          className={clsx(
            'home-base-section',
            'flex flex-col items-center-safe justify-center-safe w-full px-8',
            'lg:hidden',
          )}
        >
          {/* background effect */}
          <div
            className={clsx(
              'absolute top-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
            )}
          />
          <div
            className={clsx(
              'absolute bottom-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
            )}
          />

          <AnimatedDiv
            className="flex flex-col items-center-safe justify-between w-full gap-30"
            scrollRef={scrollRef}
          >
            <div className="flex flex-col w-full max-w-120">
              <FaQuoteLeft className="self-start text-2xl text-primary-blue" />
              <div className="text-center text-4xl font-medium">
                <p className="text-h2 font-bold break-keep">
                  자신의 역량을 <span className="text-h2 font-bold text-primary-blue">그래프</span>
                  로 <br /> 한 번에
                </p>
              </div>
              <FaQuoteRight className="self-end-safe text-2xl text-primary-blue" />
            </div>

            <AnimatedDiv className="w-full max-w-100" scrollRef={scrollRef}>
              <MacCard className="w-full" title="Visualization Radar Chart">
                <HomeRadarChart data={CompetencyDummyData} />
              </MacCard>
            </AnimatedDiv>
          </AnimatedDiv>
        </section>

        {/* PC Section */}
        <section
          className={clsx(
            'home-base-section',
            'hidden flex-col items-center-safe justify-center-safe w-full px-8 gap-25',
            'lg:flex',
          )}
        >
          {/* Background Effect */}
          <div
            className={clsx(
              'absolute bottom-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
              'lg:w-96 lg:h-96',
            )}
          />
          <div
            className={clsx(
              'absolute top-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />

          <AnimatedDiv
            className="flex flex-row items-center-safe justify-between w-full max-w-6xl gap-30"
            scrollRef={scrollRef}
          >
            <div className="flex flex-col w-full max-w-120">
              <FaQuoteLeft className="self-start text-2xl text-primary-blue" />
              <div className="text-center text-4xl font-medium">
                <p className="text-h2 font-bold break-keep">AI 컨설턴트가 추천해 주는</p>
                <p className="text-h2 font-bold text-primary-blue break-keep">역량 키우기 로드맵</p>
              </div>
              <FaQuoteRight className="self-end-safe text-2xl text-primary-blue" />
            </div>

            <div className="w-full max-w-100">
              <MacCard className="w-full" title="Planning Service">
                <div className="flex items-center-safe gap-2">
                  <span className="text-h4 font-semibold">2026년 08월</span>

                  <div className="w-fit px-3 py-1 border border-border rounded-full bg-primary-emerald/50">
                    <span className="text-sm font-semibold">진행중</span>
                  </div>
                </div>

                <button className="flex items-center-safe gap-3 p-2 mt-1 bg-card-background border border-border rounded-xl">
                  <div className="p-2 bg-primary-blue/10 border border-border rounded-full">
                    <FaCode className="text-h5" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-lg text-left font-semibold">자격증 취득</span>
                    <span className="text-sm font-semibold">리눅스 마스터 취득</span>
                  </div>

                  <div className="p-2 ml-auto bg-primary-blue/10 border border-border rounded-full ">
                    <FaAngleRight className="text-h4" />
                  </div>
                </button>

                <button className="flex items-center-safe gap-3 p-2 mt-1 bg-card-background border border-border rounded-xl">
                  <div className="p-2 bg-primary-blue/10 border border-border rounded-full">
                    <FaCode className="text-h5" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-lg text-left font-semibold">알고리즘 역량</span>
                    <span className="text-sm text-left font-semibold">백준 골드 달성</span>
                  </div>

                  <div className="p-2 ml-auto bg-primary-blue/10 border border-border rounded-full ">
                    <FaAngleRight className="text-h4" />
                  </div>
                </button>
              </MacCard>
            </div>
          </AnimatedDiv>

          <AnimatedDiv
            className="flex flex-row items-center-safe justify-between w-full max-w-6xl gap-30"
            scrollRef={scrollRef}
          >
            <MacCard className="w-full max-w-100" title="Visualization Radar Chart">
              <HomeRadarChart data={CompetencyDummyData} />
            </MacCard>

            <div className="flex flex-col w-full max-w-120">
              <FaQuoteLeft className="self-start text-2xl text-primary-blue" />
              <div className="text-center text-4xl font-medium">
                <p className="text-h2 font-bold break-keep">
                  자신의 역량을 <span className="text-h2 font-bold text-primary-blue">그래프</span>
                  로 <br /> 한 번에
                </p>
              </div>
              <FaQuoteRight className="self-end-safe text-2xl text-primary-blue" />
            </div>
          </AnimatedDiv>
        </section>

        {/* Mobile & PC Section */}
        <section
          className={clsx(
            'home-base-section',
            'flex flex-col items-center-safe justify-center-safe w-full px-8',
          )}
        >
          {/* background effect */}
          <div
            className={clsx(
              'absolute top-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
              'lg:w-96 lg:h-96',
            )}
          />
          <div
            className={clsx(
              'absolute bottom-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />

          <div className="flex flex-col items-center-safe justify-between w-full gap-30">
            <AnimatedDiv className="flex flex-col w-full max-w-120" scrollRef={scrollRef}>
              <FaQuoteLeft className="self-start text-2xl text-primary-blue" />
              <div className="text-center text-4xl font-medium">
                <p className="text-h2 font-bold break-keep">모든 정보를 한 곳에서 편하게</p>
              </div>
              <FaQuoteRight className="self-end-safe text-2xl text-primary-blue" />
            </AnimatedDiv>

            <AnimatedDiv className="w-full max-w-2xl" scrollRef={scrollRef}>
              <MacCard className="w-full" title="DashBoard Service">
                <img src={previewImage} alt="" />
              </MacCard>
            </AnimatedDiv>
          </div>
        </section>

        {/* Mobile & PC Section */}
        <section
          className={clsx(
            'home-base-section',
            'flex flex-col items-center-safe justify-center-safe w-full px-8',
          )}
        >
          {/* background effect */}
          <div
            className={clsx(
              'absolute bottom-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
              'lg:w-96 lg:h-96',
            )}
          />
          <div
            className={clsx(
              'absolute top-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />

          <div className="flex flex-col items-center-safe w-full gap-12">
            <AnimatedDiv className="flex flex-col w-full max-w-120" scrollRef={scrollRef}>
              <FaQuoteLeft className="self-start text-2xl text-primary-blue" />
              <div className="text-center text-4xl font-medium">
                <p className="text-h2 font-bold break-keep">팀원 소개 및 역할</p>
              </div>
              <FaQuoteRight className="self-end-safe text-2xl text-primary-blue" />
            </AnimatedDiv>

            <AnimatedDiv className="flex justify-center" scrollRef={scrollRef}>
              <CardDeck />
            </AnimatedDiv>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
