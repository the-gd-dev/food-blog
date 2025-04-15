const faqItems = [
  {
    question: "How can I subscribe to the newsletter?",
    answer:
      "Easy as pie! Scroll to the bottom of any page and pop your email into the subscription box. You’ll start receiving tasty tips, recipes, and maybe even the occasional cheesy joke. No spam, just jam (figuratively, but also literally sometimes).",
  },
  {
    question: "Can I share your recipes on social media?",
    answer:
      "Absolutely! Just be sure to tag us and give credit where it’s due. Sharing is caring, especially when it’s food-related.",
  },
  {
    question: "What if a recipe didn’t turn out right?",
    answer:
      "Don't worry — even the best chefs burn a batch of cookies now and then. Check your ingredients, re-read the steps, and feel free to reach out for help. We’re here to make cooking fun, not frustrating.",
  },
  {
    question: "How can I contact you directly?",
    answer:
      "Shoot us an email at [your email address] — we’re always happy to help (or just talk food).",
  },
  {
    question: "One last thing...",
    answer:
      "If you made it this far, you're officially a part of our foodie fam. Whether you came for the recipes or stayed for the puns, we appreciate you!",
  },
];

export default function HelpCenter() {
  return (
    <div className="h-full w-full rounded-2xl lg:w-3/4 md:px-8 px-4 pb-8 mt-3 md:mt-0 bg-white text-gray-800">
      <h1 className="text-2xl font-bold text-amber-500 mb-4">Help Center</h1>
      <p className="text-lg mb-6">
        Got questions? We’ve got answers — hot, fresh, and served with extra
        cheese! Whether you're confused about a recipe or wondering how to
        subscribe to our delicious updates, you’re in the right kitchen.
      </p>

      {faqItems.map((item, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold text-amber-500 mt-6 mb-2">
            {item.question}
          </h2>
          <p className="mb-4">{item.answer}</p>
        </div>
      ))}

      <p className="text-center text-amber-500 font-medium mt-8">
        Stay saucy, stay curious — and keep cooking!
      </p>
    </div>
  );
}
