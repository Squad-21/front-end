import styled from "styled-components";
import loading from '../../images/loading.gif';
import bg from '../../images/bgloading.png'

const LoadingPage = () => {
    return ( 
        <Container>
            {/* <Image
                src={loading}
            /> */}

        </Container>
    );
}
 
export default LoadingPage;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${loading}) center no-repeat, url(${bg});
    z-index: 9999;
    background-size: contain, auto;
`
const Image = styled.img``