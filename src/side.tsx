import { SearchOutline } from 'antd-mobile-icons'
import { useState } from 'preact/hooks'
import { UserOutline } from 'antd-mobile-icons'
import { Picker } from 'antd-mobile'

export default () => {
  const [vis, setVis] = useState(false)
  return <div class={'side'}>
    <div>
      <UserOutline fontSize={30} onClick={() => wx.miniProgram.navigateTo({ url: '/pages/me/index' })} />
    </div>
    <div>
      <SearchOutline fontSize={30} onClick={() => setVis(!vis)} />
    </div>
    <Picker
      visible={vis}
      title="搜索景点"
      onClose={() => setVis(false)}
      columns={[
        [
          { label: 'Foo', value: 'foo' },
          { label: 'Bar', value: 'bar' },
        ]
      ]}
    />
  </div>
}