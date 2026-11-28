/* Hope Church — desktop navigation with one shared menu panel.

   Hovering (or focusing) I'm New, About, Sermons, Ministries or Get Involved
   opens a single white panel under the header. Moving between them keeps the
   panel open: it changes height to fit the new menu and the contents cross-fade
   with a small sideways slide toward the direction the pointer moved, and the
   page behind dims. Asked for 2026-11-27, after a reference site's nav.

   Every menu is in the pre-rendered HTML (hidden until opened), so the links are
   crawlable and work with JavaScript off. Under prefers-reduced-motion the panel
   opens and switches with no movement (see mega-nav.css). Below 881px the burger
   menu in SiteHeader is used instead. */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { pathFor } from '../nav.js';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const YOUTUBE_LIVE = 'https://www.youtube.com/@hopechurchjohnsoncity';
const GROUPS =
  'https://hopejc.churchcenter.com/groups/life-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment';

/** The menus, by top-level nav id. `columns` are lists of links; an item with
 *  `href` opens outside the site. */
export const MEGA_MENUS = {
  visit: {
    intro: { eyebrow: 'I’m New', text: 'First time at Hope? Here’s how to plan your first Sunday and where to go next.' },
    columns: [[
      { id: 'visit', label: 'Plan Your Visit', desc: 'Service times, kids check-in, parking and what to expect.' },
      { id: 'nextsteps', label: 'Next Steps', desc: 'Get connected, get baptized, join a group or become a member.' },
      { id: 'discover', label: 'Discover Hope', desc: 'Our new-members class, the first Wednesday of each month.' },
      { id: 'thisweek', label: 'This Week', desc: 'Sermon notes, the newsletter and what’s coming up.' },
    ]],
  },
  about: {
    intro: { eyebrow: 'About', text: 'Who we are: a church in Gray / Johnson City that loves God, loves people and makes disciples.' },
    columns: [[
      { id: 'about', label: 'About Hope', desc: 'Our story, beliefs and vision.' },
      { id: 'team', label: 'Our Team', desc: 'The pastors, elders and staff.' },
      { id: 'generations', label: 'Generations', desc: 'Our campaign to build a permanent home.' },
      { id: 'contact', label: 'Contact', desc: 'Address, phone, email and office hours.' },
      { id: 'app', label: 'Get the App', desc: 'Sermons, events and giving on your phone.' },
    ]],
  },
  sermons: {
    intro: { eyebrow: 'Sermons', text: 'Watch or listen to Sunday’s message, catch up on the current series, or revisit past ones.' },
    columns: [[
      { id: 'sermons', label: 'All Sermons', desc: 'Every message, by series and speaker.' },
      { id: 'podcast', label: 'Hope Church Podcast', desc: 'Sunday messages to listen to anywhere.' },
      { id: 'podcast-finding-hope', label: 'Finding Hope Podcast', desc: 'Conversations from our pastors.' },
      { id: 'live', label: 'Watch Live', desc: 'Sundays on YouTube.', href: YOUTUBE_LIVE },
    ]],
  },
  ministries: {
    intro: { eyebrow: 'Ministries', text: 'A place for every age and stage.', more: { id: 'ministries', label: 'All ministries' } },
    columns: [
      [
        { id: 'ministry-kids', label: 'Hope Kids', desc: 'Birth through 4th grade.' },
        { id: 'ministry-linked56', label: 'Linked 5&6', desc: '5th and 6th grade.' },
        { id: 'ministry-students', label: 'Hope Students', desc: 'Middle and high school.' },
        { id: 'ministry-college', label: 'College & Career', desc: 'Students and young adults.' },
      ],
      [
        { id: 'ministry-women', label: 'Woven', desc: 'Women’s ministry.' },
        { id: 'ministry-men', label: 'H.I.T.', desc: 'Men’s ministry.' },
        { id: 'ministry-worship', label: 'Worship & Tech', desc: 'Music, audio, video and production.' },
        { id: 'ministry-fueledbyhope', label: 'Fueled by Hope', desc: 'Coffee and hospitality.' },
      ],
    ],
  },
  __involved: {
    intro: { eyebrow: 'Get Involved', text: 'Find your people, a team to serve on, and ways to care for others.' },
    columns: [
      [
        { id: 'lifegroups', label: 'Groups', desc: 'Find a group that meets near you.', href: GROUPS },
        { id: 'serve', label: 'Serve', desc: 'A team that fits your gifts and schedule.' },
        { id: 'missions', label: 'Missions', desc: 'Our partners — local, national and global.' },
        { id: 'connect', label: 'Connect Card', desc: 'Say hello, share a request, take a step.' },
      ],
      [
        { id: 'discover', label: 'Discover Hope', desc: 'Our new-members class, first Wednesday monthly.' },
        { id: 'prayer', label: 'Prayer Requests', desc: 'Share a request with our prayer team.' },
        { id: 'gethelp', label: 'Get Help', desc: 'Counseling, recovery and crisis help.' },
      ],
    ],
  },
};

/** Every page id a menu reaches, so its trigger can show as current. */
function idsOf(menu) {
  return new Set([...(menu.columns || []).flat().map((i) => i.id), menu.intro?.more?.id].filter(Boolean));
}

function Arrow() {
  return (
    <svg className="mega-ext" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8"/>
    </svg>
  );
}

