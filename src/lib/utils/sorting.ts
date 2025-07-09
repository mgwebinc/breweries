import { Brewery } from "@/types/types/Brewery";

export function groupAndSortBreweries(breweries: Brewery[]) {
    const groupedAndSortedBreweries: Brewery[] = [];
    const grouped: { [key: string]: Brewery[] } = {};
    // group breweries by type first
    breweries.forEach(brewery => {
        const breweryType = brewery.brewery_type || "Unknown";
        if (!grouped[breweryType]) {
            grouped[breweryType] = [];
        }
        grouped[breweryType].push(brewery);
    });

    // sort the brewery types alphabetically
    const sortedBreweryTypes = Object.keys(grouped).sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
    );

    sortedBreweryTypes.forEach(breweryType => {
        // sort each brewery by name
        const sortedBreweryByName = [...grouped[breweryType]].sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        groupedAndSortedBreweries.push(...sortedBreweryByName);
    });
    // return the grouped and sorted breweries
    return groupedAndSortedBreweries;
}