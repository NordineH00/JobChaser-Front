import React, { useRef } from 'react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  heightCard?: string;
  widthCard?: string;
}

// This is the component in which pending applications and upcoming events will displayed
const Carousel = <T extends { id: any }>({ items, renderItem, title, heightCard = "h-64", widthCard = "w-72" }: CarouselProps<T>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  //style pour les cartes du carroussel
  const classCard = `flex ${heightCard} items-stretch overflow-x-auto space-x-4 pb-4 scrollbar-hide`;
  // Horizontal scrolling handler
  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={classCard}
        >
          {items.map((item) => (
            <div key={item.id} className={`flex-none ${widthCard} h-full`}>
              <div className='h-full'>
                {renderItem(item)}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(-300)}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white z-10"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll(300)}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white z-10"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
