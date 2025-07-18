import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setFeedback(data.message || "Message sent successfully!");
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Failed to send message");
    }
    setLoading(false);
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-blue-700">Contact Us</h2>
          <p className="text-gray-600">
            Have a question about our products or your order? Contact us and we'll respond shortly.
          </p>
          <ul className="space-y-3 text-lg text-gray-700">
            <li><strong>📍 Address:</strong> Plot A-1, Tech Market, Karachi, Pakistan</li>
            <li><strong>📞 Phone:</strong> +92 300 1234567</li>
            <li><strong>📧 Email:</strong> support@yourstore.com</li>
            <li><strong>⏰ Hours:</strong> Mon - Sat, 9 AM - 7 PM</li>
          </ul>
          <p className="text-gray-500 text-sm pt-6">
            We typically respond within 24 hours. Thank you for reaching out!
          </p>
        </div>

        {/* RIGHT - Contact Form */}
        <form
          onSubmit={handleMessage}
          className="bg-white shadow-md border rounded-xl p-8 space-y-5"
        >
          <h3 className="text-2xl font-semibold text-blue-600">Send Us a Message</h3>

          {feedback && (
            <div className="p-3 rounded bg-yellow-100 text-yellow-800 text-sm border border-yellow-400">
              {feedback}
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              required
              className="w-full px-4 py-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              required
              rows={5}
              className="w-full px-4 py-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded transition duration-300 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
