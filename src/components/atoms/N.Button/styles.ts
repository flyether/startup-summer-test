import styled from 'styled-components';

type StylesProps = {
  $size: string;
};

export const Button = styled.button<StylesProps>`
  width: ${(props) => (props.$size === 'large' ? '100%' : '183px')};
  height: 60px;
  background-color: var(--primary-color);
  color: var(--color-white);
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
