import { default as TableElement } from '@mui/material/Table';
import { 
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDate } from '../../service/utils';
import { Style } from '../../constants/style';

const Row = ({course}) => {
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
                onClick={() => console.log('Edit')}
                >
                    <MoreVertIcon 
                        sx={{
                            fill: Style.colors['light-gray']
                        }}
                        fontSize="inherit" 
                    />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

const Table = ({courses}) => {
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
                    courses?.map(course =>  <Row course={course} key={course._id} />)
                }
                </TableBody>
            </TableElement>
        </TableContainer>
     );
}
 
export default Table;