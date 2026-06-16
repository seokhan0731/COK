// src/page/KakaoOauthLoadingPage.tsx

/* React */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

/* Library */
import { useShallow } from 'zustand/react/shallow';

/* Api */
import * as AuthApi from '../api/authApi';

/* Component */
import KakaoLogo from '../component/logo/KakaoLogo';
import LoadingDots from '../component/loading/DotLoading';
import CreateProfileModal from './create_profile_page/CreateProfileModal';

/* Util & Store */
import { useAuthStore } from '../store/authStore';
import { useModal } from '../component/provider/ModalProvider';

const KakaoOauthLoadingPage = () => {
  /* Hook */
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore(
    useShallow((s) => ({ setAuth: s.setAuth, clearAuth: s.clearAuth })),
  );
  const { open } = useModal();
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

        if (role === 'USER') {
          navigate('/my/profile', { replace: true });
          return;
        }

        /* 로그인을 처음 하거나 로그인을 했지만 프로필 생성을 안한 경우 프로필 생성 페이지 이동*/
        open(<CreateProfileModal />, {
          closeConfirm:
            '프로필 생성은 서비스 이용에 필수입니다.\n지금 나가면 작성하신 내용이 모두 사라집니다. 나가시겠습니까?',
          onClose: () => {
            clearAuth();
            navigate('/');
          },
        });
        navigate('/', { replace: true });
      } catch (error: any) {
        console.error('카카오 로그인 실패: ', error.message);
        alert('로그인에 실패하였습니다.');
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
