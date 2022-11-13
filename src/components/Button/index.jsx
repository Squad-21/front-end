import styled, { css } from "styled-components";
import { Style } from '../../constants/style'

const Button = ({ 
  title, 
  onClick, 
  disabled,
  type
}) => {
  return (
    <ButtonElement 
      className={type=='cancel'? "" : "bg-orange-650"} 
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {title}
    </ButtonElement>
  );
};

export default Button;

const ButtonElement = styled.button((props) => css`
  color: ${props.type == 'cancel' ? Style.colors["gray-550"] : 'white'};
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  border-radius: 0.25rem;
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  opacity: ${props.disabled? 0.4 : 1};
  border: 1px solid ${props.type == 'cancel' ? Style.colors["gray-550"] : Style.colors['orange-650']};
  transition: 0.3s;

  &:hover {
    background-color: ${props.type == 'cancel' ? Style.colors["gray-550"] : 'white'};
    color: ${props.type == 'cancel' ? 'white' : Style.colors['orange-650']};
  }
`)
