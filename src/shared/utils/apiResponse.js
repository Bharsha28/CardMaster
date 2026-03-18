export function unwrapResponse(response) {
  if (response?.data?.data !== undefined) {
    return response.data.data;
  }
  return response?.data;
}

export function buildId(row, fallbacks = []) {
  const keys = ["id", ...fallbacks];
  const key = keys.find((item) => row?.[item] !== undefined);
  return key ? row[key] : JSON.stringify(row);
}
