import styled from "styled-components";

const Button = ({ title, onClick }) => {
  return (
    <ButtonElement className="bg-orange-650" onClick={onClick}>
      {title}
    </ButtonElement>
  );
};

export default Button;

const ButtonElement = styled.button`
  color: white;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  border-radius: 0.25rem;
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;
