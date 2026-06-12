import type { TechSkill } from '../type/surveyType';

/**
 * 백엔드 TechSkill enum 이름("SPRING_BOOT" 등)을 화면 표시용 라벨로 변환한다.
 * 제출 시에는 변환 전 enum 이름(원본 값)을 그대로 사용해야 한다.
 *
 * 특수 표기가 필요한 값만 오버라이드로 두고, 나머지는 "_" 기준 단어별 첫 글자 대문자로 처리한다.
 */
const OVERRIDES: Record<string, string> = {
  SPRING_BOOT: 'Spring Boot',
  FASTAPI: 'FastAPI',
  NESTJS: 'NestJS',
  JPA: 'JPA',
  TYPEORM: 'TypeORM',
  NEXT: 'Next.js',
  STYLED_COMPONENTS: 'styled-components',
  TAILWINDCSS: 'Tailwind CSS',
  PYTORCH: 'PyTorch',
  TENSORFLOW: 'TensorFlow',
  SCIKIT_LEARN: 'scikit-learn',
  AWS_SDK: 'AWS SDK',
  SQLALCHEMY: 'SQLAlchemy',
  CMAKE: 'CMake',
  FREERTOS: 'FreeRTOS',
  THREE_JS: 'Three.js',
  WEBGL: 'WebGL',
  OPENGL: 'OpenGL',
  ETHERS_JS: 'ethers.js',
  WEB3_JS: 'web3.js',
  FFMPEG: 'FFmpeg',
  WEBRTC: 'WebRTC',
  GSTREAMER: 'GStreamer',
  OPENCV: 'OpenCV',
};

export const techSkillLabel = (skill: TechSkill): string => {
  if (OVERRIDES[skill]) return OVERRIDES[skill];
  return skill
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
