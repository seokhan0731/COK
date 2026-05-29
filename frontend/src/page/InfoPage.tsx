import clsx from "clsx";
import { useEffect, useState } from "react";

import HomeHeader from "../component/header/HomeHeader";
import HubCard from "../component/hub/infoCard";

import type { HubItem, ItemType } from "../type/infoType";
import { useLocation, useNavigate } from "react-router";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import DetailModal from "../component/hub/itemDetailModal";
import MOCK_ITEMS from "../component/hub/hubMockData";

const sectionBase = clsx(
  'relative snap-start h-[calc(100dvh-75px)]',
  '[@media(max-height:700px)]:h-auto [@media(max-height:700px)]:min-h-[calc(100dvh-75px)]',
)

const BASE_URL = "https://e6dc9715-49ed-46a8-b462-6adcd5d9d470.mock.pstmn.io";

const TAB_TO_TYPE: Record<string, ItemType | undefined> = {
    전체: undefined,
    직무: "job",
    자격증: "certification",
};
const tabs = Object.keys(TAB_TO_TYPE);

const getInitialTab = (search: string) => {
    const params = new URLSearchParams(search);
    const type = params.get("type");
    if (type === "job") return "직무";
    if (type === "certification") return "자격증";
    return "전체";
};




const InfoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState(() => getInitialTab(location.search));
    const [isAsc, setIsAsc] = useState(false);
    const [items, setItems] = useState<HubItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<HubItem | null>(null);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTab(getInitialTab(location.search));
    }, [location.search]);
    
    
    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();

        const type = TAB_TO_TYPE[tab];


        const url = new URL(`${BASE_URL}/api/hub`);
        if (type) url.searchParams.set("type", type);

        fetch(url.toString(), { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
            console.log("postman mock 응답:", data);
            const items = data.items as HubItem[];
            const merged = items.map((item) => {
                const key = `${item.type}-${item.id}`;
                const subNames = SUB_ITEMS[key] ?? [];
                return {
                    ...item,
                    subItems: subNames.map((name) => ({ name })),
                };
            });
            setItems(merged);
            setIsLoading(false)
        })
        
        .catch((err) => {
        if (err.name === "AbortError") return;
            console.log("예비 MOCK")
            const type = TAB_TO_TYPE[tab];
            const filtered = MOCK_ITEMS.filter((item) => !type || item.type === type);
            const merged = filtered.map((item) => {
                const key = `${item.type}-${item.id}`;
                const subNames = SUB_ITEMS[key] ?? [];
                return { ...item, subItems: subNames.map((name) => ({ name })) };
            });
        setItems(merged);
        setIsLoading(false);
        })

        .finally(() => setIsLoading(false));

        return () => controller.abort();
    }, [tab]);

    const sortedItems = [... items].sort((a,b) =>
        isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    
    const filteredItems = sortedItems.filter((item) => 
        item.name.toUpperCase().includes(search.toUpperCase())
    );

    
    return (
        <div className="flex flex-col">
            <HomeHeader />

            <section 
                className={clsx(
                    sectionBase,
                    'flex flex-col',
                )}
            >
                <section className="px-13 lg:px-15">
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

                    <FaMagnifyingGlass 
                    className="absolute rotate-90 top lg:-top-10 right-4 lg:right-50 -z-10 w-60 h-60 lg:w-90 lg:h-90  text-sky-700/10"/>

                    {/* 제목 */}
                    <div className="p-8 px-2 lg:p-16 lg:px-25">
                        <h1 className="text-blue-950 text-4xl lg:text-5xl font-semibold mb-5 dark:text-primary-blue">
                            COK 허브
                        </h1>
                        <p className="text-slate-600 text-base hidden lg:flex lg:text-2xl font-medium dark:text-neutral-400">
                            역량을 키우기 위한 요소들을 한눈에 찾아보세요
                        </p>
                    </div>

                    <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mt-8">
                    {/* 카테고리 선택 버튼 */}
                        <div className="flex gap-7  lg:px-26 lg:-mt-8">
                            {tabs.map((t) => (
                                <button
                                key={t}
                                onClick={() => {
                                    const type = TAB_TO_TYPE[t];
                                    navigate(type ? `?type=${type}` : location.pathname);
                                }}
                                className={`px-5.5 py-2 rounded-full cursor-pointer font-normal transition-all duration-200 text-base
                                    ${tab === t
                                        ? "bg-sky-700 text-font-white font-bold"
                                        : "bg-indigo-100 text-blue-950"
                                }`}
                                >
                                {t}
                                </button>
                            ))}
                        </div>


                        {/* 검색바 */}
                        <div className="flex items-center gap-3 md:-mt-10">
                            <div className="flex items-center gap-3 bg-background dark:bg-neutral-900  rounded-full px-4 py-3 lg:w-90 lg:px-6 shadow-sm flex-1 border border-border">
                                <FaMagnifyingGlass className="text-gray-400 text-base" />
                                <input
                                type="text"
                                placeholder="직무 혹은 자격증 찾아보기"
                                className="outline-none text-gray-700 text-base w-full bg-transparent dark:text-gray-400"
                                value = {search}
                                onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button className="bg-sky-700 text-white text-base px-5 py-3 rounded-full whitespace-nowrap"
                                onClick={() => setIsAsc(!isAsc)}>
                                {isAsc ? "오름차순" : "내림차순"}
                            </button>
                        </div>

                    </section>
                </section>

                {/* 카드 목록 */}
                <section className="flex justify-center items-center relative">
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
                    

                    <div className="flex flex-wrap gap-15  justify-center py-20 items-start content-start flex-1 lg:ml-15">
                        {isLoading? (
                            <RoadingIcon/>
                    ) : (
                        filteredItems.map((item) => (
                            <HubCard
                                key={`${item.type}-${item.id}`} 
                                item={item}
                                onClick={()=>setSelectedItem(item)}
                            />
                        ))
                    )
                    }
                        
                    </div>
                    
                
                </section>

                <AnimatePresence>
                    {selectedItem && (
                    <DetailModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)} />
                    )}
                </AnimatePresence>


            </section>
                
        </div>

    )
}

