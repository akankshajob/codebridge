import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Users, MessageSquare, Rocket } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6">
      {/* Hero Section */}
      <motion.div 
        className="text-center mt-20" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold">CodeBridge</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl">
          Bridging the gap between coders. Collaborate, code, and create together in real-time.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700">Get Started</Button>
      </motion.div>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <FeatureCard icon={<Code size={32} />} title="Live Coding" description="Code with your team in real-time." />
        <FeatureCard icon={<Users size={32} />} title="Multi-User Support" description="Work seamlessly with multiple coders." />
        <FeatureCard icon={<MessageSquare size={32} />} title="Integrated Chat" description="Communicate while coding effortlessly." />
        <FeatureCard icon={<Rocket size={32} />} title="Fast & Responsive" description="Experience low-latency and smooth performance." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </motion.div>
  );
}
