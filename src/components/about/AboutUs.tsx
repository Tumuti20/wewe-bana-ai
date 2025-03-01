import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const AboutUs = () => {
  // Mock team members
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      position: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "John founded the company with a vision to create a seamless shopping experience for customers worldwide.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Chief Operations Officer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "With over 15 years of experience in retail operations, Sarah ensures our business runs smoothly and efficiently.",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Michael leads our product team, constantly innovating and improving our product offerings to meet customer needs.",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Customer Experience Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Emily is dedicated to ensuring every customer has an exceptional experience with our brand at every touchpoint.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-24">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Office space"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Our Company
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                We're on a mission to revolutionize e-commerce by providing
                exceptional products and unparalleled customer service.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2015, our company began with a simple idea: to
                  create an online shopping experience that truly puts customers
                  first. What started as a small operation has grown into a
                  thriving e-commerce platform serving customers worldwide.
                </p>
                <p className="text-gray-600 mb-4">
                  Our journey hasn't always been easy, but our commitment to
                  quality, innovation, and customer satisfaction has remained
                  unwavering. We've expanded our product lines, improved our
                  services, and built a community of loyal customers who share
                  our values.
                </p>
                <p className="text-gray-600">
                  Today, we continue to grow and evolve, always looking for new
                  ways to enhance the shopping experience and exceed customer
                  expectations. Our story is still being written, and we're
                  excited about what the future holds.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold">8+</div>
                    <div className="text-sm">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-gray-600">
                We're guided by a set of core principles that inform everything
                we do, from product selection to customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We constantly seek new ways to improve our products, services,
                  and processes, embracing change and technological
                  advancements.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We listen
                  to their feedback, anticipate their needs, and strive to
                  exceed their expectations.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Quality & Integrity
                </h3>
                <p className="text-gray-600">
                  We're committed to offering only the highest quality products
                  and conducting business with honesty, transparency, and
                  ethical practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                Our success is driven by our talented and dedicated team members
                who bring diverse skills and perspectives to our company.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-50 rounded-lg overflow-hidden"
                >
                  <div className="aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg opacity-90 mb-6">
                  Have questions about our company or products? We'd love to
                  hear from you. Reach out to our team for assistance.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 opacity-80" />
                  <span>123 Commerce St, Shopping City, SC 12345</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-3 opacity-80" />
                  <span>info@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-3 opacity-80" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
