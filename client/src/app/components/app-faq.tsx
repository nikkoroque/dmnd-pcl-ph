import React from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What are conflict-free diamonds?",
    answer:
      "Conflict-free diamonds are diamonds that have been mined and transported with no connection to any rebel or terror groups and do not support or fund civil wars in any way. We guarantee that we only sell diamonds that have been mined and processed in an environmentally and socially conscious manner. We also exceed regulations set by initiatives such as the Kimberley Process, the Patriot Act, and other governmental and non-governmental measures against the illicit acquirement and distribution of diamonds.",
  },
  {
    question:
      "What are the benefits of choosing a natural diamond over a lab diamond?",
    answer:
      "The main benefits of choosing a natural diamond over a lab-grown diamond are its rarity and the unique history behind each stone. Natural diamonds are formed over billions of years, making them more exclusive and often seen as a long-term investment. Additionally, some people appreciate the traditional value and symbolism associated with natural diamonds, which are considered more prestigious due to their natural origin.",
  },
  {
    question: "What is the best diamond shape?",
    answer:
      "Diamond shapes are largely a matter of personal taste and style. Although round diamonds are the most popular choice, opting for a different shape like pear, marquise, or oval can create a more unique look. A princess-cut diamond with its sharp, symmetrical edges is an excellent option for a modern vibe. Ultimately, the shape should match the wearer's personality and style preferences.",
  },
  {
    question: "Should I buy a certified diamond?",
    answer:
      "Yes, if quality is important to you and you want to buy with confidence. Independent certification labs like GIA or IGI are well-respected and can reliably assess a diamond's quality and verify its authenticity.",
  },
  {
    question: "What are the 4C's of a diamond?",
    answer:
      "The 4Cs—color, clarity, cut, and carat weight—are the main factors that define a diamond's appearance. They also play a significant role in determining the diamond's value and price.",
  },
  {
    question: "Do natural diamonds hold their value?",
    answer:
      "Natural diamonds can retain or even increase in value over time, which can be a crucial advantage if you upgrade, sell, or pass the diamond down as a family heirloom or investment.",
  },
];

const QuestionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Faq = () => {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-16">
      <h2 className="max-w-7xl mx-auto text-3xl font-bold text-[#342e37] font-sans">
        Diamond Search FAQ
      </h2>
      <p>
        Natural diamonds stand out for their rarity, formed over billions of
        years with unique qualities that lab-grown alternatives can't match.
        While often considered a long-term investment, they also carry the
        appeal of owning something naturally rare and distinct.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {faqData.map((faq, index) => (
          <div key={index}>
            <div className="inline-block p-3 text-white bg-[#342e37] rounded-lg">
              <QuestionIcon />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-[#342e37]">
                {faq.question}
              </h1>
              <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
