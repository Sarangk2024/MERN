export function formatDate(dateValue) {
  const date = new Date(dateValue)

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
