import { Link } from "react-router-dom";
import { Links } from '../../constants/links';

const PathLegend = ({course}) => {
    return ( 
        <nav className="text-violet-550">
            <Link to={Links.home}>
                <span
                className={`mr-1`}
                >
                    Home {'>'}
                </span>
            </Link>
            <Link to={Links.courses.root}>
                <span
                className={`mr-1`}
                >
                    Cursos {'>'}
                </span>
            </Link>
            <Link to={`${Links.courses.root}/${course?._id}`}>
                <span
                className={`mr-1 font-extrabold`}
                >
                    {course?.title}
                </span>
            </Link>
      </nav>
    );
}
 
export default PathLegend;