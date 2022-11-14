import { useState } from 'react';
import { 
    TableRow,
    TableCell,
    IconButton,
    Typography,
    Popover,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDate } from '../../../service/utils';
import { Style } from '../../../constants/style';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuthStore from "../../../context/authStore";
import { deleteCourseAction } from '../../../service/api';
import { useNavigate } from 'react-router-dom';
import { Links } from '../../../constants/links';

const ListOptions = ({course, getCourses}) => {
    const { token } = useAuthStore((state) => ({ token: state.token }));
    const navigate = useNavigate();

    const handleDelete = async() => {
        const data = await deleteCourseAction(course._id, token);

        if(data.error) {
            alert(data.error)
            return 
        }
        console.log(data.message)
        await getCourses()
    }
    return (
        <List component="nav">
            <ListItemButton
                onClick={() => navigate(`${Links.admin.root}/${Links.admin.courses}/${course._id}/edit`)}
            >
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Editar" />
            </ListItemButton>
            <ListItemButton
                onClick={() => handleDelete()}
            >
                <ListItemIcon>
                    <DeleteIcon sx={{fill: 'red'}} />
                </ListItemIcon>
                <ListItemText sx={{color: 'red'}} primary="Deletar" />
            </ListItemButton>
        </List>
    )
}

const Row = ({course, getCourses}) => {
    const [popoverOpen, setPopoverOpen] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(popoverOpen);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setPopoverOpen(event.currentTarget);
    };
    const handleClose = () => {
        setPopoverOpen(null);
    };

    return (
        <TableRow key={course._id} hover>
            <TableCell 
                sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
                onClick={() => navigate(`${Links.admin.root}/${Links.admin.courses}/${course._id}/modulos`)}
            >
                {course.title}
                <Typography 
                    variant="caption"
                    component="div"
                    color={Style.colors['light-gray']}
                    sx={{
                        paddingTop: '.5rem',
                        lineHeight: 1.3
                    }}
                >
                    Última atualização em {formatDate(course.updatedAt)}
                </Typography>
            </TableCell>
            <TableCell align='center'>
                {course.modules?.length}
            </TableCell>
            <TableCell align='center'>
                <IconButton
                    aria-label="editar"
                    color="inherit"
                    size="medium"
                    aria-describedby={id}
                    onClick={handleClick}
                >
                    <MoreVertIcon 
                        sx={{
                            fill: Style.colors['light-gray']
                        }}
                        fontSize="inherit" 
                    />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={popoverOpen}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <ListOptions 
                        course={course}
                        getCourses={getCourses}
                    />
                </Popover>
            </TableCell>
        </TableRow>
    )
}

export default Row;