import type { ReactNode } from 'react'
import KakaoLogo from '../component/logo/KakaoLogo'
import clsx from 'clsx'
import LoadingDots from '../component/loading/DotLoading'

/* Type */
type Props = {
  children?: ReactNode
}

const KakaoOauthLoadingPage = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col justify-center-safe items-center-safe min-h-dvh">
      <div className="absolute inset-0 opacity-5 -z-10 bg-grid" />
      <div
        className={clsx(
          'flex flex-col items-center-safe w-full max-w-xs px-6 py-12 bg-card-background rounded-2xl border border-border shadow-md',
          'lg:max-w-sm',
        )}
      >
        <span className="mb-12 text-h2 text-primary-blue font-bold">COK</span>
        <div className="p-3 bg-[#FEE500] border border-border rounded-xl">
          <KakaoLogo className="w-6 h-6" />
        </div>

        <LoadingDots className="my-8" />

        <p>카카오 계정으로 로그인 중</p>
        <p className="text-sm text-border-strong">잠시만 기다려 주세요</p>
      </div>
    </div>
  )
}

export default KakaoOauthLoadingPage
