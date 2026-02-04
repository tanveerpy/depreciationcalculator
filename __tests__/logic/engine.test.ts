import { calculateDepreciation, DepreciationInput } from '@/lib/logic/depreciation-engine';
import { ASSET_TYPES } from '@/lib/content/asset-library';

describe('Depreciation Engine (OBBBA 2026)', () => {
    const mockComputer = ASSET_TYPES.find(a => a.id === 'computer_equipment')!;

    it('calculates Section 179 first, then Bonus', () => {
        const input: DepreciationInput = {
            cost: 100_000,
            assetType: mockComputer,
            purchaseDate: new Date('2026-02-01'),
            placedInServiceDate: new Date('2026-02-01'),
            takeSection179: true,
            section179Amount: 50_000, // Partial
            bonusRateElection: 100, // Remaining 50k should be 100% bonused
            inQROZ: false
        };

        const result = calculateDepreciation(input);

        expect(result.section179Deduction).toBe(50_000);
        expect(result.bonusDeduction).toBe(50_000); // 100% of remaining 50k
        expect(result.totalYear1Deduction).toBe(100_000);
        expect(result.remainingBasis).toBe(0);
    });

    it('handles user election of 40% bonus', () => {
        // Cost 100k. No 179. Bonus 40%.
        const input: DepreciationInput = {
            cost: 100_000,
            assetType: mockComputer,
            purchaseDate: new Date('2026-02-01'),
            placedInServiceDate: new Date('2026-02-01'),
            takeSection179: false,
            bonusRateElection: 40,
            inQROZ: false
        };

        const result = calculateDepreciation(input);

        // Bonus = 40,000. Rem Basis = 60,000.
        // MACRS Year 1 (5-year) = 20% of 60,000 = 12,000.

        expect(result.bonusDeduction).toBe(40_000);
        expect(result.normalDepreciationYear1).toBe(12_000);
        expect(result.totalYear1Deduction).toBe(52_000);
    });

    it('calculates QROZ step-up value', () => {
        const input: DepreciationInput = {
            cost: 100_000,
            assetType: mockComputer,
            purchaseDate: new Date('2026-02-01'),
            placedInServiceDate: new Date('2026-02-01'),
            takeSection179: false,
            bonusRateElection: 0,
            inQROZ: true
        };

        const result = calculateDepreciation(input);
        expect(result.qrozBasisStepUpValue).toBe(30_000); // 30% of 100k
    });

    it('enforces SUV limit on Section 179', () => {
        const heavyVehicle = ASSET_TYPES.find(a => a.id === 'vehicles_heavy')!;
        const input: DepreciationInput = {
            cost: 100_000,
            assetType: heavyVehicle,
            purchaseDate: new Date('2026-02-01'),
            placedInServiceDate: new Date('2026-02-01'),
            takeSection179: true,
            bonusRateElection: 100, // 100% bonus on remainder
            inQROZ: false
        };

        const result = calculateDepreciation(input);

        // SUV Limit 2026 is 31,300
        expect(result.section179Deduction).toBe(31_300);
        expect(result.bonusDeduction).toBe(100_000 - 31_300); // Remainder fully bonused
        expect(result.totalYear1Deduction).toBe(100_000);
    });

    it('applies phase-out reduction when total equipment exceeds threshold', () => {
        const input: DepreciationInput = {
            cost: 500_000,
            assetType: mockComputer,
            purchaseDate: new Date('2026-02-01'),
            placedInServiceDate: new Date('2026-02-01'),
            takeSection179: true,
            bonusRateElection: 0,
            inQROZ: false
        };

        // Total equipment: 500k (this) + 4.09M (exhausted) = 4.59M
        // Threshold: 4.09M -> Over by 500k. 
        // Deduction Limit: 2.56M - 500k = 2.06M. 
        // But requested is only 500k, so should get 500k unless total exceeds 2.56M limit?
        // Wait, the limit itself is reduced.

        // Scenario: 4,090,000 + 1,000,000 already spent. 
        // Total = 5,090,000 + 500,000 = 5,590,000.
        // Reduction = 5,590,000 - 4,090,000 = 1,500,000.
        // Limit = 2,560,000 - 1,500,000 = 1,060,000.
        // Result: 500,000 requested should still be OK.

        // Scenario: Total equipment cost causes limit to drop below current asset cost.
        // Let's use a very large exhausted amount.
        const exhausted = 5_000_000;
        // Total = 500k + 5M = 5.5M.
        // Reduction = 5.5M - 4.09M = 1.41M
        // Limit = 2.56M - 1.41M = 1.15M.

        const result = calculateDepreciation(input, exhausted);
        expect(result.section179Deduction).toBe(500_000); // 500k < 1.15M

        // Scenario: Huge total equipment cost
        const exhaustedHuge = 6_500_000;
        // Total = 500k + 6.5M = 7.0M
        // Reduction = 7.0M - 4.09M = 2.91M
        // Limit = 2.56M - 2.91M = 0 (clamped)
        const resultZero = calculateDepreciation(input, exhaustedHuge);
        expect(resultZero.section179Deduction).toBe(0);
    });
});
