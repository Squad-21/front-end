import styled, { css } from "styled-components";
import { useState } from "react";
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Style } from "../../constants/style";

const InputFile = ({
    registerForm,
    error
}) => {
    const [value, setValue] = useState('')
    const { onChange, onBlur, name, ref } = registerForm;

    return ( 
        <Container>
            <Label>
                <InputContainer>
                    <Input
                        name={name}
                        type="file"
                        onChange={(e) => {
                            onChange(e);
                            setValue(e.target.value.split('\\')[2]);
                        }}
                        onBlur={onBlur}
                        ref={ref}
                        accept="image/*"
                    />
                    <InputPath
                        type="text"
                        value={value}
                        readOnly
                        className={`bg-gray-10`}
                        error={error}
                    />
                </InputContainer>
                <ButtonUpload>
                    <CloudUploadRoundedIcon
                        sx={{fill: 'white'}}
                    />
                </ButtonUpload>
            </Label>
        </Container>
     );
}
 
export default InputFile;

const Container = styled.div`
`
const Label = styled.label`
    display: flex;
`
const Input = styled.input`
    display: none;
`
const InputPath = styled.input((props) => css`
    border-radius: 0.25rem 0 0 0.25rem;
    border: 0.3px solid ${props.error? 'red' : '#ADADAD'};
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.75rem;
    border-right: none;
    outline: none;
`)
const InputContainer = styled.div`
    width: 100%;
`
const ButtonUpload = styled.div`
    background-color: ${Style.colors["violet-550"]};
    border: 1px solid ${Style.colors["violet-550"]};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    border-radius: 0 0.25rem 0.25rem 0;
    transition: .3s;
    cursor: pointer;

    &:hover{
        background-color: white;
    }
    &:hover svg{
        fill: ${Style.colors["violet-550"]};
    }
`