import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { userService } from "../../../services/userService";
import { Space, Table, Tag, Button } from "antd";

const AdminHomepage = () => {
  // tạo state
  const qc = useQueryClient();
  // phương thức post delete put thường dùng hook useMutation

  const { mutate } = useMutation({
    mutationFn: async (taiKhoan) => await userService.deleteUser(taiKhoan),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listUser"] });
    },
  });

  // phương thức get thường dùng hook useQuery

  const { data } = useQuery({
    queryKey: ["listUser"],
    queryFn: async () => await userService.getListUser(),
  });

  const listUser = data?.data?.content || [];
  console.log("listUser", listUser);

  console.log("data userList", data);

  // Ant Design Table
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "name",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Thao tác",
      render: (_, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                console.log("record: ", record.taiKhoan);
                mutate(record.taiKhoan);
              }}
              color="danger"
              variant="solid"
            >
              Xóa
            </Button>

            <Button color="primary" variant="solid" className="ml-2">
              Sửa
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="px-10">
      <h3 className="font-bold text-3xl mb-5">Danh sách Users</h3>
      <Table columns={columns} dataSource={listUser} />
    </div>
  );
};

export default AdminHomepage;
