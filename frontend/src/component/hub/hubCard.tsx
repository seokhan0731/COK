import clsx from "clsx";
import type { HubItem } from "../../type/HubType";

type Props = {
    item: HubItem;
    onClick: () => void;
};


const HubCard = ({ item, onClick }: Props) => {

    return (
        
        <button className={clsx(
            "group  flex flex-col gap-5 lg:gap-6 relative  ",
            "w-75 lg:w-70 h-54 bg-white dark:bg-zinc-900 rounded-2xl border",
            "border-slate-200 dark:border-zinc-700 shadow-sm py-6 lg:py-6 lg:px-7",
            "active:dark:bg-zinc-800 active:bg-border transition-transform duration-200",
            "hover:-translate-y-1 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-950 dark:hover:shadow-sm",
        )}
            onClick={onClick}>
            <div className="flex items-center justify-center gap-2">
                <h2 className="text-blue-950 dark:text-white text-xl text-center font-bold leading-tight  group-hover:text-gray-600">
                    {item.name}
                </h2>
            </div>

            <p className="text-slate-600 dark:text-neutral-400 px-7 lg:px-0 text-xs font-medium leading-snug group-hover:text-slate-700 line-clamp-4 lg:line-clamp-2">
                {item.description}
            </p>


            <span className="absolute text-blue-600 group-hover:text-blue-900 lg:text-sm text-xs   transition-colors bottom-5 lg:left-23 left-28">자세히 보기 →</span>
        </button>
    );
};

export default HubCard;
