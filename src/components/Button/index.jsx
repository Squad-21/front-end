import styled, { css } from "styled-components";
import { Style } from '../../constants/style'

const Button = ({ title, onClick, disabled }) => {
  return (
    <ButtonElement 
      className="bg-orange-650" 
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </ButtonElement>
  );
};

export default Button;

const ButtonElement = styled.button((props) => css`
  color: white;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  border-radius: 0.25rem;
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  opacity: ${props.disabled? 0.4 : 1};
  border: 1px solid ${Style.colors['orange-650']};
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: ${Style.colors['orange-650']};
  }
`)
