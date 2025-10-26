
import React from 'react';
import { TECHNOLOGY_CATEGORIES } from '../constants.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import type { TechnologyCategory } from '../types.ts';

const CategoryCard: React.FC<{ category: TechnologyCategory; index: number }> = ({ category, index }) => {
  const { translations } = useLanguage();

  return (
    <div 
      className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h3 className="text-xl font-bold text-center mb-6 text-accent">
        {translations[category.titleKey as keyof typeof translations] as string}
      </h3>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {category.technologies.map((tech) => (
          <div 
            key={tech.name} 
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="mb-2 text-gray-300 transition-colors duration-300 group-hover:text-white">{tech.icon}</div>
            <span className="font-medium text-sm text-gray-400 transition-colors duration-300 group-hover:text-light">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  const { translations, isLoading } = useLanguage();

  if (isLoading || !translations) {
    return <section id="tech" className="py-20" />;
  }

  return (
    <section id="tech" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">{translations.tech_title}</h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto mt-4">
            {translations.tech_subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {TECHNOLOGY_CATEGORIES.map((category, catIndex) => (
            <CategoryCard key={category.titleKey} category={category} index={catIndex} />
          ))}
        </div>
      </div>
    </section>
  );
};