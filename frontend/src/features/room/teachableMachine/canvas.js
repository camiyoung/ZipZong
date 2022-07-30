const newCanvas = () => document.createElement("canvas")

export function createCanvas(
  width = 200,
  height = 200,
  flipHorizontal = false
) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  if (flipHorizontal) {
    const ctx = canvas.getContext("2d")
    ctx.translate(width, 0)
    ctx.scale(-1, 1)
  }

  return canvas
}

export function cropTo(image, size, flipped = false, canvas = newCanvas()) {
  // image image, bitmap, or canvas
  let width = image.width
  let height = image.height

  // if video element
  if (image instanceof HTMLVideoElement) {
    width = image.videoWidth
    height = image.videoHeight
  }

  const min = Math.min(width, height)
  const scale = size / min
  const scaledW = Math.ceil(width * scale)
  const scaledH = Math.ceil(height * scale)
  const dx = scaledW - size
  const dy = scaledH - size
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")
  ctx.drawImage(image, ~~(dx / 2) * -1, ~~(dy / 2) * -1, scaledW, scaledH)

  // canvas is already sized and cropped to center correctly
  if (flipped) {
    ctx.scale(-1, 1)
    ctx.drawImage(canvas, size * -1, 0)
  }

  return canvas
}
