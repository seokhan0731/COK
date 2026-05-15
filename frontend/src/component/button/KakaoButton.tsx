// frontend/src/components/buttons/KakaoButton.tsx
import KakaoLogo from '../logo/KakaoLogo'

/* Type */

/* Const */
const KAKAO_AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=${import.meta.env.VITE_KAKAO_API_KEY}` +
  `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URL)}` +
  `&response_type=code`

const KakaoButton = () => {
  return (
    <button
      className="relative flex justify-center-safe items-center-safe w-full max-w-xs px-4 pb-2 pt-2.5 bg-[#FEE500] border border-border rounded-xl"
      onClick={() => {
        window.location.href = KAKAO_AUTH_URL
      }}
    >
      <KakaoLogo className="absolute left-4 top-2 w-6 h-6 text-[#000000]" />
      <span className="text-[#000000]/85">카카오 로그인</span>
    </button>
  )
}

export default KakaoButton
