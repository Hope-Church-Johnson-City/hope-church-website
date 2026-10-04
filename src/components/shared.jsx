import React from 'react';
import { hrefFor } from '../announcement.jsx';
import { resources } from '../resources.js';
import { pathFor } from '../nav.js';
import { useServiceTimes, useFourthServiceLive } from '../serviceTimes.jsx';
// Hope Church — shared components: Header, Footer, Sunday strip, Announcement bar

const { useState, useEffect } = React;

// ---------- Icon helper ----------
function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.75 }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    play: <polygon points="6 4 20 12 6 20 6 4" fill={color} />,
    check: <polyline points="20 6 9 17 4 12" />,
    x: <path d="M18 6L6 18M6 6l12 12" />,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>,
    kids: <><path d="M9 11a3 3 0 1 1 6 0v2a3 3 0 0 1-6 0z"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/><path d="M4 19.5V21h16"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="17" x2="12" y2="22"/></>,
    gift: <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>,
    hands: <><path d="M4 11V8a2 2 0 0 1 4 0v3"/><path d="M8 11V6a2 2 0 0 1 4 0v5"/><path d="M12 11V7a2 2 0 0 1 4 0v7"/><path d="M16 11v-1a2 2 0 0 1 4 0v6a5 5 0 0 1-5 5h-2a6 6 0 0 1-6-6v-3"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></>,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    youtube: <><path d="M22 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7.2.1c-.4.1-1.2.1-2 .9C2.2 6.6 2 8 2 8S1.8 9.6 1.8 11.2v1.6C1.8 14.4 2 16 2 16s.2 1.4.8 2c.8.8 1.8.8 2.2.9C6.6 19 12 19 12 19s4.4 0 7.2-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6C22.2 9.6 22 8 22 8z"/><polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/></>,
    chevron: <polyline points="9 18 15 12 9 6" />,
    apple: <path d="M18 10c-.6 1-1.5 2-3 2s-1.5-1-3-1-2 1-3 1-2.5-1-3-2C4 8 5 5 8 5s2 1 3 1 2-1 3-1 3 0 4 5zM13 3a3 3 0 0 0-3 3"/>,
    camera: <><path d="M3 7h3l2-3h8l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/></>,
    android: <><path d="M2 15.5l4-6M22 15.5l-4-6"/><rect x="4" y="9.5" width="16" height="11" rx="2"/><circle cx="9" cy="6" r="0.5" fill="currentColor"/><circle cx="15" cy="6" r="0.5" fill="currentColor"/><line x1="8" y1="4" x2="9" y2="6"/><line x1="16" y1="4" x2="15" y2="6"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
}

// ---------- Button ----------
function Button({ variant = 'primary', size = 'md', children, onClick, icon, iconRight }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {icon && <Icon name={icon} size={15} />}
      {children}
      {iconRight && <Icon name={iconRight} size={15} />}
    </button>
  );
}

// ---------- Announcement bar ----------
function AnnouncementBar({ text, link, onDismiss, visible }) {
  if (!visible) return null;
  // `link` is { label, url } from the CMS. It used to be a bare string drawn
  // with href="#", which went nowhere.
  const href = link && link.url ? hrefFor(link.url) : null;
  return (
    <div className="announce-bar">
      <div className="announce-bar-inner">
        <span className="announce-bar-dot" />
        <span>{text}{href && link.label ? <> <a href={href}>{link.label}</a></> : null}</span>
      </div>
      <button className="announce-bar-close" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
  );
}

// ---------- Theme Toggle ----------
// Cycles Auto -> Light -> Dark -> Auto.
// In Auto, theme is resolved from: OS preference (prefers-color-scheme),
// falling back to local clock (dark 7pm–7am) when no preference is exposed.
function systemAutoTheme() {
  try {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)  return 'dark';
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
  } catch (e) {}
  return null;
}
function resolveAutoTheme() {
  const sys = systemAutoTheme();
  if (sys) return sys;
  const h = new Date().getHours();
  return (h >= 19 || h < 7) ? 'dark' : 'light';
}
function applyTheme(mode) {
  const resolved = mode === 'auto' ? resolveAutoTheme() : mode;
  document.documentElement.dataset.theme = resolved;
}

