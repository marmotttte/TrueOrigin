import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { BarcodeType, ScanningResult } from "expo-camera";
import {
  checkOpenFoodFacts,
  checkUpcDatabaseOrg,
  checkUPCItemDB,
} from "@/Utils/BarcodeDataLookup";
import { getCountryFromBarcode } from "@/components/barcode-scanner/barcodeCountryMap";

// Define the shape of the state
interface BarcodeState {
  scannedData: ScanningResult | undefined;
  scannedProduct: Product | undefined;
}

export interface Product {
  brand: string;
  countries: string;
  manufacturingCountry: string;
  purchasePlaces: string;
  productName: string;
  registrationCountry: string;
}

// Define action types
type BarcodeAction =
  | { type: "RESET_SCAN" }
  | { type: "SET_SCANNED_PRODUCT"; payload: Product }
  | { type: "SET_SCANNING_RESULT"; payload: ScanningResult };

// Initial state
const initialState: BarcodeState = {
  scannedData: undefined,
  scannedProduct: undefined,
};

// Reducer function
const barcodeReducer = (
  state: BarcodeState,
  action: BarcodeAction,
): BarcodeState => {
  switch (action.type) {
    case "SET_SCANNING_RESULT":
      return {
        ...state,
        scannedData: action.payload,
        scannedProduct: undefined,
      };
    case "RESET_SCAN":
      return { ...state, scannedData: undefined, scannedProduct: undefined };
    case "SET_SCANNED_PRODUCT":
      return { ...state, scannedProduct: action.payload };
    default:
      return state;
  }
};

// Create Context
const BarcodeContext = createContext<{
  state: BarcodeState;
  dispatch: React.Dispatch<BarcodeAction>;
}>({ state: initialState, dispatch: () => {} });

export const BarcodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(barcodeReducer, initialState);

  useEffect(() => {
    if (!state.scannedData || state.scannedData.data == undefined) {
      return;
    }

    function normalizeBarcode(type: string, barcode: string): string {
      if (type === "upc_a" && barcode.length === 12) {
        return "0" + barcode; // Convert UPC-A to EAN-13
      }

      if (type === "upc_e" && barcode.length === 8) {
        return expandUPCEtoUPCA(barcode); // Expand UPC-E to UPC-A
      }

      return barcode; // EAN-8 and EAN-13 remain unchanged
    }

    // Function to expand UPC-E to UPC-A (placeholder, implementation needed)
    function expandUPCEtoUPCA(upcE: string): string {
      // You need a proper UPC-E to UPC-A expansion logic
      return upcE; // Placeholder, replace with actual logic
    }

    const loadUpcData = async (type: BarcodeType, upc: string) => {
      //Data from lookup databases
      let registrationCountry = "Not A UPC or EAN";
      if (
        type == "upc_e" ||
        type == "upc_a" ||
        type == "ean8" ||
        type == "ean13"
      ) {
        const normalizedUpc = normalizeBarcode(type, upc);
        registrationCountry = getCountryFromBarcode(normalizedUpc);
      }

      dispatch({
        type: "SET_SCANNED_PRODUCT",
        payload: {
          brand: " ",
          countries: "",
          manufacturingCountry: "",
          purchasePlaces: "",
          productName: "",
          registrationCountry: registrationCountry,
        },
      });

      //Search online

      try {
        const openFoodResponse = await checkOpenFoodFacts(upc);
        if (openFoodResponse?.status === 1) {
          console.log(openFoodResponse.product);
          const product = openFoodResponse?.product;

          dispatch({
            type: "SET_SCANNED_PRODUCT",
            payload: {
              brand: product?.brands,
              countries: product?.countries,
              manufacturingCountry: product?.manufacturing_places,
              purchasePlaces: product?.purchase_places,
              productName: product?.product_name,
              registrationCountry: registrationCountry,
            },
          });

          return;
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const uPCItemDBResponse = await checkUPCItemDB(upc);
        if (
          uPCItemDBResponse?.total > 0 &&
          uPCItemDBResponse?.items != undefined
        ) {
          console.log(uPCItemDBResponse?.items[0]);
          dispatch({
            type: "SET_SCANNED_PRODUCT",
            payload: {
              brand: uPCItemDBResponse?.items[0]?.brand,
              manufacturingCountry: "",
              purchasePlaces: "",
              productName: uPCItemDBResponse?.items[0]?.title,
              countries: "",
              registrationCountry: registrationCountry,
            },
          });

          return;
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await checkUpcDatabaseOrg(upc);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    loadUpcData(state.scannedData.type as BarcodeType, state.scannedData.data);
  }, [state.scannedData]);

  return (
    <BarcodeContext.Provider value={{ state, dispatch }}>
      {children}
    </BarcodeContext.Provider>
  );
};

export default BarcodeContext;
