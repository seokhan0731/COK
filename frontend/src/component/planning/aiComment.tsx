import { FaLightbulb } from "react-icons/fa6"
import type { CommentCardProps } from "../../type/planningType"

const CommentCard = ({comment}:  CommentCardProps) =>  {
    return (
        <div className="flex-1 self-start pb-10 bg-background rounded-2xl p-4 lg:p-6 shadow-sm border border-border lg:w-120">
            <div className="flex items-center gap-2 mb-6 ">
                <FaLightbulb className="text-[#4A90D9] text-lg" />
                <span className="text-slate-700 font-semibold text-sm lg:text-base dark:text-slate-300">AI 코멘트</span>
            </div>
            <p className="text-slate-600 text-sm lg:text-base leading-relaxed dark:text-neutral-300 pb-3">
                {!comment ? '" 설문에 참여하고 이용해주세요 "' : `" ${comment} "`}
            </p>
        </div>
    )
}

export default CommentCard