/* src/page/mypage/ProfilePage.tsx */

import clsx from 'clsx';
import {
  LucideArrowRight,
  LucideCpu,
  LucideAward,
  LucideMedal,
  Computer,
  type LucideIcon,
  LucideCake,
} from 'lucide-react';
import {
  CERTIFICATE_META,
  ISSUER_LABEL,
  ATTEND_STATUS_META,
  type AlgorithmType,
  type CertificateType,
} from '../../type';
import { NavLink, useNavigate } from 'react-router';
import DefaultProfile from '../../component/profile/DefaultProfile';
import { type ReactNode } from 'react';
import { cn } from '../../util/cn';
import { OutlineButton, PrimaryButton } from '../../component/button/Button';
import { useProfile } from '../../hook/useProfile';
import PendingCard from './_component/PendingCard';
import { ALGORITHM_META } from '../../type/profileType';

// #region TagCard

type TagCardProps = {
  icon: LucideIcon;
  value: string;
};

const TagCard = ({ icon: Icon, value }: TagCardProps) => {
  return (
    <div className="flex justify-center-safe items-center-safe px-2 py-0.5 gap-1 bg-card-background border border-border rounded-md">
      <Icon size={16} />
      <span>{value}</span>
    </div>
  );
};

// #endregion

// #region InputSkillCard

type InputSkillBaseCardProps = {
  icon: LucideIcon;
  iconBgClassName: string;
  title: ReactNode;
  subTitle: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

const InputSkillCard = ({
  icon: Icon,
  iconBgClassName,
  title,
  subTitle,
  rightSlot,
  className,
}: InputSkillBaseCardProps) => (
  <div
    className={cn(
      'flex items-center-safe p-4 bg-card-background border border-border rounded-xl shadow-xs',
      'transition-transform duration-300 hover:-translate-y-1 hover:shadow-md',
      rightSlot && 'justify-between',
      className,
    )}
  >
    <div className="flex items-center-safe gap-4">
      <div className={cn('flex shrink-0 p-3 border border-border rounded-xl', iconBgClassName)}>
        <Icon />
      </div>
      <div className="flex flex-col min-w-0">
        {title}
        {subTitle}
      </div>
    </div>
    {rightSlot}
  </div>
);
// #endregion

// #region InputSkillLayout
type InputSkillLayoutProps = {
  title: string;
  className?: string;
  inputSkillCardDivClassName?: string;
  children: ReactNode;
};

const InputSkillLayout = ({
  title,
  className,
  inputSkillCardDivClassName,
  children,
}: InputSkillLayoutProps) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <span className="text-font-gray font-semibold">{title}</span>

    <div className={cn('flex flex-col gap-2', inputSkillCardDivClassName)}>{children}</div>
  </div>
);
// #endregion

// #region AlgorithmCard
type AlgorithmCardProps = {
  algorithmLevel: AlgorithmType;
};

const AlgorithmCard = ({ algorithmLevel }: AlgorithmCardProps) => {
  return (
    <InputSkillCard
      icon={LucideCpu}
      iconBgClassName={ALGORITHM_META[algorithmLevel].color}
      title={
        <p className="text-base font-semibold break-all">{ALGORITHM_META[algorithmLevel].label}</p>
      }
      subTitle={<p className="text-sm text-font-gray break-all">알고리즘</p>}
      rightSlot={
        <div className="px-2 py-1 bg-background border border-border rounded-xl">
          <span className="text-font-gray font-semibold">BAEKJOON</span>
        </div>
      }
    />
  );
};

// #endregion

// #region CerificateCard
type CertificateCardProps = {
  certificate: CertificateType;
};

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const { label, issuer } = CERTIFICATE_META[certificate];
  return (
    <InputSkillCard
      icon={LucideMedal}
      iconBgClassName="bg-emerald-500/20"
      title={<p className="text-base font-semibold break-all">{label}</p>}
      subTitle={<p className="text-sm text-font-gray break-all">{ISSUER_LABEL[issuer]}</p>}
      className={clsx('flex-1 basis-full lg:basis-[calc(50%-4px)]')}
    />
  );
};
// #endregion

// #region GitHubCard
type GitHubCardProps = {
  id: string;
};

const GitHubCard = ({ id }: GitHubCardProps) => {
  return (
    <InputSkillCard
      icon={Computer}
      iconBgClassName="bg-violet-500/20"
      title={<p className="text-base font-semibold break-all">{id}</p>}
      subTitle={
        <a
          className="text-sm text-font-gray break-all underline hover:text-neutral-700"
          href={`https://github.com/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >{`https://github.com/${id}`}</a>
      }
    />
  );
};
// #endregion

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile, isPending, isError } = useProfile();

  /* 상태에 따른 화면 분기 */
  if (isPending) return <PendingCard />;
  if (isError || !profile) return <div>에러 발생</div>;

  return (
    <>
      <div className="flex-1 flex flex-col">
        {/* Profile Card */}
        <div
          className={clsx(
            'isolate flex flex-col p-4 mb-10 gap-4 bg-linear-to-br from-primary-blue/10 to-primary-emerald/10 border border-border rounded-2xl overflow-hidden',
            'lg:flex-row lg:justify-between lg:items-center-safe lg:p-8',
          )}
        >
          <div className="flex flex-row gap-4">
            <DefaultProfile blueAreaClassName="lg:p-6" />

            <div className="flex flex-col justify-center-safe gap-2">
              <p className="text-h5 font-bold">{profile.name}</p>
              <div className="flex flex-row gap-1">
                <TagCard
                  icon={LucideCake}
                  value={`${new Date().getFullYear() - profile.birthYear + 1}세`}
                />
                <TagCard
                  icon={ATTEND_STATUS_META[profile.attendStatus].icon}
                  value={ATTEND_STATUS_META[profile.attendStatus].label}
                />
              </div>
            </div>
          </div>

          <div className={clsx('flex flex-row gap-2', 'lg:flex-col')}>
            <OutlineButton className="w-full" onClick={() => navigate('../edit-profile')}>
              기본 정보 수정
            </OutlineButton>
            <PrimaryButton className="w-full" disabled>
              분석 결과 보기
            </PrimaryButton>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center-safe mb-4">
            <div className="flex flex-row items-center-safe gap-2">
              <LucideAward size={24} />
              <span className="text-h4 font-semibold">내 역량 한눈에 보기</span>
            </div>

            <div className="flex flex-row items-center-safe gap-1">
              <NavLink
                to={'../edit-skill'}
                className="flex flex-row items-center-safe gap-1 text-primary-blue font-semibold"
              >
                역량 수정하기
                <LucideArrowRight className="text-primary-blue mb-0.5" />
              </NavLink>
            </div>
          </div>

          {/* Skill Card Layout */}
          <div className="flex flex-col gap-10">
            <InputSkillLayout title="알고리즘">
              <AlgorithmCard algorithmLevel={profile.algorithmLevel} />
            </InputSkillLayout>

            <InputSkillLayout
              title="자격증"
              inputSkillCardDivClassName="lg:flex-row lg:flex-wrap lg:gap-2"
            >
              {profile.certifications?.map((item) => (
                <CertificateCard key={item} certificate={item} />
              ))}
            </InputSkillLayout>

            <InputSkillLayout title="GitHub">
              <GitHubCard id={profile.githubId} />
            </InputSkillLayout>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
