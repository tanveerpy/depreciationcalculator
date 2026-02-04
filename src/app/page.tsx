import Link from 'next/link';
import { Calculator, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'Bonus Depreciation Calculator 2026 | Official OBBBA Updates',
  description: 'The #1 Tool for 2026 Tax Planning. Instant calculations for Section 179 limits ($2.56M), 100% Bonus Depreciation, and OBBBA adjustments.',
  alternates: {
    canonical: 'https://bonusdepreciationcalculator.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': 'Bonus Depreciation Calculator 2026',
  'applicationCategory': 'BusinessApplication',
  'operatingSystem': 'Web',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  },
  'featureList': 'Section 179 Calculation, Bonus Depreciation Modeling, OBBBA Compliance'
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white overflow-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 filter contrast-150"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-30"></div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-blue-400 mb-6 animate-fade-in-up">
          <Zap className="w-3 h-3" /> One Big Beautiful Bill Act (OBBBA) & 2026/2027 Ready
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-fade-in-up delay-100">
          Advanced Section 179 <br /> Calculator 2026.
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Calculate <strong>100% bonus depreciation 2026 rules</strong>, model elective 40% scenarios, and maximize savings with the new $2.56M Section 179 limit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fade-in-up delay-300">
          <Link
            href="/calculator"
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Launch OBBBA Calculator
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/blog/section-179-vs-bonus-depreciation-2026"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full font-semibold text-lg transition-all border border-slate-700 flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            $2.56M Deduction Limits
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
          {[
            { title: '100% Bonus Rules', desc: 'Permanent 100% rate under OBBBA for assets post-Jan 19, 2025.' },
            { title: '$4.09M Phase-out', desc: 'Precise modeling for the 2026 Section 179 threshold.' },
            { title: 'QROZ 30% Step-Up', desc: 'Calculations for Qualified Rural Opportunity Zone basis benefits.' }
          ].map((i, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <h3 className="font-bold text-lg text-white mb-2">{i.title}</h3>
              <p className="text-slate-400 text-sm">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
