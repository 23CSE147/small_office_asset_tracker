"use client";
import { useRouter } from "next/navigation";
import "./Homepage.css";
import { useSession } from "next-auth/react";

export default function Homepage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <section className="hero-section-full">
      <div className="centered-content">
        <div className="secure-badge">🔒 Secure Asset Management</div>

        <div className="hero-title">
          Streamline Your Office <br />
          <span className="hero-blue">Asset Management</span>
        </div>

        <div className="hero-desc">
          Professional asset tracking for small offices. Secure, efficient, and
          easy to use.
          <br />
          Track, manage, and monitor all your office assets from one dashboard.
        </div>

        <div className="grid-section">
          {[
            {
              title: "🗄️ Asset Tracking",
              desc: "Detailed tracking of all office equipment and resources.",
            },
            {
              title: "🔐 Secure Access",
              desc: "Admin-only authentication to keep your data secure.",
            },
            {
              title: "📊 Real-time Analytics",
              desc: "Get usage insights and maintenance schedules.",
            },
            {
              title: "👥 Team Management",
              desc: "Assign and monitor assets across team members.",
            },
            {
              title: "⚙️ Easy Configuration",
              desc: "Set up your dashboard quickly and easily.",
            },
            {
              title: "🛡️ Data Protection",
              desc: "Enterprise-grade protection for sensitive asset data.",
            },
          ].map((item, i) => (
            <div key={i} className="feature-card">
              <div className="feature-title">{item.title}</div>
              <div className="feature-desc">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <div className="cta-box">
            <div className="cta-main">Ready to get started?</div>
            <div className="cta-desc">
              Take control of your office assets today with our secure
              management platform.
            </div>
            <button
              className="cta-btn"
              onClick={() => {
                if (session) {
                  router.push("/assets");
                } else {
                  router.push("/login");
                }
              }}
            >
              Access Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
