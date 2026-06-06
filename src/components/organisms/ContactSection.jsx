import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactSection.css";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    
    const formData = new FormData(e.target);
    // You can get your own access key at https://web3forms.com/
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setStatus("SIGNAL RECEIVED");
      e.target.reset();
    } else {
      setStatus("TRANSMISSION FAILED");
      console.log("Error", data);
    }
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="contact-bg-glow" />
      
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-label">COMMUNICATION_LINK</span>
          <h2 className="contact-title">Let's Build Something</h2>
          <p className="contact-subtitle">Currently open to freelance missions, collaborations, or just a friendly 'Hello'.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="form-group-row">
            <div className="form-group">
              <label>SENDER_NAME</label>
              <input type="text" name="name" placeholder="Who are you?" required />
              <div className="input-border" />
            </div>
            <div className="form-group">
              <label>SENDER_EMAIL</label>
              <input type="email" name="email" placeholder="Where can I reach you?" required />
              <div className="input-border" />
            </div>
          </div>

          <div className="form-group">
            <label>SUBJECT</label>
            <input type="text" name="subject" placeholder="Mission Objective" required />
            <div className="input-border" />
          </div>

          <div className="form-group">
            <label>MESSAGE_BODY</label>
            <textarea name="message" rows="5" placeholder="Enter your transmission..." required></textarea>
            <div className="input-border" />
          </div>

          <button type="submit" className="contact-submit">
            <span className="btn-glitch">TRANSMIT SIGNAL</span>
            <div className="btn-radar" />
          </button>

          {status && <div className="contact-status">[{status}]</div>}
        </form>

        <div className="contact-footer-ui">
          <div className="ui-line" />
          <div className="ui-data">
            <span>LOC: KATHMANDU, NEPAL</span>
            <span>FREQ: 2.4GHz / 5GHz</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
