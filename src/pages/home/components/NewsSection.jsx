import React from "react";
import { Card, Button } from "antd";
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

const NewsSection = () => {
  const newsData = [
    {
      id: 1,
      title: "Khuyến Mãi Đặc Biệt Tháng 12",
      description: "Giảm giá 50% cho tất cả vé xem phim vào thứ 3 hàng tuần. Cơ hội tuyệt vời để thưởng thức những bộ phim blockbuster với giá ưu đãi.",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "15/12/2024",
      views: "2.5K",
      category: "Khuyến mãi"
    },
    {
      id: 2,
      title: "Ra Mắt Rạp Chiếu Phim IMAX Mới",
      description: "Long Cinema tự hào giới thiệu hệ thống rạp IMAX với công nghệ âm thanh và hình ảnh đỉnh cao, mang đến trải nghiệm điện ảnh chưa từng có.",
      image: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "12/12/2024",
      views: "1.8K",
      category: "Tin tức"
    },
    {
      id: 3,
      title: "Top 10 Phim Hay Nhất Tháng",
      description: "Khám phá danh sách những bộ phim được yêu thích nhất tại Long Cinema trong tháng này với đánh giá từ khán giả.",
      image: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "10/12/2024",
      views: "3.2K",
      category: "Bảng xếp hạng"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
      {newsData.map((news, index) => (
        <Card
          key={news.id}
          className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
          cover={
            <div className="relative overflow-hidden h-48">
              <img
                alt={news.title}
                src={news.image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {news.category}
                </span>
              </div>
              
              {/* Date and Views */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarOutlined />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <EyeOutlined />
                    <span>{news.views}</span>
                  </div>
                </div>
              </div>
            </div>
          }
          bodyStyle={{ padding: "20px" }}
        >
          <div className="space-y-3">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
              {news.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {news.description}
            </p>
            <Button 
              type="link" 
              className="p-0 h-auto text-red-600 hover:text-red-700 font-semibold"
            >
              Đọc thêm →
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NewsSection;