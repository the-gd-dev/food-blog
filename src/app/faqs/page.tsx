import React from "react";

const faqData = [
  {
    question: "🍳 Can I request a specific recipe?",
    answer:
      "Absolutely! We love hearing from our readers. Send us a message and we’ll do our best to whip it up soon.",
  },
  {
    question: "📧 How do I subscribe to the newsletter?",
    answer:
      "Scroll to the bottom of the page and enter your email — we’ll send you delicious content regularly (no spam, promise).",
  },
  {
    question: "🌍 Do you offer recipes for specific diets?",
    answer:
      "Yes! We have tags for vegetarian, vegan, gluten-free, and more. Use the search bar or recipe filters to find your perfect dish.",
  },
  {
    question: "📸 Can I share your content on my blog or social media?",
    answer:
      "Feel free to share, just make sure to credit us and link back to the original post. Sharing is caring — and we love being shared!",
  },
  {
    question: "🧁 Do your recipes include nutrition info?",
    answer:
      "Some do, especially newer ones! We’re working to update older recipes with more detailed nutritional information.",
  },
];

export default function Faqs() {
  return (
    <div className="h-full w-full rounded-2xl lg:w-4/5 md:px-6 mt-3 md:mt-0">
      <div className="w-full max-w-3xl mx-auto rounded-2xl px-4 pb-8 md:px-8 bg-white text-gray-800">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-base md:text-lg mb-8 ">
        Here are answers to some of the most common questions we get from our
        foodie community. If your question isn’t here, feel free to reach out
        — we don’t bite.
      </p>

      <div className="space-y-6">
        {faqData.map((faq, idx) => (
        <div key={idx}>
          <h2 className="text-xl font-semibold text-amber-500 mb-1">
          {faq.question.replace(/🍳|📧|🌍|📸|🧁/g, "")}
          </h2>
          <p>{faq.answer.replace(/🍕/g, "")}</p>
        </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        Still got questions? Reach out at{" "}
        <strong>support@foodblog.com</strong> — we’re happy to help!
      </p>
      </div>
    </div>
  );
}
