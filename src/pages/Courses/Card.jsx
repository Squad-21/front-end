import { default as CardElement } from '@mui/material/Card';
import Button from '../../components/Button';
import { 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography 
} from '@mui/material';

const Card = ({course}) => {
    return ( 
        <CardElement sx={{ minWidth: 296, maxWidth: 350, display: 'flex', flexDirection: 'column'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
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
            </CardActionArea>
            <CardActions sx={{flex: 1, alignItems: 'flex-end'}}>
                <Button title="Iniciar curso" />
            </CardActions>
        </CardElement>
    );
}
 
export default Card;