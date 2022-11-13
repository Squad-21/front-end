import styled,{ css } from "styled-components";

const InputTextarea = ({
    name,
    placeholder,
    registerForm,
    error
}) => {
    return ( 
        <Textarea
            placeholder={placeholder}
            className={`bg-gray-10`}
            { ...registerForm}
            error={error}
        />
     );
}
 
export default InputTextarea;

const Textarea = styled.textarea((props) => css`
    border-radius: 0.25rem;
    border: 0.3px solid ${props.error? 'red' : '#ADADAD'};
    width: 100%;
    min-height: 7rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.75rem;

`)