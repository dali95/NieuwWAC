package nl.hu.v1wac.firstapp.webservices;


import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryDAO;

public class WorldService {

	private CountryDAO countryDAO = new CountryDAO();


	public List<Country> getAllCountries() {
		return countryDAO.findAll();
	}

	public List<Country> get10LargestPopulations() {
		return countryDAO.find10LargestPopulations();
	}

	public List<Country> get10LargestSurfaces() {
		return countryDAO.find10LargestSurfaces();
	}

	public Country getCountryByCode(String code) {
		return countryDAO.findByCode(code);
	}

	public List<Country> findBySearch(String search) {
		return countryDAO.findBySearch(search);
	}

	public boolean deleteCountry(String code){
		return countryDAO.delete(code);
	}

	public int createCountry(Country c) {
		int i = countryDAO.Insert(c);
		return i;
	}

	public void adjustCountry(Country c) {
		countryDAO.Adjust(c);

	}
}
