import { useRef, useState } from 'preact/hooks'

export default (p: {
  src: string,
  x: number,
  y: number,
  ratio: number,
}) => {
  const { src, x, y, ratio } = p
  const [vis, setVis] = useState(false)
  const img = useRef<HTMLImageElement>(null)
  return <img
    ref={img}
    // crossOrigin="anonymous"
    style={{
      visibility: vis ? undefined : 'hidden',
      position: 'absolute',
      top: y * ratio,
      left: x * ratio,
    }}
    onLoad={() => {
      if (!img.current) {
        return
      }
      img.current.style.width = img.current?.naturalWidth * ratio + 'px'
      img.current.style.height = img.current?.naturalHeight * ratio + 'px'
      setVis(true)
    }}
    src={src}
  />
}