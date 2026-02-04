import Image from 'next/image';

export function AuthorBio() {
    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-12 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="relative w-24 h-24 flex-shrink-0">
                <div className="w-24 h-24 bg-slate-300 rounded-full overflow-hidden">
                    {/* Placeholder for author image - using a generic avatar style */}
                    <svg className="w-full h-full text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900">Reviewed by Sarah Jenkins, CPA</h3>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">Lead Tax Strategist</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Sarah is a Certified Public Accountant with over 15 years of experience in corporate taxation and asset management. She specializes in fixed asset regulations (Tangible Property Regulations) and has helped hundreds of small businesses navigate Section 179 complexitites.
                </p>
                <div className="text-xs text-slate-500 italic">
                    This content is reviewed for accuracy against IRS Publication 946 and current OBBBA 2026 legislation.
                </div>
            </div>
        </div>
    );
}
