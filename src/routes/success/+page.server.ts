import { fetchFitBitData } from "./fetchFitBitData";

const fitBitData = await fetchFitBitData();
console.log("Fitbit data:", fitBitData);