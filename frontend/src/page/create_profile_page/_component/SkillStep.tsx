/* src/page/create_profile_page/_component/SkillStep.tsx */

import clsx from 'clsx';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Computer, LucideCpu, LucideMedal } from 'lucide-react';
import { useRef } from 'react';

import SingleSelect from '../../../component/select/SingleSelect';
import MultiSelect from '../../../component/select/MultiSelect';
import {
  ALGORITHM_OPTION,
  CERTIFICATE_OPTION,
  type AlgorithmType,
  type CertificateType,
  type CreateProfileFormDataType,
} from '../../../type';
import { checkGithubIDApi } from '../../../api/profileApi';
import AsyncDebounce from '../../../util/AsyncDebounce';

const SkillStep = () => {
  const { control, register } = useFormContext<CreateProfileFormDataType>();
  const { errors } = useFormState<CreateProfileFormDataType>({ name: 'githubId' });
  const checkGithubRef = useRef(AsyncDebounce(checkGithubIDApi, 500));

  return (
    <>
      <p className={clsx('mb-6', 'text-h4 font-bold')}>사용자님의 역량을 알려주세요</p>

      <div className="flex flex-col gap-4">
        {/* 알고리즘 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <LucideCpu className="text-primary-blue" /> <span>알고리즘 (BAEKJOON)</span>
          </div>
          <Controller
            control={control}
            name="algorithmLevel"
            rules={{ required: true }}
            render={({ field }) => (
              <SingleSelect<AlgorithmType>
                options={ALGORITHM_OPTION}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="티어를 선택하세요"
              />
            )}
          />
        </div>

        {/* 자격증 (선택) */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <LucideMedal className="text-primary-blue" /> <span>자격증 (선택)</span>
          </div>
          <Controller
            control={control}
            name="certifications"
            render={({ field }) => (
              <MultiSelect<CertificateType>
                options={CERTIFICATE_OPTION}
                value={field.value ?? []}
                onValueChange={field.onChange}
                placeholder="자격증을 선택하세요"
              />
            )}
          />
        </div>

        {/* GitHub ID */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Computer className="text-primary-blue" /> <span>GitHub ID</span>
          </div>
          <input
            type="text"
            className={clsx(
              'px-4 py-2',
              'bg-background border border-border rounded-md outline-none',
              'transition duration-200 focus:border-primary-blue',
            )}
            placeholder="GitHub ID를 입력해주세요"
            {...register('githubId', {
              required: 'GitHub ID는 필수입니다.',
              maxLength: { value: 39, message: '39자 이하로 입력해주세요' },
              pattern: {
                value: /^[a-zA-Z0-9-]+$/,
                message: '영문, 숫자, 하이픈만 사용할 수 있습니다.',
              },
              validate: async (value) => {
                if (!value || !/^[a-zA-Z0-9-]+$/.test(value)) return true;
                try {
                  const exists = await checkGithubRef.current({ githubID: value });
                  return exists || '존재하지 않는 GitHub ID 입니다.';
                } catch {
                  return true;
                }
              },
            })}
          />
          <span
            className={clsx(errors.githubId ? 'visible' : 'invisible', 'block text-sm text-red-500')}
          >
            {errors.githubId?.message ?? ' '}
          </span>
        </div>
      </div>
    </>
  );
};

export default SkillStep;
