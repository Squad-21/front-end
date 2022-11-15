import { useState } from "react";
import styled, { css } from "styled-components";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Style } from "../../constants/style";
import useAuthStore from "../../context/authStore";
import { IconButton } from "@mui/material";
import { likeLessonAction, unlikeLessonAction } from "../../service/api";

const Feedback = ({lesson}) => {
    const [feedbacks, setFeedbacks] = useState({
        likes: lesson?.likes ? lesson.likes : [],
        unlikes: lesson?.unlikes ? lesson.unlikes : []
    });
    const [isLoading, setIsLoading] = useState(false)
    const { token, user } = useAuthStore((state) => ({ token: state.token, user: state.user }));
    const userHasLiked = feedbacks.likes?.find(like => like.id == user._id);
    const userHasUnliked = feedbacks.unlikes?.find(unlike => unlike.id == user._id);

    const handleLike = async() => {
        setIsLoading(true);
        const data = await likeLessonAction(lesson._id, token);

        if(data.error) {
            alert(data.error)
            return
        }

        setFeedbacks(oldValue => {
            return {
                likes: data.likes,
                unlikes: oldValue.unlikes.filter(unlike => unlike.id != user._id)
            }
        })
        setIsLoading(false);
    }

    const handleUnlike = async() => {
        setIsLoading(true);
        const data = await unlikeLessonAction(lesson._id, token);

        if(data.error) {
            alert(data.error)
            return
        }

        setFeedbacks(oldValue => {
            return {
                likes: oldValue.likes.filter(likes => likes.id != user._id),
                unlikes: data.unlikes
            }
        })
        setIsLoading(false);
    }

    return ( 
        <Container>
            <IconButton
                disabled={!lesson||isLoading}
                onClick={handleLike}
            >
                <ThumbUpIcon 
                    sx={{
                        fill: userHasLiked? Style.colors["violet-550"] : Style.colors["light-gray"],
                        opacity: isLoading? 0.5 : 1
                    }} 
                />
            </IconButton>
            <IconButton
                disabled={!lesson||isLoading}
                onClick={handleUnlike}
            >
                <ThumbDownIcon 
                    sx={{
                        fill: userHasUnliked? Style.colors["violet-550"] : Style.colors["light-gray"],
                        opacity: isLoading? 0.5 : 1
                    }} 
                />
            </IconButton>
        </Container>
    );
}
 
export default Feedback;

const Container = styled.div`
    display: flex;
    column-gap: 2rem;
    justify-content: flex-end;
    flex-direction: row;
    margin-top: 1rem;
`
// const FeedbackButton = styled.IconButton((props) => css`
//     background-color: ${Style.colors['violet-550']};
//     width: 5rem;
//     height: 2.5rem;
//     border-radius: 4px;

//     & svg {
//         fill: ${props.clicked? Style.colors["violet-550"] : Style.colors["light-gray"]};
//     }
// `)
