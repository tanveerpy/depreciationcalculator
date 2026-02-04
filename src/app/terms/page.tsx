import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Bonus Depreciation Calculator',
    description: 'Terms of Service for using the Bonus Depreciation Calculator website and tools.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-3xl mx-auto prose prose-slate">
                <h1>Terms of Service</h1>
                <p className="text-slate-500">Last Updated: February 4, 2026</p>

                <h3>1. Acceptance of Terms</h3>
                <p>
                    By accessing or using the Bonus Depreciation Calculator website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>

                <h3>2. No Professional Advice</h3>
                <p>
                    <strong>This tool is for informational and educational purposes only.</strong> The calculations provided are estimates based on the data you enter and general interpretations of tax law (including Section 179 and OBBBA).
                </p>
                <p>
                    We are not a CPA firm or tax advisory service. You should strictly strictly consult with a qualified tax professional or CPA before making any financial decisions or tax filings based on these results. We assume no liability for errors, omissions, or financial losses resulting from the use of this tool.
                </p>

                <h3>3. Use License</h3>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Bonus Depreciation Calculator's website for personal, non-commercial transitory viewing only.
                </p>

                <h3>4. Disclaimer</h3>
                <p>
                    The materials on Bonus Depreciation Calculator's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h3>5. Limitations</h3>
                <p>
                    In no event shall Bonus Depreciation Calculator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                </p>
            </div>
        </main>
    );
}
