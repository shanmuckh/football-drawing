// @flow
// https://stackoverflow.com/a/3710226/2255980
export default (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
