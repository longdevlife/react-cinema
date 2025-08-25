import React from "react";

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
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Thông tin người dùng</h3>
      <div className="border-2 rounded-2xl shadow-2xl p-8">
        <form className="space-y-3">
          {/* tài khoản */}
          <div>
            <p>Tài khoản</p>
            <input className="border p-2 rounded-2xl" type="text" />
          </div>

          {/* mật khẩu */}
          <div>
            <p>Mật khẩu</p>
            <input className="border p-2 rounded-2xl" type="text" />
          </div>
          {/* họ tên */}
          <div>
            <p>Họ tên</p>
            <input className="border p-2 rounded-2xl" type="text" />
          </div>
          {/* email */}
          <div>
            <p>Email</p>
            <input className="border p-2 rounded-2xl" type="text" />
          </div>
          {/* số điện thoại */}
          <div>
            <p>Số điện thoại</p>
            <input className="border p-2 rounded-2xl" type="text" />
          </div>
          {/* mã loại ng dùng */}
          <div>
            <p>Mã loại người dùng</p>
            <input className="border p-2 rounded-2xl" type="text" />
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
