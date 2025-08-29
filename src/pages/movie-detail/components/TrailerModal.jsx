import React from "react";
import { Modal } from "antd";

const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  // Function để convert YouTube URL thành embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
  };

  return (
    <Modal
      title={`Trailer - ${movieTitle}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      destroyOnClose
      className="trailer-modal"
    >
      {trailerUrl ? (
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            src={getYouTubeEmbedUrl(trailerUrl)}
            title={`${movieTitle} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            Trailer chưa có sẵn cho phim này
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TrailerModal;
