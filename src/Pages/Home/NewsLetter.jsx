import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }

    toast.success(`Subscribed successfully!`);
  };

  return (
    <div className="bg-base-200 py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
          Subscribe to <span className="text-primary fJost">Movie Vault</span>{" "}
          Newsletter
        </h2>
        <p className="text-gray-300 mb-8">
          Get the latest updates, trending movies, and personalized
          recommendations directly in your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary px-6 py-3 font-semibold hover:scale-105 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
