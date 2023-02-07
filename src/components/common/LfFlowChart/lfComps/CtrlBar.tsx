/*
 * @Author: hfWang
 * @Date: 2022-12-07 20:18:15
 * @LastEditTime: 2022-12-21 16:32:25
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\lfComps\CtrlBar.tsx
 */
import { DownloadTwo, PreviewCloseOne, PreviewOpen, SwitchButton } from '@icon-park/react';
import { Dropdown, MenuProps, theme } from 'antd';
import { CtrlBarProps, CtrlItem, ISaveType } from '../types';
import { defaultIconSize } from '../utils/contants';
import { getCtrlItemList, items } from './ctrlBar-tools';
import './ctrlBar.less';

const { useToken } = theme;

export default function CtrlBar(props: CtrlBarProps) {
  const {
    token: { colorPrimary },
  } = useToken();

  const allCtrlItem = () => {
    return getCtrlItemList(colorPrimary, defaultIconSize).map((item) =>
      getCtrlItem(item),
    );
  };

  const getCtrlItem = (data: CtrlItem) => (
    <div
      className="lf_hover_scale lf_item_shadow ctrl_item"
      onClick={() => handleClickCtrlItem(data.type)}
      key={data.type}
      title={data?.title}
    >
      {data.icon}
    </div>
  );

  const handleClickCtrlItem = (type: string) => {
    switch (type) {
      case 'toggleSidebar':
        props.toggleSidebar();
        break;
      case 'selectMoreNode':
        props.selectMoreNode();
        break;
      case 'openMiniMap':
        props.openMiniMap();
        break;
      case 'lfUndo':
        props.lfUndoOrRedo(true);
        break;
      case 'lfRedo':
        props.lfUndoOrRedo(false);
        break;
      case 'lfZoomIn':
        props.lfZoomInOrOut(true);
        break;
      case 'lfZoomOut':
        props.lfZoomInOrOut(false);
        break;
      default:
        break;
    }
  };

  const saveFlowChartInfo: MenuProps['onClick'] = (data: any) => {
    props.saveFlowChartInfo(data.key as ISaveType);
  };

  return (
    <div className="ctrlBar_box" style={props?.style}>
      <div
        className={`lf_hover_scale lf_item_shadow ctrl_item ${props.showSideBar ? 'active_bg' : ''}`}
        onClick={() => handleClickCtrlItem('toggleSidebar')}
        title="开启/关闭节点选择面板"
      >
        {
          props.showSideBar ? <PreviewOpen theme="outline" size={defaultIconSize}
            fill={colorPrimary} strokeLinecap="square" /> :
            <PreviewCloseOne theme="outline" size={defaultIconSize}
              fill={colorPrimary} strokeLinecap="square" />
        }
      </div>
      <div
        className={`lf_hover_scale lf_item_shadow ctrl_item ${props.selectMore ? 'active_bg' : ''}`}
        onClick={() => handleClickCtrlItem('selectMoreNode')}
        title="开启/关闭画布框选功能"
      >
        <SwitchButton
          theme="outline"
          size={defaultIconSize}
          fill={colorPrimary}
        />
      </div>
      {allCtrlItem()}
      <div className={`lf_hover_scale lf_item_shadow ctrl_item`}>
        <Dropdown
          menu={{
            items,
            onClick: saveFlowChartInfo,
          }}
        >
          <DownloadTwo
            theme="outline"
            size={defaultIconSize}
            fill={colorPrimary}
          />
        </Dropdown>
      </div>
    </div>
  );
}
