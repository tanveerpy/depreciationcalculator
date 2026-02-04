import Link from 'next/link';
import { INDUSTRIES } from '@/lib/content/industries';
import { FinancialDisclaimer } from './FinancialDisclaimer';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-lg font-bold mb-4">BonusCalc 2026</h3>
                        <p className="text-slate-400 max-w-sm">
                            The only OBBBA-compliant tax savings calculator designed for modern asset acquisition strategies. Optimize your Section 179 and Bonus Depreciation.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Industries</h4>
                        <ul className="space-y-2 text-sm">
                            {INDUSTRIES.map(ind => (
                                <li key={ind.slug}>
                                    <Link href={`/industry/${ind.slug}`} className="hover:text-white transition-colors">
                                        {ind.title.replace('Bonus Depreciation for ', '')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company & Tools</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/calculator" className="hover:text-white transition-colors">Tax Calculator</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Tax Strategy Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors text-slate-500">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors text-slate-500">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <FinancialDisclaimer />

                <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} BonusCalc 2026. All rights reserved.</p>
                    <p className="mt-2 text-xs">Not tax advice. Consult a CPA for official filings.</p>
                </div>
            </div>
        </footer>
    );
}
