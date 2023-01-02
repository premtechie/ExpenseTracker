import { LoginOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';


type DropdownProps = {
  items: MenuProps['items'],
}

export const DropDown:React.FC<DropdownProps> = ({items}) => {
  return (
    <div>
      <Dropdown
        trigger={['click']}
        menu={{items}}
      >
       <Button type="text" icon={<LoginOutlined style={{fontSize: "20px", color: '#ff4d4f'}} />} />
      </Dropdown>
    </div>
  )
}
