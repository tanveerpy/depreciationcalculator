'use client';

import { useState, useEffect } from 'react';
import { ASSET_TYPES, AssetTypeDef } from '@/lib/content/asset-library';
import { calculateDepreciation, DepreciationInput, DepreciationResult } from '@/lib/logic/depreciation-engine';
import { ComparisonView } from './ComparisonView';
import { ResultsView } from './ResultsView';
import { Calculator, Info, Settings, DollarSign, Calendar, Truck, ArrowRight, FileText } from 'lucide-react';

import { useRef } from 'react';
import { generateDepreciationReport } from '@/lib/pdf/report-generator';

import { EmailCaptureModal } from '../ui/EmailCaptureModal';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Link2 } from 'lucide-react';

export interface CalculatorProps {
    initialAssetId?: string;
}

export function CalculatorForm({ initialAssetId }: CalculatorProps) {
    const [cost, setCost] = useState<number>(0);
    const [assetId, setAssetId] = useState<string>(initialAssetId || ASSET_TYPES[0].id);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [take179, setTake179] = useState<boolean>(true);
    const [bonusRate, setBonusRate] = useState<number>(100);
    const [inQROZ, setInQROZ] = useState<boolean>(false);

    // Comparison Mode
    const [comparisonMode, setComparisonMode] = useState<boolean>(false);
    const [compareBonusRate, setCompareBonusRate] = useState<number>(40);

    const [result, setResult] = useState<DepreciationResult | null>(null);
    const [resultB, setResultB] = useState<DepreciationResult | null>(null); // For comparison

    // Lead Capture State
    const [showModal, setShowModal] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Add Handler
    const handleDownloadClick = () => {
        if (!result) return;
        if (userEmail) {
            generateReport();
        } else {
            setShowModal(true);
        }
    };

    const handleEmailSubmit = (email: string) => {
        setUserEmail(email);
        setShowModal(false);
        // Small delay to allow modal close animation
        setTimeout(() => generateReport(), 300);
    };

    const generateReport = () => {
        if (!result) return;
        const currentInput: DepreciationInput = {
            cost,
            assetType: ASSET_TYPES.find(a => a.id === assetId) || ASSET_TYPES[0],
            purchaseDate: new Date(date),
            placedInServiceDate: new Date(date),
            takeSection179: take179,
            bonusRateElection: bonusRate as any,
            inQROZ: inQROZ
        };

        generateDepreciationReport(currentInput, result, resultB);
    };

    // URL Sync Logic
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    // 1. Read from URL on Mount
    useEffect(() => {
        if (!isFirstRender.current) return;
        const pCost = searchParams.get('cost');
        if (pCost) setCost(Number(pCost));

        const pAsset = searchParams.get('asset');
        if (pAsset) setAssetId(pAsset);

        const pBonus = searchParams.get('bonus');
        if (pBonus) setBonusRate(Number(pBonus));

        const p179 = searchParams.get('179');
        if (p179) setTake179(p179 === 'true');

        isFirstRender.current = false;
    }, [searchParams]);

    // 2. Write to URL on Change (Debounced)
    useEffect(() => {
        if (isFirstRender.current) return;
        if (cost === 0) return; // Don't sync empty state if not needed

        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            params.set('cost', cost.toString());
            params.set('asset', assetId);
            params.set('bonus', bonusRate.toString());
            params.set('179', take179.toString());

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }, 1000);

        return () => clearTimeout(timer);
    }, [cost, assetId, bonusRate, take179, router, pathname]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!'); // Simple feedback for now
    };

    const handleCalculate = () => {
        const asset = ASSET_TYPES.find(a => a.id === assetId) || ASSET_TYPES[0];

        // Base Scenario
        const inputA: DepreciationInput = {
            cost,
            assetType: asset,
            purchaseDate: new Date(date),
            placedInServiceDate: new Date(date),
            takeSection179: take179,
            bonusRateElection: bonusRate as 100 | 60 | 40 | 0,
            inQROZ: inQROZ
        };
        setResult(calculateDepreciation(inputA));

        // Comparison Scenario (Usually changes Bonus Rate or 179)
        // We'll compare Current Selection vs "Comparison Selection" (e.g. 100 vs 40)
        if (comparisonMode) {
            const inputB: DepreciationInput = {
                ...inputA,
                bonusRateElection: compareBonusRate as 100 | 60 | 40 | 0,
                // We keep 179 same for strict bonus comparison, or could allow full divergence.
                // Keeping it specific to "Bonus Rate" comparison for simplicity as per requirements.
            };
            setResultB(calculateDepreciation(inputB));
        } else {
            setResultB(null);
        }
    };

    useEffect(() => {
        if (cost > 0) handleCalculate();
    }, [cost, assetId, date, take179, bonusRate, inQROZ, comparisonMode, compareBonusRate]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-slate-800">
                        <Settings className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold">Configuration</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                            title="Copy Link to Clipboard"
                        >
                            <Link2 className="w-4 h-4" /> Share
                        </button>
                        {result && (
                            <button
                                onClick={handleDownloadClick}
                                className="flex items-center gap-1 text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                <FileText className="w-4 h-4" /> Export PDF
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Cost Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Equiment Cost ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                type="number"
                                value={cost || ''}
                                onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-semibold text-lg"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Asset Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Asset Type</label>
                        <div className="relative">
                            <Truck className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <select
                                value={assetId}
                                onChange={(e) => setAssetId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
                            >
                                {ASSET_TYPES.map(t => (
                                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-4">
                        {/* 179 Toggle */}
                        <div className="flex items-start justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="space-y-1">
                                <span className="font-semibold text-slate-800 block text-sm">Section 179</span>
                                <span className="text-xs text-slate-500">Apply $2.56M limit</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={take179}
                                onChange={(e) => setTake179(e.target.checked)}
                                className="w-5 h-5 text-blue-600 rounded mt-1"
                            />
                        </div>

                        {/* Bonus Election - Primary */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-slate-800 block text-sm">Bonus Rate (Primary)</span>
                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase">
                                    NOL Eligible
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {[100, 60, 40, 0].map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => setBonusRate(rate)}
                                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${bonusRate === rate
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                            }`}
                                    >
                                        {rate}%
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2 italic leading-tight">
                                * Electing 40% or 60% may be optimal for future tax-bracket planning. Section 179 cannot create a Net Operating Loss (NOL), but Bonus Depreciation can.
                            </p>
                        </div>

                        {/* Comparison Toggle */}
                        <div className={`p-4 rounded-xl border transition-all ${comparisonMode ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`font-bold text-sm ${comparisonMode ? 'text-indigo-900' : 'text-slate-600'}`}>Elective Bonus-Rate Modelling</span>
                                <div
                                    onClick={() => setComparisonMode(!comparisonMode)}
                                    className={`w-10 h-6 flex items-center bg-slate-300 rounded-full p-1 cursor-pointer transition-colors ${comparisonMode ? 'bg-indigo-600' : ''}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${comparisonMode ? 'translate-x-4' : ''}`}></div>
                                </div>
                            </div>

                            {comparisonMode && (
                                <div className="animate-fade-in-up">
                                    <span className="text-xs font-semibold text-indigo-700 block mb-2">Compare against alternative OBBBA election:</span>
                                    <div className="flex gap-2">
                                        {[100, 60, 40, 0].map((rate) => (
                                            <button
                                                key={rate}
                                                onClick={() => setCompareBonusRate(rate)}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${compareBonusRate === rate
                                                    ? 'bg-indigo-600 text-white shadow-md'
                                                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                                                    }`}
                                            >
                                                {rate}%
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {comparisonMode && result && resultB ? (
                <ComparisonView
                    resultA={result}
                    resultB={resultB}
                    scenarioAName={`Option A (${bonusRate}%)`}
                    scenarioBName={`Option B (${compareBonusRate}%)`}
                    cost={cost}
                />
            ) : (
                <ResultsView result={result} cost={cost} />
            )}

            <EmailCaptureModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleEmailSubmit}
            />
        </div>
    );
}
