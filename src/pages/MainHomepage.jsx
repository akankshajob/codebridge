import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../custom.css";
import { Code2, Globe, Users } from "lucide-react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png"; 

const features = [
  {
    title: "Live Code Editing",
    description: "Collaborate in real-time with a powerful code editor.",
    icon: <Code2 size={40} className="text-success" />, 
  },
  {
    title: "Multi-Language Support ",
    description: "Multi-Language Support - Allows users to code in multiple programming languages..",
    icon: <Globe size={40} className="text-primary" />, 
  },
  {
    title: "Session Management",
    description: "Create and manage coding sessions effortlessly.",
    icon: <Users size={40} className="text-warning" />, 
  },
];
const programmingLanguages = [
  "Python", "JavaScript", "C++", "Java", "Go", "Ruby", "Swift", "Kotlin", "PHP", "Rust"
];
export default function MainHomepage() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <img src={logo} alt="Code Bridge Logo" height="40" className="me-2" />
            Code Bridge
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/register">Login/Sign-Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="min-vh-100 text-dark"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hero Section */}
        <section className="text-center py-5">
          <motion.h1
            className="display-4 text-success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Code Bridge
          </motion.h1>
          <p className="lead text-secondary">Bridging the Gap Between Coders</p>
          <Link to="/old-home">
            <button className="btn btn-success btn-lg mt-3">Start Collaborating</button>
          </Link>

        </section>

        {/* Features Section */}
        <section className="container py-5">
          <div className="row g-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="col-md-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <div className="card text-center bg-light text-dark shadow-lg">
                  <div className="card-body">
                    <div className="mb-3">{feature.icon}</div>
                    <h5 className="card-title text-success">{feature.title}</h5>
                    <p className="card-text">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Us Section */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="text-success">About Code Bridge</h2>
              <p className="text-secondary mt-3">
                Code Bridge is an advanced real-time collaborative code editor designed to empower developers, teams, and students.
              </p>
              <p className="text-secondary mt-3">
                Whether you are debugging, brainstorming, or working on a large-scale project, our platform provides seamless live collaboration.
              </p>
              <p className="text-secondary mt-3">
                With support for multiple programming languages, session management, and a user-friendly interface, 
                Code Bridge ensures that coding together is smooth, efficient, and productive.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="about.jpg"
                alt="Collaboration"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </section>
        {/* Languages Section */}
        <section className="container text-center py-5">
          <h2 className="text-success">Languages You Can Code in Code Bridge</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3 py-4">
            {programmingLanguages.map((language, index) => (
              <motion.div
                key={index}
                className="bg-success text-white px-3 py-2 rounded shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6 + Math.random() * 2 }}
              >
                {language}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 text-secondary">
          © 2025 Code Bridge | Built for Developers
        </footer>
      </div>
    </>
  );
}
