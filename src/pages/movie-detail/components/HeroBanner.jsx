import React from "react";
import PlayCircleOutlined from "@ant-design/icons/PlayCircleOutlined";

const HeroBanner = ({ movieDetail, onPlayTrailer }) => {
  if (!movieDetail) return null;

  // Function để lấy YouTube thumbnail từ trailer URL
  const getYouTubeThumbnail = (url) => {
    // Debug log
    console.log("Movie Detail:", movieDetail);
    console.log("Trailer URL:", url);
    console.log("Poster Image:", movieDetail.hinhAnh);

    // Luôn ưu tiên poster phim trước
    let backgroundImage = movieDetail.hinhAnh;

    if (url) {
      let videoId = "";
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      }

      console.log("Video ID:", videoId);

      // Nếu có videoId, thử dùng YouTube thumbnail
      if (videoId) {
        backgroundImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        console.log("YouTube Thumbnail:", backgroundImage);
      }
    }

    console.log("Final Background Image:", backgroundImage);
    return backgroundImage;
  };

  const backgroundImage = getYouTubeThumbnail(movieDetail.trailer);

  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image với fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-gray-800 transition-all duration-500"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundColor: backgroundImage ? "transparent" : "#1f2937",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Fallback content nếu không có hình */}
        {!backgroundImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-xl">Đang tải hình ảnh...</p>
            </div>
          </div>
        )}
      </div>

      {/* Play Button với hiệu ứng kính thuần */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={onPlayTrailer}
          className="group relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden hover:scale-110 transition-all duration-500 shadow-2xl backdrop-blur-md border border-white/30"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(15px)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Hiệu ứng ánh sáng phản chiếu */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-all duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
            }}
          ></div>

          {/* Hiệu ứng gợn sóng khi hover */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              animation: "pulse 2s infinite",
            }}
          ></div>

          {/* Icon play với màu trắng thuần */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <span className="text-5xl text-white  group-hover:text-white/90 transition-all duration-300 filter drop-shadow-lg">
              <PlayCircleOutlined />
            </span>
          </div>

          {/* Viền phản chiếu động */}
          <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
        </button>
      </div>

      {/* Movie Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            {movieDetail.tenPhim}
          </h1>
          <p className="text-white text-sm md:text-lg opacity-90">
            SUẤT CHIẾU ĐẶC BIỆT - TỪ{" "}
            {new Date(movieDetail.ngayKhoiChieu).toLocaleDateString("vi-VN")}
          </p>
          {movieDetail.trailer && (
            <p className="text-yellow-400 text-xs md:text-sm mt-2 flex items-center">
              <span className="mr-2">🎬</span>
              Nhấn để xem trailer chính thức
            </p>
          )}
        </div>
      </div>

      {/* Video Icon Indicator */}
      {movieDetail.trailer && (
        <div className="absolute top-4 right-4">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <span className="mr-1">📹</span>
            TRAILER
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
