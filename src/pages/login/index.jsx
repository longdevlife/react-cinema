import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { userService } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUserAction } from "../../stores/user";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";
import { Navigate, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import MovieIconAnimation from "../../asset/MovieIcon.json";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { infoUser } = useSelector((state) => state.userSlice);

  //  cách 1 : không bị render giao diện
  // if (infoUser) {
  //   // Nếu đã đăng nhập, chuyển hướng về trang chủ
  //   return <Navigate to="/" replace />;
  // }

  // cách 2 : có bị render giao diện
  // useEffect(() => {
  //   //kiểm tra infoUser đã có tồn tại không => có tồn tại => đã đăng nhập => đá về trang chủ
  //   if (infoUser) {
  //     navigate("/");
  //   }
  // }, [infoUser]);
  const onFinish = async (values) => {
    try {
      console.log("Success:", values);

      const responeLogin = await userService.login(values);
      console.log("Login response:", responeLogin);

      const infoUser = responeLogin.data.content;
      // Lưu thông tin người dùng vào Redux store
      dispatch(setInfoUserAction(infoUser));
      // Lưu thông tin người dùng vào localStorage
      localStorageUtil.set(keysLocalStorage.INFO_USER, infoUser);
      // Đăng nhập thành công, chuyển hướng đến trang chủ
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., show error message)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-white p-8 rounded-2xl flex items-center">
      {/* icon */}
      <div className="w-60 ">
        <Lottie animationData={MovieIconAnimation} />
      </div>

      <div>
        <h3 className="text-2xl font-bold">Form Login</h3>

        {/* form login ant design */}

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matkhau"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
