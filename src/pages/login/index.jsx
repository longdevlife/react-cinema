import React from "react";
import { Button, Form, Input, message } from "antd";
import { userService } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setInfoUserAction } from "../../stores/user";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Lottie from "lottie-react";
import MovieIconAnimation from "../../asset/MovieIcon.json";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      message.success("Đăng nhập thành công!");

      // Chuyển hướng dựa trên loại người dùng
      if (infoUser.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // ẩn scroll bar lên xuống
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Left Side - Welcome Back */}
        <div
          className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center text-white relative overflow-hidden bg-center bg-cover"
          style={{
            backgroundImage: "url('/login-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 text-center"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đăng nhập
              </h1>
              <p className="text-gray-600">
                Chào mừng bạn quay trở lại với Long Cinema
              </p>
            </div>

            <Form
              name="login"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              size="large"
              className="space-y-6"
            >
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Tài khoản</span>
                }
                name="taiKhoan"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                  { min: 3, message: "Tài khoản phải có ít nhất 3 ký tự!" },
                ]}
              >
                <Input
                  placeholder="Nhập tài khoản của bạn"
                  className="rounded-xl border-gray-300 hover:border-indigo-400 focus:border-indigo-500"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Mật khẩu</span>
                }
                name="matkhau"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 3, message: "Mật khẩu phải có ít nhất 3 ký tự!" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu của bạn"
                  className="rounded-xl border-gray-300 hover:border-indigo-400 focus:border-indigo-500"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 cursor-pointer"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>

            <div className="w-60 items-center ml-9 ">
              <Lottie animationData={MovieIconAnimation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
