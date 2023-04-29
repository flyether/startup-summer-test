import * as S from './styles';

export type ButtonProps = {
  title: string;
  size: string;
  onClick: () => void;
};

const Button = ({ title, size, onClick }: ButtonProps) => {
  return (
    <S.Button $size={size} onClick={onClick}>
      {title}
    </S.Button>
  );
};

export default Button;
