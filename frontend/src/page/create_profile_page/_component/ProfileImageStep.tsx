/* src/page/create_profile_page/_component/ProfileImageStep.tsx */

import clsx from 'clsx';
import { LucideCamera, LucideX } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { OutlineButton } from '../../../component/button/Button';
import { type CreateProfileFormDataType } from '../../../type';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const KOREAN_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

const ProfileImageStep = () => {
  const { setValue } = useFormContext<CreateProfileFormDataType>();

  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // previewUrl이 바뀌거나 언마운트될 때 이전 URL 해제
  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  // Handler
  const applyFile = (selected?: File) => {
    if (!selected) return;

    if (!ALLOWED_IMAGE_TYPES.includes(selected.type)) {
      setError('JPG, PNG, WebP 이미지만 업로드할 수 있습니다.');
      return;
    }
    if (selected.size > MAX_IMAGE_SIZE) {
      setError('이미지는 5MB 이하만 업로드할 수 있습니다.');
      return;
    }
    if (KOREAN_REGEX.test(selected.name)) {
      setError('파일명에 한글이 포함될 수 없습니다. 영문/숫자 파일명으로 변경해주세요.');
      return;
    }

    setError('');
    setPreviewUrl(URL.createObjectURL(selected));
    setValue('imageFile', selected, { shouldDirty: true });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    applyFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setValue('imageFile', undefined, { shouldDirty: true });
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <p className={clsx('mb-2', 'text-h4 font-bold')}>프로필 사진을 등록해 주세요.</p>
      <p className={clsx('mb-6', 'text-sm text-font-gray')}>
        나를 가장 잘 보여주는 사진이면 충분해요. (선택)
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          'flex flex-col items-center-safe gap-3 p-6',
          'border-2 border-dashed rounded-2xl transition-colors duration-200',
          isDragging ? 'border-primary-blue bg-primary-blue/5' : 'border-border',
        )}
      >
        {previewUrl ? (
          <div className="relative">
            <div className="size-24 rounded-full overflow-hidden border border-border">
              <img src={previewUrl} alt="프로필 미리보기" className="size-full object-cover" />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className={clsx(
                'absolute -top-1 -right-1 p-1',
                'bg-card-background border border-border rounded-full shadow-md',
                'hover:text-primary-blue transition-colors duration-200',
              )}
              aria-label="이미지 제거"
            >
              <LucideX size={14} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center size-12 rounded-full bg-primary-blue/10">
              <LucideCamera className="text-primary-blue" />
            </div>
            <div className="flex flex-col items-center-safe gap-1">
              <span className="text-sm font-semibold">이미지를 끌어다 놓으세요</span>
              <span className="text-xs text-font-gray">JPG · PNG · 최대 5MB</span>
            </div>
          </>
        )}

        <OutlineButton
          type="button"
          onClick={() => inputRef.current?.click()}
          className="py-1.5 rounded-full text-sm"
        >
          파일 선택
        </OutlineButton>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      <span className={clsx(error ? 'visible' : 'invisible', 'block mt-2 text-sm text-red-500')}>
        {error || ' '}
      </span>
    </>
  );
};

export default ProfileImageStep;
