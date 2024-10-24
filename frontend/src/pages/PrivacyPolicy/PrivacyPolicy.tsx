import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="privacy-policy px-sect flex flex-col items-center justify-center py-sect-short">
      <div className="lg:w-2/3 flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col items-center">   
          <h1 className="h1-md">Privacy Policy</h1>
          <p className="span-medium">Last updated: 10/15/2024</p>
        </div>
        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">1. Introduction</h2>
          <p className="p-regular">
            Welcome to <span className="font-logo">TravelScott</span> ("we,"
            "our," or "us"). We are committed to protecting your privacy and
            personal information. This Privacy Policy explains how we collect,
            use, and safeguard your information when you visit our website and
            use our services.
          </p>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">2. Information We Collect</h2>
          <p className="p-regular pb-2">
            We collect the following types of information:
          </p>
          <ul>
            <li className="p-regular ml-8 list-disc">
              Feedback: When you provide feedback about our content or services,
              we may collect your comments and any personal information you
              choose to include.
            </li>
            <li className="p-regular ml-8 list-disc">
              Subscription Information: If you subscribe to our newsletter or
              updates, we collect your email address.
            </li>
            <li className="p-regular ml-8 list-disc">
              Usage Data: We automatically collect information about how you
              interact with our website, including pages visited, time spent on
              the site, and other analytical data.
            </li>
          </ul>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">3. How We Use Your Information</h2>
          <p className="p-regular pb-2">
            We use the collected information for the following purposes:
          </p>
          <ul>
            <li className="p-regular ml-8 list-disc">
              To improve our website content and services based on your feedback
            </li>
            <li className="p-regular ml-8 list-disc">
              To send you newsletters and updates you've subscribed to
            </li>
            <li className="p-regular ml-8 list-disc">
              To analyze website usage and enhance user experience
            </li>
            <li className="p-regular ml-8 list-disc">
              To respond to your inquiries or comments
            </li>
          </ul>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">4. Data Protection</h2>
          <p className="p-regular">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">5. Third-Party Services</h2>
          <p className="p-regular">
            We may use third-party services for analytics, email marketing, and
            other functions. These services may have access to your information
            solely for the purpose of performing specific tasks on our behalf.
            They are obligated not to disclose or use it for any other purpose.
          </p>
        </div>

        <div className="">
          {" "}
          <h2 className="p-large font-prima pb-2 md:pb-3">6. Cookies</h2>
          <p className="p-regular">
            We use cookies to enhance your browsing experience and analyze
            website traffic. You can control cookie settings through your
            browser preferences.
          </p>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">7. Your Rights</h2>
          <p className="p-regular pb-2">You have the right to:</p>
          <ul>
            <li className="p-regular ml-8 list-disc">
              Access the personal information we hold about you
            </li>
            <li className="p-regular ml-8 list-disc">
              Request correction of any inaccurate information
            </li>
            <li className="p-regular ml-8 list-disc">
              Unsubscribe from our newsletters at any time
            </li>
            <li className="p-regular ml-8 list-disc">
              Request deletion of your personal information, subject to any
              legal obligations we may have
            </li>
          </ul>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">8. Changes to This Policy</h2>
          <p className="p-regular">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </div>

        <div className="">
          <h2 className="p-large font-prima pb-2 md:pb-3">9. Contact Us</h2>
          <p className="p-regular">
            If you have any questions about this Privacy Policy, please contact
            us at <span className="span-medium">hello@travelscott.com</span>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
