/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

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
