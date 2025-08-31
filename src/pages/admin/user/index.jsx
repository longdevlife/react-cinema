import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  Card,
} from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { userService } from "../../../services/userService";

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' hoặc 'edit'
  const [form] = Form.useForm();

  // State cho Modal thông báo thành công/thất bại
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getListUser();
      setUsers(response.data.content);
    } catch (error) {
      console.error("Error fetching users:", error);
      const errorContent = error.response?.data?.content || "Không thể tải danh sách người dùng";
      setErrorMessage(errorContent);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Mở Modal thêm người dùng
  const handleAddUser = () => {
    setModalType("add");
    form.resetFields();
    setIsModalVisible(true);
  };

  // Mở Modal sửa người dùng
  const handleEditUser = (user) => {
    setModalType("edit");
    form.setFieldsValue({
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      email: user.email,
      soDT: user.soDT,
      maNhom: user.maNhom,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      hoTen: user.hoTen,
    });
    setIsModalVisible(true);
  };

  // Xử lý submit form
  const handleSubmit = async (values) => {
    try {
      if (modalType === "add") {
        await userService.addUser(values);
        setSuccessMessage("Thêm người dùng thành công!");
      } else {
        await userService.updateUser(values);
        setSuccessMessage("Cập nhật người dùng thành công!");
      }
      
      setShowSuccessModal(true);
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers(); // Refresh danh sách
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorContent = error.response?.data?.content || 
        (modalType === "add" ? "Thêm người dùng thất bại" : "Cập nhật người dùng thất bại");
      setErrorMessage(errorContent);
      setShowErrorModal(true);
    }
  };

  // Xóa người dùng
  const handleDeleteUser = async (taiKhoan) => {
    try {
      await userService.deleteUser(taiKhoan);
      setSuccessMessage("Xóa người dùng thành công!");
      setShowSuccessModal(true);
      fetchUsers(); // Refresh danh sách
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorContent = error.response?.data?.content || "Xóa người dùng thất bại";
      setErrorMessage(errorContent);
      setShowErrorModal(true);
    }
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý đóng Modal thành công
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
  };

  // Xử lý đóng Modal lỗi
  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  // Cấu hình columns cho Table
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      sorter: (a, b) => a.taiKhoan.localeCompare(b.taiKhoan),
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Mã nhóm",
      dataIndex: "maNhom",
      key: "maNhom",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (type) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            type === "QuanTri"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {type === "QuanTri" ? "Quản trị" : "Khách hàng"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            size="small"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa người dùng"
            description={`Bạn có chắc chắn muốn xóa người dùng "${record.hoTen}"?`}
            onConfirm={() => handleDeleteUser(record.taiKhoan)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center gap-2">
            <UserAddOutlined className="text-blue-600" />
            <span className="text-xl font-semibold">Quản lý người dùng</span>
          </div>
        }
        extra={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-600 border-green-500"
          >
            Thêm người dùng
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="taiKhoan"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} người dùng`,
          }}
          scroll={{ x: true }}
        />
      </Card>

      {/* Modal Form Thêm/Sửa */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            {modalType === "add" ? (
              <>
                <UserAddOutlined className="text-green-600" />
                <span>Thêm người dùng mới</span>
              </>
            ) : (
              <>
                <EditOutlined className="text-blue-600" />
                <span>Cập nhật thông tin người dùng</span>
              </>
            )}
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tài khoản"
              name="taiKhoan"
              rules={[
                { required: true, message: "Vui lòng nhập tài khoản!" },
                { min: 3, message: "Tài khoản phải có ít nhất 3 ký tự!" },
                { max: 20, message: "Tài khoản không được quá 20 ký tự!" },
              ]}
            >
              <Input
                placeholder="Nhập tài khoản"
                disabled={modalType === "edit"}
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[
              { required: true, message: "Vui lòng nhập họ tên!" },
              { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Số điện thoại"
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
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Mã nhóm"
              name="maNhom"
              rules={[{ required: true, message: "Vui lòng chọn mã nhóm!" }]}
              initialValue="GP01"
            >
              <Select placeholder="Chọn mã nhóm">
                <Option value="GP01">GP01</Option>
                <Option value="GP02">GP02</Option>
                <Option value="GP03">GP03</Option>
                <Option value="GP04">GP04</Option>
                <Option value="GP05">GP05</Option>
                <Option value="GP06">GP06</Option>
                <Option value="GP07">GP07</Option>
                <Option value="GP08">GP08</Option>
                <Option value="GP09">GP09</Option>
                <Option value="GP10">GP10</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Loại người dùng"
            name="maLoaiNguoiDung"
            rules={[
              { required: true, message: "Vui lòng chọn loại người dùng!" },
            ]}
            initialValue="KhachHang"
          >
            <Select placeholder="Chọn loại người dùng">
              <Option value="KhachHang">Khách hàng</Option>
              <Option value="QuanTri">Quản trị</Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              className={
                modalType === "add"
                  ? "bg-green-500 hover:bg-green-600 border-green-500"
                  : "bg-blue-500 hover:bg-blue-600 border-blue-500"
              }
            >
              {modalType === "add" ? "Thêm người dùng" : "Cập nhật"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Success Modal */}
      <Modal
        title={
          <div className="flex items-center text-green-600">
            <span className="text-2xl mr-2">✅</span>
            <span className="text-lg font-semibold">Thành công!</span>
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
            Đóng
          </Button>,
        ]}
        centered
        width={400}
      >
        <div className="py-4">
          <p className="text-gray-700 text-base">{successMessage}</p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        title={
          <div className="flex items-center text-red-600">
            <span className="text-2xl mr-2">❌</span>
            <span className="text-lg font-semibold">Có lỗi xảy ra!</span>
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
          </Button>,
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

export default UserManagement;
