/*
 * @Author: hfWang
 * @Date: 2022-11-07 22:44:51
 * @LastEditTime: 2022-11-07 23:07:38
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\modules\HomePage\ProjectModal.tsx
 */
import { Checkbox, Divider, Modal } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
interface ProjectModalProps {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

export default function ProjectModal(props: ProjectModalProps) {
  const plainOptions = ['Apple', 'Pear', 'Orange']
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues)
  }
  return (
    <Modal title="模块编辑" open={props.isOpen} onOk={props.onConfirm} onCancel={props.onClose}>
      <div className='mb-2'>
        <p>已展示</p>
        <div>
          <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
        </div>
      </div>
      <Divider />
      <div className='mb-2'>
        <p>未展示</p>
        <div>
          <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
        </div>
      </div>
    </Modal>
  )
}
