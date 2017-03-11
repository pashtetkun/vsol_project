///ES6 module syntax
import LocalizedStrings from 'react-localization';

let localizations = new LocalizedStrings({
  en:{
	  //HiddenCountries
	  hiddenCountriesShowBtn:"Show hidden countries",

	  //CountriesTable
	  countriesTableHeaderIndex:"№",
	  countriesTableHeaderCountry:"Country",
	  countriesTableHeaderCount:"Count",
  },
  ru: {
	  //HiddenCountries
	  hiddenCountriesShowBtn:"Показать скрытые клубы",

	  //CountriesTable
	  countriesTableHeaderIndex:"№",
	  countriesTableHeaderCountry:"Страна",
	  countriesTableHeaderCount:"Кол-во",
  }
});

export default localizations