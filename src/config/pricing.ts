// src/config/pricing.ts

export type CountryCode = 'EG' | 'SA' | 'KW' | 'AE' | 'QA' | 'BH' | 'OTHER';
export type PackageCode = 'elite' | 'max';
export type DurationCode = '3m' | '6m' | '12m';

export interface PackagePrice {
    baseDurationMonths: number;
    freeMonths: number;
    finalAmount: number;
}

export const PRICING_DATA: Record<CountryCode, Record<PackageCode, Record<DurationCode, PackagePrice>>> = {
    EG: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 3000 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 5500 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 10000 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 4500 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 8000 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 15000 },
        }
    },
    SA: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 400 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 750 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 1400 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 600 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 1100 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 2000 },
        }
    },
    KW: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 30 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 55 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 100 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 45 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 80 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 150 },
        }
    },
    AE: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 400 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 750 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 1400 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 600 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 1100 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 2000 },
        }
    },
    QA: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 400 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 750 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 1400 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 600 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 1100 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 2000 },
        }
    },
    BH: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 40 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 75 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 140 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 60 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 110 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 200 },
        }
    },
    OTHER: {
        elite: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 100 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 180 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 320 },
        },
        max: {
            '3m': { baseDurationMonths: 3, freeMonths: 1, finalAmount: 150 },
            '6m': { baseDurationMonths: 6, freeMonths: 2, finalAmount: 270 },
            '12m': { baseDurationMonths: 12, freeMonths: 3, finalAmount: 480 },
        }
    }
};

export const getPrice = (country: CountryCode, pkg: PackageCode, duration: DurationCode) => {
    return PRICING_DATA[country]?.[pkg]?.[duration];
};
