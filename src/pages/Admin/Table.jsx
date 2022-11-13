import { useState } from 'react';
import { default as TableElement } from '@mui/material/Table';
import { 
    TableContainer,
    TableHead,
    TableBody,
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
import { formatDate } from '../../service/utils';
import { Style } from '../../constants/style';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuthStore from "../../context/authStore";
import { deleteCourseAction } from '../../service/api';

const ListOptions = ({course, getCourses}) => {
    const { token } = useAuthStore((state) => ({ token: state.token }));

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
                onClick={() => console.log(course)}
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
            <TableCell sx={{
                fontSize: '1rem',
                fontWeight: 'bold'
            }}>
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

const Table = ({courses, getCourses}) => {
    //TODO: Mostrar mensagem de erro e de sucesso ao deletar
    const columns = [
        {
            id: 'name',
            label: 'Nome',
            textAlign: 'left',
            minWidth: 170,
            maxWidth: 170
        },
        {
            id: 'modules',
            label: 'Módulos',
            textAlign: 'center',
            minWidth: 50,
            maxWidth: 100
        },

        {
            id: 'edit',
            label: 'Editar',
            textAlign: 'center',
            minWidth: 50,
            maxWidth: 50
        }
    ]
    return ( 
        <TableContainer sx={{ maxHeight: 440 }}>
            <TableElement stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            style={{
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                                textAlign: column.textAlign,
                                color: '#003764',
                                fontWeight: 'bold'
                            }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    courses?.map(course =>  
                        <Row 
                            course={course} 
                            key={course._id}
                            getCourses={getCourses}
                        />
                    )
                }
                </TableBody>
            </TableElement>
        </TableContainer>
     );
}
 
export default Table;