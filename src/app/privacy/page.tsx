import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Bonus Depreciation Calculator',
    description: 'Privacy Policy for Bonus Depreciation Calculator. We value your privacy and are committed to protecting your personal data.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-3xl mx-auto prose prose-slate">
                <h1>Privacy Policy</h1>
                <p className="text-slate-500">Last Updated: February 4, 2026</p>

                <p>
                    Your privacy is important to us. It is Bonus Depreciation Calculator's policy to respect your privacy regarding any information we may collect from you across our website, https://bonusdepreciationcalculator.com.
                </p>

                <h3>1. Information We Collect</h3>
                <p>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </p>
                <p>
                    If you use our calculator's "Email Results" feature, we collect your email address solely to deliver the requested report. We do not sell or share this data with third parties.
                </p>

                <h3>2. Log Data</h3>
                <p>
                    When you visit our website, our servers may automatically log the standard data provided by your web browser. This data is considered "non-identifying information", as it does not personally identify you on its own. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
                </p>

                <h3>3. Cookies and Ads</h3>
                <p>
                    We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site.
                </p>
                <p>
                    <strong>Google AdSense:</strong> We display advertisements served by Google AdSense. Google uses cookies to display ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Ads Settings or www.aboutads.info.
                </p>

                <h3>4. Security</h3>
                <p>
                    We take reasonable steps to protect personal information from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure.
                </p>

                <h3>5. Contact Us</h3>
                <p>
                    If you have any questions about our privacy policy or how we handle user data, please contact us at: contact@bonusdepreciationcalculator.com.
                </p>
            </div>
        </main>
    );
}
