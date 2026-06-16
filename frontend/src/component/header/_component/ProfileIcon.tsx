/* src/component/header/_component/ProfileIcon.tsx */

/* Icon */
import { LucideUser2 } from 'lucide-react';
import { cn } from '../../../util/cn';

type ProfileIconProps = {
  className: string;
  imageUrl?: string;
  iconSize?: number;
  onClick?: () => void;
};

const ProfileIcon = ({ imageUrl, onClick, className, iconSize = 20 }: ProfileIconProps) => {
  const classes = cn(
    'flex items-center justify-center overflow-hidden bg-card-background border border-border rounded-full',
    className,
  );

  const content = imageUrl ? (
    <img src={imageUrl} alt="프로필" className="size-full object-cover" />
  ) : (
    <LucideUser2 size={iconSize} className="text-font-black" />
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
};

export default ProfileIcon;
