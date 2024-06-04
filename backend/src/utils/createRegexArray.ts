export default function createRegexArray(input: string | string[]): RegExp[] {
  let array = Array.isArray(input) ? input : input.split(",");
  return array.map((item) => new RegExp("^" + item.toLowerCase(), "i"));
}
