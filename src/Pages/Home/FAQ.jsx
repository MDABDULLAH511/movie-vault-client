import React from "react";
import Container from "../../Components/Container";

const faqData = [
  {
    question: "How do I add a movie to my watchlist?",
    answer:
      "Simply browse movies and click the heart icon on any movie card. It will automatically be added to your personal watchlist.",
  },
  {
    question: "Can I filter movies by genre or rating?",
    answer:
      "Yes! Use the advanced filtering options on the Movies page to sort by genre, rating, or recently added movies.",
  },
  {
    question: "Is my account secure?",
    answer:
      "Absolutely. Movie Vault uses Firebase Authentication with email and Google login to ensure your account is safe and secure.",
  },
  {
    question: "Can I access Movie Vault on mobile devices?",
    answer:
      "Yes! The platform is fully responsive and works seamlessly on mobile, tablet, and desktop devices.",
  },
  {
    question: "How do I remove a movie from my watchlist?",
    answer:
      "Go to your watchlist page and click the heart icon again to remove the movie from your list.",
  },
];

const FAQ = () => {
  return (
    <section className="py-10 lg:py-20 bg-[#1c1c1c]">
      <Container>
        <div className="animate-fadeIn">
          <div className="mb-6 pb-1.5 border-b-2 border-gray-700 text-center">
            <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
              Frequently Asked{" "}
              <span className="text-primary fJost">Questions</span>
            </h2>
          </div>
          {/* FAQ Items */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <details
                key={index}
                className="bg-base-200 rounded-xl p-5 "
              >
                <summary className="cursor-pointer text-white font-semibold text-lg">
                  {item.question}
                </summary>
                <p className="mt-4 text-gray-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
