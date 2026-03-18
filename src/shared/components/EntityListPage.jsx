import { Link } from "react-router-dom";
import AppShell from "./AppShell";
import PageHeader from "./PageHeader";
import Table from "./Table";

export default function EntityListPage({
  title,
  eyebrow,
  description,
  columns,
  rows,
  searchFields,
  addPath,
  basePath,
  customActions,
  showAdd = true,
  showView = true,
  showEdit = true,
}) {
  return (
    <AppShell>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actionLabel={addPath && showAdd ? "Add New" : null}
        actionTo={showAdd ? addPath : null}
      />
      <Table
        columns={columns}
        rows={rows}
        searchFields={searchFields}
        actions={(row) => (
          <div className="table-actions">
            {basePath ? (
              <>
                {showView ? (
                  <Link className="text-link" to={`${basePath}/${row.id}/view`}>
                    View
                  </Link>
                ) : null}
                {showEdit ? (
                  <Link className="text-link" to={`${basePath}/${row.id}/edit`}>
                    Edit
                  </Link>
                ) : null}
              </>
            ) : null}
            {customActions ? customActions(row) : null}
          </div>
        )}
      />
    </AppShell>
  );
}
