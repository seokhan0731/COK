/* src/component/header/_component/ProfileIcon.tsx */

/* Icon */
import { LucideUser2 } from 'lucide-react';
import { cn } from '../../../util/cn';

type ProfileIconProps = {
  className: string;
  imageUrl?: string;
  onClick?: () => void;
};

const ProfileIcon = ({ imageUrl, onClick, className }: ProfileIconProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center justify-center overflow-hidden bg-card-background border border-border rounded-full',
      className,
    )}
  >
    {imageUrl ? (
      <img src={imageUrl} alt="프로필" className="size-full object-cover" />
    ) : (
      <LucideUser2 size={20} className="text-font-gray" />
    )}
  </button>
);

export default ProfileIcon;
