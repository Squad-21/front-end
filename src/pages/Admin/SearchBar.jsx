import { isBrowser } from "react-device-detect";
import styled, { css } from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const SearchBar = ({
    value,
    onChange
}) => {
    return ( 
        <Container className={`bg-gray-10`}  >
            <Input
                name="search"     
                className={`bg-gray-10`}               placeholder="Pesquisar..."
                value={value}
                onChange={onChange}
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </Container>
    );
}
 
export default SearchBar;

const Container = styled.div((props) => css`
    border-radius: 0.25rem;
    border: 0.3px solid #ADADAD;
    width: ${isBrowser? '50%' : '100%'};
    padding: 0.2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`)
const Input = styled.input((props) => css`
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
    width: 100%;
    padding-left: .25rem;
`)