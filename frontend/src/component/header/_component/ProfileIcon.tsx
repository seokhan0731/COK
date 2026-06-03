/* src/component/header/_component/ProfileIcon.tsx */

/* Icon */
import { LucideUser2 } from 'lucide-react';

type ProfileIconProps = {
  imageUrl?: string;
  onClick: () => void;
};

const ProfileIcon = ({ imageUrl, onClick }: ProfileIconProps) => (
  <button onClick={onClick} className="p-2 bg-card-background border border-border rounded-full">
    {imageUrl ? <img src={imageUrl} alt="프로필" /> : <LucideUser2 />}
  </button>
);

export default ProfileIcon;
