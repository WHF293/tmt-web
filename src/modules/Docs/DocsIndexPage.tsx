/*
 * @Author: hfWang
 * @Date: 2022-11-10 19:42:50
 * @LastEditTime: 2022-11-10 19:56:35
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\modules\Docs\DocsIndexPage.tsx
 */
import { NewDocsGroup } from '@/types/docs.types'
import { Button } from 'antd'
import { useState } from 'react'
import './Docs.less'
import CreateDocsGroupModal from './DocsModal/CreateDocsGroupModal'

export default function DocsIndexPage() {
  const [openCreateDocsGroupModal, setOpenCreateDocsGroupModal] = useState(false)
  const [openEditDocsGroupModal, setOpenEditDocsGroupModal] = useState(false)
  const createDocsGroup = (data: NewDocsGroup) => {
    console.log(data)
    setOpenCreateDocsGroupModal(false)
  }
  return (
    <>
      <div className="docs_index_page">
        <div className="docs_index_main_box">
          <p className="docs_info_title">开启你的知识之旅</p>
          <img src="/docs.png" className="docs_info_img" alt="" />
          <p className="text-center mt-5 text-purple-300">善始者实繁，克终者盖寡</p>
          <p className="text-center  text-purple-300">永远相信美好的事件即将发生</p>
          <div className="flex justify-center">
            <Button ghost type="primary" className="mx-2" onClick={() => setOpenCreateDocsGroupModal(true)}>
              新建文档分类
            </Button>
            <Button ghost type="primary" className="mx-2" onClick={() => setOpenEditDocsGroupModal(true)}>
              编辑文档分类
            </Button>
          </div>
        </div>
      </div>
      <CreateDocsGroupModal
        open={openCreateDocsGroupModal}
        onConfirm={createDocsGroup}
        closeModal={() => setOpenCreateDocsGroupModal(false)}
      />
    </>
  )
}
