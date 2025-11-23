import seedData from '../../seed.json';
import { VendorCard } from '../types';
import { generateRandomColor } from '../utils/colors';

export const aiVendors: VendorCard[] = seedData.map((vendor: any) => ({
    ...vendor,
    color: generateRandomColor(),
    description: vendor.summary || "No description available.",
}));
