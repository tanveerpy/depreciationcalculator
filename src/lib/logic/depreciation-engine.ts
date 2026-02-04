import { AssetTypeDef } from '../content/asset-library';
import { calculateAssetSection179, calculateSection179Limit } from './section179';

export interface DepreciationInput {
    cost: number;
    assetType: AssetTypeDef;
    purchaseDate: Date;
    placedInServiceDate: Date;

    // User Elections
    takeSection179: boolean;
    section179Amount?: number; // If partial
    bonusRateElection: 100 | 60 | 40 | 0; // OBBBA allowes 100/60/40 elections

    // Special Zones
    inQROZ: boolean; // Qualified Rural Opportunity Zone
}

export interface DepreciationResult {
    section179Deduction: number;
    bonusDeduction: number;
    normalDepreciationYear1: number; // MACRS Year 1
    totalYear1Deduction: number;
    remainingBasis: number;

    // QROZ Benefits (Informational)
    qrozBasisStepUpValue?: number; // Potential step-up after 5 years
}

export function calculateDepreciation(
    input: DepreciationInput,
    currentSection179LimitExhausted: number = 0 // How much limit used by other assets
): DepreciationResult {
    let basis = input.cost;

    // 1. Section 179
    let section179Deduction = 0;
    if (input.takeSection179) {
        // Apply Section 179 Phase-out and SUV limits
        const globalLimit = calculateSection179Limit(input.cost + currentSection179LimitExhausted);

        // Check if asset is an SUV (usually heavy vehicles)
        const isSUV = input.assetType.id === 'vehicles_heavy' || input.assetType.id === 'vehicles_light';


        const requested179 = input.section179Amount ?? input.cost;
        section179Deduction = calculateAssetSection179(requested179, globalLimit, isSUV);

        // Ensure we don't exceed basis or the remaining global limit
        section179Deduction = Math.min(section179Deduction, basis);

        basis -= section179Deduction;
    }

    // 2. Bonus Depreciation
    // Check OBBBA Eligibility: Acquired > Jan 19, 2025
    const OBBBA_START_DATE = new Date('2025-01-20'); // Post Jan 19
    const isObbbaEligible = input.purchaseDate >= OBBBA_START_DATE;

    let bonusDeduction = 0;
    if (input.assetType.bonusEligible) {
        let effectiveRate = input.bonusRateElection / 100;

        // If NOT OBBBA eligible (bought before Jan 20 2025), fallback to 2025 rules (40%)?
        // User input generally dictates election, but we should enforce logic.
        if (!isObbbaEligible) {
            // Assuming 2025 rule is 40% if not OBBBA. 
            // But if user elected 100, we force clamp? 
            // For now, trust the Election but maybe warn.
            // The calculator assumes 2026 tax year focus.
        }

        bonusDeduction = basis * effectiveRate;
        basis -= bonusDeduction;
    }

    // 3. Normal MACRS (Year 1)
    // Simplified Half-Year Convention for 5, 7, 15 year
    let macrsRateYear1 = 0;
    switch (input.assetType.recoveryPeriod) {
        case 5: macrsRateYear1 = 0.20; break;
        case 7: macrsRateYear1 = 0.1429; break;
        case 15: macrsRateYear1 = 0.05; break;
        case 39: macrsRateYear1 = 0.02461; break; // Mid-month? Simplified
        default: macrsRateYear1 = 1 / input.assetType.recoveryPeriod; // Straight line fallback
    }

    // MACRS only applies to remaining basis
    const normalDepreciationYear1 = basis * macrsRateYear1;
    const year1Total = section179Deduction + bonusDeduction + normalDepreciationYear1;

    // 4. QROZ Logic
    // "QROZ investments receive a 30 % basis step‑up after 5 years"
    // This is a future benefit. Step up is on ORIGINAL basis usually? Or Deferred Gain?
    // Text says "QROZ investments receive a 30 % basis step‑up".
    // We'll calculate it on the Cost. 
    let qrozBasisStepUpValue = undefined;
    if (input.inQROZ) {
        qrozBasisStepUpValue = input.cost * 0.30;
    }

    return {
        section179Deduction,
        bonusDeduction,
        normalDepreciationYear1,
        totalYear1Deduction: year1Total,
        remainingBasis: Math.max(0, input.cost - year1Total), // Techincally basis for FUTURE years
        qrozBasisStepUpValue
    };
}
