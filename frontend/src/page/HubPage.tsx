import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import HomeHeader from '../component/header/Header';
import HubCard from '../component/hub/hubCard';

import type { HubItem, ItemType } from '../type/HubType';
import { useLocation, useNavigate } from 'react-router';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { AnimatePresence } from 'framer-motion';
import DetailModal from '../component/hub/itemDetailModal';
import { getHubApi } from '../api/hubApi';
import { useIsLoggedIn } from '../store/authStore';

const sectionBase = clsx(
  'relative snap-start h-[calc(100dvh-75px)]',
  '[@media(max-height:700px)]:h-auto [@media(max-height:700px)]:min-h-[calc(100dvh-75px)]',
);

const TAB_TO_TYPE: Record<string, ItemType | undefined> = {
  전체: undefined,
  직무: 'job',
  자격증: 'certification',
};
const tabs = Object.keys(TAB_TO_TYPE);

const getInitialTab = (search: string) => {
  const params = new URLSearchParams(search);
  const type = params.get('type');
  if (type === 'job') return '직무';
  if (type === 'certification') return '자격증';
  return '전체';
};

const HubPage = () => {
  const isLoggedIn = useIsLoggedIn();

  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(() => getInitialTab(location.search));
  const [isAsc, setIsAsc] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HubItem | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTab(getInitialTab(location.search));
  }, [location.search]);

  const type = TAB_TO_TYPE[tab];

  const { data, isLoading } = useQuery({
    queryKey: ['hub', type],
    queryFn: ({ signal }) => getHubApi(type, signal),
    enabled: isLoggedIn,
  });

  const items = data?.items ?? [];

  const sortedItems = [...items].sort((a, b) =>
    isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );

  const filteredItems = sortedItems.filter((item) =>
    item.name.toUpperCase().includes(search.toUpperCase()),
  );

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col">
        <div
          className={clsx(
            'absolute bottom-10 left-px -z-10 w-48 h-48 rounded-full opacity-10 blur-3xl bg-primary-blue',
            'lg:w-96 lg:h-96',
          )}
        />
        <div
          className={clsx(
            'absolute top-5 right-px w-48 h-48  -z-10 lg:w-100 lg:h-100 rounded-full opacity-15 blur-3xl bg-primary-emerald',
            'lg:w-96 lg:h-96',
          )}
        />

        <div className="flex items-center justify-center h-[80dvh]">
          <p className="text-lg font-bold text-slate-500">로그인 후 이용해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className={clsx(sectionBase, 'flex flex-col')}>
        <section className="px-6 lg:px-15">
          {/* background effect */}
          <div
            className={clsx(
              'absolute bottom-10 left-px -z-10 w-48 h-48 rounded-full opacity-10 blur-3xl bg-primary-blue',
              'lg:w-96 lg:h-96',
            )}
          />
          <div
            className={clsx(
              'absolute top-5 right-px w-48 h-48  -z-10 lg:w-100 lg:h-100 rounded-full opacity-15 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />

          <FaMagnifyingGlass className="absolute rotate-90 top lg:-top-10 right-4 lg:right-50 -z-10 w-60 h-60 lg:w-90 lg:h-90  text-sky-700/10" />

          {/* 제목 */}
          <div className="p-8 px-0 lg:p-16 lg:px-25">
            <h1 className="text-blue-950 text-3xl  lg:text-5xl font-semibold mb-0 lg:mb-5 dark:text-primary-blue">
              COK 허브
            </h1>
            <p className="text-slate-600 hidden text-base lg:flex lg:text-2xl font-medium dark:text-neutral-400">
              역량을 키우기 위한 요소들을 한눈에 찾아보세요
            </p>
          </div>

          <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:mt-3">
            {/* 카테고리 선택 버튼 */}
            <div className="flex gap-7 lg:px-26 lg:-mt-8">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    const type = TAB_TO_TYPE[t];
                    navigate(type ? `?type=${type}` : location.pathname);
                  }}
                  className={`px-4.5 py-1.5 lg:px-5.5 lg:py-2 rounded-full cursor-pointer font-normal transition-all duration-200 text-sm lg:text-base whitespace-nowrap 
                                    ${
                                      tab === t
                                        ? 'bg-sky-700 text-font-white font-semibold'
                                        : 'bg-indigo-100 text-blue-950'
                                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* 검색바 */}
            <div className="flex items-center gap-3 -mt-2 lg:-mt-10">
              <div className="flex items-center gap-2 bg-background dark:bg-neutral-900 w-full rounded-full px-5 py-2 lg:w-90 lg:px-6 shadow-sm flex-1 border border-border">
                <FaMagnifyingGlass className="text-gray-400 text-base" />
                <input
                  type="text"
                  placeholder="직무 혹은 자격증 찾아보기"
                  className="outline-none text-gray-700 text-sm lg:text-base w-full bg-transparent dark:text-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="bg-sky-700 text-white text-sm lg:text-base px-3 py-2 lg:px-5 lg:py-3 rounded-full whitespace-nowrap "
                onClick={() => setIsAsc(!isAsc)}
              >
                {isAsc ? '오름차순' : '내림차순'}
              </button>
            </div>
          </section>
        </section>

        {/* 카드 목록 */}
        <section className="flexjustify-center items-center relative">
          <div
            className={clsx(
              'absolute bottom-10 right-px w-48 h-48  -z-10 lg:w-100 lg:h-100 rounded-full opacity-15 blur-3xl bg-primary-emerald',
              'lg:w-96 lg:h-96',
            )}
          />
          <div
            className={clsx(
              'absolute bottom-100 right-200 w-48 h-48  -z-10 lg:w-100 lg:h-100 rounded-full opacity-15 blur-3xl bg-primary-blue',
              'lg:w-96 lg:h-96',
            )}
          />

          <div className="flex  justify-center py-20  items-center flex-1 px-2.5 lg:px-40 lg:ml-15">
            <div className="flex flex-wrap gap-x-8 gap-y-15 lg:gap-15 justify-center lg:justify-start items-start flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <RoadingIcon />
                </div>
              ) : (
                filteredItems.map((item) => (
                  <HubCard
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedItem && (
            <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default HubPage;

const RoadingIcon = () => {
  return (
    <div className="w-8 h-8 rounded-full border-4 border-sky-700/30 border-t-sky-700 animate-spin mt-25" />
  );
};
