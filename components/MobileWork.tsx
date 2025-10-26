import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import type { Translations, MobileProject } from '../types.ts';

interface MobileWorkProps {
  projects: MobileProject[];
}

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);
const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PhoneMockupBody: React.FC<{ imageUrl: string; className?: string; onMouseEnter?: () => void; onClick?: () => void; }> = ({ imageUrl, className, onMouseEnter, onClick }) => (
  <div 
    className={`w-40 sm:w-64 pointer-events-auto md:cursor-default cursor-pointer ${className || ''}`}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
  >
    <div className="bg-gray-900 border-4 border-gray-800 rounded-[40px] p-2 shadow-2xl shadow-black/60">
      <div className="bg-black rounded-[32px] overflow-hidden aspect-[9/19.5]">
        <img 
          src={imageUrl} 
          alt="Mobile screenshot"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);


export const MobileWork: React.FC<MobileWorkProps> = ({ projects }) => {
  const { translations, isLoading, direction: langDirection } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = direction === 'next'
          ? (prev + 1) % projects.length
          : (prev - 1 + projects.length) % projects.length;
        return newIndex;
      });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 500);
  };

  useEffect(() => {
    setFocusedIndex(null);
  }, [currentIndex]);
  
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGalleryOpen]);

  if (isLoading || !translations) {
    return <section id="mobile-work" className="py-20" />;
  }
  
  const currentProject = projects[currentIndex];
  const { titleKey, subtitleKey, imageUrls } = currentProject;

  const displayImages = imageUrls.slice(0, 5);
  while (displayImages.length < 5) {
    displayImages.push(displayImages[0] || '');
  }
  
  const defaultClasses = [
    'z-20',
    'transform -translate-x-[30%] sm:-translate-x-[55%] -rotate-[12deg] scale-[.9] z-10',
    'transform translate-x-[30%] sm:translate-x-[55%] rotate-[12deg] scale-[.9] z-10',
    'transform -translate-x-[55%] sm:-translate-x-[110%] -rotate-[24deg] scale-[.8] z-0',
    'transform translate-x-[55%] sm:translate-x-[110%] rotate-[24deg] scale-[.8] z-0',
  ];

  const ArrowButton: React.FC<{direction: 'prev' | 'next'}> = ({ direction }) => {
    const isPrev = direction === 'prev';
    const handleClick = () => {
        const navDirection = (isPrev && langDirection === 'ltr') || (!isPrev && langDirection === 'rtl') ? 'prev' : 'next';
        handleNavigate(navDirection);
    };
    
    return (
        <button
            onClick={handleClick}
            className={`absolute top-1/2 -translate-y-1/2 z-40 bg-white/10 p-2 sm:p-3 rounded-full hover:bg-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${isPrev ? 'left-0 sm:left-4' : 'right-0 sm:right-4'}`}
            aria-label={isPrev ? 'Previous Project' : 'Next Project'}
        >
            {isPrev ? <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> : <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
        </button>
    );
  };

  const handleImageClick = (imageIndex: number) => {
    if (window.innerWidth < 768) { // Tailwind's `md` breakpoint
        setGalleryImageIndex(imageIndex);
        setIsGalleryOpen(true);
    }
  };
  
  const handleMouseEnter = (index: number) => {
    if (window.innerWidth >= 768) {
      setFocusedIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setFocusedIndex(null);
    }
  };

  const GalleryModal: React.FC = () => {
    if (!isGalleryOpen) return null;

    const currentImageUrl = currentProject.imageUrls[galleryImageIndex];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setGalleryImageIndex(prev => (prev + 1) % currentProject.imageUrls.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setGalleryImageIndex(prev => (prev - 1 + currentProject.imageUrls.length) % currentProject.imageUrls.length);
    };

    const handleClose = () => setIsGalleryOpen(false);

    return (
      <div 
        className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 transition-opacity duration-300 animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-title"
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 z-10" aria-label="Close gallery">
            <XIcon className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full flex items-center justify-between" onClick={e => e.stopPropagation()}>
          <button onClick={handlePrev} className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 shrink-0 mx-2" aria-label="Previous image">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-sm max-h-[90vh] flex items-center justify-center">
            <img 
              key={currentImageUrl}
              src={currentImageUrl} 
              alt={`Screenshot ${galleryImageIndex + 1}`} 
              className="max-w-full max-h-full object-contain rounded-lg animate-fade-in-up"
              style={{ animationDuration: '0.3s' }}
            />
          </div>
          
          <button onClick={handleNext} className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 shrink-0 mx-2" aria-label="Next image">
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="mobile-work" className="py-20 bg-primary/30 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="gallery-title" className="text-4xl font-extrabold mb-4">{translations.mobile_work_section_title}</h2>
          <p className="text-lg text-gray-text max-w-3xl mx-auto">
            {translations.mobile_work_section_subtitle}
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative mt-16">
          <ArrowButton direction="prev" />
          <ArrowButton direction="next" />

          <div 
            className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <div className="text-center mb-16 h-24 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-2 text-accent">{translations[titleKey] as string}</h3>
              <p className="text-lg text-gray-text max-w-3xl mx-auto">
                  {translations[subtitleKey] as string}
              </p>
            </div>
            
            <div 
              className="flex justify-center items-center min-h-[400px] sm:min-h-[600px]"
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full flex justify-center items-center">
                {displayImages.map((imageUrl, index) => {
                  const isFocused = focusedIndex === index;
                  const isAnotherFocused = focusedIndex !== null && !isFocused;
                  
                  let combinedClasses = defaultClasses[index];

                  if (isFocused) {
                    combinedClasses = 'z-30 scale-105 sm:scale-110 -translate-y-4 rotate-0';
                  } else if (isAnotherFocused) {
                    const translationClass = defaultClasses[index].match(/-?translate-x-\[.*?\]/g)?.join(' ') || '';
                    combinedClasses = `${translationClass} z-0 scale-[.8] opacity-40 filter blur-sm`;
                  }

                  return (
                    <div
                      key={`${currentIndex}-${index}`}
                      className={`absolute transition-all duration-500 ease-in-out ${combinedClasses}`}
                    >
                      <PhoneMockupBody 
                        imageUrl={imageUrl} 
                        onMouseEnter={() => handleMouseEnter(index)}
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <GalleryModal />
    </>
  );
};
