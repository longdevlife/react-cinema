import React from "react";
import { Carousel, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const CarouselMovie = () => {
  const featuredMovies = [
    {
      id: 1,
      title: "VENOM: THE LAST DANCE",
      description: "Cuộc phiêu lưu cuối cùng của Eddie Brock và Venom",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
      trailer: "#"
    },
    {
      id: 2,
      title: "TRANSFORMERS ONE",
      description: "Câu chuyện khởi nguồn của những robot biến hình",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
      trailer: "#"
    },
    {
      id: 3,
      title: "JOKER: FOLIE À DEUX",
      description: "Sự trở lại của Joker trong một câu chuyện mới",
      image: "https://images.unsplash.com/photo-1489599162810-1e666d2c8e5b?w=1200&h=600&fit=crop",
      trailer: "#"
    }
  ];

  return (
    <div className="relative">
      <Carousel 
        autoplay 
        dots={true}
        effect="fade"
        className="hero-carousel"
      >
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="relative">
            <div 
              className="h-[500px] lg:h-[600px] bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${movie.image})`
              }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                      {movie.title}
                    </h1>
                    <p className="text-lg lg:text-xl mb-6 opacity-90">
                      {movie.description}
                    </p>
                    <div className="flex gap-4">
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
                        TRAILER
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