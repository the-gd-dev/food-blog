const termsData = [
  {
    title: "1. Use of Content",
    content:
      "All content provided on this blog is for informational and inspirational purposes only. You may not copy, reproduce, or distribute our content without explicit permission. Recipe sharing is encouraged — but please link back to the original post.",
  },
  {
    title: "2. User Conduct",
    content:
      "You agree not to post or transmit any content that is abusive, defamatory, or violates any laws. We reserve the right to remove comments or content that do not align with our values or these terms.",
  },
  {
    title: "3. External Links",
    content:
      "Our blog may include links to external websites. We are not responsible for the content or privacy practices of those sites. Please review their policies before engaging.",
  },
  {
    title: "4. Affiliate Disclosure",
    content:
      "Some links on this blog may be affiliate links, meaning we earn a small commission if you make a purchase through them — at no extra cost to you. We only promote products we genuinely enjoy or trust.",
  },
  {
    title: "5. Limitation of Liability",
    content:
      "We strive to provide accurate and up-to-date information. However, we make no warranties regarding the accuracy, completeness, or reliability of any content. Use the site at your own risk.",
  },
  {
    title: "6. Changes to These Terms",
    content:
      "We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page. Continued use of the site after changes are made constitutes your acceptance of those changes.",
  },
  {
    title: "7. Contact Us",
    content:
      "If you have any questions about these Terms and Conditions, please contact us at [your email address].",
  },
];

export default function Terms() {
  return (
    <div className="h-full w-full rounded-2xl lg:w-3/4 md:px-8 px-4 pb-6 mt-3 md:mt-0 bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-amber-500 mb-4">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        Welcome to <strong>Food Blog</strong>. By accessing or using our website
        (<strong>[yourdomain.com]</strong>), you agree to be bound by these
        Terms and Conditions. If you do not agree with any part of these terms,
        please do not use our site.
      </p>

      {termsData.map((term, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold text-amber-500 mt-6 mb-2">
            {term.title}
          </h2>
          <p className="mb-4">{term.content}</p>
        </div>
      ))}
    </div>
  );
}
