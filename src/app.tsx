// @ts-nocheck
import { useEffect, useState } from 'preact/hooks'
import mapSrc from './assets/map-min.jpg'
// import lineSrc from './assets/2.png'
// import './app.css'
import request from './request'
import { Switch, Popup, Button, Space } from 'antd-mobile'
import { UserOutline } from 'antd-mobile-icons'
import DynImg from './dyn-img'
import Side from './side'
import { createTransImg } from './utils'

interface Point {
  x: number, y: number, id: any, name: string
  coverUrl: string
}

export function App() {
  const [vis, setVis] = useState(false)
  const [hotImg, setHotImg] = useState('')
  const [visVideo, setVisVideo] = useState(false)
  const [visAudio, setVisAudio] = useState(false)
  const [pointMsg, setPointsMsg] = useState<Point>({})
  const [points, setPoints] = useState<Point[]>([])
  const [ratio, setRatio] = useState(1)
  useEffect(() => {
    request('/skgy/tour/queryScenicSpot').then(({ data }) => {
      if (Array.isArray(data?.resultSet)) {
        const pointsList = data.resultSet.map((i: any) => {
          const [x, y] = i.location.split(',').map((i: string) => Number(i))
          return {
            ...i,
            x,
            y,
          }
        })
        setPoints(pointsList)
      }
    })
    window.onresize = () => {
      resize()
    }
    console.log(wx?.miniProgram)
    wx?.miniProgram?.getLocation({
      type: 'wgs84',
      success (res) {
        console.log('res', res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        request('/skgy/tour/locationScenicSpot', {
          params: {
            lat:`${latitude},${longitude}`
          }
        })
      }
     })
  }, [])
  const resize = () => {
    const imgEl = document.querySelector('#map-img') as HTMLImageElement
    setRatio(imgEl.width / 5906)
    setHotImg(createTransImg(imgEl.width, imgEl.height))
  }
  return (
    <div class='root' style={{ width: '100%', height: '100%' }}>
      <div class='map-box'>
        {/* <img class='map-layout' src={mapSrc} style={{ width: '100%' }} useMap="#hot-map"></img> */}
        <img class='map-layout' onClick={resize} id={'map-img'} onLoad={resize} src={mapSrc} style={{ width: '100%' }} />
        {
          points.map(i => {
            return <DynImg src={i.coverUrl} x={i.x} y={i.y} ratio={ratio} />
          })
        }
        {hotImg && points.length && <img  src={hotImg} useMap="#hot-map"  style={{position: 'absolute', 'top': 0, width: '100%'}}/>}
        {!!points.length && <map id="hot-map" name="hot-map">
          {
            points.map(i => {
              return <area key={i.id} shape="circle" coords={`${(i.x) * ratio},${(i.y) * ratio},${150 * ratio}`} onClick={() => {
                console.log('click')
                setPointsMsg({ ...i })
                setVis(true)
              }} />
            })
          }
        </map>
        }
      </div>
      <div>
        <div class="sw">
          <Switch
            style={{
              '--checked-color': '#00b578',
              '--height': '20px',
              '--width': '33px',
            }}
          />
          智能导游
        </div>
      </div>
      <Side />
      <Popup visible={vis}
        onMaskClick={() => {
          setVis(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '30vh',
        }}
      >
        <div class="msg">
          <div class={'title'}>景点详情: {pointMsg?.name}</div>
          <div class={'content'}>
            <img style={{ width: 100 }} src={pointMsg?.coverUrl} alt="img" />
            <div class={'intro'}>
              {pointMsg?.intro || '景区介绍'}
            </div>
          </div>
          <Space>
            <Button size='mini' onClick={() => setVisVideo(true)} color='primary'>景点介绍</Button>
            <Button size='mini' onClick={() => setVisAudio(true)} color='primary'>智能导览</Button>
          </Space>
        </div>
      </Popup>
      <Popup
        visible={visVideo}
        onMaskClick={() => {
          setVisVideo(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '30vh',
        }}
      >
        <div class="msg">
          <div class={'title'}>景点介绍: {pointMsg?.name}</div>
          <div style={{ width: '90%', margin: '10px auto' }}>
            <video src={pointMsg.videoName} controls ></video>
          </div>
        </div>
      </Popup>
      <Popup visible={visAudio}
        onMaskClick={() => {
          setVisAudio(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '30vh',
          display: 'flex',
        }}
      >
        <div class="msg">
          <div class={'title'}>智能导览: {pointMsg?.name}</div>
          <div style={{ width: '90%', margin: '10px auto', marginTop: '50px' }}>
            <audio src={pointMsg.audioName} controls style={{ width: '100%' }}></audio>
          </div>
        </div>
      </Popup>
    </div>
  )
}
