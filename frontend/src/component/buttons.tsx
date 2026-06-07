import { GoArrowRight } from "react-icons/go";

interface ActionButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const NextButton = ({ onClick, label = "다음", disabled }: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-28 h-10 lg:w-31 lg:h-12 p-3 bg-black rounded-full 
                inline-flex justify-center items-center text-center 
                text-zinc-100 text-sm lg:text-lg font-semibold hover:bg-zinc-800
                
                dark:bg-sub-blue dark:hover:bg-primary-blue" 
    >
      {label}
    </button>
  );
};

export default NextButton;