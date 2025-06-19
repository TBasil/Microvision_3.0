import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import slideUploadImg from "@/assets/slide-upload.png";
import annotationToolImg from "@/assets/annotation-tool.png";
import messagingUiImg from "@/assets/messaging-ui.png";
import pathologist1 from "@/assets/pathologist1.png";
import pathologist2 from "@/assets/pathologist2.png";
import pathologist3 from "@/assets/pathologist3.png";
import { Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  //  Check if user is a logged-in pathologist
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isPathologist = user && user.role === "pathologist";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header className="bg-white shadow p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MicroVision</h1>
          <div className="space-x-4">
            <Button variant="default" onClick={handleLogin}>Login</Button>
            <Button variant="outline" onClick={handleRegister}>Register</Button>
          </div>
        </div>
      </header>

      {/* Tagline */}
      <section className="text-center py-16 px-4 bg-white">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Collaborative Digital Pathology Made Simple
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload, analyze, and collaborate on pathology slides securely with AI-driven tools and community features.
        </p>
      </section>

      {/* Features Section (2-column layout) */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="font-bold text-lg">AI Slide Analysis</div>
          <div className="text-gray-600">Utilize artificial intelligence to analyze whole slide images, detect patterns, and support diagnosis.</div>
          <div className="font-bold text-lg">Pathologist Collaboration</div>
          <div className="text-gray-600">Work together with fellow professionals by sharing slides, commenting, and annotating in real-time.</div>
          <div className="font-bold text-lg">Secure Slide Sharing</div>
          <div className="text-gray-600">Ensure HIPAA-compliant, encrypted sharing of pathology slides across institutions.</div>
          <div className="font-bold text-lg">Educational Content</div>
          <div className="text-gray-600">Access and contribute to a growing library of research articles and educational blogs.</div>
        </div>
      </section>

      {/* Screenshots / Platform Previews (2-column layout) */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Platform Previews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="font-semibold">Slide Upload Interface</div>
            <img src={slideUploadImg} alt="Slide Upload UI" className="w-full h-48 object-cover rounded shadow-md" />
            <div className="font-semibold">Annotation Tool</div>
            <img src={annotationToolImg} alt="Annotation Tool" className="w-full h-48 object-cover rounded shadow-md" />
            <div className="font-semibold">Messaging Interface</div>
            <img src={messagingUiImg} alt="Messaging Interface" className="w-full h-48 object-cover rounded shadow-md" />
          </div>
        </div>
      </section>

      {/*  Button to write blog (only for pathologists) */}
      {isPathologist && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate('/upload-blog')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ✍️ Write a Blog
          </button>
        </div>
      )}

      {/* Blog Highlights */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Latest Blog Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">AI in Breast Cancer Pathology</h3>
              <p className="text-sm text-gray-500">by Dr. Smith</p>
              <p className="mt-2 text-gray-600">Exploring the power of AI in diagnosing early-stage breast cancer...</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">Digitizing Rare Tumor Cases</h3>
              <p className="text-sm text-gray-500">by Dr. Lee</p>
              <p className="mt-2 text-gray-600">How digital platforms help archive and share rare pathology cases...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathologist Testimonials */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">What Our Pathologists Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded shadow">
            <img src={pathologist1} alt="Dr. A" className="w-20 h-20 rounded-full object-cover mb-2" />
            <p className="font-semibold">Dr. A</p>
            <p className="text-gray-600 text-sm mt-1">"MicroVision allows me to collaborate on rare cancer cases across borders seamlessly."</p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded shadow">
            <img src={pathologist2} alt="Dr. B" className="w-20 h-20 rounded-full object-cover mb-2" />
            <p className="font-semibold">Dr. B</p>
            <p className="text-gray-600 text-sm mt-1">"The annotation tools are intuitive and make case review much faster."</p>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded shadow">
            <img src={pathologist3} alt="Dr. C" className="w-20 h-20 rounded-full object-cover mb-2" />
            <p className="font-semibold">Dr. C</p>
            <p className="text-gray-600 text-sm mt-1">"Blog section is a great way to stay updated with new research in digital pathology."</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-700">
        © 2025 MicroVision | About | Contact | Privacy Policy
      </footer>
    </div>
  );
}
