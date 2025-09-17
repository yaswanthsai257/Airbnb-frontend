import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import PriceFilter from './PriceFilter';
// Removed AirbnbLogoIcon from this import
import { GlobeIcon, MenuIcon, UserIcon, SearchIcon } from './icons/CoreIcons';
import { useLocalization } from '../hooks/useLocalization';
import type { FilterOptions } from '../types';

interface HeaderProps {
  onFilterChange?: (filters: Partial<FilterOptions>) => void;
  showMap?: boolean;
  onToggleMap?: () => void;
  filters?: FilterOptions;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange, showMap = false, onToggleMap, filters }) => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLocalization();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleFilterChange = (filters: Partial<FilterOptions>) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
            {/* Left: Logo */}
            <div className="flex-1 lg:flex">
              <button onClick={handleLogoClick} className="flex items-center hover:opacity-80 transition">
                <img 
                  src="/images/pngwing.com.png"
                  alt="Logo"
                  className="h-8 lg:h-10 w-auto"
                />
              </button>
            </div>

            {/* Middle: Search trigger and filters */}
            <div className={`transition-all duration-300 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -translate-y-4'} flex items-center space-x-2 sm:space-x-3`}>
              <div onClick={() => setIsSearchModalOpen(true)} className="w-full lg:w-[380px] border rounded-full py-2 px-2 sm:px-4 shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-center bg-white">
                  <div className="text-xs sm:text-sm font-semibold px-1 sm:px-2 truncate">{t('anywhere')}</div>
                  <div className="hidden sm:block text-xs sm:text-sm font-semibold px-2 sm:px-3 lg:px-4 border-x">{t('any_week')}</div>
                  <div className="text-xs sm:text-sm text-gray-500 pl-1 sm:pl-2 hidden sm:block truncate">{t('add_guests')}</div>
                  <div className="p-1.5 sm:p-2 bg-[#FF385C] rounded-full text-white flex-shrink-0">
                      <SearchIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
              </div>
              
              {/* Price Filter - Hidden on very small screens */}
              <div className="hidden sm:block">
                <PriceFilter
                  priceRange={filters?.priceRange}
                  onPriceRangeChange={(priceRange) => handleFilterChange({ priceRange })}
                />
              </div>
            </div>

            {/* Right: Host, Map Toggle, Lang, Profile */}
            <div className="flex-1 flex justify-end items-center space-x-2 sm:space-x-4">
              <a href="#" className={`hidden lg:block font-semibold px-4 py-2 rounded-full text-sm transition-colors ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}>{t('airbnb_your_home')}</a>
              
              {/* Map Toggle Button */}
              <button 
                onClick={onToggleMap || (() => {})}
                className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 transition-colors text-xs sm:text-sm font-medium shadow-sm"
              >
                <svg className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:block">{showMap ? 'Show List' : 'Show Map'}</span>
              </button>
              
              <button onClick={toggleLanguage} className={`flex items-center p-2 sm:p-3 rounded-full border transition-colors ${isScrolled ? 'border-gray-300 hover:bg-gray-100' : 'border-white/50 hover:bg-white/20 text-white'}`}>
                <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                <span className="text-xs sm:text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className={`flex items-center border rounded-full p-2 space-x-2 transition ${isScrolled ? 'hover:shadow-md' : 'bg-white'}`}>
                  <MenuIcon className="h-5 w-5 text-gray-500" />
                  <UserIcon className="h-8 w-8 text-gray-500 bg-gray-200 rounded-full p-1" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border py-2 text-sm z-50">
                    <a href="#" className="block px-4 py-2 font-semibold hover:bg-gray-100">Sign up</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Log in</a>
                    <div className="border-t my-2"></div>
                    <button onClick={toggleLanguage} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between">
                      <span>{t('language')} ({language === 'en' ? t('english') : t('bangla')})</span>
                      <GlobeIcon className="h-4 w-4" />
                    </button>
                    <div className="border-t my-2"></div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">{t('airbnb_your_home')}</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">{t('help_center')}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
              {/* Full search bar when not scrolled */}
              <div className={`absolute top-24 left-1/2 transition-all duration-300 ${isScrolled ? 'opacity-0 scale-90 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'} -translate-x-[350px] md:-translate-x-[200px] sm:-translate-x-[150px]`}>
                  <div onClick={() => setIsSearchModalOpen(true)} className="w-full lg:w-[850px] bg-white border rounded-full py-2 px-4 shadow-md hover:shadow-lg transition cursor-pointer flex justify-between items-center">
                      <div className="flex-1 text-center">
                          <div className="text-sm font-semibold">{t('where')}</div>
                          <div className="text-xs text-gray-500">{t('search_destinations')}</div>
                      </div>
                      <div className="border-r h-8"></div>
                      <div className="flex-1 text-center">
                          <div className="text-sm font-semibold">{t('check_in')}</div>
                          <div className="text-xs text-gray-500">{t('add_dates')}</div>
                      </div>
                      <div className="border-r h-8"></div>
                      <div className="flex-1 text-center">
                          <div className="text-sm font-semibold">{t('check_out')}</div>
                          <div className="text-xs text-gray-500">{t('add_dates')}</div>
                      </div>
                      <div className="border-r h-8"></div>
                      <div className="flex-1 text-center flex justify-between items-center pl-6 pr-2">
                          <div>
                              <div className="text-sm font-semibold">{t('who')}</div>
                              <div className="text-xs text-gray-500">{t('add_guests')}</div>
                          </div>
                          <div className="p-3 bg-[#FF385C] rounded-full text-white">
                              <SearchIcon className="h-5 w-5" />
                          </div>
                      </div>
                  </div>
                  
                  {/* Mobile Price Filter - Only visible when not scrolled */}
                  <div className="mt-3 sm:hidden">
                    <PriceFilter
                      priceRange={filters?.priceRange}
                      onPriceRangeChange={(priceRange) => handleFilterChange({ priceRange })}
                    />
                  </div>
              </div>
      </header>
      {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleFilterChange} />}
    </>
  );
};

export default Header;