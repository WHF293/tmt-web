/*
 * @Author: hfWang
 * @Date: 2022-12-19 21:37:44
 * @LastEditTime: 2022-12-21 16:31:44
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\lfComps\SideBar.tsx
 */
import { Down, Mark, Up } from '@icon-park/react';
import { theme } from 'antd';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
import { NodeGroup, SideBarProps } from '../types';
import { defaultIconSize } from '../utils/contants';
import getBaseNodeGroup from './sideBar-tools';
import './sideBar.less';

const { useToken } = theme;

const SideBar: FC<SideBarProps> = (props) => {
  const { showBaseNodes = true, customNodes = [] } = props;
  const [allNodes, setAllNodes] = useState<NodeGroup[]>([]);
  const {
    token: { colorPrimary },
  } = useToken();

  useEffect(() => {
    const _allNodes = showBaseNodes
      ? [...getBaseNodeGroup({ fillColor: colorPrimary }), ...customNodes]
      : customNodes;
    setAllNodes(_allNodes);
  }, [showBaseNodes, colorPrimary]);

  const toggleGroupExpand = (index: number) => {
    const _allNodes = cloneDeep(allNodes);
    _allNodes[index].expand = !_allNodes[index].expand;
    setAllNodes(_allNodes);
  };

  return (
    <div className='sideBar_box' style={{ height: props.height + 'px' }}>
      {allNodes.length > 0 &&
        allNodes.map((group, index) => {
          return (
            <div className="node_group" key={group.groupKey}>
              <div
                className="node_group_title"
                onClick={() => toggleGroupExpand(index)}
              >
                <div className="items_center">
                  <Mark
                    theme="filled"
                    size={defaultIconSize}
                    fill={colorPrimary}
                    style={{ marginRight: '4px' }}
                  />
                  {group.groupName}
                </div>
                <div>
                  {group.expand ? (
                    <Up
                      theme="filled"
                      size={defaultIconSize}
                      fill={colorPrimary}
                    />
                  ) : (
                    <Down
                      theme="filled"
                      size={defaultIconSize}
                      fill={colorPrimary}
                    />
                  )}
                </div>
              </div>
              <div style={{ display: group.expand ? 'block' : 'none' }} className="expand_on_off">
                <div className="node_group_content">
                  {group.nodeList.map((node) => (
                    <div
                      title={node?.name}
                      key={node.type}
                      className="node_item lf_hover_scale lf_item_shadow"
                      onMouseDown={() => props.dragInNode(node.type)}
                    >
                      {node?.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
