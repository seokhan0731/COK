// src/page/KakaoOauthLoadingPage.tsx

/* React */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

/* Library */

/* Api */
import * as AuthApi from '../api/authApi';

/* Component */
import KakaoLogo from '../component/logo/KakaoLogo';
import LoadingDots from '../component/loading/DotLoading';
import { useAuthStore } from '../store/authStore';

const KakaoOauthLoadingPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      alert('소셜 로그인 중 에러 발생했습니다. 홈으로 이동합니다.');
      navigate('/', { replace: true });
      return;
    }

    const exchangeToken = async () => {
      try {
        const { accessToken, role } = await AuthApi.KakaoAuthApi({ code });
        setAuth(accessToken, role);
        console.log(`accessToken: ${accessToken}\nrole: ${role}`);

        /* 기존 사용자의 경우 로그인 */
        if (role === 'USER') {
          navigate('/my/profile', { replace: true });
          return;
        }

        /* 로그인을 처음 하거나 로그인을 했지만 프로필 생성을 안한 경우 프로필 생성 페이지 이동*/
        navigate('/', { replace: true });
      } catch (error) {
        console.error('카카오 로그인 실패: ', error);
        navigate('/', { replace: true });
      }
    };

    const timer = setTimeout(() => exchangeToken(), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="relative flex flex-col">
        <div className="flex flex-col justify-center-safe items-center-safe min-h-[calc(100dvh-75px)]">
          <p className="text-h1 text-primary-blue font-bold">COK</p>
          <LoadingDots className="my-10" />
          <p className="text-h5 font-bold mb-2">로그인 중입니다.</p>
          <p className="text-default text-font-gray mb-8">잠시만 기다려 주세요</p>

          <div className="flex items-center-safe px-2.5 py-1 gap-2 bg-primary-blue/5 border border-border rounded-full">
            <div className="flex justify-center-safe items-center-safe p-1.5 bg-[#FEE500] border border-border rounded-full">
              <KakaoLogo className="w-4 h-4" />
            </div>
            <span className="text-default text-font-gray">카카오 계정으로 인증 중</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default KakaoOauthLoadingPage;
