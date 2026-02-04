'use client';

import { DepreciationResult } from '@/lib/logic/depreciation-engine';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell, CartesianGrid } from 'recharts';
import { RefreshCcw } from 'lucide-react';

interface Props {
    resultA: DepreciationResult;
    resultB: DepreciationResult;
    scenarioAName: string;
    scenarioBName: string;
    cost: number;
}

export function ComparisonView({ resultA, resultB, scenarioAName, scenarioBName, cost }: Props) {
    const diff = resultA.totalYear1Deduction - resultB.totalYear1Deduction;
    const winner = diff > 0 ? scenarioAName : diff < 0 ? scenarioBName : 'Tie';
    const diffAbs = Math.abs(diff);

    const data = [
        {
            name: 'Total Deduction',
            [scenarioAName]: resultA.totalYear1Deduction,
            [scenarioBName]: resultB.totalYear1Deduction,
        },
        {
            name: 'Bonus Depr.',
            [scenarioAName]: resultA.bonusDeduction,
            [scenarioBName]: resultB.bonusDeduction,
        },
        {
            name: 'Normal (MACRS)',
            [scenarioAName]: resultA.normalDepreciationYear1,
            [scenarioBName]: resultB.normalDepreciationYear1,
        }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <RefreshCcw className="w-6 h-6 text-blue-500" />
                        Scenario Comparison
                    </h2>
                    <p className="text-slate-500">{scenarioAName} vs {scenarioBName}</p>
                </div>
                <div className="text-right">
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Difference</span>
                    <span className={`text-xl font-bold ${diff !== 0 ? 'text-green-600' : 'text-slate-600'}`}>
                        ${diffAbs.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Suggestion Box */}
            <div className={`p-4 rounded-xl border mb-6 ${diff !== 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                <p className="font-semibold text-indigo-900">
                    Optimization Insight
                </p>
                <p className="text-sm text-indigo-700 mt-1">
                    {diff > 0
                        ? `"${scenarioAName}" provides an additional $${diffAbs.toLocaleString()} in deductions this year.`
                        : diff < 0
                            ? `"${scenarioBName}" provides an additional $${diffAbs.toLocaleString()} in deductions this year.`
                            : "Both scenarios yield the same deduction amount."}
                </p>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9' }}
                            formatter={(val: any) => `$${val.toLocaleString()}`}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey={scenarioAName} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey={scenarioBName} fill="#93c5fd" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
