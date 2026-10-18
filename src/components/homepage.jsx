import React from 'react';
import { resources } from '../resources.js';
import { Icon, Button, SectionHeader } from './shared.jsx';
import { HopeCmsEmbed, HopeCalendarEmbed } from './embeds.jsx';
import { useServiceTimes, useFourthServiceLive } from '../serviceTimes.jsx';
import { useLiveStream } from '../liveStream.jsx';
import { useThisWeek, thisWeekRows, thisWeekIcon, thisWeekDate, isChristmasTree, ChristmasTree, THIS_WEEK_NOTICE, isEventRow, splitEventTitle, thisWeekTileColor, eventTodayTag, churchToday } from '../thisWeek.jsx';
// Hope Church — 3 homepage hero variations + supporting blocks

// ======================================================
// HERO A — Full-bleed photo, dark scrim, mission-forward
// ======================================================
function HeroA({ onVisit, onWatch }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  // While a service is live on YouTube the hero makes room for the player;
  // the rest of the time it is exactly as before.
  const live = useLiveStream();
  return (
    <section className={'hero-a' + (live ? ' hero-a--live' : '')} data-screen-label="Hero A">
      <div className="hero-a-media">
        <div className="hero-a-photo fallback hero-photo-anim" />
      </div>
      <div className="hero-a-inner">
        <div className="hero-a-copy">
          {live
            ? <span className="eyebrow hero-a-eyebrow hero-a-live-eyebrow"><span className="live-dot" aria-hidden="true"/>Live now</span>
            : <span className="eyebrow hero-a-eyebrow">Welcome to Hope Church</span>}
          <h1 className="hero-a-title">Love God.<br/>Love <em>people.</em><br/>Make disciples.</h1>
          <div className="hero-a-actions">
            <Button variant="primary" size="xl" onClick={onVisit} iconRight="arrow">Plan Your Visit</Button>
            {live
              ? <a className="footer-live-btn hero-live-btn" href={live.watchUrl} target="_blank" rel="noopener">
                  <span className="live-dot" aria-hidden="true"/>
                  Open on YouTube
                </a>
              : <a className="footer-live-btn hero-live-btn" href="https://www.youtube.com/@hopechurchjohnsoncity" target="_blank" rel="noopener">
                  <span className="live-dot" aria-hidden="true"/>
                  Watch live at {st.stream}
                </a>}
          </div>
        </div>
        {live && (
          <div className="hero-a-player">
            <div className="hero-a-player-frame">
              {live.embedUrl
                ? <iframe
                    src={live.embedUrl}
                    title={`${live.title} — live`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                : <div className="hero-a-player-wait">The stream is starting…</div>}
            </div>
            <div className="hero-a-player-cap">
              <span className="hero-a-player-tally">Live</span>
              <span className="hero-a-player-title">{live.title}</span>
            </div>
          </div>
        )}
      </div>
      <div className="hero-a-bottom">
        <span>Gray, Tennessee</span>
        <div className="hero-a-bottom-right">
          <span>Sundays · {st.first.replace('am','')} · {st.second.replace('am','')} · {fourthLive ? <>{st.third.replace('am','')} · {st.fourth}</> : st.third}</span>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// HERO B — Editorial split, photo right, meta row
// ======================================================
function HeroB({ onVisit, onWatch }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  return (
    <section className="hero-b" data-screen-label="Hero B">
      <div className="container hero-b-inner">
        <div className="hero-b-copy">
          <span className="eyebrow hero-b-eyebrow">Hope Church · Johnson City</span>
          <h1 className="hero-b-title">A place to belong.<span>A reason to hope.</span></h1>
          <p className="hero-b-lead">We gather around three commitments: love God, love people, make disciples. Simple words for a church that’s trying to live them out, one Sunday at a time.</p>
          <div className="hero-b-actions">
            <Button variant="primary" size="lg" onClick={onVisit} iconRight="arrow">Plan Your Visit</Button>
            <Button variant="secondary" size="lg" onClick={onWatch} icon="play">Watch This Week</Button>
          </div>
          <div className="hero-b-meta">
            <div className="hero-b-meta-item">
              <div className="hero-b-meta-label">Sundays</div>
              <div className="hero-b-meta-value">{st.first.replace('am','')} · {st.second.replace('am','')} · {fourthLive ? <>{st.third.replace('am','')} · {st.fourth}</> : st.third}</div>
            </div>
            <div className="hero-b-meta-item">
              <div className="hero-b-meta-label">Location</div>
              <div className="hero-b-meta-value">5034 Bobby Hicks Hwy</div>
            </div>
          </div>
        </div>
        <div className="hero-b-photo fallback" aria-hidden="true">
          <div className="hero-b-photo-badge">
            <span className="tag">This Sunday</span>
            <span className="tag">April 26</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// HERO C — Bold faceted / giant type + color bar
// ======================================================
function HeroC({ onVisit, onWatch }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  return (
    <section className="hero-c" data-screen-label="Hero C">
      <span className="hero-c-bg">HOPE</span>
      <div className="container hero-c-grid">
        <div className="hero-c-left">
          <span className="eyebrow hero-c-eyebrow">This Sunday at Hope</span>
          <h1 className="hero-c-title">
            <span className="line">Love</span>
            <span className="line">God.</span>
            <span className="line">Love people.</span>
          </h1>
          <p className="hero-c-sub">A Sunday morning church in Johnson City built on three commitments.</p>
          <div className="hero-c-actions">
            <Button variant="primary" size="xl" onClick={onVisit} iconRight="arrow">Plan Your Visit</Button>
            <Button variant="ghost-on-dark" size="xl" onClick={onWatch} icon="play">Watch Latest</Button>
          </div>
        </div>
        <div className="hero-c-right fallback" aria-hidden="true" />
      </div>
      <div className="hero-c-bar">
        <div className="hero-c-bar-inner">
          <span className="hero-c-bar-label">Sundays · {fourthLive ? 'Four services' : 'Three services'}</span>
          <div className="hero-c-bar-times">
            <div><b>{st.first.replace('am','')}</b><s>am</s></div>
            <div><b>{st.second.replace('am','')}</b><s>am</s></div>
            <div><b>{st.third.replace('am','')}</b><s>am</s></div>
            {fourthLive && <div><b>{st.fourth.replace('pm','')}</b><s>pm</s></div>}
          </div>
          <a href="https://maps.google.com/?q=5034+Bobby+Hicks+Hwy+Suite+10+Gray+TN+37615" target="_blank" rel="noopener" className="btn btn-outline-on-dark btn-sm">Directions</a>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// This Week, as the app's Home card
// ======================================================
// The same card as the app's Home "This Week" (HomeWeek.swift): a tinted band
// with the date and Sunday's message, the week's links, then the events. Read
// live from the CMS like /this-week, so publishing This Week, or a change to
// the calendar, shows here without a rebuild. The pre-rendered HTML holds a
// placeholder card, so the page does not jump when the list arrives.

function ExternalArrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function linkProps(href) {
  return /^https?:/i.test(href) ? { target: '_blank', rel: 'noopener' } : {};
}

function HomeWeekTrail({ href }) {
  const external = /^https?:/i.test(href);
  return (
    <span className="hwk-trail" aria-hidden="true">
      {external ? <ExternalArrow size={16} /> : <Icon name="chevron" size={16} strokeWidth={2.5} />}
    </span>
  );
}

function HomeWeekLink({ r }) {
  const notice = THIS_WEEK_NOTICE.test(r.title || '');
  const tree = !notice && isChristmasTree(r);
  return (
    <li>
      <a className={'hwk-row' + (notice ? ' is-notice' : '')} href={r.href} {...linkProps(r.href)}>
        {tree
          ? <span className="hwk-tile is-tree"><ChristmasTree size={28} /></span>
          : <span className="hwk-tile" style={{ background: notice ? '#F59E0B' : thisWeekTileColor(r) }}>
              <Icon name={notice ? 'calendar' : thisWeekIcon(r.icon)} size={22} color="#fff" strokeWidth={2} />
            </span>}
        <span className="hwk-title">
          {notice && <span className="hwk-badge">Not meeting</span>}
          {r.title}
        </span>
        <HomeWeekTrail href={r.href} />
      </a>
    </li>
  );
}

function HomeWeekEvent({ r, today }) {
  const notice = THIS_WEEK_NOTICE.test(r.title || '');
  const { day, time, name } = splitEventTitle(r.title);
  const tree = !notice && isChristmasTree(r);
  const tag = notice ? null : eventTodayTag(r, today);
  let tile;
  if (tree) {
    tile = <span className="hwk-day is-tree"><ChristmasTree size={day ? 22 : 28} />{day && <b className="hwk-day-sub">{day}</b>}</span>;
  } else if (day && !notice) {
    tile = <span className="hwk-day"><b>{day}</b><span>{time}</span></span>;
  } else {
    tile = <span className={'hwk-day' + (notice ? ' is-notice' : '')}><Icon name="calendar" size={22} color={notice ? '#B45309' : 'var(--hope-blue)'} strokeWidth={2} /></span>;
  }
  return (
    <li>
      <a className={'hwk-row hwk-event' + (notice ? ' is-notice' : '')} href={r.href} {...linkProps(r.href)}>
        {tile}
        <span className="hwk-title">
          {notice && <span className="hwk-badge">Not meeting</span>}
          {notice ? r.title : name}
          {tag && <span className="hwk-today">{tag}</span>}
        </span>
        <HomeWeekTrail href={r.href} />
      </a>
    </li>
  );
}

function HomeWeekMessage({ m }) {
  const href = `/sermons/${(m.branch && m.branch.slug) || 'messages'}/${m.slug}`;
  const art = m.artwork && (m.artwork.thumb || m.artwork.url);
  return (
    <a className="hwk-message" href={href}>
      <span className="hwk-message-art">{art && <img src={art} alt="" loading="lazy" />}</span>
      <span className="hwk-message-text">
        <span className="hwk-message-label">Sunday’s message</span>
        <span className="hwk-message-title">{m.title}</span>
      </span>
      <span className="hwk-play" aria-hidden="true"><Icon name="play" size={16} color="#fff" /></span>
    </a>
  );
}

const HOME_WEEK_EVENTS = 4;

function HomeThisWeek() {
  const { week, latest, failed } = useThisWeek();
  const rows = thisWeekRows(week);
  const links = rows.filter((r) => !isEventRow(r));
  const allEvents = rows.filter(isEventRow);
  // The first four events; a "No ..." notice always shows, whatever its place.
  let regular = 0;
  const events = allEvents.filter((r) => {
    if (THIS_WEEK_NOTICE.test(r.title || '')) return true;
    regular += 1;
    return regular <= HOME_WEEK_EVENTS;
  });
  const today = churchToday();
  // "Sunday, October 18": the weekday and date of thisWeek.updated.
  const date = week && thisWeekDate(week.updated);
  const loading = !week && !failed;
  return (
    <section className="home-week" aria-labelledby="home-week-title">
      <div className="container home-week-inner">
        <div className="home-week-head">
          <span className="eyebrow">This Week</span>
          <h2 id="home-week-title">This week at Hope.</h2>
          <p className="home-week-meta">Sunday’s message, this week’s links and what’s coming up.</p>
          <div className="home-week-app">
            <p>Get This Week, the Bible and giving in the Hope app.</p>
            <div className="home-week-app-row">
              <div className="app-stores">
                <a className="app-store-btn" href="https://apps.apple.com/us/app/hope-church-jc/id1427669078" target="_blank" rel="noopener" aria-label="Download on the App Store">
                  <AppleBadge/>
                  <div><div className="app-store-btn-small">Download on the</div><div className="app-store-btn-big">App Store</div></div>
                </a>
                <a className="app-store-btn" href="https://play.google.com/store/apps/details?id=org.hopejc.app" target="_blank" rel="noopener" aria-label="Get it on Google Play">
                  <GoogleBadge/>
                  <div><div className="app-store-btn-small">Get it on</div><div className="app-store-btn-big">Google Play</div></div>
                </a>
              </div>
              <a className="home-week-qr" href="/download" aria-label="Scan to get the Hope app">
                <img src="/assets/app-download-qr.svg" alt="QR code for hopejc.org/download" width="84" height="84" />
              </a>
            </div>
          </div>
        </div>
        <div className={'hwk-card' + (loading ? ' is-loading' : '')} aria-busy={loading || undefined}>
          <div className="hwk-band">
            <div className="hwk-band-top">
              <span className="hwk-band-tile"><Icon name="calendar" size={26} color="#fff" strokeWidth={2} /></span>
              <span className="hwk-band-text">
                <span className="hwk-eyebrow">This Week</span>
                <span className="hwk-date">{loading ? <span className="hwk-bar" /> : (date || 'At Hope')}</span>
              </span>
              <a className="hwk-all" href="/this-week">See all <Icon name="chevron" size={14} strokeWidth={2.75} /></a>
            </div>
            {latest && <HomeWeekMessage m={latest} />}
          </div>
          {loading && (
            <ul className="hwk-list" aria-label="Loading this week">
              {[0, 1, 2, 3].map((i) => (
                <li key={i}><span className="hwk-row"><span className="hwk-tile is-blank" /><span className="hwk-bar" /></span></li>
              ))}
            </ul>
          )}
          {!loading && rows.length === 0 && (
            <div className="hwk-empty">
              <p>{failed ? 'This week’s list didn’t load.' : 'Nothing posted yet this week.'}</p>
              <a href="/events">See upcoming events <Icon name="arrow" size={14} /></a>
            </div>
          )}
          {links.length > 0 && (
            <ul className="hwk-list hwk-links">{links.map((r) => <HomeWeekLink key={r.id} r={r} />)}</ul>
          )}
          {events.length > 0 && (
            <>
              <div className="hwk-section">Coming up this week</div>
              <ul className="hwk-list hwk-events">{events.map((r) => <HomeWeekEvent key={r.id} r={r} today={today} />)}</ul>
              {allEvents.length > events.length && (
                <a className="hwk-foot" href="/this-week">See all {allEvents.length} this week <Icon name="chevron" size={15} strokeWidth={2.5} /></a>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ======================================================
// This Week's Sermon (our own CMS)
// ======================================================
function ThisWeekSermon({ onSermons }) {
  return (
    <section className="messages-section">
      <div className="container">
        <SectionHeader
          eyebrow="This Week"
          title="The latest message"
          lead="Catch up on Sunday’s message or revisit any past sermon below."
        />
          <div style={{maxWidth: 980, margin: '0 auto'}}>
            {/* Just the newest Sunday message -- the full library lives one
                click away, so the back-catalogue does not belong here. */}
            <HopeCmsEmbed slug="messages" query="?only=latest"
                          title="The latest message" height={620}/>
          </div>
        <div style={{textAlign:'center', marginTop:40}}>
          <Button variant="secondary" size="lg" onClick={onSermons} iconRight="arrow">Browse the full library</Button>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// Upcoming Events (Planning Center embed placeholder)
// ======================================================
function UpcomingEvents({ onEvents }) {
  const [open, setOpen] = React.useState(false);
  return (
    <section className="events-section">
      <div className="container">
        <button
          type="button"
          className={`events-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="upcoming-events-panel"
          onClick={() => setOpen(o => !o)}
        >
          <div className="events-toggle-text">
            <span className="eyebrow">What’s Next</span>
            <h2>Upcoming at Hope</h2>
            <p className="lead">See what’s coming up — events, classes, and easy ways to get connected.</p>
          </div>
          <span className="events-toggle-chevron" aria-hidden="true">
            <Icon name="chevron" size={22}/>
          </span>
        </button>
        <div
          id="upcoming-events-panel"
          className={`events-panel ${open ? 'is-open' : ''}`}
          hidden={!open}
        >
          <div className="embed-frame">
            <HopeCalendarEmbed limit={4}/>
          </div>
          <div style={{textAlign:'center', marginTop: 40}}>
            <Button variant="secondary" size="lg" onClick={onEvents} iconRight="arrow">See All Events</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// Ministries Block
// ======================================================
function MinistriesBlock({ onMinistries }) {
  const m = [
    { age: 'Birth · 4th Grade', title: 'Hope Kids', desc: 'A safe, joyful space where kids learn who Jesus is through stories, songs, and play.', icon: 'kids' },
    { age: '5th · 6th Grade',   title: 'Linked 56',  desc: 'A space made just for 5th and 6th graders — the bridge between kids and students.', icon: 'kids' },
    { age: '7th · 12th Grade',  title: 'Hope Students', desc: 'Wednesday nights and Sunday mornings — friendships and honest conversations about faith.', icon: 'book' },
    { age: 'Families',           title: 'Groups', desc: 'Small groups that meet around the city in homes, coffee shops, and parks. The easiest way in.', icon: 'hands' },
  ];
  return (
    <section className="ministries-section">
      <div className="container">
        <SectionHeader eyebrow="Ministries" title="A place for everyone." lead="From our youngest kids to our most seasoned members, we have a place for you to grow and belong." align="center" />
        <div className="ministries-grid ministries-grid-4">
          {m.map(x => (
            <div className="ministry-card" key={x.title} onClick={onMinistries}>
              <div className="ministry-card-age">{x.age}</div>
              <h3>{x.title}</h3>
              <p>{x.desc}</p>
              <a className="ministry-card-link" href="#" onClick={(e)=>{e.preventDefault();onMinistries();}}>Learn more <Icon name="arrow" size={14}/></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======================================================
// App Download Band (Subsplash app)
// ======================================================
function AppleBadge() {
  // Official Apple logo glyph
  return (
    <svg width="22" height="22" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

function GoogleBadge() {
  // Official Google Play colored logo
  return (
    <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.4 19.2 25.4 35.4v441.2c0 16.2 8.6 28.6 21.6 35.4l256.5-256L47 0zm435.1 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#0082CA"/>
    </svg>
  );
}

function AppBand() {
  return (
    <section className="app-band">
      <div className="container app-band-inner">
        <div className="app-band-copy">
          <span className="eyebrow">The Hope App</span>
          <h2>Take Sunday with you.</h2>
          <p>Listen to sermons, follow along with notes, give, and find your next step — all from your pocket.</p>
          <ul className="app-band-features">
            <li>Full sermon library</li>
            <li>Service notes &amp; Bible</li>
            <li>Give in two taps</li>
            <li>Event reminders</li>
          </ul>
          <div className="app-stores">
            <a className="app-store-btn" href="https://apps.apple.com/us/app/hope-church-jc/id1427669078" target="_blank" rel="noopener" aria-label="Download on the App Store">
              <AppleBadge/>
              <div>
                <div className="app-store-btn-small">Download on the</div>
                <div className="app-store-btn-big">App Store</div>
              </div>
            </a>
            <a className="app-store-btn" href="https://play.google.com/store/apps/details?id=org.hopejc.app" target="_blank" rel="noopener" aria-label="Get it on Google Play">
              <GoogleBadge/>
              <div>
                <div className="app-store-btn-small">Get it on</div>
                <div className="app-store-btn-big">Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <div className="app-phone" aria-hidden="true">
          <div className="app-phone-notch"></div>
          <div className="app-phone-screen app-phone-screen--image">
            <img src={resources.appScreenshot} alt="Hope Church app screenshot"/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// Give CTA Band
// ======================================================
function GiveCTA({ onGive }) {
  return (
    <section className="cta-band">
      <div className="container">
        <span className="eyebrow">Generosity</span>
        <h2>Give so someone can find what you found.</h2>
        <p>Every gift, big or small, makes Sunday mornings, kids’ ministry, and care for our city possible.</p>
        <div className="cta-band-actions">
          <Button variant="primary" size="xl" onClick={onGive} iconRight="arrow">Give Online</Button>
        </div>
      </div>
    </section>
  );
}

export { HeroA, HeroB, HeroC, HomeThisWeek, ThisWeekSermon, UpcomingEvents, MinistriesBlock, AppBand, GiveCTA };
