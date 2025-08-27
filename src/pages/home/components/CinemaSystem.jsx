import React, { useState } from "react";
import { Card, Button, Tabs } from "antd";
import { EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from "@ant-design/icons";

const CinemaSystem = () => {
  const cinemaData = {
    "Galaxy Nguyễn Du": [
      {
        name: "Galaxy Nguyễn Du",
        address: "116 Nguyễn Du, Quận 1, TP.HCM",
        phone: "028 7300 8881",
        image: "https://images.unsplash.com/photo-1489599162810-1e666d2c8e5b?w=400&h=200&fit=crop"
      }
    ],
    "Galaxy Tân Bình": [
      {
        name: "Galaxy Tân Bình",
        address: "246 Nguyễn Hồng Đào, Tân Bình, TP.HCM",
        phone: "028 7300 8882",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"
      }
    ],
    "Galaxy Kinh Dương Vương": [
      {
        name: "Galaxy Kinh Dương Vương",
        address: "718bis Kinh Dương Vương, Quận 6, TP.HCM",
        phone: "028 7300 8883",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
      }
    ]
  };

  const showtimes = [
    "10:00", "12:30", "15:00", "17:30", "20:00", "22:30"
  ];

  const items = Object.keys(cinemaData).map((key, index) => ({
    key: index.toString(),
    label: key,
    children: (
      <div className="space-y-4">
        {cinemaData[key].map((cinema, idx) => (
          <Card key={idx} className="shadow-md">
            <div className="flex flex-col lg:flex-row gap-4">
              <img 
                src={cinema.image} 
                alt={cinema.name}
                className="w-full lg:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{cinema.name}</h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <EnvironmentOutlined />
                    <span>{cinema.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutlined />
                    <span>{cinema.phone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined />
                    <span className="font-semibold">Suất chiếu hôm nay:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {showtimes.map((time, timeIdx) => (
                      <Button 
                        key={timeIdx}
                        size="small"
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    ),
  }));

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <Tabs 
        defaultActiveKey="0" 
        items={items}
        className="cinema-tabs"
        tabBarStyle={{ 
          borderBottom: '2px solid #f0f0f0',
          marginBottom: '24px'
        }}
      />
    </div>
  );
};

export default CinemaSystem;