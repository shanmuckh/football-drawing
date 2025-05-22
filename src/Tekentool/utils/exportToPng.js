// @flow
import dataURLtoBlob from './dataURLtoBlob'

export default (canvas) => {
  const anchorNode = document.createElement('a')
  const imgData = canvas.toDataURL({
    format: 'png',
    multiplier: 1, // resolution
    enableRetinaScaling: true,
    left: 0,
    top: 0,
    width: canvas.width,
    height: canvas.height,
  })

  const blob = dataURLtoBlob(imgData)
  const objurl = URL.createObjectURL(blob)

  const date = new Date()
  const dateString = date.toLocaleDateString()

  anchorNode.download = `Image ${dateString}.png` // filename
  anchorNode.href = objurl
  anchorNode.click()
}
