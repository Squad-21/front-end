import styled from 'styled-components'
import logo from '../../images/logo.png'

const Logo = () => {
    return ( 
        <Container>
            <Image src={logo} alt="logo" />
        </Container>
     );
}
 
export default Logo;

const Container = styled.div`

`
const Image = styled.img`
    width: 15rem;
`