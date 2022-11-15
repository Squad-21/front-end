import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const SearchBar = () => {
    return ( 
        <Container>
            <Input
            />
            <IconButton size='small'>
                <SearchIcon />
            </IconButton>
        </Container>
    );
}
 
export default SearchBar;

const Container = styled.div`
    background-color: #FFFCFC;
    height: 40px;
    width: 20rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0.25rem;
    padding-right: .5rem;
    padding-left: .5rem;
`
const Input = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    margin-right: .25rem;
`