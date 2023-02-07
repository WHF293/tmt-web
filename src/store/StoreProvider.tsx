import { Store, stores } from '@/store'

/**
 * @desc 全局状态
 */
export default function StoreProvider(props: any) {
  return <Store.Provider value={stores}>{props.children}</Store.Provider>
}
