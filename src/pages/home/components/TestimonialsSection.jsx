import React, { useState } from "react";
import { Card, Rate, Avatar, Pagination } from "antd";

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3); // Số đánh giá hiển thị trên mỗi trang

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      comment:
        "Dịch vụ tuyệt vời! Rạp sạch sẽ, âm thanh chất lượng cao. Đặt vé online rất tiện lợi và nhanh chóng.",
      movie: "Avatar: The Way of Water",
      location: "Long Cinema Landmark 81",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      comment:
        "Ghế ngồi thoải mái, màn hình lớn và rõ nét. Nhân viên phục vụ nhiệt tình. Sẽ quay lại lần sau!",
      movie: "Top Gun: Maverick",
      location: "Long Cinema Vincom",
    },
    {
      id: 3,
      name: "Lê Minh Cường",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4,
      comment:
        "Giá vé hợp lý, chất lượng phim tốt. App đặt vé dễ sử dụng, thanh toán nhanh gọn.",
      movie: "Black Panther",
      location: "Long Cinema Aeon Mall",
    },
    {
      id: 4,
      name: "Phạm Thu Hương",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      comment:
        "Trải nghiệm xem phim tuyệt vời với âm thanh Dolby Atmos. Rạp đẹp, sạch sẽ và hiện đại.",
      movie: "Doctor Strange",
      location: "Long Cinema Times City",
    },
    {
      id: 5,
      name: "Võ Đình Nam",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4,
      comment:
        "Hệ thống đặt vé online thuận tiện, có nhiều ưu đãi cho khách hàng thường xuyên.",
      movie: "Spider-Man",
      location: "Long Cinema Bitexco",
    },
    {
      id: 6,
      name: "Đỗ Minh Châu",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      comment:
        "Dịch vụ khách hàng xuất sắc, nhân viên thân thiện. Rạp có đủ tiện nghi và thoải mái.",
      movie: "The Batman",
      location: "Long Cinema Diamond Plaza",
    },
  ];

  // Tính toán dữ liệu phân trang
  const totalTestimonials = testimonials.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {currentTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
            styles={{ body: { padding: "24px" } }}
          >
            <div className="space-y-4">
              {/* Rating */}
              <div className="flex justify-center">
                <Rate
                  disabled
                  defaultValue={testimonial.rating}
                  className="text-yellow-500"
                />
              </div>

              {/* Comment */}
              <blockquote className="text-gray-700 text-center italic leading-relaxed">
                "{testimonial.comment}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
                <Avatar
                  size={48}
                  src={testimonial.avatar}
                  className="border-2 border-gray-200"
                />
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-red-600 font-medium">
                    {testimonial.movie}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalTestimonials > pageSize && (
        <div className="flex justify-center mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <Pagination
              current={currentPage}
              total={totalTestimonials}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} của ${total} đánh giá`
              }
              className="custom-pagination"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsSection;
