import React, { useState } from "react";
import { Button, Drawer } from "antd";

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        // title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={200}
      >
        <button>Đăng nhập</button>
        <br />

        <button>Đăng ký</button>
      </Drawer>
    </div>
  );
};

export default NavBarMobile;
