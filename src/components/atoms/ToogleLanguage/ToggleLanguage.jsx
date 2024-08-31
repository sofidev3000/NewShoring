import React, { useState, useEffect } from 'react';

const Languages = [
  { name: 'Español', code: 'es', flag: 'circle-flags:es' },
  { name: 'English', code: 'en', flag: 'emojione:flag-for-us-outlying-islands' },
  { name: 'Chinese', code: 'cn', flag: 'circle-flags:cn' },
  { name: 'French', code: 'fr', flag: 'circle-flags:fr' },
  { name: 'Rusian', code: 'rs', flag: 'circle-flags:ru' },
];

const ToggleLanguage = ({breakpoint='desktop'}) => {

  const [selectedLanguage, setSelectedLanguage] = useState(Languages[0]);

  // Se guarda la selección en localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(JSON.parse(savedLanguage));
    }
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
  };

  return (
    <form className="max-w-sm mx-auto">
      <div className="flex">
        <button
          id={`states-button`}
          data-dropdown-toggle={`dropdown-states-${breakpoint}`}
          className="flex-shrink-0 gap-2 min-w-[119px] z-10 inline-flex items-center py-1 px-1 text-sm font-medium text-center text-gray-100 hover:text-guardsman-red-500 focus:ring-0 focus:outline-none dark:text-white"
          type="button"
        >
          <iconify-icon icon={selectedLanguage.flag}  width="23" height="23"></iconify-icon>
          {selectedLanguage.name}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1 5 5 1 1"
            />
          </svg>
        </button>
        <div
          id={`dropdown-states-${breakpoint}`}
          className="z-[90] hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-black"
        >
          <ul className="py-1 text-sm text-gray-200" aria-labelledby="states-button">
            {Languages.map((language, index) => (
              <li key={`${index}-${breakpoint}`}>
                <button
                  type="button"
                  className="inline-flex gap-2 w-full items-center px-4 py-2 hover:text-guardsman-red-500 hover:bg-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleLanguageChange(language)}
                >
                  <iconify-icon icon={language.flag} width="23" height="23"></iconify-icon>
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default ToggleLanguage;
