import axios from "axios";
// UPCItemDB API (You need an API key for the trial version)
const UPCItemDB_API = "https://api.upcitemdb.com/prod/trial/lookup";

// Open Food Facts API (free access for food-related products with barcodes)
const OpenFoodFacts_API = "https://world.openfoodfacts.org/api/v0/product/";

//upc database org
const upcDatabaseOrg = "https://api.upcdatabase.org/product/";
const upcDatabaseOrgApiKey = "";

//G1S
const g1sUrl = "https://www.gs1.org/services/verified-by-gs1/results?gtin=";
const g1sUkUrl = "https://gtincheck.g1suk.org";

// Function to check UPCItemDB
export async function checkUPCItemDB(upc: string) {
  try {
    const response = await axios.get(UPCItemDB_API, {
      params: { upc: upc },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error with UPCItemDB API:", error?.message);
    return null;
  }
}

// Function to check Open Food Facts (for food products)
export async function checkOpenFoodFacts(upc: string) {
  try {
    const response = await axios.get(`${OpenFoodFacts_API}${upc}.json`);
    return response.data;
  } catch (error: any) {
    console.error("Error with Open Food Facts API:", error?.message);
    return null;
  }
}

export async function checkUpcDatabaseOrg(upc: string) {
  try {
    const response = await axios.get(
      `${upcDatabaseOrg}${upc}?apikey=${upcDatabaseOrgApiKey}`,
    );
    return response.data;
  } catch (error: any) {
    console.error("Error with Open Food Facts API:", error?.message);
    return null;
  }
}

export async function checkUpcG1s(upc: string) {
  try {

// Your GS1 US API URL and Key
    const apiUrl = 'https://api.gs1us.org/v1/gtin'; // Example base URL
    const apiKey = 'your-api-key-here'; // Replace with your API key

// Construct the full URL for the request
    const url = `${apiUrl}/${upc}`;

    var result = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
        .then(response => {
          console.log('Product Info:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    console.log(result)

    /*
        const response = await axios.get(
            `https://api.gs1us.org/v1/gtin${upc}`,
        );
        return response.data;


        const axiosInstance = axios.create({
          headers: {
            'Cookie': 'Drupal.visitor.teamMember=no; test_cookie=CheckForPermission; vfs_token=OeJB3I_xLGZV4T9XeYX0aivLKFuR2Ey4IPxcI4hZjM4; OptanonAlertBoxClosed=2025-02-09T18:12:15.116Z; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Feb+09+2025+13%3A12%3A15+GMT-0500+(Eastern+Standard+Time)&version=6.30.0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0002%3A1%2CC0004%3A1&geolocation=CA%3BQC&AwaitingReconsent=false',

          }
        })

        const response = await axiosInstance.get(
            `${g1sUrl}${upc}`,
        );
        return response.data;
        */



  } catch (error: any) {
    console.error("Error with Open Food Facts API:", error?.message);
    return null;
  }
}
