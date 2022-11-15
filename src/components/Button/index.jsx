import styled, { css } from "styled-components";
import { Style } from '../../constants/style'

const Button = ({ 
  title, 
  onClick, 
  disabled,
  variant
}) => {
  return (
    <ButtonElement 
      className={(variant=='orange' || !variant) && "bg-orange-650"} 
      onClick={onClick}
      disabled={disabled}
      variant={variant}
    >
      {title}
    </ButtonElement>
  );
};

export default Button;

const ButtonElement = styled.button((props) => css`
  ${(!props.variant || props.variant == 'orange') && `
    color: white;
  `}
  ${props.variant == 'gray' && `
    color: ${Style.colors["gray-550"]};
  `}
  ${props.variant == 'violet' && `
    color: white;
    background-color: ${Style.colors["violet-550"]};
  `}
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 700;
  border-radius: 0.25rem;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  opacity: ${props.disabled? 0.4 : 1};
  border-width: 1px;
  border-style: solid;
  ${(!props.variant || props.variant == 'orange') && `
    border-color: ${Style.colors['orange-650']};
  `}
  ${props.variant == 'gray' && `
    border-color: ${Style.colors["gray-550"]};
  `}
  ${props.variant == 'violet' && `
    border-color: ${Style.colors["violet-550"]};
  `}
  transition: 0.3s;

  &:hover {
    ${(!props.variant || props.variant == 'orange') && `
      background-color: white;
      color: ${Style.colors['orange-650']};
    `}
    ${props.variant == 'gray' && `
      background-color: ${Style.colors["gray-550"]};
      color: white;
    `}
    ${props.variant == 'violet' && `
      background-color: white;
      color: ${Style.colors["violet-550"]};
    `}
  }
`)
