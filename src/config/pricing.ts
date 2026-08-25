// src/config/pricing.ts

export type CountryCode = 'EG' | 'SA' | 'KW' | 'AE' | 'QA' | 'BH' | 'OTHER';
export type PackageCode = 'elite' | 'max';
export type DurationCode = '3m' | '6m';

export interface PackagePrice {
    baseDurationMonths: number;
    freeMonths: number;
    finalAmount: number;
    originalAmount?: number;
}

export const PRICING_DATA: Record<CountryCode, Record<PackageCode, Record<DurationCode, PackagePrice>>> = {
    EG: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 3000, originalAmount: 5000 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 5500, originalAmount: 9000 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 4500, originalAmount: 7500 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 8000, originalAmount: 13000 },
        }
    },
    SA: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 400, originalAmount: 650 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 750, originalAmount: 1200 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 600, originalAmount: 1000 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 1100, originalAmount: 1800 },
        }
    },
    KW: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 30, originalAmount: 50 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 55, originalAmount: 90 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 45, originalAmount: 75 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 80, originalAmount: 130 },
        }
    },
    AE: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 400, originalAmount: 650 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 750, originalAmount: 1200 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 600, originalAmount: 1000 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 1100, originalAmount: 1800 },
        }
    },
    QA: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 400, originalAmount: 650 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 750, originalAmount: 1200 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 600, originalAmount: 1000 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 1100, originalAmount: 1800 },
        }
    },
    BH: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 40, originalAmount: 65 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 75, originalAmount: 120 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 60, originalAmount: 100 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 110, originalAmount: 180 },
        }
    },
    OTHER: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 100, originalAmount: 160 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 180, originalAmount: 300 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 150, originalAmount: 250 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 270, originalAmount: 450 },
        }
    }
};

export const getPrice = (country: CountryCode, pkg: PackageCode, duration: DurationCode) => {
    return PRICING_DATA[country]?.[pkg]?.[duration];
};
