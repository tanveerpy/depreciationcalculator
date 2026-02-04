import { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | Bonus Depreciation Calculator',
    description: 'Get in touch with the BonusCalc team for inquiries about our tax tools and advertising opportunities.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact Us</h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Have questions about the Bonus Depreciation Calculator? We're here to help.
                    Whether you have feedback on the tool, need technical support, or are interested in advertising partnerships, please reach out.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                        <Mail className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                            <h3 className="font-semibold text-slate-900">Email Us</h3>
                            <p className="text-slate-600 text-sm mb-2">For general inquiries and support:</p>
                            <a href="mailto:contact@bonusdepreciationcalculator.com" className="text-blue-600 font-medium hover:underline">
                                contact@bonusdepreciationcalculator.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                        <MapPin className="w-6 h-6 text-slate-500 mt-1" />
                        <div>
                            <h3 className="font-semibold text-slate-900">Mailing Address</h3>
                            <p className="text-slate-600 text-sm">
                                BonusCalc Inc.<br />
                                123 Tax Strategy Lane<br />
                                Suite 179<br />
                                Austin, TX 78701
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-500">
                    <p>Note: We cannot provide personalized tax advice. Please consult a CPA for specific filing questions.</p>
                </div>
            </div>
        </main>
    );
}
