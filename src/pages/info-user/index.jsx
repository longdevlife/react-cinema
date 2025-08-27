import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../services/userService";

const shema = yup.object({
  taiKhoan: yup
    .string()
    .trim()
    .max(10, "Tối đa 10 ký tự")
    .required("Không được bỏ trống"),
  hoTen: yup.string().typeError("Họ tên phải là chuỗi"),
  //tạo cho tôi chuỗi regex chỉ nhận số điện thoại Việt Nam
  soDT: yup
    .string()
    .matches(
      /^(?:\+?84|0)(?:3[2-9]|5[25689]|7(?:0|[6-9])|8[1-9]|9[0-9])\d{7}$/,
      "Số điện thoại không đúng định dạng"
    )
    .required("Không được bỏ trống"),
  matKhau: yup.string().required("Không được bỏ trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Không được bỏ trống"),
  maLoaiNguoiDung: yup.string().required("Không được bỏ trống"),
});

const UserInforPage = () => {
  /*
"taiKhoan": "long",
    "matKhau": "long",
    "hoTen": "Hoàng Anh",
    "email": "hoangtira@gmail.com",
    "soDT": "0394287477",
    "maNhom": "GP00",
    "maLoaiNguoiDung": "KhachHang",
    "loaiNguoiDung": {
      "maLoaiNguoiDung": "KhachHang",
      "tenLoai": "Khách hàng"
    },
    "thongTinDatVe": []
  },
*/

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(shema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
  });

  const handleSubmitValueForm = async (dataForm) => {
    console.log("dataForm", dataForm);

    try {
      await userService.updateInfoUser({ ...dataForm, maNhom: "GP00" });
      // gọi lại api lấy thông tin người dùng
      // lấy thông tin người dùng => lưu lên store , lưu xuống localStorage
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const fetchInfoUser = async () => {
    try {
      const respone = await userService.getInfoUser();
      console.log("respone", respone);
      const { email, hoTen, maLoaiNguoiDung, maNhom, matKhau, soDT, taiKhoan } =
        respone.data.content;

      reset({
        taiKhoan,
        matKhau,
        hoTen,
        email,
        soDT,
        maLoaiNguoiDung,
      });
    } catch (error) {
      console.error("Error fetching info user:", error);
    }
  };

  useEffect(() => {
    fetchInfoUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Thông tin người dùng</h3>
      <div className="border-2 rounded-2xl shadow-2xl p-8">
        <form
          onSubmit={handleSubmit(handleSubmitValueForm)}
          className="space-y-3"
        >
          {/* tài khoản */}
          <div>
            <p className="w-full">Tài khoản</p>
            <input
              {...register("taiKhoan")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.taiKhoan?.message}</p>
          </div>

          {/* mật khẩu */}
          <div>
            <p className="w-full">Mật khẩu</p>
            <input
              {...register("matKhau")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.matKhau?.message}</p>
          </div>
          {/* họ tên */}
          <div>
            <p className="w-full">Họ tên</p>
            <input
              {...register("hoTen")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.hoTen?.message}</p>
          </div>
          {/* email */}
          <div>
            <p className="w-full">Email</p>
            <input
              {...register("email")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          {/* số điện thoại */}
          <div>
            <p className="w-full">Số điện thoại</p>
            <input
              {...register("soDT")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.soDT?.message}</p>
          </div>
          {/* mã loại ng dùng */}
          <div>
            <p className="w-full">Mã loại người dùng</p>
            <select
              {...register("maLoaiNguoiDung")}
              className="border p-2 rounded-2xl"
            >
              <option value="khachHang">Khách Hàng</option>
              <option value="quanTri">Quản Trị</option>
            </select>
          </div>

          <button className="mt-3 bg-purple-400 p-2 rounded text-white">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInforPage;
