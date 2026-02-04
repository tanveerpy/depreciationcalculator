import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-slate-900">BonusCalc 2026</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                        Home
                    </Link>
                    <Link href="/calculator" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                        Calculator
                    </Link>
                    <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                        Blog
                    </Link>
                    <div className="relative group">
                        <button className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            Industries
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                            <div className="p-2 space-y-1">
                                <Link href="/industry/dentists" className="block px-4 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600 hover:text-blue-600">
                                    Dentists & Medical
                                </Link>
                                <Link href="/industry/construction" className="block px-4 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600 hover:text-blue-600">
                                    Construction
                                </Link>
                                <Link href="/industry/trucking" className="block px-4 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600 hover:text-blue-600">
                                    Trucking & Logistics
                                </Link>
                                <Link href="/industry/real-estate" className="block px-4 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600 hover:text-blue-600">
                                    Real Estate
                                </Link>
                                <Link href="/industry/manufacturing" className="block px-4 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600 hover:text-blue-600">
                                    Manufacturing
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/calculator"
                        className="hidden sm:block bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors text-sm"
                    >
                        Launch App
                    </Link>
                </div>
            </div>
        </header>
    );
}
