import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface GalleryItem {
  img: string;
  title: string;
  description: string;
}

interface GalleryProps {
  onClose: () => void;
}

export default function Gallery({ onClose }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems: GalleryItem[] = [
    {
      img: "/gallery/proposal.jfif",
      title: "Capstone Proposal",
      description: "Proposed TaraG to Mr. Jayr Dela Calzada, the chairman of the Commitee on Tourism of the Municipality of Minglanilla"
    },
    {
      img: "/gallery/officer.jfif",
      title: "Department Election",
      description: "Ran for the position of 4th Year Representative of the IT Department of St. Cecilia's College"
    },
    {
      img: "/gallery/seminar.jfif",
      title: "Cybersecurity Seminar",
      description: "Conducted a seminar on Cybersecurity Awareness for 4th Year Students of St. Cecilia's College"
    },
    {
      img: "/gallery/champion.jfif",
      title: "Web Desigining Champion",
      description: "Won 1st Place in Web Designing during the IT Congress 2025"
    },
    {
      img: "/gallery/aquaintance.jfif",
      title: "Aquaintance Party",
      description: "Participated in the Aquaintance Party for the IT Students of St. Cecilia's College"
    }
  ];

  const currentItem = galleryItems[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50"
        />
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 max-w-7xl mx-auto">
        
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-pink-500 transition-colors z-50"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative w-full h-5/6 max-h-screen mt-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 z-10">
        <img
          src={currentItem.img}
          alt={currentItem.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Image Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {currentItem.title}
          </h3>
          <p className="text-white/80">
            {currentItem.description}
          </p>
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-green-500 transition-colors z-20 p-2 bg-black/40 rounded-full hover:bg-black/60"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-green-500 transition-colors z-20 p-2 bg-black/40 rounded-full hover:bg-black/60"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>

      <div className="flex gap-4 pb-2 mt-6 justify-center z-10 overflow-x-auto max-w-full scrollbar-hide">
        {galleryItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "border-2 border-green-500 ring-2 ring-green-500/50"
                : "border border-gray-400/20 dark:border-gray-200/20 hover:border-gray-400/40 dark:hover:border-gray-200/40"
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="text-center mt-4 text-sm text-white z-10">
        {currentIndex + 1} / {galleryItems.length}
      </div>
      </div>
    </>
  );
}
