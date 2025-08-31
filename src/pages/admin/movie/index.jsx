import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  DatePicker,
  Switch,
  Space,
  Card,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { movieService } from "../../../services/movieService";
import moment from "moment";

const MovieAdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // State cho Modal thông báo
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Lấy danh sách phim
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await movieService.getListMovies();
      setMovies(response.data.content);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Không thể tải danh sách phim");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Mở Modal thêm phim
  const handleAddMovie = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // Xử lý submit form
  const handleSubmit = async (values) => {
    try {
      // Tạo FormData cho upload file
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("trailer", values.trailer);
      formData.append("moTa", values.moTa);
      formData.append(
        "ngayKhoiChieu",
        values.ngayKhoiChieu.format("DD/MM/YYYY")
      );
      formData.append("sapChieu", values.sapChieu);
      formData.append("dangChieu", values.dangChieu);
      formData.append("hot", values.hot);
      formData.append("danhGia", values.danhGia);
      formData.append("maNhom", "GP01");

      // Thêm file hình ảnh
      if (values.hinhAnh && values.hinhAnh.fileList[0]) {
        formData.append("File", values.hinhAnh.fileList[0].originFileObj);
      }

      await movieService.addMovieUpload(formData);
      setSuccessMessage("Thêm phim thành công!");
      setShowSuccessModal(true);
      setIsModalVisible(false);
      form.resetFields();
      fetchMovies(); // Refresh danh sách
    } catch (error) {
      console.error("Error adding movie:", error);
      const errorContent =
        error.response?.data?.content || "Thêm phim thất bại";
      setErrorMessage(errorContent);
      setShowErrorModal(true);
    }
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Cấu hình columns cho Table
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      width: 80,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 100,
      render: (image) => (
        <Image
          width={60}
          height={80}
          src={image}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      ),
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      ellipsis: true,
      width: 120, // Giảm từ 200 xuống 120
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="Quản lý Phim"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddMovie}
            className="bg-green-500 hover:bg-green-600 border-green-500"
          >
            Thêm phim
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={movies}
          rowKey="maPhim"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} phim`,
          }}
          scroll={{ x: true }}
        />
      </Card>

      {/* Modal Form Thêm Phim */}
      <Modal
        title="Thêm phim mới"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
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
              label="Tên phim"
              name="tenPhim"
              rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>

            <Form.Item
              label="Trailer"
              name="trailer"
              rules={[
                { required: true, message: "Vui lòng nhập link trailer!" },
              ]}
            >
              <Input placeholder="Nhập link trailer YouTube" />
            </Form.Item>
          </div>

          <Form.Item
            label="Mô tả"
            name="moTa"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả phim" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Ngày khởi chiếu"
              name="ngayKhoiChieu"
              rules={[
                { required: true, message: "Vui lòng chọn ngày khởi chiếu!" },
              ]}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                placeholder="Chọn ngày khởi chiếu"
              />
            </Form.Item>

            <Form.Item
              label="Đánh giá"
              name="danhGia"
              rules={[{ required: true, message: "Vui lòng nhập đánh giá!" }]}
            >
              <Input
                type="number"
                min="1"
                max="10"
                placeholder="Đánh giá (1-10)"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            rules={[{ required: true, message: "Vui lòng upload hình ảnh!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Không upload tự động
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label="Sắp chiếu"
              name="sapChieu"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Đang chiếu"
              name="dangChieu"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Hot"
              name="hot"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-500 hover:bg-green-600 border-green-500"
            >
              Thêm phim
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Success Modal */}
      <Modal
        title="Thành công!"
        open={showSuccessModal}
        onOk={() => setShowSuccessModal(false)}
        onCancel={() => setShowSuccessModal(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setShowSuccessModal(false)}
          >
            Đóng
          </Button>,
        ]}
      >
        <p>{successMessage}</p>
      </Modal>

      {/* Error Modal */}
      <Modal
        title="Có lỗi xảy ra!"
        open={showErrorModal}
        onOk={() => setShowErrorModal(false)}
        onCancel={() => setShowErrorModal(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            danger
            onClick={() => setShowErrorModal(false)}
          >
            Thử lại
          </Button>,
        ]}
      >
        <p>{errorMessage}</p>
      </Modal>
    </div>
  );
};

export default MovieAdminPage;
