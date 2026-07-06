"use client";

import { useEffect, useState } from "react";
import "./App.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaI, FaFile, FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

type FilterId = "all" | "nextjs" | "react" | "html";
type ProjectTech = Exclude<FilterId, "all">;

interface ProjectFilter {
  id: FilterId;
  label: string;
}

interface ProjectItem {
  id: string;
  title: string;
  tech: ProjectTech;
  type: string;
  description: string;
  image: string;
  siteUrl: string;
  githubUrl: string;
  techStack: string[];
}

const projectFilters: ProjectFilter[] = [
  { id: "all", label: "All" },
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "html", label: "HTML" },
];

const projectItems: ProjectItem[] = [
  {
    id: "project-1",
    title: "Grex Concert Tours Website",
    tech: "nextjs",
    type: "Next.js",
    description: "A dynamic concert and event booking platform built with Next.js, featuring a modern interface that allows users to explore tours, view event details, and connect with the organization effortlessly.",
    image: "/grexweb1.png",
    siteUrl: "https://www.grexconcerttours.com.ng/",
    githubUrl: "https://github.com/gbolahan88",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "project-2",
    title: "SLIC Church Website",
    tech: "react",
    type: "React",
    description: "A modern and responsive church website built with React, designed to provide visitors with easy access to church information, events, sermons, and ministry activities while delivering a fast and seamless user experience.",
    image: "/slicweb.png",
    siteUrl: "https://gbolahan88.github.io/Slic-web/",
    githubUrl: "https://github.com/gbolahan88",
    techStack: ["React", "CSS", "Responsive Design"],
  },
  {
    id: "project-3",
    title: "GB Global Services Website",
    tech: "html",
    type: "HTML",
    description: "A responsive corporate website developed using HTML, CSS, and JavaScript to showcase the company's services, brand identity, and contact information with a clean and user-friendly interface.",
    image: "/gbweb.png",
    siteUrl: "https://gbdigitalglobal.name.ng/",
    githubUrl: "https://github.com/gbolahan88",
    techStack: ["HTML5", "CSS", "JavaScript"],
  },
  {
    id: "project-4",
    title: "Copy Trading Website",
    tech: "nextjs",
    type: "Next.js",
    description: "A responsive copy trading platform developed with Next.js, designed to showcase trading services, investment opportunities, performance metrics, and user onboarding in a professional and engaging way.",
    image: "/web2.png",
    siteUrl: "https://copytrading-eilz.vercel.app/",
    githubUrl: "https://github.com/gbolahan88",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "project-5",
    title: "GB Online shop Website",
    tech: "react",
    type: "React",
    description: "A modern e-commerce platform built with React, inspired by leading online marketplaces, allowing users to browse products, view detailed product information, and enjoy a seamless shopping experience.",
    image: "/shopweb.png",
    siteUrl: "https://gbdigitalglobal.name.ng/images/shopwebfull.png",
    githubUrl: "https://github.com/gbolahan88",
    techStack: ["React", "REST API", "State Management"],
  },
  {
    id: "project-6",
    title: "HTML Portfolio Site",
    tech: "html",
    type: "HTML",
    description: "A high-converting landing page designed to promote products, services, or campaigns with a clean layout, compelling call-to-action sections, and a fully responsive user experience.",
    image: "/globe.svg",
    siteUrl: "https://example.com/html-portfolio",
    githubUrl: "https://github.com/gbolahan88",
    techStack: ["HTML5", "CSS", "JavaScript"],
  },
];

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  current: boolean;
  bullets: string[];
}

const experienceItems: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Front-End Developer",
    company: "GB Tech Company Inc.",
    period: "2023 - 2024",
    location: "Nigeria",
    current: true,
    bullets: [
      "Worked in an Agile/Scrum environment using Git, Jira, Slack, and Teams.",
      "Integrated Supabase for authentication and database services.",
      "Built and shipped features for client applications.",
      "Fixed bugs and improved application performance.",
      "Collaborated with backend developers and designers.",
    ],
  },
  {
    id: "exp-2",
    role: "Front-End Developer Intern",
    company: "Myvamsnet Limited",
    period: "2024 - 2025",
    location: "Remote, Nigeria",
    current: false,
    bullets: [
      "Tested APIs using Postman.",
      "Used TanStack Query for data fetching and caching.",
      "Deployed apps to Vercel.",
      "Built responsive UI components.",
    ],
  },
  {
    id: "exp-3",
    role: "Front-End Developer (Remote)",
    company: "Myvamsnet Limited",
    period: "2025 - PRESENT",
    location: "Nigeria",
    current: true,
    bullets: [
      "Worked in an Agile/Scrum environment using Git, Jira, Slack, and Teams.",
      "Integrated Supabase for authentication and database services.",
      "Built and shipped features for client applications.",
      "Fixed bugs and improved application performance.",
      "Collaborated with backend developers and designers.",
    ],
  },
];

interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    id: "core-frontend",
    label: "Core Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS"],
  },
  {
    id: "styling-animation",
    label: "Styling & Animation",
    skills: ["Tailwind CSS", "Framer Motion", "CSS Animations", "CSS Grid", "Flexbox"],
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    skills: ["Supabase", "REST API Integration", "Authentication", "Database Design"],
  },
  {
    id: "tools-dev",
    label: "Tools & Development",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "npm"],
  },
  {
    id: "ui-ux",
    label: "UI/UX & Design",
    skills: ["Responsive Design", "Accessibility (a11y)", "Component Design", "Web Performance"],
  },
];

const mobileNavItems: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sent">("idle");

  const filteredProjects: ProjectItem[] =
    activeFilter === "all"
      ? projectItems
      : projectItems.filter((project) => project.tech === activeFilter);

  useEffect(() => {
    const handleClick = () => {
      setIsMenuOpen(false);
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isMenuOpen]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_fk2jf36",
        "template_bf8mbiq",
        {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        },
        "vyErHq71s5xKEwH33"
      );

      setContactStatus("sent");
      setContactForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="page-wrapper">
      <main className="main">

        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-topbar">
              <a href="#home" className="nav-logo">
                GBOLAHAN RICHARD ONI
              </a>

              {/* Desktop links */}
              <div className="nav-links-desktop">
                <a href="#about" className="nav-link">
                  About
                  <span className="nav-link-underline" />
                </a>
                <a href="#projects" className="nav-link">
                  Projects
                  <span className="nav-link-underline" />
                </a>
                <a href="#experience" className="nav-link">
                  Experience
                  <span className="nav-link-underline" />
                </a>
                <a href="#skills" className="nav-link">
                  Skills
                  <span className="nav-link-underline" />
                </a>
                <a href="#contact" className="nav-link">
                  Contact
                  <span className="nav-link-underline" />
                </a>

                <div className="nav-buttons">
                  <a
                    href="GB's Tech CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <FaFile size={16} color="white" />
                    Resume
                  </a>
                  <a
                    href="https://wa.me/2349120963553"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-fill btn-fill-hero"
                  >
                    Let&apos;s Connect
                  </a>
                </div>
              </div>

              {/* Mobile hamburger / X toggle */}
              <button
                type="button"
                className="nav-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen((prev) => !prev)}}
                aria-label="Toggle menu"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile menu - always mounted, animated height/opacity for reliable mobile behavior */}
            <motion.div
              initial={false}
              animate={
                isMenuOpen
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
              className="mobile-menu"
            >
              <ul className="mobile-menu-list">
                {mobileNavItems.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="mobile-menu-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                      <span className="nav-link-underline" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mobile-menu-buttons">
                <a
                  href="GB's Tech CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaFile size={16} color="white" />
                  Resume
                </a>
                <a
                  href="https://wa.me/2349120963553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-fill"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Let&apos;s Connect
                </a>
              </div>
            </motion.div>
          </div>
        </nav>

        <section id="home" className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-badge-wrapper">
                <span className="badge">
                  <span className="badge-dot" />
                  AVAILABLE FOR WORK
                </span>
              </div>

              <h1 className="hero-title">
                I build modern{" "}
                <span className="text-accent">
                  high-performance web applications
                </span>{" "}
                with React &amp; Next.js
              </h1>

              <p className="hero-description">
                Frontend developer specializing in React, TypeScript &amp; modern
                UI. Turning complex problems into elegant, performant interfaces.
              </p>

              <div className="hero-cta-row">
                <a href="#projects">
                  <button className="btn btn-fill btn-large btn-fill-hero">
                    View Work
                  </button>
                </a>
                <a href="#contact">
                  <button className="btn btn-outline btn-large btn-outline-hero">
                    Contact Me
                  </button>
                </a>
              </div>

              <div className="social-row">
                <a
                  href="https://github.com/gbolahan88"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  aria-label="GitHub"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/gbolahan-oni-57b140282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={16} />
                  LinkedIn
                </a>

                <a
                  href="https://profile.indeed.com/?hl=en_NG&co=NG&from=gnav-jobseeker-profile--profile-one-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  aria-label="Indeed"
                >
                  <FaI size={16} />
                  Indeed
                </a>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-frame">
                <div className="hero-image-clip">
                  <Image
                    src="/gbolahan.jpg"
                    alt="Gbolahan Oni"
                    width={320}
                    height={320}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div>
            <div className="section-header">
              <p className="section-eyebrow">About Me</p>
              <h2 className="section-heading">
                Passionate about <span className="text-accent">digital</span>{" "}
                craftsmanship
              </h2>
            </div>

            <p className="about-text">
              I&apos;m Gbolahan Richard Oni, a Web & Mobile Developer, Creative Designer, and Entrepreneur from Osun State, Nigeria.
              I specialize in building modern websites, mobile applications, and digital solutions that help businesses establish
              a strong online presence and achieve their goals. My expertise spans React, Next.js, React Native, UI/UX design, graphic
              design, and logo creation, allowing me to combine technical excellence with creative innovation.
              <br />
              <br />
              Beyond technology, I believe in continuous learning, innovation, and building meaningful relationships with clients and
              partners. My mission is to help businesses grow by providing reliable digital solutions and exceptional service.
              <br />
              When I&apos;m not coding or designing, I&apos;m exploring new technologies, developing business ideas, and working on projects that
              make a positive impact.
              <br />
              <br />
              Let&apos;s build something amazing together.
            </p>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="projects-container">
            <div className="section-header">
              <p className="section-eyebrow">Featured Work</p>
              <h2 className="section-heading">Projects by Technology</h2>
              <p className="section-subtext">
                Filter projects by Next.js, React, or HTML to quickly find examples of work aligned with your needs.
              </p>
            </div>

            <div className="filter-row">
              {projectFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`filter-btn ${
                    activeFilter === filter.id ? "filter-btn-active" : ""
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-image-wrapper">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="project-card-top">
                    <div>
                      <p className="project-type">{project.type}</p>
                      <h3 className="project-title">{project.title}</h3>
                    </div>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-link"
                      aria-label="View GitHub profile"
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="tech-bubble-row">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-bubble">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill-fill"
                    >
                      View Site
                    </a>
                    <span className="project-github-label">
                      GitHub profile only
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="experience-container">
            <div className="section-header">
              <p className="section-eyebrow">Career Path</p>
              <h2 className="section-heading">Work Experience</h2>
              <p className="section-subtext">
                A timeline of the roles and responsibilities that shaped my journey as a developer.
              </p>
            </div>

            <div className="timeline">
              {experienceItems.map((item) => (
                <div key={item.id} className="timeline-item">
                  <span
                    className={`timeline-dot ${
                      item.current ? "timeline-dot-current" : ""
                    }`}
                  />
                  <div className="timeline-content">
                    <h3 className="timeline-role">{item.role}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p className="timeline-meta">
                      {item.period} &middot; {item.location.toUpperCase()}
                    </p>
                    <ul className="timeline-bullets">
                      {item.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section">
          <div className="skills-container">
            <div className="section-header">
              <p className="section-eyebrow">Skills</p>
              <h2 className="section-heading">
                Technologies &amp; <span className="text-accent">Tools</span>
              </h2>
              <p className="section-subtext">
                The languages, frameworks, and tools I use to design and build reliable web experiences.
              </p>
            </div>

            <div className="skills-groups">
              {skillGroups.map((group) => (
                <div key={group.id} className="skills-group">
                  <h3 className="skills-group-title">{group.label}</h3>
                  <div className="tech-bubble-row">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tech-bubble tech-bubble-outline">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-container">
            <div className="section-header">
              <p className="section-eyebrow">Contact</p>
              <h2 className="section-heading">
                Let&apos;s work <span className="text-accent">together</span>
              </h2>
              <p className="section-subtext">
                Have a project in mind? I&apos;m always excited to collaborate on interesting work.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="form-input"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="form-input"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  className="form-textarea"
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-fill btn-large form-submit">
                {contactStatus === "sent" ? "Message Sent ✓" : "Send Message"}
              </button>
            </form>
          </div>

          <footer className="site-footer">
            <h3 className="footer-name">GBOLAHAN RICHARD ONI</h3>
            <p className="footer-role">Frontend Developer</p>

            <div className="footer-social-row">
              <a
                href="https://github.com/gbolahan88"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/gbolahan-oni-57b140282/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:onigbolahan88@gmail.com"
                className="footer-icon-link"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
          </footer>
        </section>

        <a
          href="https://wa.me/2349120963553"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={22} />
          <span>Chat</span>
        </a>

      </main>
    </div>
  );
}