// Hook: read the current resolved theme from <html data-theme>, and re-read it
// whenever it changes (theme toggle, OS toggle, or anything else mutating the attr).
function useResolvedTheme() {
  const [theme, setTheme] = useState(() => {
    return (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light';
  });
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme || 'light');
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

function ThemeToggle() {
  // 'auto' | 'light' | 'dark'
  // Initial mode comes from localStorage; the inline head script already set <html data-theme>
  // by checking URL param > saved > system > clock, so we DON'T re-apply on first mount.
  const [mode, setMode] = useState(() => {
    try {
      const v = localStorage.getItem('hope_theme');
      return (v === 'light' || v === 'dark') ? v : 'auto';
    } catch { return 'auto'; }
  });
  const isFirstRun = React.useRef(true);

  // Re-resolve auto whenever the system preference flips, and once a minute
  // so a tab left open through dusk catches up if the OS gives no preference.
  useEffect(() => {
    // Skip applying on the very first render — the inline head script
    // already resolved the right theme (and may have honored ?theme= URL override).
    if (!isFirstRun.current) {
      applyTheme(mode);
    }
    isFirstRun.current = false;

    if (mode !== 'auto') return;
    let mq = null, onChange = null;
    try {
      mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      onChange = () => applyTheme('auto');
      if (mq && mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq && mq.addListener) mq.addListener(onChange);
    } catch (e) {}
    const id = setInterval(() => applyTheme('auto'), 60_000);
    return () => {
      clearInterval(id);
      if (mq && onChange) {
        if (mq.removeEventListener) mq.removeEventListener('change', onChange);
        else if (mq.removeListener) mq.removeListener(onChange);
      }
    };
  }, [mode]);

  const cycle = () => {
    const next = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto';
    setMode(next);
    try {
      if (next === 'auto') localStorage.removeItem('hope_theme');
      else localStorage.setItem('hope_theme', next);
    } catch {}
  };

  const label = mode === 'auto' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark';
  const resolved = mode === 'auto' ? resolveAutoTheme() : mode;
  const title = mode === 'auto'
    ? `Theme: Auto (currently ${resolved}). Click for Light.`
    : mode === 'light' ? 'Theme: Light. Click for Dark.'
    : 'Theme: Dark. Click for Auto.';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      title={title}
      aria-label={title}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {resolved === 'dark' ? (
          // moon
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
          </svg>
        ) : (
          // sun
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2"  x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="2"  y1="12" x2="4"  y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.9" y1="4.9"  x2="6.3" y2="6.3"/>
            <line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/>
            <line x1="4.9" y1="19.1" x2="6.3" y2="17.7"/>
            <line x1="17.7" y1="6.3"  x2="19.1" y2="4.9"/>
          </svg>
        )}
      </span>
      <span className="theme-toggle-label">{label}</span>
    </button>
  );
}

// ---------- Simple Theme Toggle (light/dark only, no Auto) ----------
// UNUSED. Kept only so the change back to ThemeToggle is a one-line revert.
//
// Why it was retired: with no Auto position, the first click wrote 'light' or
// 'dark' to hope_theme and there was no way to remove it again, so the site
// stopped following the device from that click onward -- permanently, and
// invisibly, since the button gives no hint that it is making a lasting choice.
// ThemeToggle's third position removes the key and hands the decision back.
// Same markup/classes as ThemeToggle (below) so it inherits its styling
// with no new CSS, just a simplified 2-state flip instead of the
// Auto -> Light -> Dark -> Auto cycle. Uses the same 'hope_theme'
// localStorage key and <html data-theme> attribute as the existing
// bootstrap script and useResolvedTheme, so it stays in sync with
// anything else reading theme state. ThemeToggle itself is left
// untouched below in case anything else still uses it.
function SimpleThemeToggle() {
  const theme = useResolvedTheme();
  const isDark = theme === 'dark';
  const flip = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('hope_theme', next); } catch {}
  };
  const title = isDark ? 'Theme: Dark. Click for Light.' : 'Theme: Light. Click for Dark.';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={flip}
      title={title}
      aria-label={title}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? (
          // moon
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
          </svg>
        ) : (
          // sun
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2"  x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="2"  y1="12" x2="4"  y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.9" y1="4.9"  x2="6.3" y2="6.3"/>
            <line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/>
            <line x1="4.9" y1="19.1" x2="6.3" y2="17.7"/>
            <line x1="17.7" y1="6.3"  x2="19.1" y2="4.9"/>
          </svg>
        )}
      </span>
      <span className="theme-toggle-label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

