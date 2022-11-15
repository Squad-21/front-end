import styled from "styled-components";
import loading from '../../images/loading.gif';

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
    background-image: url(${loading});
    background-position: center;
    z-index: 9999;
`
const Image = styled.img``