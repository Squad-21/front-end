import styled from 'styled-components'
import { Links } from '../../constants/links';
import logo from '../../images/logo_branca.png';

const Logo = () => {
    return ( 
        <Container>
            <a href={Links.path.home}>
                <LogoImage src={logo} alt="logo" />
            </a>
        </Container>
     );
}
 
export default Logo;

const Container = styled.div`
    margin-left: 1rem;
`
const LogoImage = styled.img`
    height: 4rem;
`