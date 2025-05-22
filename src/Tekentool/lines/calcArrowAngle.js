// @flow
export default (x1: number, y1: number, x2: number, y2: number) => {
  let angle = 0
  let x = (x2 - x1)
  let y = (y2 - y1)

  if (x === 0) {
    angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2
  } else if (y === 0) {
    angle = (x > 0) ? 0 : Math.PI
  } else {
    angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x)
  }

  return (angle * 180 / Math.PI + 90)
}
