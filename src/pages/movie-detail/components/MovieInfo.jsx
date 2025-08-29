import React from "react";

const MovieInfo = ({ movieDetail, onBookTicket }) => {
  if (!movieDetail) return null;

  // Mock data cho các thông tin không có trong API
  const mockData = {
    thoiLuong: "124 Phút",
    quocGia: "Việt Nam",
    nhaSanXuat: "Điện Ảnh Quân Đội Nhân Dân",
    theLoai: ["Chiến Tranh", "Hành Động"],
    daoDien: "Đặng Thái Huyền",
    dienVien: ["Đỗ Nhật Hoàng", "Phương Nam", "Lâm Thanh Nhã", "Hua Vỹ Văn"],
    luotVote: 428,
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Poster & Button */}
      <div className="col-span-4">
        <div className="sticky top-4">
          <img
            src={movieDetail.hinhAnh}
            alt={movieDetail.tenPhim}
            className="w-full rounded-lg shadow-lg mb-4 object-cover"
            style={{ aspectRatio: "2/3" }}
          />
          <button
            onClick={onBookTicket}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg transition-colors duration-300"
          >
            ĐẶT VÉ NGAY
          </button>
        </div>
      </div>

      {/* Right Column - Movie Details */}
      <div className="col-span-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {movieDetail.tenPhim}
        </h2>

        {/* Rating */}
        <div className="flex items-center mb-6">
          <span className="text-yellow-500 text-2xl mr-2">⭐</span>
          <span className="text-2xl font-bold text-gray-800">
            {movieDetail.danhGia ? movieDetail.danhGia.toFixed(1) : "9.5"}
          </span>
          <span className="text-gray-500 ml-2">
            ({mockData.luotVote} votes)
          </span>
        </div>

        {/* Movie Details */}
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">Thời lượng:</span>
            <span className="text-gray-800">{mockData.thoiLuong}</span>
          </div>

          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">Khởi chiếu:</span>
            <span className="text-gray-800">
              {new Date(movieDetail.ngayKhoiChieu).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">Quốc gia:</span>
            <span className="text-gray-800">{mockData.quocGia}</span>
          </div>

          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">
              Nhà sản xuất:
            </span>
            <span className="text-gray-800">{mockData.nhaSanXuat}</span>
          </div>

          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">Thể loại:</span>
            <div className="flex gap-2 flex-wrap">
              {mockData.theLoai.map((genre) => (
                <span
                  key={genre}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">Đạo diễn:</span>
            <span className="text-gray-800">{mockData.daoDien}</span>
          </div>

          <div className="flex items-start">
            <span className="font-medium w-32 text-gray-600">Diễn viên:</span>
            <div className="flex flex-wrap gap-2">
              {mockData.dienVien.map((actor) => (
                <span
                  key={actor}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        {movieDetail.moTa && (
          <div className="mt-6">
            <h3 className="font-medium text-lg mb-3 text-gray-800">
              Mô tả phim:
            </h3>
            <p className="text-gray-600 leading-relaxed">{movieDetail.moTa}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
