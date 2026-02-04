export type AssetCategory =
    | '3-year'
    | '5-year'
    | '7-year'
    | '10-year'
    | '15-year'
    | '20-year'
    | '27.5-year'
    | '39-year'
    | 'Sound Recording'
    | 'Film/Production'
    | 'Software';

export interface AssetTypeDef {
    id: string;
    name: string;
    category: AssetCategory;
    recoveryPeriod: number;
    bonusEligible: boolean;
    description: string;
}

export const ASSET_TYPES: AssetTypeDef[] = [
    {
        id: 'vehicles_heavy',
        name: 'Heavy Vehicles (>6,000 lbs)',
        category: '5-year',
        recoveryPeriod: 5,
        bonusEligible: true,
        description: 'SUVs, trucks, and vans over 6,000 lbs GVWR.',
    },
    {
        id: 'vehicles_light',
        name: 'Passenger Vehicles (<6,000 lbs)',
        category: '5-year',
        recoveryPeriod: 5,
        bonusEligible: true, // Subject to luxury limits
        description: 'Cars and light trucks under 6,000 lbs.',
    },
    {
        id: 'computer_equipment',
        name: 'Computers & Peripheral Equipment',
        category: '5-year',
        recoveryPeriod: 5,
        bonusEligible: true,
        description: 'Laptops, desktops, servers, and peripherals.',
    },
    {
        id: 'office_machinery',
        name: 'Office Machinery',
        category: '5-year',
        recoveryPeriod: 5,
        bonusEligible: true,
        description: 'Copiers, calculators, typewriters.',
    },
    {
        id: 'medical_equipment',
        name: 'Medical & Dental Equipment',
        category: '5-year',
        recoveryPeriod: 5,
        bonusEligible: true,
        description: 'X-ray machines, dental chairs, patient monitors.',
    },
    {
        id: 'office_furniture',
        name: 'Office Furniture & Fixtures',
        category: '7-year',
        recoveryPeriod: 7,
        bonusEligible: true,
        description: 'Desks, chairs, safes, files.',
    },
    {
        id: 'agricultural_machinery',
        name: 'Agricultural Machinery',
        category: '7-year',
        recoveryPeriod: 7,
        bonusEligible: true, // 5-year for some, generally 7
        description: 'Machinery and equipment used in farming.',
    },
    {
        id: 'land_improvements',
        name: 'Land Improvements',
        category: '15-year',
        recoveryPeriod: 15,
        bonusEligible: true,
        description: 'Sidewalks, fences, landscaping.',
    },
    {
        id: 'sound_recording',
        name: 'Sound Recording Productions',
        category: 'Sound Recording',
        recoveryPeriod: 3, // Often treated as 3-year or income forecast methods, but bonus eligible.
        bonusEligible: true,
        description: 'Qualified sound recording productions (OBBBA eligible).',
    },
    {
        id: 'film_production',
        name: 'Qualified Film/TV Production',
        category: 'Film/Production',
        recoveryPeriod: 3, // Check specific rules
        bonusEligible: true,
        description: 'Qualified film and television productions.',
    },
    {
        id: 'hvac_roofing',
        name: 'HVAC & Roofing (Non-residential)',
        category: '39-year', // BUT eligible for Sec 179!
        recoveryPeriod: 39,
        bonusEligible: false, // Usually not bonus eligible if real property, but Sec 179 eligible.
        description: 'Heating, ventilation, air-conditioning, and roofing systems.',
    }
];

export const SECTION_179_ELIGIBLE_CATEGORIES = [
    '3-year', '5-year', '7-year', '10-year', '15-year', '20-year',
    'Sound Recording', 'Film/Production', 'Software', 'Computer Equipment'
];
