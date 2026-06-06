/* src/page/create_profile_page/_component/AttendStatusAndGradeStep.tsx */

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { type CreateProfileFormDataType } from '../../../type';
import { useFormState } from 'react-hook-form';

const AttendStatusAndGradeStep = () => {
  const { register } = useFormContext<CreateProfileFormDataType>();
  const { errors } = useFormState<CreateProfileFormDataType>({ name: 'attendStatus' });

  return (
    <>
      <p className={clsx('mb-6', 'text-h4 font-bold')}>사용자님의 이름을 알려주세요</p>

      <div className={clsx('relative px-4 py-2', 'border border-border rounded-2xl')}>
        <input
          type="text"
          className="pl-6 font-semibold w-full"
          placeholder="EX) 홍길동"
          {...register('name', {
            required: '이름은 필수입니다.',
            maxLength: { value: 20, message: '이름은 20자 이하로 입력해주세요' },
          })}
        />
      </div>
      <span className={clsx(errors.name ? 'visible' : 'invisible', 'block text-sm text-red-500')}>
        {errors.name?.message ?? '\u00A0'}
      </span>
    </>
  );
};

export default AttendStatusAndGradeStep;
