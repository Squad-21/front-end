import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();
  return (
    <nav className="text-violet-550">
      {breadcrumbs.map(({ key, breadcrumb, location }) => (
        <Link key={key} to={key}>
          <span
            className={`mr-1 ${
              key === location.pathname ? "font-extrabold" : ""
            }`}
          >
            {breadcrumb} {">"}
          </span>
        </Link>
      ))}
    </nav>
  );
}