// ---------- Sunday Strip (sticky service times, top of page) ----------
function SundayStrip() {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  return (
    <div className="sunday-strip">
      <div className="container sunday-strip-inner">
        <div className="sunday-strip-left">
          <span className="sunday-strip-label">Sundays</span>
          <div className="sunday-strip-times">
            <span>{st.first}</span><em/>
            <span>{st.second}</span><em/>
            <span>{st.third}</span>
            {fourthLive && <><em/><span>{st.fourth}</span></>}
          </div>
        </div>
        <div className="sunday-strip-right">
          <a href="https://www.google.com/maps/search/?api=1&query=5034+Bobby+Hicks+Hwy+Johnson+City+TN" target="_blank" rel="noopener"><Icon name="pin" size={13}/> 5034 Bobby Hicks Hwy</a>
          <a href="https://www.youtube.com/@hopechurchjohnsoncity" target="_blank" rel="noopener">Watch Live on Sundays at {st.stream}</a>
          <ThemeToggle/>
        </div>
      </div>
    </div>
  );
}

// ---------- Site Header ----------
function SiteHeader({ onNav, current, dark = false }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  const involvedItems = [
    { id: 'lifegroups', label: 'Groups', desc: '', href: 'https://hopejc.churchcenter.com/groups/life-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment' },
    { id: 'serve', label: 'Serve', desc: 'Find a team that fits your gifts and schedule.' },
    { id: 'missions', label: 'Missions', desc: 'Our partners — local, national, and global.' },
    { id: 'connect', label: 'Connect Card', desc: 'Say hi, share a prayer request, take a step.' },
    { id: 'discover', label: 'Discover Hope', desc: 'Our new-members class — first Wed each month.' },
  ];
  const involvedIds = involvedItems.map(i => i.id);
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'visit', label: 'I’m New' },
    { id: 'about', label: 'About' },
    { id: 'sermons', label: 'Sermons' },
    { id: 'events', label: 'Events' },
    { id: 'ministries', label: 'Ministries' },
    { id: '__involved', label: 'Get Involved', dropdown: involvedItems },
    { id: 'give', label: 'Give' },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileInvolvedOpen, setMobileInvolvedOpen] = useState(true);
  // Logo: in dark mode use the reversed lockup (colored icon + white wordmark).
  // The 'dark' prop (passed by hero-C bookend) forces the white treatment regardless of theme.
  const theme = useResolvedTheme();
  const isDark = dark || theme === 'dark';
  const logo = isDark ? resources.logoHorizReversed : resources.logoHorizBlue;

  // Floating-pill header: turns on past a small scroll threshold. Plain
  // scroll listener (not IntersectionObserver) since there's no fixed anchor
  // element to observe — this just tracks a scrollY threshold.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open + scroll to top so menu aligns with header
  useEffect(() => {
    if (menuOpen) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [menuOpen]);

  // Close dropdown on Escape / click outside
  useEffect(() => {
    if (!dropOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setDropOpen(false); };
    const onDocClick = (e) => {
      if (!e.target.closest('.nav-dropdown')) setDropOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, [dropOpen]);

  const go = (id) => { setMenuOpen(false); setDropOpen(false); onNav(id); };
  const involvedActive = involvedIds.includes(current);
  const dropCloseTimer = React.useRef(null);
  const openDrop = () => {
    if (dropCloseTimer.current) { clearTimeout(dropCloseTimer.current); dropCloseTimer.current = null; }
    setDropOpen(true);
  };
  const scheduleCloseDrop = () => {
    if (dropCloseTimer.current) clearTimeout(dropCloseTimer.current);
    dropCloseTimer.current = setTimeout(() => setDropOpen(false), 220);
  };

  return (
    <header className={`site-header ${dark ? 'dark' : ''} ${menuOpen ? 'menu-open' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header-inner">
        <a className="brand" href="/" onClick={(e)=>{e.preventDefault();go('home');}}>
          <img src={logo} alt="Hope Church" />
        </a>
        <nav className="site-nav">
          {links.map(l => {
            if (l.dropdown) {
              return (
                <div
                  key={l.id}
                  className={`nav-dropdown ${dropOpen ? 'open' : ''}`}
                  onMouseEnter={openDrop}
                  onMouseLeave={scheduleCloseDrop}
                >
                  <button
                    type="button"
                    className={`nav-dropdown-trigger ${involvedActive ? 'active' : ''}`}
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                    onClick={(e) => { e.stopPropagation(); setDropOpen(o => !o); }}
                  >
                    {l.label}
                    <svg className="nav-dropdown-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="nav-dropdown-panel" role="menu">
                    <div className="nav-dropdown-eyebrow">Get Involved</div>
                    <div className="nav-dropdown-list">
                      {l.dropdown.map(d => (
                        <a
                          key={d.id}
                          href={d.href || pathFor(d.id)}
                          target={d.href ? '_blank' : undefined}
                          rel={d.href ? 'noopener noreferrer' : undefined}
                          role="menuitem"
                          className={`nav-dropdown-item ${current === d.id ? 'active' : ''}`}
                          onClick={(e)=>{
                            if (d.href) { setDropOpen(false); return; }
                            e.preventDefault(); go(d.id);
                          }}
                        >
                          <div className="nav-dropdown-item-label">
                            <span>{d.label}</span>
                            {d.href && (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.55, marginLeft:8}}><path d="M7 17L17 7M9 7h8v8"/></svg>
                            )}
                          </div>
                          <div className="nav-dropdown-item-desc">{d.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a key={l.id} href={pathFor(l.id)} onClick={(e)=>{e.preventDefault();onNav(l.id);}} className={current === l.id ? 'active' : ''}>{l.label}</a>
            );
          })}
        </nav>
        <div className="site-cta">
          <Button variant="primary" size="sm" onClick={()=>onNav('visit')}>Plan a Visit</Button>
        </div>
        <button
          className="site-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={26}/>
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-menu-nav">
          {links.map(l => {
            if (l.dropdown) {
              return (
                <React.Fragment key={l.id}>
                  <button
                    type="button"
                    className={`mobile-menu-group-head ${mobileInvolvedOpen ? 'open' : ''} ${involvedActive ? 'active' : ''}`}
                    aria-expanded={mobileInvolvedOpen}
                    onClick={() => setMobileInvolvedOpen(o => !o)}
                  >
                    <span>{l.label}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {mobileInvolvedOpen && (
                    <div className="mobile-menu-group-items">
                      {l.dropdown.map(d => (
                        <a
                          key={d.id}
                          href={d.href || pathFor(d.id)}
                          target={d.href ? '_blank' : undefined}
                          rel={d.href ? 'noopener noreferrer' : undefined}
                          onClick={(e)=>{
                            if (d.href) { setMenuOpen(false); return; }
                            e.preventDefault(); go(d.id);
                          }}
                          className={current === d.id ? 'active' : ''}
                        >
                          <span>{d.label}</span>
                          <Icon name="chevron" size={16}/>
                        </a>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            }
            return (
              <a
                key={l.id}
                href={pathFor(l.id)}
                onClick={(e)=>{e.preventDefault();go(l.id);}}
                className={current === l.id ? 'active' : ''}
              >
                <span>{l.label}</span>
                <Icon name="chevron" size={18}/>
              </a>
            );
          })}
        </nav>
        <div className="mobile-menu-cta">
          <Button variant="primary" size="lg" onClick={()=>go('visit')} iconRight="arrow">Plan Your Visit</Button>
        </div>
        <div className="mobile-menu-foot">
          <div className="mobile-menu-foot-label">Sundays</div>
          <div className="mobile-menu-foot-times">
            {st.first.replace('am','')} · {st.second.replace('am','')} · {fourthLive ? <>{st.third.replace('am','')} · {st.fourth}</> : st.third}
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=5034+Bobby+Hicks+Hwy+Johnson+City+TN" target="_blank" rel="noopener" className="mobile-menu-foot-addr">
            <Icon name="pin" size={14}/> 5034 Bobby Hicks Hwy, Johnson City, TN
          </a>
        </div>
      </div>
    </header>
  );
}

// ---------- Section Header ----------
function SectionHeader({ eyebrow, title, lead, align = 'left' }) {
  return (
    <header className={`section-header align-${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

// ---------- Mission Bar ----------
function MissionBar() {
  return (
    <section className="mission-bar">
      <span className="eyebrow mission-bar-eyebrow">Why We Gather</span>
      <div className="mission-bar-words">
        <span>Love God.</span> <span>Love people.</span> <span>Make disciples.</span>
      </div>
    </section>
  );
}

// ---------- Service Times block ----------
function ServiceTimes() {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  const ALL_CLASSES = 'All classes (nursery–Linked 56)';
  const times = [
    { t: st.first.replace('am',''), s: 'am', name: 'First Service', note: st.isNew ? 'Nursery & preschool only' : null },
    { t: st.second.replace('am',''), s: 'am', name: 'Second Service', note: st.isNew ? ALL_CLASSES : null },
    { t: st.third.replace('am',''), s: 'am', name: 'Third Service', note: st.isNew ? ALL_CLASSES : null },
  ];
  // The 12:45 service shows as "coming soon" before it starts, then becomes an
  // ordinary card alongside the others.
  if (st.isNew) times.push({
    t: st.fourth.replace('pm',''), s: 'pm', name: 'Fourth Service',
    note: ALL_CLASSES, soon: !fourthLive,
  });
  return (
    <section className="service-times" data-screen-label="ServiceTimes">
      <div className="container">
        <div className="service-times-header">
          <span className="eyebrow">Sunday Mornings</span>
          <h2 className="service-times-title">There&rsquo;s a place for you</h2>
        </div>
        <div className="service-times-grid">
          {times.map((x) => (
            <div key={x.name} className={x.soon ? 'service-time service-time-soon' : 'service-time'}>
              {x.soon && <div className="st-soon">Coming Soon</div>}
              <div className="st-time">{x.t}<s>{x.s}</s></div>
              <div className="st-name">{x.name}</div>
              {x.note && <div className="st-note">{x.note}</div>}
              {x.soon && <div className="st-desc">Starting Sunday, September&nbsp;20</div>}
            </div>
          ))}
        </div>
        <div className="service-times-foot">
          5034 Bobby Hicks Hwy · <a href="https://www.google.com/maps/search/?api=1&query=5034+Bobby+Hicks+Hwy+Johnson+City+TN" target="_blank" rel="noopener">Get directions</a> · or <a href="https://www.youtube.com/@hopechurchjohnsoncity" target="_blank" rel="noopener">watch online</a>
        </div>
      </div>
    </section>
  );
}

// ---------- New Here ----------
function NewHereBlock({ onVisit }) {
  return (
    <section className="new-here">
      <div className="container new-here-inner">
        <div className="new-here-copy">
          <span className="eyebrow">New Here?</span>
          <h2>We saved you a seat.</h2>
          <p className="lead">No dress code. No pressure. You don’t need to know anyone to belong here. Let us know you’re coming and we’ll meet you at the door.</p>
          <ul className="new-here-checklist">
            <li>A friendly welcome at the front door</li>
            <li>Kids and Tweens classes are offered for infants through 6th grade</li>
            <li>Free coffee and an easy way in</li>
            <li>Someone to sit with, if you’d like</li>
          </ul>
          <div className="new-here-actions">
            <Button variant="primary" size="lg" onClick={onVisit} iconRight="arrow">Plan Your Visit</Button>
            <Button variant="secondary" size="lg" onClick={onVisit}>What to Expect</Button>
          </div>
        </div>
        <div className="new-here-photo">
          <img src={resources.lobbyWelcome} alt="Hope Church family connecting in the lobby after a Sunday service" />
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ onNav }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={resources.logoStackedReversed} alt="Hope Church" />
          <p className="footer-tagline">Love God.<br/>Love people.<br/>Make disciples.</p>
          <div className="footer-address">
            <strong>Hope Church</strong>
            <a href="https://www.google.com/maps/search/?api=1&query=5034+Bobby+Hicks+Hwy+Johnson+City+TN" target="_blank" rel="noopener" style={{color:'inherit'}}>
              5034 Bobby Hicks Hwy<br/>
              Johnson City, TN 37615
            </a><br/>
            (423) 207-3341
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/hopechurch_jc/" target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" size={15}/></a>
            <a href="https://www.facebook.com/hopechurchjohnsoncity" target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" size={15}/></a>
            <a href="https://www.youtube.com/@hopechurchjohnsoncity" target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" size={15}/></a>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <h5>Sundays</h5>
            <ul>
              <li>{st.first}</li>
              <li>{st.second}</li>
              <li>{st.third}</li>
              {fourthLive && <li>{st.fourth}</li>}
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href={pathFor('thisweek')} onClick={(e)=>{e.preventDefault();onNav('thisweek');}}>This Week</a></li>
              <li><a href={pathFor('visit')} onClick={(e)=>{e.preventDefault();onNav('visit');}}>Plan a Visit</a></li>
              <li><a href={pathFor('about')} onClick={(e)=>{e.preventDefault();onNav('about');}}>About</a></li>
              <li><a href={pathFor('team')} onClick={(e)=>{e.preventDefault();onNav('team');}}>Team</a></li>
              <li><a href={pathFor('nextsteps')} onClick={(e)=>{e.preventDefault();onNav('nextsteps');}}>Next Steps</a></li>
              <li><a href={pathFor('serve')} onClick={(e)=>{e.preventDefault();onNav('serve');}}>Serve</a></li>
              <li><a href={pathFor('ministries')} onClick={(e)=>{e.preventDefault();onNav('ministries');}}>Ministries</a></li>
              <li><a href="https://stores.inksoft.com/hopechurch/shop/home" target="_blank" rel="noopener">Online Merch Store</a></li>
            </ul>
          </div>
          <div>
            <h5>Listen</h5>
            <ul>
              <li><a href={pathFor('sermons')} onClick={(e)=>{e.preventDefault();onNav('sermons');}}>Sermons</a></li>
              <li><a href={pathFor('podcast')} onClick={(e)=>{e.preventDefault();onNav('podcast');}}>Hope Church Podcast</a></li>
              <li><a href={pathFor('podcast-finding-hope')} onClick={(e)=>{e.preventDefault();onNav('podcast-finding-hope');}}>Finding Hope Podcast</a></li>
              <li><a href={pathFor('app')} onClick={(e)=>{e.preventDefault();onNav('app');}}>App</a></li>
            </ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><a href="https://hopejc.churchcenter.com/calendar/forms/12134" target="_blank" rel="noopener">Event Request Form</a></li>
              <li><a href={pathFor('give')} onClick={(e)=>{e.preventDefault();onNav('give');}}>Give</a></li>
              <li><a href={pathFor('contact')} onClick={(e)=>{e.preventDefault();onNav('contact');}}>Contact</a></li>
              <li><a href={pathFor('prayer')} onClick={(e)=>{e.preventDefault();onNav('prayer');}}>Prayer Requests</a></li>
              <li><a href={pathFor('gethelp')} onClick={(e)=>{e.preventDefault();onNav('gethelp');}}>Get Help</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-live-row">
          <a className="footer-live-btn" href="https://www.youtube.com/@hopechurchjohnsoncity" target="_blank" rel="noopener">
            <span className="live-dot" aria-hidden="true"/>
            Watch live at {st.stream}
          </a>
        </div>
      </div>
      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>© 2026 Hope Church</span>
          <div className="footer-bar-links">
            <a href={pathFor('privacy')} onClick={(e)=>{e.preventDefault();onNav('privacy');}}>Privacy</a>
            <a href={pathFor('terms')} onClick={(e)=>{e.preventDefault();onNav('terms');}}>Terms</a>
            <a href={pathFor('accessibility')} onClick={(e)=>{e.preventDefault();onNav('accessibility');}}>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export {
  Icon, Button, AnnouncementBar, SundayStrip, SiteHeader, SectionHeader,
  MissionBar, ServiceTimes, NewHereBlock, Footer, ThemeToggle, useResolvedTheme,
};
