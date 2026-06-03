import clsx from "clsx";
import type { HubItem } from "../../type/infoType";


type Props = {
    item: HubItem;
    onClick: () => void;
};


const HubCard = ({ item, onClick }: Props) => {

    return (
        <button className={clsx(
            "flex flex-col gap-4 lg:gap-6",
            "w-55 lg:w-75 h-auto bg-white dark:bg-zinc-900 rounded-2xl border",
            "border-slate-200 dark:border-zinc-700 shadow-sm py-13 px-7",
            "active:dark:bg-zinc-800 active:bg-border transition-transform duration-200",
            "hover:-translate-y-1 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-950 dark:hover:shadow-sm",
        )}
        onClick={onClick}>
            <div className="flex items-center justify-center gap-2">
                <h2 className="text-blue-950 dark:text-white text-2xl text-center font-bold leading-tight">
                    {item.name}
                </h2>
            </div>

            <p className="text-slate-600 dark:text-neutral-400 text-sm font-medium leading-snug">
                {item.description}
            </p>

            {item.subItems && item.subItems.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2  justify-start items-center">
                    {item.subItems.map((sub) => (
                        <div key={sub} className="flex relative">
                            <span className="px-2 py-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-blue-950 dark:text-indigo-200 text-xs font-medium ">
                                {sub}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default HubCard;
