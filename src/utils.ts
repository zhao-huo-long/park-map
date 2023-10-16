function createImg(src: string) {
  const img = new Image()
  img.src = src
  return new Promise<HTMLImageElement>((res) => {
    img.onload = function () {
      res(img)
    }
  })
}

interface ImageConfig {
  x: number,
  y: number,
  src: string,
  el?: HTMLImageElement
}

export async function composeImg(imgSrc: (string | ImageConfig)[]) {
  const canvasEle = document.createElement('canvas',);
  const canvas = canvasEle.getContext('2d');
  const imgsConfig = imgSrc.map(i => {
    if (typeof i === 'string') {
      return {
        x: 0,
        y: 0,
        src: i
      }
    }
    return i
  }) as ImageConfig[]
  const imgs = await Promise.all(imgsConfig.map(i => createImg(i.src).then(m => ({ ...i, el: m }))))
  if (canvas) {
    const maxW = Math.max(...imgs.map(i => i.el.width))
    const maxH = Math.max(...imgs.map(i => i.el.height))
    canvasEle.height = maxH 
    canvasEle.width = 1420 || maxW
    imgs.forEach(img => {
      canvas?.drawImage(img.el, img.x, img.y)
    })
    return canvasEle.toDataURL('image/jpeg', 0.1)
  }
}

export function createTransImg(w: number,h: number){
  const canvasEle = document.createElement('canvas',);
  const canvas = canvasEle.getContext('2d')!;
  canvasEle.height = h
  canvasEle.width = w
  canvas.fillStyle = "rgba(0, 0, 0, 0)"
  canvas.fillRect(0, 0, w, h);
  return canvasEle.toDataURL('image/png', 0.1)
}