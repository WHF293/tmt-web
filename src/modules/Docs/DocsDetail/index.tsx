import FooterBar from '@/layout/components/FooterBar'
import MarkDownEditor from '@/components/common/MarkDownEditor'
import WangEditor from '@/components/common/WangEditor'
import { createNewDocs, getAllDocsListByType, getDocsDetailById } from '@/service/docs.service'
import { EditorType, IDocsItem, NewDocsInfo } from '@/types/docs.types'
import { useDebounceFn } from 'ahooks'
import { Button, Input } from 'antd'
import { Random } from 'mockjs'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import CreateDocsModal from '../DocsModal/CreateDocsModal'
import './DocsDetail.less'

interface DocsDetailProps {
  //   isMd?: boolean 改成通过 路由参数获取
}

const MdEditorHeight = 790

export default function DocsDetail(props: DocsDetailProps) {
  const location = useLocation()
  const [editorType, setEditorType] = useState<EditorType>('md')
  const routerParams = useParams()
  const [docsText, setDocsText] = useState<string>('')

  const [allDocs, setAllDocs] = useState<IDocsItem[]>([])
  const [filterDocs, setFilterDocs] = useState<IDocsItem[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [currentDocsName, setCurrentDocsName] = useState<string>('')
  const [isEdit, setIsEdit] = useState(false)
  const [openCreateNewDocsModal, setOpenCreateNewDocsModal] = useState(false)

  useEffect(() => {
    setEditorType(location.state.editorType || 'md')
    getAllDocsByType().then(arr => {
      const allDocsLen = arr.length
      setActiveId(null)
      setCurrentDocsName('')
      setAllDocs(arr)
      setFilterDocs(arr)
      setTimeout(() => {
        if (allDocsLen > 0) {
          setActiveId(arr[0].id)
          setCurrentDocsName(arr[0].title)
          handleSelectDocs(arr[0])
        }
      }, 100)
    })
  }, [location])

  const getAllDocsByType = async () => {
    const res = await getAllDocsListByType({
      type: routerParams.pid as string,
    })
    return res.data
  }

  const { run: filterSearchItem } = useDebounceFn(
    e => {
      const data = e.target.value as string
      setFilterDocsByKey(data)
    },
    { wait: 200 }
  )

  const setFilterDocsByKey = (data: string) => {
    if (data === '') {
      setFilterDocs(allDocs)
    } else {
      const arr = allDocs.filter(docs => docs.title.toLowerCase().includes(data.toLowerCase()))
      setFilterDocs(arr)
    }
  }

  const handleSelectDocs = async (data: IDocsItem) => {
    const params = {
      docsId: data.id,
    }
    const res = await getDocsDetailById(params)
    if (res?.data) {
      if (isEdit) {
        setIsEdit(false)
      }
      setActiveId(data.id)
      setEditorType(data.docsType)
      setCurrentDocsName(data.title)
      setDocsText(res.data)
    }
  }

  const createDocs = async (newDocsInfo: NewDocsInfo) => {
    setOpenCreateNewDocsModal(false)
    const res = await createNewDocs(newDocsInfo)
    const {
      data: { docsInfo },
    } = res
    setAllDocs([docsInfo, ...allDocs])
    setEditorType(docsInfo.docsType)
    setCurrentDocsName(docsInfo.title)
    setDocsText('')
    setActiveId(docsInfo.id)
  }

  const editDocsTitle = (data: string) => {
    console.log(data)
  }

  return (
    <>
      <div className="docs_detail_page">
        <div className="flex">
          <div className="docs_detail_left_box">
            <div className="text-center py-2">
              当前项目： <span className="text-purple-300">{routerParams.pid}</span>
            </div>
            <div className="flex items-center justify-center my-1">
              <Button type="primary" onClick={() => setOpenCreateNewDocsModal(true)} className="w-full shadow-lg">
                新建文档
              </Button>
            </div>
            <Input.Search allowClear placeholder="搜索" onChange={filterSearchItem} className="my-1 shadow-lg" />
            <div className="docs_detail_item_box">
              {filterDocs.map(item => (
                <div
                  className={`docs_detail_item ${activeId === item.id ? "active_item_color" : ''}`}
                  key={item.id}
                  onClick={() => handleSelectDocs(item)}
                >
                  <span className="text-purple-300">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="docs_detail_right_box">
            {!!activeId && (
              <div className="bg-light-100 border-1 border-solid border-gray-300 border-bottom-0">
                <div className='docs_detail_title_box'>
                  <div>
                    <p className="mb-0">
                      <span className="mx-2">
                        文档名称：
                        {isEdit ? (
                          <Input
                            size="small"
                            defaultValue={currentDocsName}
                            onChange={e => editDocsTitle(e.target.value)}
                            style={{ display: 'inline-block', width: 200 }}
                          />
                        ) : (
                          <span className="text-blue-400">{currentDocsName}</span>
                        )}
                      </span>
                      <span className="mx-2">
                        文件类型： <span className="text-blue-400">{editorType}</span>
                      </span>
                    </p>
                  </div>
                  <div>
                    {!isEdit ? (
                      <Button type="primary" className="duration-300" onClick={() => setIsEdit(true)}>
                        编辑
                      </Button>
                    ) : (
                      <>
                        <Button type="primary" className="duration-300">
                          保存
                        </Button>
                        <Button ghost type="primary" onClick={() => setIsEdit(false)} className="mx-2 duration-300">
                          取消
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="mx-2">
                    最近修改人员： <span className="text-blue-400">{Random.cname()}</span>
                  </span>
                  <span className="mx-2">
                    最近编辑时间： <span className="text-blue-400">{Random.date('yyyy-MM-dd hh:mm:ss')}</span>
                  </span>
                </div>
              </div>
            )}
            <div>
              {/* 为什么要实例化两次：mdEditor 和 wangEditor 的只读模式和编辑模式是在实例化的时候使用的，通过改变参数无法实现切换 */}
              {isEdit ? (
                <>
                  {editorType === 'md' ? (
                    <MarkDownEditor
                      key="docs-edit-md"
                      editorId="docs-edit-md"
                      defaultText={docsText}
                      style={{ height: MdEditorHeight }}
                      readOnly={false}
                      onSaveInfo={data => setDocsText(data)}
                    />
                  ) : (
                    <WangEditor
                      key="docs-edit-txt"
                      editorId="docs-edit-txt"
                      defaultHtml={docsText}
                      height={MdEditorHeight}
                      readOnly={false}
                      saveWEInfo={data => setDocsText(data.html)}
                    />
                  )}
                </>
              ) : (
                <>
                  {editorType === 'md' ? (
                    <MarkDownEditor
                      key="docs-no-edit-md"
                      editorId="docs-no-edit-md"
                      defaultText={docsText}
                      style={{ height: MdEditorHeight }}
                      readOnly={true}
                      onSaveInfo={data => setDocsText(data)}
                    />
                  ) : (
                    <WangEditor
                      key="docs-no-edit-txt"
                      editorId="docs-no-edit-txt"
                      defaultHtml={docsText}
                      height={MdEditorHeight}
                      readOnly={true}
                      saveWEInfo={data => setDocsText(data.html)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <FooterBar />
      </div>
      <CreateDocsModal
        docsGroup={routerParams.pid as string}
        open={openCreateNewDocsModal}
        closeModal={() => setOpenCreateNewDocsModal(false)}
        onConfirm={createDocs}
      ></CreateDocsModal>
    </>
  )
}
