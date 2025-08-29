import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { userService } from "../../services/userService";

const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    try {
      console.log("Register values:", values);

      const registerData = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        soDt: values.soDT,
        maNhom: "GP01",
        hoTen: values.hoTen,
      };

      const response = await userService.register(registerData);
      console.log("Register response:", response);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Register failed:", error);
      const errorContent = error.response?.data?.content || "Đăng ký thất bại! Vui lòng thử lại.";
      setErrorMessage(errorContent);
      setShowErrorModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Left Side - Register Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tạo tài khoản
              </h1>
              <p className="text-gray-600">
                Tham gia cùng Long Cinema ngay hôm nay
              </p>
            </div>

            <Form
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              size="large"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Họ tên</span>
                  }
                  name="hoTen"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ tên!" },
                    { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập họ tên"
                    className="rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Tài khoản</span>
                  }
                  name="taiKhoan"
                  rules={[
                    { required: true, message: "Vui lòng nhập tài khoản!" },
                    { min: 3, message: "Tài khoản phải có ít nhất 3 ký tự!" },
                    { max: 20, message: "Tài khoản không được quá 20 ký tự!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập tài khoản"
                    className="rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="text-gray-700 font-medium">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  placeholder="Nhập địa chỉ email"
                  className="rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Số điện thoại
                    </span>
                  }
                  name="soDT"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern:
                        /^(?:\+?84|0)(?:3[2-9]|5[25689]|7(?:0|[6-9])|8[1-9]|9[0-9])\d{7}$/,
                      message: "Số điện thoại không đúng định dạng!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    className="rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Loại người dùng
                    </span>
                  }
                  name="maLoaiNguoiDung"
                  initialValue="KhachHang"
                >
                  <Select
                    placeholder="Chọn loại người dùng"
                    className="rounded-xl"
                    disabled
                  >
                    <Option value="KhachHang">Khách hàng</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Mật khẩu</span>
                }
                name="matKhau"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  className="rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Xác nhận mật khẩu
                  </span>
                }
                name="confirmPassword"
                dependencies={["matKhau"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("matKhau") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu"
                  className="rounded-xl border-gray-300 hover:border-purple-400 focus:border-purple-500"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500">
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500">
                    Chính sách bảo mật
                  </a>
                </label>
              </div>

              <Form.Item className="mb-0 mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-purple-600 hover:text-purple-500 transition-colors duration-200 cursor-pointer"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Welcome */}
        <div
          className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center text-white relative overflow-hidden bg-center bg-cover"
          style={{ backgroundImage: "url('/register-banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        title={
          <div className="flex items-center text-green-600">
            <span className="text-2xl mr-2">✅</span>
            <span className="text-lg font-semibold">Đăng ký thành công!</span>
          </div>
        }
        open={showSuccessModal}
        onOk={handleSuccessModalClose}
        onCancel={handleSuccessModalClose}
        footer={[
          <Button 
            key="ok" 
            type="primary" 
            onClick={handleSuccessModalClose}
            className="bg-green-500 hover:bg-green-600 border-green-500"
          >
            Đi đến trang đăng nhập
          </Button>
        ]}
        centered
        width={400}
      >
        <div className="py-4">
          <p className="text-gray-700 text-base">
            Tài khoản của bạn đã được tạo thành công! 
            <br />
            Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ.
          </p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        title={
          <div className="flex items-center text-red-600">
            <span className="text-2xl mr-2">❌</span>
            <span className="text-lg font-semibold">Đăng ký thất bại!</span>
          </div>
        }
        open={showErrorModal}
        onOk={handleErrorModalClose}
        onCancel={handleErrorModalClose}
        footer={[
          <Button 
            key="ok" 
            type="primary" 
            onClick={handleErrorModalClose}
            className="bg-red-500 hover:bg-red-600 border-red-500"
          >
            Thử lại
          </Button>
        ]}
        centered
        width={400}
      >
        <div className="py-4">
          <p className="text-gray-700 text-base">
            <span className="font-medium">Lý do:</span> {errorMessage}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Vui lòng kiểm tra lại thông tin và thử lại.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterPage;
