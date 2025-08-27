import React from "react";
import { Carousel, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const CarouselMovie = () => {
  const featuredMovies = [
    {
      id: 1,
      title: "VENOM: THE LAST DANCE",
      description: "Cuộc phiêu lưu cuối cùng của Eddie Brock và Venom trong hành trình đầy kịch tính",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      trailer: "#",
      genre: "Hành động, Khoa học viễn tưởng",
      duration: "109 phút",
      rating: "T16"
    },
    {
      id: 2,
      title: "TRANSFORMERS ONE",
      description: "Câu chuyện khởi nguồn chưa từng được kể về Optimus Prime và Megatron",
      image: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      trailer: "#",
      genre: "Hoạt hình, Hành động",
      duration: "104 phút", 
      rating: "T13"
    },
    {
      id: 3,
      title: "JOKER: FOLIE À DEUX",
      description: "Arthur Fleck bị giam giữ tại bệnh viện tâm thần Arkham và gặp tình yêu đời mình",
      image: "https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      trailer: "#",
      genre: "Tâm lý, Nhạc kịch",
      duration: "138 phút",
      rating: "T18"
    }
  ];

  return (
    <div className="relative">
      <Carousel 
        autoplay 
        dots={true}
        effect="fade"
        className="hero-carousel"
        autoplaySpeed={5000}
      >
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="relative">
            <div 
              className="h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${movie.image})`
              }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-3xl text-white">
                    <div className="mb-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold mr-3">
                        {movie.rating}
                      </span>
                      <span className="text-gray-300">{movie.genre}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {movie.title}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl mb-2 opacity-90 max-w-2xl">
                      {movie.description}
                    </p>
                    <p className="text-gray-300 mb-6">Thời lượng: {movie.duration}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        type="primary" 
                        size="large"
                        className="bg-red-600 hover:bg-red-700 border-red-600 px-8 py-6 h-auto text-lg font-semibold"
                      >
                        MUA VÉ NGAY
                      </Button>
                      <Button 
                        size="large"
                        icon={<PlayCircleOutlined />}
                        className="border-white text-white hover:bg-white hover:text-black px-8 py-6 h-auto text-lg"
                      >
                        XEM TRAILER
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMovie;