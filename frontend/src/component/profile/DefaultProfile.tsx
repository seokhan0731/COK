/* src/component/profile/DefaultProfile.tsx */

import { LucideUser } from 'lucide-react';
import { cn } from '../../util/cn';

type DefaultProfileProps = {
  iconSize?: number;
  blueAreaClassName?: string;
};

const DefaultProfile = ({ iconSize = 42, blueAreaClassName }: DefaultProfileProps) => {
  return (
    <div className="flex justify-center-safe items-center-safe aspect-square p-1 bg-primary-blue/10 border border-border rounded-full">
      <div
        className={cn(
          'flex justify-center-safe items-center-safe p-4 bg-card-background  rounded-full',
          blueAreaClassName,
        )}
      >
        <LucideUser size={iconSize} />
      </div>
    </div>
  );
};

export default DefaultProfile;
