import { default as CardElement } from '@mui/material/Card';
import Button from '../../components/Button';
import { 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Links } from '../../constants/links';

const Card = ({course}) => {
    const navigate = useNavigate();

    return ( 
        <CardElement sx={{ minWidth: 296, maxWidth: 350, display: 'flex', flexDirection: 'column'}}>
            <CardMedia
                component="img"
                sx={{height: 170}}
                image={course.image.url}
                alt={course.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sty="true">
                    {course.description}
                </Typography>  
            </CardContent>
            <CardActions sx={{flex: 1, alignItems: 'flex-end'}}>
                <Button 
                    title="Iniciar curso"
                    onClick={() => navigate(`${Links.courses.root}/${course._id}`)}
                />
            </CardActions>
        </CardElement>
    );
}
 
export default Card;