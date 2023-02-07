import { Store } from '@/store'
import { themeMapping } from '@/utils/theme'
import { Modal, Radio, RadioChangeEvent } from 'antd'
import { useContext, useState } from 'react'
import { ThemeModalProps } from './types'

export default function ThemeModal(props: ThemeModalProps) {
  const store = useContext(Store)
  const [value, setValue] = useState('purple')

  const onChange = (e: RadioChangeEvent) => {
    const value = e.target.value
    setValue(value)
  }

  const handleOk = () => {
    store.themeStore.updateTheme(value)
    document.body.setAttribute('system_theme_color', value)
    props.closeModal()
  }

  const handleCancel = () => props.closeModal()

  return (
    <Modal title="主题色选择" open={props.show} onOk={handleOk} onCancel={handleCancel}>
      <Radio.Group onChange={onChange} value={value} className="w-full">
        {Object.entries(themeMapping).map(([key, theme]) => {
          return (
            <Radio value={key} key={key} className="w-1/3 my-2 mr-0">
              {theme.name}
              <div className='w-4 h-3 ml-3 inline-block' style={{ background: theme.color }}></div>
            </Radio>
          )
        })}
      </Radio.Group>
    </Modal>
  )
}
