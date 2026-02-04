'use client';

import { DepreciationResult } from '@/lib/logic/depreciation-engine';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface Props {
    result: DepreciationResult | null;
    cost: number;
}

export function ResultsView({ result, cost }: Props) {
    if (!result || cost === 0) {
        return (
            <div className="bg-slate-50 p-12 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <TrendingUp className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Enter asset details to see generated tax savings.</p>
            </div>
        );
    }

    const data = [
        { name: 'Sec 179', value: result.section179Deduction, fill: '#3b82f6' },
        { name: 'Bonus', value: result.bonusDeduction, fill: '#8b5cf6' },
        { name: 'MACRS', value: result.normalDepreciationYear1, fill: '#6366f1' },
    ];

    // Clean 0 values
    const chartData = data.filter(d => d.value > 0);
    const totalDeduction = result.totalYear1Deduction;
    const taxSavingsEstimate = totalDeduction * 0.21; // Estimate 21% corp rate (should be user input later)

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Tax Savings Summary</h2>
                <p className="text-slate-500">Estimated First-Year Deduction Impact</p>
            </div>

            {/* Big Numbers */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Total Deduction</p>
                    <p className="text-3xl font-extrabold text-blue-900 mt-1">
                        ${totalDeduction.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-blue-500 mt-1">{((totalDeduction / cost) * 100).toFixed(1)}% of Cost</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <p className="text-sm text-green-600 font-semibold uppercase tracking-wider">Est. Tax Savings (21%)</p>
                    <p className="text-3xl font-extrabold text-green-900 mt-1">
                        ${taxSavingsEstimate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-green-500 mt-1">Instant Cash Flow</p>
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip cursor={{ fill: 'transparent' }} formatter={(val: any) => `$${val.toLocaleString()}`} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Breakdown Table */}
            <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div> Section 179
                    </span>
                    <span className="font-semibold">${result.section179Deduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div> Bonus Depreciation
                    </span>
                    <span className="font-semibold">${result.bonusDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div> MACRS Year 1
                    </span>
                    <span className="font-semibold">${result.normalDepreciationYear1.toLocaleString()}</span>
                </div>
            </div>

            {/* QROZ Banner */}
            {result.qrozBasisStepUpValue && (
                <div className="mt-6 bg-green-900 text-white p-4 rounded-xl flex items-start gap-3 shadow-lg">
                    <AlertCircle className="w-6 h-6 flex-shrink-0 text-green-300" />
                    <div>
                        <p className="font-bold text-lg">QROZ Benefit Detected</p>
                        <p className="text-green-100 text-sm mt-1">
                            Potential 30% Basis Step-Up Value: <span className="font-bold text-white underline">${result.qrozBasisStepUpValue.toLocaleString()}</span>
                        </p>
                        <p className="text-xs text-green-400 mt-2 italic">*Realized after 5-year hold period.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
