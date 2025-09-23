import React from "react";
// Importing a custom layout wrapper for consistent UI across pages
import UserLayout from "@/layout/clienLayout/UserLayout";

// Functional component for Terms and Conditions page
const TermsAndConditions = () => {
  return (
    // Wrap the page with UserLayout to apply navigation, footer, and consistent styling
    <UserLayout>
      {/* Main container for the Terms and Conditions content */}
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
        {/* Inner card/container for the content with shadow and rounded corners */}
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
          
          {/* Header section with icon and title */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-3xl">📜</span>
            <h1 className="text-2xl font-bold text-gray-800">
              Terms and Conditions
            </h1>
          </div>

          {/* Effective Date */}
          <p className="text-sm text-gray-500 mb-6">
            <strong>Effective Date:</strong> 20.07.2024
          </p>

          {/* Main content section */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            
            {/* Introduction paragraph */}
            <p>
              Welcome to <strong>Cirmatch.com</strong> – a B2B marketplace
              connecting buyers and sellers in the circular economy. By accessing
              or using our platform, you agree to comply with the following Terms
              and Conditions.
            </p>

            {/* Terms section 1: Acceptance of Terms */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By registering, browsing, or using Cirmatch, you agree to these
                Terms. If you do not agree, you may not access or use the
                platform.
              </p>
            </div>

            {/* Terms section 2: Eligibility */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. Eligibility
              </h2>
              <p>
                You must be at least 18 years old and authorized to represent a
                business entity in order to register or transact on the platform.
              </p>
            </div>

            {/* Terms section 3: User Accounts */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. User Accounts
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  You are responsible for maintaining the confidentiality of your
                  account credentials.
                </li>
                <li>You agree to provide accurate and updated information.</li>
                <li>
                  Cirmatch reserves the right to suspend or terminate accounts
                  that violate these Terms.
                </li>
              </ul>
            </div>

            {/* Terms section 4: Marketplace Rules */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Marketplace Rules
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Users must only list recyclable plastic or related materials
                  that they have the legal right to sell or request.
                </li>
                <li>
                  Listings must be honest and free from misleading or false
                  claims.
                </li>
                <li>
                  All transactions are between the buyer and seller, and Cirmatch
                  is not a party to the contract.
                </li>
              </ul>
            </div>

            {/* Terms section 5: Fees and Payments */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Fees and Payments
              </h2>
              <p>
                Cirmatch may charge service fees, which will be disclosed before
                any transaction. Payment terms between users are negotiated
                independently unless facilitated through a Cirmatch-supported
                service.
              </p>
            </div>

            {/* Terms section 6: Content Ownership */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Content Ownership
              </h2>
              <p>
                You retain ownership of any content you upload (e.g., listings,
                images, company logos). By uploading, you grant Cirmatch a
                non-exclusive license to use, display, and distribute this content
                to support platform operations.
              </p>
            </div>

            {/* Terms section 7: Prohibited Conduct */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                7. Prohibited Conduct
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Post illegal, hazardous, or non-recyclable materials</li>
                <li>Misrepresent your business or products</li>
                <li>Attempt to defraud other users</li>
                <li>Use bots, scrapers, or unauthorized access methods</li>
                <li>
                  Violate local or international environmental, trade, or data
                  laws
                </li>
              </ul>
            </div>

            {/* Terms section 8: Verification & Compliance */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                8. Verification & Compliance
              </h2>
              <p>
                Cirmatch may request documentation (e.g., business licenses,
                recycling certifications). Users are responsible for ensuring
                compliance with environmental and trade regulations in their
                region.
              </p>
            </div>

            {/* Terms section 9: Limitation of Liability */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                9. Limitation of Liability
              </h2>
              <p>Cirmatch is not liable for:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>The quality, legality, or delivery of listed materials</li>
                <li>Disputes between users</li>
                <li>Indirect or consequential losses</li>
              </ul>
              <p>Use the platform at your own risk.</p>
            </div>

            {/* Terms section 10: Termination */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                10. Termination
              </h2>
              <p>
                Cirmatch may suspend or terminate your access for violations or
                suspected fraudulent activity. You may also close your account at
                any time.
              </p>
            </div>

            {/* Terms section 11: Modifications */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                11. Modifications
              </h2>
              <p>
                We may update these Terms occasionally. We will notify users via
                email or platform notification. Continued use of the platform
                constitutes acceptance of the updated terms.
              </p>
            </div>

            {/* Terms section 12: Governing Law */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                12. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of Bangladesh. Any legal
                disputes will be handled by courts within Bangladesh.
              </p>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default TermsAndConditions;
