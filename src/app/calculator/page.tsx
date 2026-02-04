import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Section 179 & Bonus Depreciation Calculator | 2026 Tax Tools',
    description: 'Calculate your instant tax savings. Enter your equipment costs to see potential deductions under new OBBBA 2026 bonus depreciation rules.',
    alternates: {
        canonical: 'https://bonusdepreciationcalculator.com/calculator',
    },
};

export default function CalculatorPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">2026 Depreciation Calculator</h1>
                    <p className="text-slate-500">OBBBA-Compliant • Section 179 • Bonus Depreciation</p>
                </div>

                <div className="flex justify-center">
                    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading calculator...</div>}>
                        <CalculatorForm />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
