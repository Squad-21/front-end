import styled, { css } from "styled-components";

const VideoContent = ({url}) => {
    return ( 
        <Container>
            <Iframe src={`https://www.youtube.com/embed/${url.split('v=')[1]}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
        </Container>
     );
}
 
export default VideoContent;

const Container = styled.div``
const Iframe = styled.iframe`
    width: 100%;
    height: 30rem;
`