import { useMemo, useState } from "react";
import { filterRows, paginateRows } from "../utils/table";

export default function Table({
  columns,
  rows,
  searchFields = [],
  searchPlaceholder = "Search records",
  actions,
  pageSize = 8,
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => filterRows(rows, query, searchFields), [rows, query, searchFields]);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = useMemo(() => paginateRows(filteredRows, page, pageSize), [filteredRows, page, pageSize]);

  return (
    <div className="card">
      <div className="table-toolbar">
        <input
          className="input"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        <span className="table-count">{filteredRows.length} records</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {actions ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <tr key={row.id || row.key || JSON.stringify(row)}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render ? column.render(row) : row[column.key] ?? "-"}</td>
                  ))}
                  {actions ? <td>{actions(row)}</td> : null}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-state">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button className="ghost-button" type="button" onClick={() => setPage((value) => Math.max(1, value - 1))}>
          Previous
        </button>
        <span>
          Page {Math.min(page, totalPages)} of {totalPages}
        </span>
        <button
          className="ghost-button"
          type="button"
          onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
