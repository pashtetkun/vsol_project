///ES6 module syntax
import LocalizedStrings from 'react-localization';

let localizations = new LocalizedStrings({
  en:{
	  //HiddenCountries
	  hiddenCountriesReloadBtn:"Reload hidden countries",

	  //CountriesTable
	  countriesTableHeaderIndex:"№",
	  countriesTableHeaderCountry:"Country",
	  countriesTableHeaderCount:"Count",
  },
  ru: {
	  //HiddenCountries
	  hiddenCountriesReloadBtn:"Перезалить скрытые клубы",

	  //CountriesTable
	  countriesTableHeaderIndex:"№",
	  countriesTableHeaderCountry:"Страна",
	  countriesTableHeaderCount:"Кол-во",
  }
});

export default localizations