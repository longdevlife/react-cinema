import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../services/userService";
import { message } from "antd";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      setIsSubmitting(true);
      await userService.updateInfoUser({ ...dataForm, maNhom: "GP00" });
      message.success("Cập nhật thông tin thành công!");
      // gọi lại api lấy thông tin người dùng
      // lấy thông tin người dùng => lưu lên store , lưu xuống localStorage
    } catch (error) {
      console.error("Error updating user info:", error);
      message.error("Cập nhật thất bại. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
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
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Thông tin người dùng
        </h3>
        <form
          onSubmit={handleSubmit(handleSubmitValueForm)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        >
          {/* tài khoản */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tài khoản
            </label>
            <input
              {...register("taiKhoan")}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              type="text"
              disabled
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.taiKhoan?.message}
            </p>
          </div>

          {/* mật khẩu */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                {...register("matKhau")}
                className="w-full h-12 rounded-xl border border-gray-300 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="text-red-500 text-xs mt-1">
              {errors.matKhau?.message}
            </p>
          </div>

          {/* họ tên */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ tên
            </label>
            <input
              {...register("hoTen")}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              type="text"
            />
            <p className="text-red-500 text-xs mt-1">{errors.hoTen?.message}</p>
          </div>

          {/* email */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">✉️</span>
              <input
                {...register("email")}
                className="w-full h-12 rounded-xl border border-gray-300 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                type="email"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          {/* số điện thoại */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📞</span>
              <input
                {...register("soDT")}
                className="w-full h-12 rounded-xl border border-gray-300 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                type="text"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.soDT?.message}</p>
          </div>

          {/* mã loại ng dùng */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã loại người dùng
            </label>
            <select
              {...register("maLoaiNguoiDung")}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="KhachHang">Khách Hàng</option>
              <option value="QuanTri">Quản Trị</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
              } w-full md:w-auto`}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserInforPage;
