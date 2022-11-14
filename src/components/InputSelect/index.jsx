import { Select, MenuItem } from '@mui/material';
import { Style } from '../../constants/style';

const InputSelect = ({
    options,
    placeholder,
    registerForm,
    error
}) => {

    return ( 
        <Select
            inputProps={{ 'aria-label': 'Without label' }}
            {...registerForm}
            error={Boolean(error)}
            defaultValue={0}
            sx={{
                backgroundColor: Style.colors['gray-10'],
                color: Style.colors['gray-550'],
                width: '100%'
            }}
        >
            <MenuItem value={0}>
                <em>{placeholder}</em>
            </MenuItem>
            {
                options?.map(option => 
                    <MenuItem 
                        key={option.id}
                        value={option.value}
                    >
                        {option.title}
                    </MenuItem>
                )
            }
        </Select>
    );
}
 
export default InputSelect;