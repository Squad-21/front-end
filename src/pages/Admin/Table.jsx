import { default as TableElement } from '@mui/material/Table';
import { 
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';


const Table = ({columns, children}) => {
    //TODO: Mostrar mensagem de erro e de sucesso ao deletar
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
                    {children}
                </TableBody>
            </TableElement>
        </TableContainer>
     );
}
 
export default Table;