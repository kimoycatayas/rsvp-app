"use client";

import { useState } from "react";
import { Heart, Users, MessageSquare, Utensils } from "lucide-react";

interface RSVPFormData {
  name: string;
  email: string;
  attendance: "yes" | "no" | "maybe";
  guest_count: number;
  dietary_restrictions: string;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    attendance: "yes",
    guest_count: 1,
    dietary_restrictions: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          attendance: "yes",
          guest_count: 1,
          dietary_restrictions: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guest_count" ? parseInt(value) || 1 : value,
    }));
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your RSVP has been received. We can't wait to celebrate with you!
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors"
        >
          Submit Another RSVP
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">RSVP</h2>
        <p className="text-gray-600">Please respond by December 15th</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Will you be attending? *
          </label>
          <div className="space-y-2">
            {[
              {
                value: "yes",
                label: "Yes, I will attend",
                color: "bg-green-500",
              },
              {
                value: "no",
                label: "No, I cannot attend",
                color: "bg-red-500",
              },
              { value: "maybe", label: "Maybe", color: "bg-yellow-500" },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="attendance"
                  value={option.value}
                  checked={formData.attendance === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.attendance === option.value
                      ? `${option.color} border-transparent`
                      : "border-gray-300"
                  }`}
                >
                  {formData.attendance === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {formData.attendance === "yes" && (
          <div>
            <label
              htmlFor="guest_count"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Users className="w-4 h-4 inline mr-1" />
              Number of Guests
            </label>
            <select
              id="guest_count"
              name="guest_count"
              value={formData.guest_count}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label
            htmlFor="dietary_restrictions"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Utensils className="w-4 h-4 inline mr-1" />
            Dietary Restrictions
          </label>
          <textarea
            id="dietary_restrictions"
            name="dietary_restrictions"
            value={formData.dietary_restrictions}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
            placeholder="Any dietary restrictions or allergies?"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
            placeholder="Any special message for the couple?"
          />
        </div>

        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">
              There was an error submitting your RSVP. Please try again.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-600 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
}
