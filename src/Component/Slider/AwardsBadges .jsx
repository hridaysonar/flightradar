import React from 'react';

const AwardsBadges = () => {
  const awards = [
    {
      type: 'guinness',
      title: 'MOST COUNTRIES FLOWN TO BY AN AIRLINE',
      logo: 'GUINNESS WORLD RECORDS',
      bgColor: 'bg-blue-900',
      textColor: 'text-white',
      accentColor: 'bg-yellow-400'
    },
    {
      type: 'world-class',
      title: 'WORLD CLASS AIRLINE',
      subtitle: '2024',
      bgColor: 'bg-white dark:bg-gray-800',
      textColor: 'text-gray-800 dark:text-white',
      stars: 5
    },
    {
      type: 'apex',
      title: 'FIVE STAR GLOBAL AIRLINE',
      subtitle: '2023',
      bgColor: 'bg-blue-900',
      textColor: 'text-white',
      logo: 'APEX'
    },
    {
      type: 'skytrax-airline',
      title: 'BEST AIRLINE IN EUROPE',
      subtitle: '2023',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
      logo: 'SKYTRAX',
      stars: 5
    },
    {
      type: 'skytrax-business',
      title: 'BEST BUSINESS CLASS CATERING',
      subtitle: '2023',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
      logo: 'SKYTRAX'
    },
    {
      type: 'apex-entertainment',
      title: 'BEST INFLIGHT ENTERTAINMENT SYSTEM IN EUROPE',
      bgColor: 'bg-black',
      textColor: 'text-white',
      logo: 'APEX'
    }
  ];

  const StarRating = ({ count = 5 }) => (
    <div className="flex justify-center gap-[10px] mb-1">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xs">★</span>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Awards & Recognition
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6 max-w-6xl mx-auto">
        {awards.map((award, index) => (
          <div
            key={index}
            className={`
              ${award.bgColor} ${award.textColor}
              rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center
              text-center p-2 shadow-lg border-2 border-white dark:border-gray-700
              hover:scale-105 transition-transform duration-200
            `}
          >
            {award.type === 'guinness' && (
              <>
                <div className={`${award.accentColor} rounded-full px-2 py-1 mb-1`}>
                  <span className="text-blue-900 text-[6px] font-bold">RECORD HOLDER</span>
                </div>
                <div className="text-[7px] font-bold leading-tight">
                  {award.title}
                </div>
              </>
            )}

            {award.type === 'world-class' && (
              <>
                <StarRating count={award.stars} />
                <div className="text-[8px] font-bold leading-tight mb-1">
                  WORLD CLASS
                </div>
                <div className="text-[7px] font-semibold">
                  AIRLINE
                </div>
                <div className="text-[6px] text-gray-600 dark:text-gray-300">
                  {award.subtitle}
                </div>
              </>
            )}

            {award.type === 'apex' && (
              <>
                <div className="text-[6px] font-bold mb-1">{award.logo}</div>
                <StarRating count={5} />
                <div className="text-[7px] font-bold leading-tight">
                  {award.title}
                </div>
                <div className="text-[6px]">{award.subtitle}</div>
              </>
            )}

            {(award.type === 'skytrax-airline' || award.type === 'skytrax-business') && (
              <>
                {award.stars && <StarRating count={award.stars} />}
                <div className="text-[6px] font-bold mb-1">{award.logo}</div>
                <div className="text-[7px] font-bold leading-tight">
                  {award.title}
                </div>
                <div className="text-[6px]">{award.subtitle}</div>
              </>
            )}

            {award.type === 'apex-entertainment' && (
              <>
                <div className="text-[6px] font-bold mb-1">{award.logo}</div>
                <div className="text-[7px] font-bold leading-tight">
                  {award.title}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsBadges;
