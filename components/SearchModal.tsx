import React, { useState, useMemo } from 'react';
import type { FilterOptions } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { SearchIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/CoreIcons';

interface SearchModalProps {
  onClose: () => void;
  onSearch: (filters: Partial<FilterOptions>) => void;
}

const GuestSelector: React.FC<{ guests: FilterOptions['guests'], onChange: (guests: FilterOptions['guests']) => void }> = ({ guests, onChange }) => {
    const { t } = useLocalization();
    const guestState = guests || { adults: 1, children: 0, infants: 0 };

    const handleCountChange = (type: 'adults' | 'children' | 'infants', delta: number) => {
        const current = guestState[type];
        if (current + delta >= 0) {
            // Adults must be at least 1 if there are children or infants
            if (type === 'adults' && current + delta === 0 && (guestState.children > 0 || guestState.infants > 0)) return;
            onChange({ ...guestState, [type]: current + delta });
        }
    };

    return (
        <div className="absolute top-full mt-2 right-0 w-72 sm:w-80 bg-white rounded-2xl shadow-lg border p-6 z-10">
            {(['adults', 'children', 'infants'] as const).map(type => (
                <div key={type} className="flex justify-between items-center py-4 border-b last:border-b-0">
                    <div>
                        <p className="font-semibold capitalize">{t(type)}</p>
                        <p className="text-sm text-gray-500">{t({adults: 'ages_13_or_above', children: 'ages_2_12', infants: 'under_2'}[type])}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button onClick={() => handleCountChange(type, -1)} className="w-8 h-8 border rounded-full text-gray-500 hover:border-gray-900 disabled:opacity-50" disabled={guestState[type] === 0 || (type === 'adults' && guestState[type] === 1)}>-</button>
                        <span>{guestState[type]}</span>
                        <button onClick={() => handleCountChange(type, 1)} className="w-8 h-8 border rounded-full text-gray-500 hover:border-gray-900">+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Calendar: React.FC<{
    checkInDate: Date | null,
    checkOutDate: Date | null,
    onDateSelect: (date: Date) => void
}> = ({ checkInDate, checkOutDate, onDateSelect }) => {
    const [displayDate, setDisplayDate] = useState(new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const currentYear = displayDate.getFullYear();
    const currentMonth = displayDate.getMonth();
    
    const calendarDays = useMemo(() => {
        const totalDays = daysInMonth(currentYear, currentMonth);
        const startDay = firstDayOfMonth(currentYear, currentMonth);
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = (checkInDate && date.getTime() === checkInDate.getTime()) || (checkOutDate && date.getTime() === checkOutDate.getTime());
            const isInRange = checkInDate && checkOutDate && date > checkInDate && date < checkOutDate;
            const isPast = date < new Date() && date.toDateString() !== new Date().toDateString();

            days.push(
                <button
                    key={day}
                    disabled={isPast}
                    onClick={() => onDateSelect(date)}
                    className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-full text-xs sm:text-sm disabled:text-gray-300 disabled:cursor-not-allowed
                        ${isPast ? '' : 'hover:border hover:border-black'}
                        ${isInRange ? 'bg-gray-100' : ''}
                        ${isSelected ? 'bg-black text-white' : ''}
                    `}
                >
                    {day}
                </button>
            );
        }
        return days;
    }, [currentYear, currentMonth, checkInDate, checkOutDate, onDateSelect]);

    const handlePrevMonth = () => setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
    const handleNextMonth = () => setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
    
    return (
        <div className="p-4">
             <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon className="h-5 w-5"/></button>
                <div className="font-semibold">{displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon className="h-5 w-5"/></button>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-gray-500 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">{calendarDays}</div>
        </div>
    );
};


const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSearch }) => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState('stays');
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [activeDateInput, setActiveDateInput] = useState<'checkin' | 'checkout' | null>(null);
  const [guests, setGuests] = useState<FilterOptions['guests']>({ adults: 1, children: 0, infants: 0 });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  
  const handleDateSelect = (date: Date) => {
    if (activeDateInput === 'checkin' || !checkInDate || date < checkInDate) {
      setCheckInDate(date);
      setCheckOutDate(null);
      setActiveDateInput('checkout');
    } else if (activeDateInput === 'checkout') {
      setCheckOutDate(date);
      setActiveDateInput(null);
    }
  };

  const handleSearch = () => {
    onSearch({ location, guests, checkIn: checkInDate, checkOut: checkOutDate });
    onClose();
  };
  
  const totalGuests = guests.adults + guests.children;
  const formatDate = (date: Date | null) => date ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center pt-10" onClick={onClose}>
      <div className="bg-white rounded-xl mx-4 sm:mx-0 w-full max-w-3xl h-fit animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <div className="flex items-center">
             <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 mr-4">
              <CloseIcon className="h-5 w-5" />
            </button>
            <div className="flex space-x-4 text-gray-600">
                <button className={`py-2 px-4 rounded-full ${activeTab === 'stays' ? 'bg-gray-100 text-black font-semibold' : ''}`} onClick={() => setActiveTab('stays')}>{t('stays')}</button>
                <button className={`py-2 px-4 rounded-full ${activeTab === 'experiences' ? 'bg-gray-100 text-black font-semibold' : ''}`} onClick={() => setActiveTab('experiences')}>{t('experiences')}</button>
            </div>
          </div>
        </div>

        <div className="p-2 sm:p-6">
            <div className="grid grid-cols-1 border rounded-lg shadow-sm divide-y md:divide-y-0 md:divide-x md:grid-cols-[1fr_1fr_auto]">
                <div className="p-4">
                    <label htmlFor="location" className="block text-xs font-bold">{t('where_destination')}</label>
                    <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t('search_destinations')} className="w-full text-sm outline-none placeholder-gray-400 bg-transparent" />
                </div>
                 <div className="flex">
                    <button onClick={() => setActiveDateInput('checkin')} className={`flex-1 p-4 text-left ${activeDateInput === 'checkin' ? 'bg-gray-100 rounded-lg' : ''}`}>
                        <p className="text-xs font-bold">{t('check_in')}</p>
                        <p className="text-sm text-gray-400">{formatDate(checkInDate) || t('add_dates')}</p>
                    </button>
                     <button onClick={() => setActiveDateInput('checkout')} className={`flex-1 p-4 text-left ${activeDateInput === 'checkout' ? 'bg-gray-100 rounded-lg' : ''}`}>
                        <p className="text-xs font-bold">{t('check_out')}</p>
                        <p className="text-sm text-gray-400">{formatDate(checkOutDate) || t('add_dates')}</p>
                    </button>
                </div>
                <div className="relative p-2 pr-2 md:p-2 flex justify-between items-center">
                    <div className="flex-1 cursor-pointer p-2" onClick={() => setShowGuestSelector(!showGuestSelector)}>
                        <p className="text-xs font-bold">{t('who')}</p>
                        <p className="text-sm text-gray-400">{totalGuests > 0 ? `${totalGuests} ${t('guests')}`: t('add_guests')}</p>
                    </div>
                    <button onClick={handleSearch} className="bg-[#FF385C] text-white font-semibold py-3 px-3 sm:px-6 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition">
                       <SearchIcon className="h-4 w-4" />
                       <span className="hidden sm:inline">{t('search')}</span>
                    </button>
                    {showGuestSelector && <GuestSelector guests={guests} onChange={setGuests} />}
                </div>
            </div>
            {activeDateInput && <Calendar checkInDate={checkInDate} checkOutDate={checkOutDate} onDateSelect={handleDateSelect} />}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;