export default InfoPage;

const SUB_ITEMS: Record<string, string[]> = {
  // Job
  "job-1": ["서버 개발자", "자바 개발자", "Node.js 개발자", "PHP 개발자", ".NET 개발자", "루비온레일즈 개발자", "소프트웨어 엔지니어", "웹 개발자", "파이썬 개발자"],
  "job-2": ["프론트엔드 개발자", "웹 퍼블리셔"],
  "job-3": ["안드로이드 개발자", "iOS 개발자", "크로스플랫폼 앱 개발자"],
  "job-4": ["머신러닝 엔지니어", "데이터 사이언티스트"],
  "job-5": ["데이터 엔지니어", "빅데이터 엔지니어", "DBA", "BI 엔지니어"],
  "job-6": ["DevOps/시스템 관리자", "시스템/네트워크 관리자"],
  "job-7": ["개발 매니저", "프로덕트 매니저", "CTO", "CIO"],
  "job-8": ["임베디드 개발자", "C/C++ 개발자", "하드웨어 엔지니어"],
  "job-9": ["그래픽스 엔지니어"],
  "job-10": ["블록체인 플랫폼 엔지니어"],
  "job-11": ["영상/음성 엔지니어"],

  // Certification
  "certification-1": ["필기 대비", "실기 대비", "기출문제 풀이", "실전 모의고사"],
  "certification-2": ["SQL 기초", "데이터 모델링", "쿼리 최적화", "실전 문제"],
  "certification-3": ["EC2 / VPC", "S3 / RDS", "아키텍처 설계", "실전 모의고사"],
  "certification-4": ["리눅스 기초", "시스템 관리", "네트워크 설정", "보안 설정"],
  "certification-5": ["TCP/IP", "라우팅", "스위칭", "네트워크 보안"],
  "certification-6": ["테스트 기초", "테스트 설계", "테스트 관리", "결함 관리"],
  "certification-7": ["네트워크 기초", "라우팅 프로토콜", "스위칭", "WAN 기술"],
  "certification-8": ["암호화", "네트워크 보안", "시스템 보안", "법규"],
};

const RoadingIcon = () => {
    return (
        <div className="w-8 h-8 rounded-full border-4 border-sky-700/30 border-t-sky-700 animate-spin mt-25" />
    )
}