import styled, { css } from 'styled-components'

const InputText = ({
    name, 
    type,
    placeholder,
    registerForm,
    error
}) => {
    return ( 
        <Input
            type={type? type : 'text'}
            name={name}
            placeholder={placeholder}
            className={`bg-gray-10`}
            { ...registerForm}
            error={error}
        />
     );
}
 
export default InputText;

const Input = styled.input((props) => css`
    border-radius: 0.25rem;
    border: 0.3px solid ${props.error? 'red' : '#ADADAD'};
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.75rem;

`)