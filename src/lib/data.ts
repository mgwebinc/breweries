import { RawBrewery, Brewery } from "../types/types/Brewery";

export async function getBreweries(): Promise<Brewery[]> {
    // Fetch breweries from the Open Brewery DB API 
    const response = await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=200");
    if (!response.ok) {
        throw new Error("Failed to fetch breweries");
    }
    // fetch the breweries with all fields from the API
    const rawBreweries: RawBrewery[] = await response.json();

    // filter data to only return the necessary fields for the BreweryTable
    const breweries: Brewery[] = rawBreweries.map(brewery => ({
        id: brewery.id,
        name: brewery.name,
        country: brewery.country,
        brewery_type: brewery.brewery_type
    }));
    return breweries;
}