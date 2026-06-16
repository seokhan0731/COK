/* src/page/create_profile_page/_component/BirthYearStep.tsx */

import clsx from 'clsx';
import { LucideCake } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { type CreateProfileFormDataType } from '../../../type';
import { useFormState } from 'react-hook-form';

const BirthYearStep = () => {
  // Hook
  const { register } = useFormContext<CreateProfileFormDataType>();
  const { errors } = useFormState<CreateProfileFormDataType>({ name: 'birthYear' });
  return (
    <>
      <p className={clsx('mb-6', 'text-h4 font-bold')}>사용자님의 출생연도를 알려주세요</p>

      <div className={clsx('relative px-4 py-2', 'border border-border rounded-2xl')}>
        <LucideCake className="absolute left-2 text-font-gray" />
        <input
          type="number"
          className={clsx(
            'pl-6 font-semibold w-full',
            'text-font-black',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          )}
          min={1900}
          max={new Date().getFullYear()}
          placeholder="EX) 2000"
          {...register('birthYear', {
            required: '출생연도는 필수입니다.',
            min: { value: 1900, message: '1900년 이후로 입력해주세요.' },
            max: { value: new Date().getFullYear(), message: '올해보다 클 수 없습니다.' },
            valueAsNumber: true,
          })}
        />
      </div>

      <span
        className={clsx(errors.birthYear ? 'visible' : 'invisible', 'block text-sm text-red-500')}
      >
        {errors.birthYear?.message ?? '\u00A0'}
      </span>
    </>
  );
};

export default BirthYearStep;
