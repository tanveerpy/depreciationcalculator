// OBBBA 2026 Limits
export const SECTION_179_LIMIT_2026 = 2_560_000; // $2.56 Million
export const PHASE_OUT_THRESHOLD_2026 = 4_090_000; // $4.09 Million
export const SUV_LIMIT_2026 = 31_300; // Estimated 2026 limit (check exact inflation adj)

export interface Section179Result {
    deduction: number;
    carryover: number;
    remainingCost: number;
    phaseOutReduction: number;
}

/**
 * Calculates the Section 179 deduction availability.
 * Does NOT apply business income limitation (that happens at aggregate level).
 * 
 * @param totalEquipmentCost Total cost of all Section 179 property placed in service
 * @param assetCost Cost of the specific asset being analyzed (if allocated) or total
 * @returns 
 */
export function calculateSection179Limit(totalEquipmentCost: number): number {
    let deductionLimit = SECTION_179_LIMIT_2026;

    // Apply Phase-out
    if (totalEquipmentCost > PHASE_OUT_THRESHOLD_2026) {
        const reduction = totalEquipmentCost - PHASE_OUT_THRESHOLD_2026;
        deductionLimit = Math.max(0, deductionLimit - reduction);
    }

    return deductionLimit;
}

export function calculateAssetSection179(
    assetCost: number,
    availableLimit: number,
    isSuv: boolean = false
): number {
    let deduction = Math.min(assetCost, availableLimit);

    if (isSuv) {
        deduction = Math.min(deduction, SUV_LIMIT_2026);
    }

    return deduction;
}