function Caret() {
  return (
    <svg className="mega-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

/**
 * links: [{ id, label }] in nav order. A link whose id has a MEGA_MENUS entry
 * opens that menu; `__involved` has no page of its own, the rest still go to
 * their page when clicked.
 */
export default function MegaNav({ links, current, onNav }) {
  const [openId, setOpenId] = useState(null);
  const [dir, setDir] = useState(0);            // -1 moved left, 1 moved right
  const [height, setHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef(null);
  const openTimer = useRef(null);
  const panes = useRef({});
  const triggers = useRef({});
  const order = links.filter((l) => MEGA_MENUS[l.id]).map((l) => l.id);

  useEffect(() => { setMounted(true); }, []);

  const clearTimers = () => {
    clearTimeout(closeTimer.current); closeTimer.current = null;
    clearTimeout(openTimer.current); openTimer.current = null;
  };

  const show = (id) => {
    clearTimers();
    setOpenId((prev) => {
      if (prev && prev !== id) setDir(order.indexOf(id) > order.indexOf(prev) ? 1 : -1);
      else if (!prev) setDir(0);
      return id;
    });
  };
  // A short wait before opening from closed, so a pointer passing over the
  // nav on its way down the page doesn't flash a menu open.
  const hoverOpen = (id) => {
    clearTimeout(closeTimer.current); closeTimer.current = null;
    if (openId) { show(id); return; }
    clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => show(id), 90);
  };
  const close = () => { clearTimers(); setOpenId(null); };
  const scheduleClose = () => {
    clearTimeout(openTimer.current); openTimer.current = null;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 200);
  };

  // The panel takes the open menu's height, and follows it if it changes.
  useIsoLayoutEffect(() => {
    if (!openId) return;
    const el = panes.current[openId];
    if (!el) return;
    setHeight(el.offsetHeight);
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const t = triggers.current[openId];
      close();
      t?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openId]);

  useEffect(() => () => clearTimers(), []);

  const go = (id) => { close(); onNav(id); };

  const item = (d) => (
    <a
      key={d.id + d.label}
      href={d.href || pathFor(d.id)}
      target={d.href ? '_blank' : undefined}
      rel={d.href ? 'noopener noreferrer' : undefined}
      className={`mega-item ${current === d.id && !d.href ? 'active' : ''}`}
      tabIndex={openId ? 0 : -1}
      onClick={(e) => { if (d.href) { close(); return; } e.preventDefault(); go(d.id); }}
    >
      <span className="mega-item-label">{d.label}{d.href && <Arrow/>}</span>
      <span className="mega-item-desc">{d.desc}</span>
    </a>
  );

  return (
    <div className={`mega ${openId ? 'is-open' : ''}`} onMouseLeave={scheduleClose} onMouseEnter={() => { if (openId) clearTimeout(closeTimer.current); }}>
      <nav className="site-nav" aria-label="Main">
        {links.map((l) => {
          const menu = MEGA_MENUS[l.id];
          if (!menu) {
            return (
              <a key={l.id} href={pathFor(l.id)} className={current === l.id ? 'active' : ''}
                 onMouseEnter={scheduleClose}
                 onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.label}</a>
            );
          }
          const active = current === l.id || idsOf(menu).has(current);
          const isPage = l.id !== '__involved';
          const props = {
            ref: (el) => { triggers.current[l.id] = el; },
            className: `mega-trigger ${active ? 'active' : ''} ${openId === l.id ? 'open' : ''}`,
            'aria-expanded': openId === l.id,
            'aria-controls': `mega-${l.id}`,
            onMouseEnter: () => hoverOpen(l.id),
            onFocus: () => show(l.id),
          };
          return isPage ? (
            <a key={l.id} href={pathFor(l.id)} {...props}
               onClick={(e) => { e.preventDefault(); go(l.id); }}>
              {l.label}<Caret/>
            </a>
          ) : (
            <button key={l.id} type="button" {...props}
                    onClick={() => (openId === l.id ? close() : show(l.id))}>
              {l.label}<Caret/>
            </button>
          );
        })}
      </nav>

      <div className="mega-panel" style={{ height: openId ? height : 0 }}
           onMouseEnter={() => clearTimeout(closeTimer.current)} aria-hidden={!openId}>
        {order.map((id) => {
          const m = MEGA_MENUS[id];
          const state = openId === id ? 'in' : 'out';
          const offset = openId === id ? 0 : (order.indexOf(id) < order.indexOf(openId) ? -1 : 1);
          return (
            <div key={id} id={`mega-${id}`} ref={(el) => { panes.current[id] = el; }}
                 className={`mega-pane ${state}`} data-from={state === 'in' ? dir : offset}
                 role="region" aria-label={m.intro.eyebrow}>
              <div className="mega-intro">
                <div className="mega-eyebrow">{m.intro.eyebrow}</div>
                <p>{m.intro.text}</p>
                {m.intro.more && (
                  <a href={pathFor(m.intro.more.id)} className="mega-more" tabIndex={openId ? 0 : -1}
                     onClick={(e) => { e.preventDefault(); go(m.intro.more.id); }}>
                    {m.intro.more.label} →
                  </a>
                )}
              </div>
              <div className={`mega-cols cols-${m.columns.length}`}>
                {m.columns.map((col, i) => <div key={i} className="mega-col">{col.map(item)}</div>)}
              </div>
            </div>
          );
        })}
      </div>

      {mounted && createPortal(
        <div className={`mega-backdrop ${openId ? 'show' : ''}`} onClick={close} aria-hidden="true"/>,
        document.body
      )}
    </div>
  );
}
