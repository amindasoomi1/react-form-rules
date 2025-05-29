export default function randomID() {
  const str = [Math.random() * 1000000, new Date().getTime()]
    .map(Math.ceil)
    .join("");
  return Number(str).toString(16);
}
