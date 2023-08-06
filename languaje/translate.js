import translations from './translations';

const defaultLanguage = 'es';

const translate = (key, language = defaultLanguage) => {
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }
  return key;
};

export default translate;