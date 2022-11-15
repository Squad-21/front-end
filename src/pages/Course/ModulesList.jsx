import styled, { css } from "styled-components";
import { 
    Accordion, 
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useNavigate } from "react-router-dom";
import { Links } from '../../constants/links'
import { Style } from "../../constants/style";
import './style.css';

const ListElement = ({lessons}) => {
    const navigate = useNavigate();
    const goToLesson = (lesson) => {
        navigate(`${Links.courses.root}/${lesson.course}/${Links.courses.lesson}/${lesson._id}`)
    }

    return (
        <List
            sx={{
                border: `1px solid ${Style.colors["light-gray"]}`,
                borderRadius: '4px',
                padding: 0,
                backgroundColor: Style.colors["gray-10"],
                color: Style.colors["gray-550"],
                marginTop: '0.5rem'
            }}
        >
            {lessons.map((lesson, index) => 
                <ListItem 
                    key={lesson._id} 
                    disablePadding
                    divider={index + 1 != lessons.length}
                    onClick={() => goToLesson(lesson)}
                >
                    <ListItemButton>
                        <ListItemIcon>
                        {lesson.type == 'Artigo' && <ArticleIcon />}
                        {(lesson.type == 'Video' || lesson.type == 'Vídeo') && <PlayCircleIcon />}
                        {lesson.type == 'Podcast' && <VolumeUpIcon />}
                    </ListItemIcon>
                        <ListItemText primary={lesson.title} />
                    </ListItemButton>
                </ListItem>
            )}
        </List>
    )
}

const AccordionElement = ({module, lessons}) => {
    return (
        <Accordion 
            sx={{
                minWidth: '100%',
                marginBottom: '1rem',
                '.MuiPaper-elevation:before': {
                    display: 'none'
                }
            }} 
            elevation={0}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    border: `1px solid ${Style.colors["light-gray"]}`,
                    borderRadius: '4px',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        color: Style.colors["gray-550"]
                    }}
                >
                    {module.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{padding: 0}}>
                <ListElement lessons={lessons} />
            </AccordionDetails>
        </Accordion>
    )
}

const ModulesList = ({courseData}) => {
    return ( 
        <Container>
            {courseData?.course.modules.map(module => 
                <AccordionElement 
                    key={module._id} 
                    module={module}
                    lessons={courseData.lessons.filter(lesson => lesson.module == module.code)}
                />
            )}
        </Container>
    );
}
 
export default ModulesList;

const Container = styled.div``