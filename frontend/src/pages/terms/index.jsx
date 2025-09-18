import React from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";

const TermsAndConditions = () => {
  return (
    <UserLayout>
      <main className="max-w-4xl mx-auto p-6 prose prose-teal prose-lg">
        <h1>📜 Terms and Conditions</h1>
        <p><strong>Effective Date:</strong> 20.07.2024</p>

        <p>
          Welcome to Cirmatch.com – a B2B marketplace connecting buyers and sellers in the circular economy. By accessing or using our platform, you agree to comply with the following Terms and Conditions.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By registering, browsing, or using Cirmatch, you agree to these Terms. If you do not agree, you may not access or use the platform.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old and authorized to represent a business entity in order to register or transact on the platform.
        </p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree to provide accurate and updated information.</li>
          <li>Cirmatch reserves the right to suspend or terminate accounts that violate these Terms.</li>
        </ul>

        <h2>4. Marketplace Rules</h2>
        <ul>
          <li>Users must only list recyclable plastic or related materials that they have the legal right to sell or request.</li>
          <li>Listings must be honest and free from misleading or false claims.</li>
          <li>All transactions are between the buyer and seller, and Cirmatch is not a party to the contract.</li>
        </ul>

        <h2>5. Fees and Payments</h2>
        <p>
          Cirmatch may charge service fees, which will be disclosed before any transaction. Payment terms between users are negotiated independently unless facilitated through a Cirmatch-supported service.
        </p>

        <h2>6. Content Ownership</h2>
        <p>
          You retain ownership of any content you upload (e.g., listings, images, company logos). By uploading, you grant Cirmatch a non-exclusive license to use, display, and distribute this content to support platform operations.
        </p>

        <h2>7. Prohibited Conduct</h2>
        <ul>
          <li>Post illegal, hazardous, or non-recyclable materials</li>
          <li>Misrepresent your business or products</li>
          <li>Attempt to defraud other users</li>
          <li>Use bots, scrapers, or unauthorized access methods</li>
          <li>Violate local or international environmental, trade, or data laws</li>
        </ul>

        <h2>8. Verification & Compliance</h2>
        <p>
          Cirmatch may request documentation (e.g., business licenses, recycling certifications). Users are responsible for ensuring compliance with environmental and trade regulations in their region.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          Cirmatch is not liable for:
        </p>
        <ul>
          <li>The quality, legality, or delivery of listed materials</li>
          <li>Disputes between users</li>
          <li>Indirect or consequential losses</li>
          <li>Use the platform at your own risk.</li>
        </ul>

        <h2>10. Termination</h2>
        <p>
          Cirmatch may suspend or terminate your access for violations or suspected fraudulent activity. You may also close your account at any time.
        </p>

        <h2>11. Modifications</h2>
        <p>
          We may update these Terms occasionally. We will notify users via email or platform notification. Continued use of the platform constitutes acceptance of the updated terms.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Bangladesh. Any legal disputes will be handled by courts within Bangladesh.
        </p>
      </main>
    </UserLayout>
  );
};

export default TermsAndConditions;
