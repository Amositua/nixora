// export default function hasValue(value) {
//   if (value === null || value === undefined) return false;
//   if (Array.isArray(value)) return value.length > 0;
//   if (typeof value === "string") return value.trim() !== "";
//   return true;
// }
export default function hasValue(value) {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim() !== "";
  if (typeof value === "boolean") return true; // always show booleans
  return true; // numbers, objects
}
