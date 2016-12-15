export function resizeImage(imageData, type, MAX_WIDTH = 480, MAX_HEIGHT = 480) {
  let img = document.createElement('img');
  img.src = imageData;
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }

  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(type);
}
