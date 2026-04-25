import Navbar from "../components/Navbar";
import "../App.css";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

function Landing() {
  return (
    <div className="landing-page">
      // Navbar - No animations applied
      <Navbar />

      // Hero Section with fadeInUp animation
      <motion.section 
        id="hero" 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1 variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
            Welcome to Planora
          </motion.h1>
          <motion.p variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
            Your ultimate planning companion for a more organized life
          </motion.p>
          <motion.div 
            className="hero-buttons" 
            variants={fadeInUp} 
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#pricing" className="btn-primary">
              Get Started
            </a>
            <a href="#how-it-works" className="btn-secondary">
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.section>

      // How It Works Section with fadeInUp and staggered child animations
      <motion.section 
        id="how-it-works" 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container">
          <motion.h2 variants={fadeInUp} transition={{ duration: 0.6 }}>
            How It Works
          </motion.h2>
          <motion.div 
            className="features-grid"
            variants={staggerContainer}
          >
            <motion.div className="feature-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <div className="feature-icon">📝</div>
              <h3>Create Your Plan</h3>
              <p>Start by outlining your goals and objectives in a few simple steps.</p>
            </motion.div>
            <motion.div className="feature-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <div className="feature-icon">🎯</div>
              <h3>Set Milestones</h3>
              <p>Break down your plan into achievable milestones and track progress.</p>
            </motion.div>
            <motion.div className="feature-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <div className="feature-icon">📊</div>
              <h3>Monitor Progress</h3>
              <p>Visualize your progress with intuitive charts and analytics.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      // Pricing Section with fadeInUp and scaleIn animations
      <motion.section 
        id="pricing" 
        className="section section-alt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container">
          <motion.h2 variants={fadeInUp} transition={{ duration: 0.6 }}>
            Pricing Plans
          </motion.h2>
          <motion.div 
            className="pricing-grid"
            variants={staggerContainer}
          >
            <motion.div className="pricing-card" variants={scaleIn} transition={{ duration: 0.5 }}>
              <h3>Free</h3>
              <div className="price">$0</div>
              <ul className="features-list">
                <li>Up to 3 projects</li>
                <li>Basic analytics</li>
                <li>Community support</li>
              </ul>
              <a href="/register" className="btn-secondary">
                Sign Up Free
              </a>
            </motion.div>
            <motion.div className="pricing-card featured" variants={scaleIn} transition={{ duration: 0.5 }}>
              <div className="featured-badge">Most Popular</div>
              <h3>Pro</h3>
              <div className="price">$19</div>
              <ul className="features-list">
                <li>Unlimited projects</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>Team collaboration</li>
              </ul>
              <a href="/register" className="btn-primary">
                Get Pro
              </a>
            </motion.div>
            <motion.div className="pricing-card" variants={scaleIn} transition={{ duration: 0.5 }}>
              <h3>Enterprise</h3>
              <div className="price">$49</div>
              <ul className="features-list">
                <li>Everything in Pro</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
                <li>SSO & Security</li>
              </ul>
              <a href="/register" className="btn-secondary">
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      // Testimonial Section with fadeInUp and staggered child animations
      <motion.section 
        id="testimonial" 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container">
          <motion.h2 variants={fadeInUp} transition={{ duration: 0.6 }}>
            What Our Users Say
          </motion.h2>
          <motion.div 
            className="testimonial-grid"
            variants={staggerContainer}
          >
            <motion.div className="testimonial-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <p className="testimonial-text">"Planora has completely transformed how I manage my projects. It's intuitive, powerful, and a joy to use every day."</p>
              <div className="testimonial-author">
                <div className="author-avatar">ET</div>
                <div className="author-info">
                  <strong>Emmanuel Taiwo</strong>
                  <span>Founder</span>
                </div>
              </div>
            </motion.div>
            <motion.div className="testimonial-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <p className="testimonial-text">"The best planning tool I've ever used. The milestone tracking feature alone has saved me countless hours."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SO</div>
                <div className="author-info">
                  <strong>Shonibare Olaoluwa</strong>
                  <span>Freelance Designer</span>
                </div>
              </div>
            </motion.div>
            <motion.div className="testimonial-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <p className="testimonial-text">"The best planning tool I've ever used. The milestone tracking feature alone has saved me countless hours."</p>
              <div className="testimonial-author">
                <div className="author-avatar">AT</div>
                <div className="author-info">
                  <strong>Adedokun Timothy</strong>
                  <span>Graphics Designer</span>
                </div>
              </div>
            </motion.div>
            <motion.div className="testimonial-card" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <p className="testimonial-text">"Our team's productivity increased by 40% after switching to Planora. Highly recommend it to any growing business."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MJ</div>
                <div className="author-info">
                  <strong>Mike Johnson</strong>
                  <span>Startup Founder</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      // About Us Section with fadeInUp and scaleIn animations
      <motion.section 
        id="about" 
        className="section section-alt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container">
          <motion.h2 variants={fadeInUp} transition={{ duration: 0.6 }}>
            About Us
          </motion.h2>
          <motion.div className="about-content" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <p>
              Planora was founded with a simple mission: to help individuals and teams organize their work and achieve their goals more effectively.
            </p>
            <p>
              We believe that great planning shouldn't be complicated. That's why we've built a tool that combines powerful features with an intuitive interface, making it easy for anyone to plan, track, and succeed.
            </p>
            <motion.div 
              className="about-stats"
              variants={staggerContainer}
            >
              <motion.div className="stat" variants={scaleIn} transition={{ duration: 0.5 }}>
                <div className="stat-number">4+</div>
                <div className="stat-label">Active Users</div>
              </motion.div>
              <motion.div className="stat" variants={scaleIn} transition={{ duration: 0.5 }}>
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Created</div>
              </motion.div>
              <motion.div className="stat" variants={scaleIn} transition={{ duration: 0.5 }}>
                <div className="stat-number">70%</div>
                <div className="stat-label">Uptime</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      // Contact Section with fadeInUp and staggered child animations
      <motion.footer 
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-container">
          <div className="footer-brand">
            <img src="images/favicon.png" alt="Planora" className="logo-icon" />
            <span className="logo-text">Planora</span>
          </div>
          <p className="footer-text">© 2026 Planora. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Landing;