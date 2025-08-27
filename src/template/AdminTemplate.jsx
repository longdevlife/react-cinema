import React, { useState } from "react";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <NavLink to="/admin">Quản Lý User</NavLink>,
    "/admin",
    <UserOutlined />
  ),
  getItem(
    <NavLink to="/admin/movie">Quản Lý Phim</NavLink>,
    "/admin/movie",
    <DesktopOutlined />
  ),
];

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          // defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
