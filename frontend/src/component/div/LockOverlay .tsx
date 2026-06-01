const LockOverlay = ({ onClickSurvey }: { onClickSurvey: () => void }) => {
    return (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 rounded-2xl flex flex-col items-center justify-center gap-4 z-10">
            <p className="text-white font-semibold text-lg text-center">    
            설문 조사 후 이용할 수 있습니다
            </p>
            <button
            onClick={onClickSurvey}
            className="bg-primary-blue text-white px-6 py-2 rounded-full font-semibold">
            설문 하러가기
            </button>
        </div>
    )
}

export default LockOverlay;