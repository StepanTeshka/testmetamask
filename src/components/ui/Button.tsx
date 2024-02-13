import { PropsWithChildren, SyntheticEvent } from "react";

const buttonClassesByVariant = {
  primary: `bg-black text-white p-2 rounded-full border border-px border-[#EEEEEE]`,
  gradient: `w-full sm:w-[320px] bg-gradient-to-r from-[#D994F9] to-[#FFD79E] h-[54px] rounded-full text-white font-medium disabled:bg-none disabled:bg-[#EEEEEE] text-white disabled:text-[#CACACA]`,
  accessible:
    "w-full bg-white text-[#04BE00] font-medium h-[54px] rounded-full",
  gradientBorder: `w-full bg-white rounded-full p-4`,
};

type TButtonProps = PropsWithChildren<{
  variant?: keyof typeof buttonClassesByVariant;
  className?: string;
  type?: `button` | `submit`;
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  disabled?: boolean;
  dataTestId?: string;
  tabIndex?: 0 | -1;
  name?: string;
}>;

const Button = ({
  variant,
  children,
  className = ``,
  type = `button`,
  onClick,
  ariaLabel,
  disabled,
  dataTestId,
  tabIndex,
  name,
}: TButtonProps) => {
  return (
    <button
      type={type}
      className={
        variant ? `${className} ${buttonClassesByVariant[variant]}` : className
      }
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      data-testid={dataTestId}
      tabIndex={tabIndex}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;

type TSubmitLoadingButtonProps = Pick<
  TButtonProps,
  `children` | `type` | `variant` | `onClick` | `className` | `disabled`
> & { isLoading?: boolean };

export const SubmitLoadingButton = ({
  isLoading,
  children,
  type = `submit`,
  variant = `primary`,
  onClick,
  className = ``,
  disabled,
}: TSubmitLoadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      type={type}
      disabled={isLoading || disabled}
      className={`flex-center ${className}`}
      dataTestId="submit-button"
    >
      {isLoading ? `` : children}
    </Button>
  );
};
