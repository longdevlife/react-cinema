import React from "react";
import { Card, Button } from "antd";
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Galaxy Cinema ra mắt rạp mới tại TP.HCM",
      description: "Hệ thống rạp chiếu phim Galaxy Cinema chính thức khai trương cơ sở mới với công nghệ hiện đại nhất",
      image: "https://images.unsplash.com/photo-1489599162810-1e666d2c8e5b?w=400&h=250&fit=crop",
      date: "15/12/2024",
      views: "1.2K"
    },
    {
      id: 2,
      title: "Ưu đãi đặc biệt cho thành viên Galaxy",
      description: "Chương trình khuyến mãi hấp dẫn dành cho các thành viên thân thiết của Galaxy Cinema",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      date: "12/12/2024",
      views: "856"
    },
    {
      id: 3,
      title: "Công nghệ âm thanh Dolby Atmos mới",
      description: "Trải nghiệm âm thanh vòm 360 độ với công nghệ Dolby Atmos tiên tiến nhất",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
      date: "10/12/2024",
      views: "2.1K"
    }
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card
            key={item.id}
            hoverable
            className="news-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            cover={
              <div className="relative overflow-hidden">
                <img 
                  alt={item.title} 
                  src={item.image}
                  className="h-[200px] w-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  TIN TỨC
                </div>
              </div>
            }
          >
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[56px]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <CalendarOutlined />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <EyeOutlined />
                  <span>{item.views}</span>
                </div>
              </div>
              <Button 
                type="link" 
                className="p-0 text-red-600 font-semibold hover:text-red-700"
              >
                Đọc thêm →
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button 
          size="large" 
          className="px-8 py-6 h-auto text-lg font-semibold border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          XEM TẤT CẢ TIN TỨC
        </Button>
      </div>
    </div>
  );
};

export default NewsSection;