import { Brewery } from "@/types/types/Brewery";

export function getUniqueBreweryTypes(breweries: Brewery[]): string[] {
    //using a set to collect unique brewery types
    const types = new Set<string>();
    breweries.forEach(brewery => {
      if (brewery.brewery_type) {
        types.add(brewery.brewery_type);
      }
    });
    return ['All', ...Array.from(types).sort()]; // add 'All Types' as the first option and sort the rest
  }