import { Style } from "../../constants/style";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {default as BreadcrumbsElement} from '@mui/material/Breadcrumbs';

const Breadcrumbs = ({breadcrumbs}) => {
    return ( 
        <BreadcrumbsElement
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
                color: Style.colors['violet-550'],
                fontWeight: 'bold',
                marginBottom: '2rem'
            }}
        >
            {breadcrumbs}
        </BreadcrumbsElement>
    );
}
 
export default Breadcrumbs;