import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Sider = (props) => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: "100%" }}
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="친구목록">
        <Menu.Item key="1">강태진</Menu.Item>
        <Menu.Item key="2">금교석</Menu.Item>
        <Menu.Item key="3">노유진</Menu.Item>
        <Menu.Item key="4">조형석</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="채팅목록">
        <Menu.Item key="5">임민영</Menu.Item>
        <Menu.Item key="6">이범규</Menu.Item>
        {/* <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu> */}
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="항해 싸움순위">
        <Menu.Item key="9">조새벽</Menu.Item>
        <Menu.Item key="10">김진수</Menu.Item>
        <Menu.Item key="11">윤예나</Menu.Item>
        <Menu.Item key="12">김병훈</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Sider;
