export interface InstructionStep {
    title: string;
    description: string;
}

export interface IndustryContent {
    slug: string;
    title: string; // "Bonus Depreciation for Dentists"
    heroImage: string; // Placeholder or generated
    keyword: string;
    description: string;
    assetExamples: string[]; // "Dental Chairs, X-Ray Machines"
    obbaContext: string; // Specific OBBBA nuance
    usageInstructions: InstructionStep[];
}

export const INDUSTRIES: IndustryContent[] = [
    {
        slug: 'medical',
        title: 'Medical Imaging Equipment Depreciation 2026',
        heroImage: '/images/medical-hero.jpg',
        keyword: 'Medical Equipment Section 179',
        description: 'Maximize tax deductions for medical imaging equipment and healthcare technology. Full OBBBA compliance.',
        assetExamples: ['MRI Machines', 'CT Scanners', 'Ultrasound Units', 'X-Ray Systems'],
        obbaContext: 'Medical imaging equipment placed in service after Jan 19, 2025, qualifies for 100% bonus depreciation under the One Big Beautiful Bill Act.',
        usageInstructions: [
            {
                title: 'Apply Section 179 for Healthcare',
                description: 'Utilize the $2.56M limit for high-cost imaging assets while monitoring the $4.09M phase-out threshold.'
            },
            {
                title: 'Model 100% Bonus Scenarios',
                description: 'Calculate the immediate tax impact of 100% bonus depreciation versus traditional MACRS schedules.'
            }
        ]
    },
    {
        slug: 'hvac',
        title: 'HVAC Section 179 Savings 2026',
        heroImage: '/images/hvac-hero.jpg',
        keyword: 'Section 179 HVAC 2026',
        description: 'Write off high-efficiency HVAC systems for non-residential property. Accelerated savings under 2026 guidelines.',
        assetExamples: ['Rooftop Units', 'Chillers', 'Boilers', 'Ventilation Systems'],
        obbaContext: 'Under Section 179, HVAC systems for non-residential buildings are eligible for full expensing up to the $2.56M limit.',
        usageInstructions: [
            {
                title: 'Check Asset Eligibility',
                description: 'Verify your HVAC system is used in a non-residential building to qualify for Section 179 expensing.'
            },
            {
                title: 'Calculate Year 1 Savings',
                description: 'Enter your project cost to see how Section 179 provides immediate cash flow for facility upgrades.'
            }
        ]
    },
    {
        slug: 'production',
        title: 'Film and Sound Production Bonus Depreciation',
        heroImage: '/images/production-hero.jpg',
        keyword: 'Bonus depreciation sound recording',
        description: 'Maximize deductions for qualified film, TV, and sound recording productions under IRS Notice 2026-11.',
        assetExamples: ['Master Recordings', 'Film Negatives', 'Digital Sound Stages', 'Post-Production Gear'],
        obbaContext: 'Sound recording productions are newly eligible for 100% bonus depreciation under the OBBBA and IRS Notice 2026-11.',
        usageInstructions: [
            {
                title: 'Identify Qualified Productions',
                description: 'ensure your audio or film project meets the "qualified production" criteria defined by the IRS.'
            },
            {
                title: 'Forecast Production Write-offs',
                description: 'Use the tool to model the impact of deducting 100% of production costs in the first year.'
            }
        ]
    },
    {
        slug: 'agriculture',
        title: 'Agricultural Equipment Bonus Depreciation 2026',
        heroImage: '/images/ag-hero.jpg',
        keyword: 'Ag Equipment Section 179',
        description: 'Deduct the full cost of tractors, harvesters, and farm machinery. Optimized for 2026 farming tax planning.',
        assetExamples: ['Combines', 'Tractors', 'Irrigation Systems', 'Tillage Equipment'],
        obbaContext: 'The OBBBA raises the Section 179 limit to $2.56M, providing massive benefits for large agricultural investments.',
        usageInstructions: [
            {
                title: 'Plan Machine Acquistions',
                description: 'Timer your purchases to take advantage of the 100% bonus rate for property acquired post-Jan 19, 2025.'
            },
            {
                title: 'Evaluate Rural Zones',
                description: 'If your farm is in a Qualified Rural Opportunity Zone, check for the 30% basis step-up benefit.'
            }
        ]
    },
    {
        slug: 'software',
        title: 'Software/Cloud Computing Section 179',
        heroImage: '/images/software-hero.jpg',
        keyword: 'Off-the-shelf software depreciation',
        description: 'Accelerate the write-offs for enterprise software and cloud computing infrastructure.',
        assetExamples: ['ERP Software', 'CRM Systems', 'Server Infrastructure', 'Cloud Storage Clusters'],
        obbaContext: 'Off-the-shelf software remains fully eligible for Section 179 expensing and 100% bonus depreciation.',
        usageInstructions: [
            {
                title: 'Distinguish CapEx from OpEx',
                description: 'Ensure your software license costs are capitalized to qualify for Section 179 or bonus depreciation.'
            },
            {
                title: 'Model Enterprise Upgrades',
                description: 'Calculate how a major software rollout can be fully expensed in the year of implementation.'
            }
        ]
    },
    {
        slug: 'solar',
        title: 'Solar Energy Property Depreciation',
        heroImage: '/images/solar-hero.jpg',
        keyword: 'Solar tax incentives 2026',
        description: 'Combine ITC benefits with 100% bonus depreciation for commercial solar installations.',
        assetExamples: ['Solar Panels', 'Inverters', 'Battery Storage', 'Racking Systems'],
        obbaContext: 'Solar property (MACRS 5-year) is exceptionally powerful when combined with OBBBA 100% bonus depreciation.',
        usageInstructions: [
            {
                title: 'Coordinate with Tax Credits',
                description: 'Remember to reduce basis by 50% of the Investment Tax Credit (ITC) before calculating depreciation.'
            },
            {
                title: 'Accelerate ROI',
                description: 'Model how 100% bonus depreciation drastically shortens the payback period for solar investments.'
            }
        ]
    }
];
