// src/utils/api.ts

import { CountryCode, DurationCode, PackageCode } from '../config/pricing';
import type { PackagePrice } from '../config/pricing';

export interface CreateOrderData {
    customer_name: string;
    phone_number: string;
    phone_country_code: string;
    residence_country: CountryCode;
    detected_country?: string;
    package_code: PackageCode;
    duration_code: DurationCode;
    priceData?: PackagePrice;
}

export interface OrderDetails {
    order_number: string;
    customer_name: string;
    phone_number: string;
    residence_country: CountryCode;
    package_code: PackageCode;
    duration_code: DurationCode;
    base_duration_months: number;
    free_months: number;
    total_duration_months: number;
    currency_code: string;
    final_amount: number;
    status: string;
}

// Map country to currency
export const getCurrencyCode = (country: CountryCode) => {
    const map: Record<CountryCode, string> = {
        EG: 'EGP',
        SA: 'SAR',
        KW: 'KWD',
        AE: 'AED',
        QA: 'QAR',
        BH: 'BHD',
        OTHER: 'USD'
    };
    return map[country] || 'USD';
};

// Mock local storage for AI Studio preview
const MOCK_ORDERS_DB: Record<string, OrderDetails> = {};

export const createOrder = async (data: CreateOrderData): Promise<{ success: boolean; order_number?: string; error?: string }> => {
    // Try to call actual backend if deployed
    try {
        const response = await fetch('/api/orders.php?action=create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                return result;
            } else {
                throw new Error("Not JSON");
            }
        }
    } catch (err) {
        console.warn('Real API not available, falling back to mock (useful for dev/preview).');
    }

    // Fallback Mock Logic
    const priceData = data.priceData;
    if (!priceData) {
        return { success: false, error: 'Invalid package or country.' };
    }

    const orderNumber = `KZ-${new Date().toISOString().slice(2,10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    const newOrder: OrderDetails = {
        order_number: orderNumber,
        customer_name: data.customer_name,
        phone_number: data.phone_number,
        residence_country: data.residence_country,
        package_code: data.package_code,
        duration_code: data.duration_code,
        base_duration_months: priceData.baseDurationMonths,
        free_months: priceData.freeMonths,
        total_duration_months: priceData.baseDurationMonths + priceData.freeMonths,
        currency_code: getCurrencyCode(data.residence_country),
        final_amount: priceData.finalAmount,
        status: 'pending_payment'
    };

    MOCK_ORDERS_DB[orderNumber] = newOrder;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return { success: true, order_number: orderNumber };
};

export const getOrder = async (orderNumber: string): Promise<{ success: boolean; order?: OrderDetails; error?: string }> => {
    // Try real API
    try {
        const response = await fetch(`/api/orders.php?id=${orderNumber}`);
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                return result;
            } else {
                throw new Error("Not JSON");
            }
        }
    } catch (err) {
        console.warn('Real API not available, falling back to mock.');
    }

    // Fallback Mock Logic
    await new Promise(resolve => setTimeout(resolve, 600));
    const order = MOCK_ORDERS_DB[orderNumber];
    
    if (order) {
        return { success: true, order };
    }
    
    return { success: false, error: 'Order not found.' };
};
