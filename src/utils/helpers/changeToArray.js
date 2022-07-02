export default function changeToArray(str) {
  return Array.isArray(str) ? str : str.split(',');
}
