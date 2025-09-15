export function removeEmptyObjectPrefix(json: string) {
  if(RegExp("^{}.").test(json) === true) {
    return json.substring(2);
  }
  return json;
}