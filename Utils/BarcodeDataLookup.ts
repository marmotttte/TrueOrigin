import axios from 'axios';
// UPCItemDB API (You need an API key for the trial version)
const UPCItemDB_API = 'https://api.upcitemdb.com/prod/trial/lookup';

// Open Food Facts API (free access for food-related products with barcodes)
const OpenFoodFacts_API = 'https://world.openfoodfacts.org/api/v0/product/';

const upcDatabaseOrg = 'https://api.upcdatabase.org/product/';

const upcDatabaseOrgApiKey = '';

// Function to check UPCItemDB
export async function checkUPCItemDB(upc: string) {
    try {
        const response = await axios.get(UPCItemDB_API, {
            params: { upc: upc }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error with UPCItemDB API:', error?.message);
        return null;
    }
}


// Function to check Open Food Facts (for food products)
export async function checkOpenFoodFacts(upc: string) {
    try {
        const response = await axios.get(`${OpenFoodFacts_API}${upc}.json`);
        return response.data;
    } catch (error: any) {
        console.error('Error with Open Food Facts API:', error?.message);
        return null;
    }
}

export async function checkUpcDatabaseOrg(upc: string) {
    try {
        const response = await axios.get(`${upcDatabaseOrg}${upc}?apikey=${upcDatabaseOrgApiKey}`);
        return response.data;
    } catch (error: any) {
        console.error('Error with Open Food Facts API:', error?.message);
        return null;
    }
}


