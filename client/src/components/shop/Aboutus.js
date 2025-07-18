import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Aboutus = () => {
  const team = [
    {
      name: "MAN_!",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      name: "MAN",
      role: "Marketing Head",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "Sarah Khan",
      role: "Customer Support",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Store Name */}
      <h1 className="text-5xl font-bold text-center mb-10 text-purple-700">CosmicScents</h1>

      {/* Description and Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Description */}
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold text-purple-600">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            At CosmicScents, we craft enchanting fragrances that elevate your daily routine.
            From delicate florals to deep earthy tones, our collection brings cosmic energy to
            every bottle. We’re dedicated to quality, sustainability, and unmatched customer satisfaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2023, we continue to grow globally while staying true to our artisanal roots.
          </p>
        </div>

        {/* Google Map */}
        <div>
          <iframe
            title="CosmicScents Location"
            src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
            className="rounded-xl shadow-xl border border-gray-200"
          ></iframe>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-purple-600 mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-2xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-purple-300"
              />
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6">Connect With Us</h2>
        <div className="flex justify-center gap-8 text-3xl text-purple-600">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-purple-800 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-purple-800 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-purple-800 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-purple-800 transition" />
          </a>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-purple-600">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          To spread positivity and luxury through scents that resonate with the soul. We aim
          to deliver high-quality fragrances that align with your lifestyle and values. Every
          scent is crafted with passion and cosmic inspiration.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
