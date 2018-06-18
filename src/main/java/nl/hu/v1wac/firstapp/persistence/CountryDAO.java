package nl.hu.v1wac.firstapp.persistence;


import java.sql.*;
import java.util.*;

import nl.hu.v1wac.firstapp.webservices.Country;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

public class CountryDAO extends BaseDAO {

    private List<Country> selectCountry(String query) {
        List<Country> results = new ArrayList<Country>();

        try (Connection con = super.getConnection()) {
            Statement stmt = con.createStatement();
            ResultSet dbResultSet = stmt.executeQuery(query);

            while (dbResultSet.next()) {
                String code = dbResultSet.getString("code");
                String iso3 = dbResultSet.getString("iso3");
                String name = dbResultSet.getString("name");
                String capital = dbResultSet.getString("capital");
                String continent = dbResultSet.getString("continent");
                String region = dbResultSet.getString("region");
                double surface = dbResultSet.getDouble("surfacearea");
                int population = dbResultSet.getInt("population");
                String government = dbResultSet.getString("governmentform");
                double latitude = dbResultSet.getDouble("latitude");
                double longitude = dbResultSet.getDouble("longitude");
                // code2, code,
                Country newCountry = new Country(code, iso3, name, capital, continent, region, surface, population, government, latitude, longitude);
                results.add(newCountry);

            }
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
        return results;
    }

    public List<Country> findAll() {
        return selectCountry("SELECT * FROM country ORDER BY name asc");
    }

    public Country findByCode(String incode){
        return selectCountry("SELECT * FROM country WHERE code = '"+ incode + "'" ).get(0);
    }

    public List<Country> find10LargestPopulations() {
        return selectCountry("SELECT * FROM country ORDER BY population desc limit 10");
    }

    public List<Country> find10LargestSurfaces() {
        return selectCountry("SELECT * FROM country ORDER BY surfacearea desc limit 10");
    }

    public List<Country> findBySearch(String search){

        //probeer van search een nummer te maken zo ja.. zoek in de nummers, zoniet: zoek in de strings

        return selectCountry("SELECT * FROM country WHERE code = '"+ search + "' OR name = '"+ search + "' OR region = '"+ search + "' OR localname = '"+ search + "' OR governmentform = '"+ search + "' OR headofstate = '"+ search + "' OR code2 = '"+ search + "' OR capital = '"+ search + "'");
    }











    public int Insert(Country c) {
        int i = 1;

        try (Connection con = super.getConnection()) {


            Statement stmt = con.createStatement();

            String query = "insert into country(code,iso3,name,continent,region,surfacearea,population,governmentform,capital) values('" + c.getCode() + "','" + c.getIso3() + "','" + c.getName() + "','" + c.getContinent() + "','" + c.getRegion() + "'," + c.getSurface() + "," + c.getPopulation() + ",'" + c.getGovernment() + "','" + c.getCapital() + "')";
            stmt.executeUpdate(query);

        } catch (SQLException e) {
        i = 0;
        }
        return i;

    }






    public void Adjust(Country c) {
        try (Connection con = super.getConnection()) {




            Statement stmt = con.createStatement();



            String sql ="UPDATE country set code = '"+c.getCode()+"' , name = '"+c.getName()+"', capital = '"+c.getCapital()+"', continent = '"+c.getContinent()+"', region = '"+c.getRegion()+"', surfacearea = "+c.getSurface()+", population = "+c.getPopulation()+", governmentform = '"+c.getGovernment()+"', latitude = "+c.getLatitude()+", longitude = "+c.getLongitude()+""+
                    "WHERE code = '"+c.getCode()+"'";

            stmt.executeUpdate(sql);
        }
        catch(SQLException e){
            e.printStackTrace();
        }
    }




    public boolean delete(String code){
        boolean result = false;

        String query =	"delete from country where code= '"+code+"'";
        try (Connection con = getConnection()) {

            Statement stmt = con.createStatement();
            if(stmt.executeUpdate(query) == 1) {
                result = true;
            }
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
        return result;
    }









}