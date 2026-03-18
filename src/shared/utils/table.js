export function filterRows(rows, query, fields) {
  if (!query) {
    return rows;
  }

  const lowerQuery = query.toLowerCase();
  return rows.filter((row) =>
    fields.some((field) => String(resolveValue(row, field) || "").toLowerCase().includes(lowerQuery)),
  );
}

export function paginateRows(rows, page, pageSize) {
  const start = (page - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

function resolveValue(row, field) {
  return field.split(".").reduce((value, key) => value?.[key], row);
}
