import styled from 'styled-components'
import InputText from '../InputText';
import InputTextarea from '../InputTextarea';
import InputFile from '../InputFile';
import InputSelect from '../InputSelect';

const FormItem = ({
    title, 
    name, 
    type,
    selectOptions,
    placeholder, 
    errorMessage,
    registerForm
}) => {

    return ( 
        <Container>
            <Label 
                htmlFor={name}
            >{title}</Label>
            {type == 'textarea' &&
                <InputTextarea  
                    placeholder={placeholder}
                    registerForm={registerForm}
                    error={errorMessage}
                />
            } 
            {(!type || type == 'text' || type == 'password') && 
                <InputText 
                    placeholder={placeholder}
                    registerForm={registerForm}
                    error={errorMessage}
                    type={type}
                />
            }
            {type == 'file' && 
                <InputFile 
                    registerForm={registerForm}
                    error={errorMessage}
                />
            }
            {type == 'select' &&
                <InputSelect
                    placeholder={placeholder}
                    options={selectOptions}
                    registerForm={registerForm}
                    error={errorMessage}
                />
            }
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </Container>
     );
}
 
export default FormItem;

const Label = styled.label`
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.25rem;
    display: block;
    margin-bottom: 0.25rem;
    margin-left: 0.5rem;
`

const Container = styled.div`
    margin-top: 1.25rem
`
const ErrorMessage = styled.p`
    color: red;
`