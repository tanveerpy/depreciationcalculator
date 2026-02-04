import { INDUSTRIES } from '@/lib/content/industries';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

interface Props {
    params: Promise<{ slug: string }>;
}

// export async function generateStaticParams() {
//     return INDUSTRIES.map((ind) => ({
//         slug: ind.slug,
//     }));
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const industry = INDUSTRIES.find(i => i.slug === slug);
    if (!industry) return {};

    return {
        title: `${industry.title} | 2026 Tax Calculator`,
        description: industry.description,
    };
}

export default async function IndustryPage({ params }: Props) {
    const { slug } = await params;
    const industry = INDUSTRIES.find(i => i.slug === slug);

    if (!industry) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-slate-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 text-sm">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{industry.title}</h1>
                    <p className="text-xl text-slate-300 max-w-3xl">{industry.description}</p>
                    <div className="mt-4 inline-block bg-blue-900/50 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-200 text-sm">
                        {industry.obbaContext}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4">
                {/* Specifics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-2">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Eligible Assets for {industry.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {industry.assetExamples.map((ex, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="font-medium text-slate-700">{ex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                        <h3 className="text-lg font-bold mb-2">Did You Know?</h3>
                        <p className="text-blue-100">
                            Under OBBBA 2026, you can elect to take 100% bonus depreciation on qualified property even if you show a Net Operating Loss (NOL), creating a carryforward to offset future income.
                        </p>
                    </div>
                </div>

                {/* Calculator Embed */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Calculate Your Savings</h2>
                    <p className="text-slate-500">Instant estimate for 2026 assets</p>
                </div>

                <div className="flex justify-center">
                    <CalculatorForm initialAssetId={industry.slug === 'dentists' ? 'medical_equipment' :
                        industry.slug === 'construction' ? 'vehicles_heavy' :
                            industry.slug === 'trucking' ? 'vehicles_heavy' : undefined} />
                </div>
            </div>
        </main>
    );
}
