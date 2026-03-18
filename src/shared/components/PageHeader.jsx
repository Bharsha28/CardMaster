import { Link } from "react-router-dom";

export default function PageHeader({ eyebrow, title, description, actionLabel, actionTo }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {description ? <p className="page-header__description">{description}</p> : null}
      </div>
      {actionLabel && actionTo ? (
        <Link className="primary-button" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
