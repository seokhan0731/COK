/* src/page/create_profile_page/_component/AttendStatusAndGradeStep.tsx */

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import {
  ATTEND_STATUS_OPTION,
  GRADE_OPTION,
  type AttendStatusType,
  type CreateProfileFormDataType,
  type GradeType,
} from '../../../type';
import { Controller, useWatch } from 'react-hook-form';
import SingleSelect from '../../../component/select/SingleSelect';
import ButtonSelect from '../../../component/select/ButtonSelect';
import { LucideBookOpen, LucideLayers } from 'lucide-react';

const AttendStatusAndGradeStep = () => {
  const { control, setValue } = useFormContext<CreateProfileFormDataType>();
  const attendStatus = useWatch<CreateProfileFormDataType>({ control, name: 'attendStatus' });
  const isGraduation = attendStatus === 'GRADUATION';

  return (
    <>
      <p className={clsx('mb-6', 'text-h4 font-bold')}>사용자님의 재학 정보를 알려주세요</p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <LucideLayers className="text-primary-blue" /> <span>재학 여부</span>
          </div>
          <Controller
            control={control}
            name="attendStatus"
            rules={{ required: true }}
            render={({ field }) => (
              <ButtonSelect<AttendStatusType>
                options={ATTEND_STATUS_OPTION}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);

                  if (value === 'GRADUATION')
                    setValue('currentGrade', 'OTHER', { shouldDirty: true });
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <LucideBookOpen className="text-primary-blue" /> <span>학년</span>
          </div>
          <Controller
            control={control}
            name="currentGrade"
            rules={{ required: true }}
            render={({ field }) => (
              <SingleSelect<GradeType>
                options={GRADE_OPTION}
                value={field.value}
                onValueChange={field.onChange}
                disabled={isGraduation}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default AttendStatusAndGradeStep;
