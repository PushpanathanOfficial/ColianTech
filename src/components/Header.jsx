import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      {/* Brand Logo */}
      <div className="header-logo">
        <svg
          className="brand-icon"
          width="38"
          height="32"
          viewBox="0 0 42 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TechCare stylized lantern / medical cross shape */}
          <path
            d="M17.5 0L35 10V26L17.5 36L0 26V10L17.5 0Z"
            fill="none"
          />
          <path
            d="M18.8 3.5L4.5 11.8V24.2L18.8 32.5L33.1 24.2V11.8L18.8 3.5Z"
            fill="none"
          />
          <path
            d="M19 4L6 12L19 20L32 12L19 4Z"
            fill="#01F0D0"
          />
          <path
            d="M6 12V24L19 32V20L6 12Z"
            fill="#00B8A9"
          />
          <path
            d="M32 12V24L19 32V20L32 12Z"
            fill="#058C80"
          />
          <path
            d="M19 12L13 16L19 20L25 16L19 12Z"
            fill="#FFFFFF"
          />
        </svg>
        <span className="brand-name">
          Tech<span className="brand-dot">.</span>Care
        </span>
      </div>

      {/* Primary Navigation */}
      <nav className="header-nav" aria-label="Main Navigation">
        <button type="button" className="nav-item">
          <svg width="18" height="17" viewBox="0 0 20 19" fill="currentColor">
            <path d="M10 0.5L0 8.5V18.5H6.25V12.25H13.75V18.5H20V8.5L10 0.5Z" />
          </svg>
          <span>Overview</span>
        </button>

        <button type="button" className="nav-item active" aria-current="page">
          <svg width="20" height="17" viewBox="0 0 20 17" fill="currentColor">
            <path d="M14.5 5.5C14.5 3.01472 12.4853 1 10 1C7.51472 1 5.5 3.01472 5.5 5.5C5.5 7.98528 7.51472 10 10 10C12.4853 10 14.5 7.98528 14.5 5.5Z" />
            <path d="M1.5 15C1.5 12.5 5.5 11.5 10 11.5C14.5 11.5 18.5 12.5 18.5 15V16.5H1.5V15Z" />
          </svg>
          <span>Patients</span>
        </button>

        <button type="button" className="nav-item">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="3" width="14" height="13" rx="2" />
            <line x1="2" y1="7" x2="16" y2="7" />
            <line x1="5.5" y1="1" x2="5.5" y2="3.5" />
            <line x1="12.5" y1="1" x2="12.5" y2="3.5" />
          </svg>
          <span>Schedule</span>
        </button>

        <button type="button" className="nav-item">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9C17 13.4183 13.4183 17 9 17C7.5 17 6.1 16.6 4.9 15.9L1.5 17L2.6 13.6C1.6 12.3 1 10.7 1 9Z" />
          </svg>
          <span>Message</span>
        </button>

        <button type="button" className="nav-item">
          <svg width="19" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="1.5" y="1.5" width="17" height="13" rx="2" />
            <line x1="1.5" y1="5.5" x2="18.5" y2="5.5" />
            <circle cx="5" cy="11" r="1" fill="currentColor" />
          </svg>
          <span>Transactions</span>
        </button>
      </nav>

      {/* Doctor Info and Controls */}
      <div className="header-doctor">
        <div className="doctor-profile">
          <img
            src="https://fedskillstest.ct.digital/1.png"
            alt="Dr. Jose Simmons"
            className="doctor-avatar"
            onError={(e) => {
              // Graceful avatar fallback
              e.currentTarget.src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="22" fill="%23E0F3FA"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23072635">JS</text></svg>';
            }}
          />
          <div className="doctor-meta">
            <span className="doctor-name">Dr. Jose Simmons</span>
            <span className="doctor-role">General Practitioner</span>
          </div>
        </div>

        <div className="header-divider" />

        <div className="header-actions">
          <button type="button" className="icon-btn" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#072635" strokeWidth="1.8">
              <circle cx="10" cy="10" r="3" />
              <path d="M17.4 12.4l1.6 1.2-1.6 2.8-1.9-.7a6.9 6.9 0 01-1.4.8l-.3 2h-3.6l-.3-2a6.9 6.9 0 01-1.4-.8l-1.9.7-1.6-2.8 1.6-1.2a6.9 6.9 0 010-1.6L5 9.6 6.6 6.8l1.9.7a6.9 6.9 0 011.4-.8l.3-2h3.6l.3 2a6.9 6.9 0 011.4.8l1.9-.7 1.6 2.8-1.6 1.2a6.9 6.9 0 010 1.6z" />
            </svg>
          </button>
          <button type="button" className="icon-btn" aria-label="More options">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="#072635">
              <circle cx="2" cy="2" r="2" />
              <circle cx="2" cy="8" r="2" />
              <circle cx="2" cy="14" r="2" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
