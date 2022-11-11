import styled from 'styled-components'
import logo from '../../images/laranja_logo.png'

const Logo = () => {
    return ( 
        <Container>
            <img src={logo} alt="logo" />
        </Container>
     );
}
 
export default Logo;

const Container = styled.div`

`