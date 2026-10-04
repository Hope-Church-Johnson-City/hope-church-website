import React from 'react';
import { resources } from '../resources.js';
import { Icon, Button } from './shared.jsx';
import { PageHeader } from './pages.jsx';
// Hope Church — Prayer Request page + Podcast page (RSS-driven)

const { useState: useStatePP, useEffect: useEffectPP, useRef: useRefPP, useMemo: useMemoPP } = React;

// ============================================================
// Prayer Request Page
// ============================================================
function PrayerRequestPage() {
  // Planning Center form — submissions land in PCO People and notify info@hopejc.org.
  const formUrl = 'https://hopejc.churchcenter.com/people/forms/1235486';
  return (
    <div data-screen-label="Page · Prayer Requests">
      <PageHeader
        eyebrow="Prayer Requests"
        title="We'd be honored to pray with you."
        lead="Share what's on your heart — a burden, a celebration, a question. Our pastoral team and prayer ministry will pray over every request that comes in."
      />
      <section className="prayer-section">
        <div className="container prayer-grid">
          <div className="connect-embed-wrap">
            <iframe
              src={`${formUrl}?open_in_church_center_modal=false`}
              title="Prayer Request — Hope Church"
              className="connect-embed"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>

          <aside className="prayer-aside">
            <div className="prayer-verse-card">
              <div className="v-eyebrow">A Promise</div>
              <blockquote>
                Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.
              </blockquote>
              <cite>Philippians 4:6</cite>
            </div>

            <div className="prayer-team-card">
              <h3>Need pastoral care?</h3>
              <p>For urgent care, a hospital visit, or a longer conversation with a pastor, please reach out directly &mdash; we&rsquo;d love to walk with you.</p>
              <div className="meta">
                <Icon name="mail" size={15} color="var(--hope-blue)" />
                <a href="mailto:info@hopejc.org">info@hopejc.org</a>
              </div>
              <div className="meta" style={{marginTop:6}}>
                <Icon name="phone" size={15} color="var(--hope-blue)" />
                <span>(423) 207&ndash;3341</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Get Help Page (benevolence + community resources)
// ============================================================

// Community Resource List — local addiction recovery, mental/behavioral
// health, crisis, and hospital resources. `url`/`url2` are real links;
// `phone` renders as a tel: link; `desc`/`address` are plain text.
const HELP_RESOURCES = [
  { name: 'Alcoholics Anonymous', url: 'https://www.aatricitiestn.org', phone: '(423) 928-0871' },
  { name: 'Ballad Health Behavioral Health Outpatient Clinics', url: 'https://www.balladhealth.org/locations/behavioral-health/johnson-city', phone: '(423) 302-3480' },
  { name: 'Ballad Health Respond 24/7 Intervention Hotline', badge: '24/7 Hotline', phone: '1 (800) 366-1132' },
  { name: 'Bristol Regional Medical Center', url: 'https://www.balladhealth.org/locations/hospitals/bristol-regional', phone: '(423) 844-1121' },
  { name: 'Comprehensive Community Services', url: 'https://www.ccstreatment.com', phone: '(423) 349-4070' },
  { name: 'Covenant Counseling', url: 'https://www.covenantkpt.com', phone: '(423) 247-4536' },
  { name: 'Creekside Behavioral Health', badge: '24/7', url: 'https://www.creeksidebh.com', phone: '(423) 830-8110' },
  { name: 'Crisis Response Service', badge: '24/7 Crisis', url: 'https://www.frontierhealth.org/crisis-response/', phone: '(877) 928-9062' },
  { name: 'Franklin Woods Community Hospital', desc: 'Johnson City, TN | Ballad Health', url: 'https://www.balladhealth.org/locations/hospitals/franklin-woods' },
  { name: 'Gracepointe Counseling', url: 'https://www.gracepcc.com', phone: '(423) 283-4958' },
  { name: 'Health Connect America', url: 'https://www.healthconnectamerica.com' },
  { name: 'Holston Valley Medical Center', desc: 'Kingsport, TN', url: 'https://www.balladhealth.org/locations/hospitals/holston-valley', phone: '(423) 223-4000' },
  { name: 'Johnson City Medical Center', desc: 'Ballad Health', url: 'https://www.balladhealth.org/locations/hospitals/johnson-city-medical-center', phone: '(423) 431-6111' },
  { name: 'Narcotics Anonymous', url: 'https://www.mana-e-tn.org', phone: '(423) 302-0494' },
  { name: 'New Leaf Senior Care', desc: 'Sycamore Shoals Hospital — Inpatient Senior Behavioral Health, Elizabethton', url: 'https://www.balladhealth.org/locations/behavioral-health/senior-inpatient-elizabethton', phone: '(423) 542-1358' },
  { name: 'Overmountain Recovery', desc: 'Medication-Assisted Opioid Treatment Program', url: 'https://www.overmountainrecovery.org/opioid-treatment-program/', phone: '(833) 371-0509' },
  { name: 'Papillon Behavioral Health', phone: '(423) 529-0385' },
  { name: 'Ridgeview Pavilion', desc: 'Inpatient Psychiatric Care, Bristol | Ballad Health', url: 'https://www.balladhealth.org/locations/behavioral-health/ridgeview', phone: '(423) 844-6000' },
  { name: 'SMART Recovery Johnson City', url: 'https://www.smartrecovery.org', url2: 'https://www.facebook.com/SMARTrecoveryJohnsonCity' },
  { name: 'Strong Futures', desc: 'Outpatient Behavioral Health Clinic | Ballad Health', url: 'https://www.balladhealth.org/locations/behavioral-health/strong-futures-greeneville', phone: '(423) 278-1696' },
  { name: 'Summit Counseling Center', url: 'https://www.summitcounselingtn.com', phone: '(423) 930-8898' },
  { name: 'Tri-Cities Eating Disorder Therapy', phone: '(423) 708-6982' },
  { name: 'Turning Point', address: '208 E Unaka Ave, Johnson City, TN 37601', phone: '(423) 928-9062' },
  { name: 'Watauga Behavioral Health Services', url: 'https://www.frontierhealth.org/mentalhealth/', phone: '(423) 232-2600' },
  { name: 'Willow Ridge', phone: '(423) 461-7750' },
  { name: 'Woodridge Hospital', desc: 'Inpatient Behavioral Health, Johnson City | Ballad Health', url: 'https://www.balladhealth.org/locations/hospitals/woodridge-psychiatric', phone: '(423) 431-7111' },
];

const cleanUrl = (u) => u.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
const telHref = (p) => `tel:${p.replace(/[^0-9]/g, '')}`;

function GetHelpPage() {
  const formUrl = 'https://hopejc.churchcenter.com/people/forms/1305460';
  return (
    <div data-screen-label="Page · Get Help">
      <section className="page-header">
        <div className="container">
          <h1>Get Help</h1>
          <p className="lead">How can we help and serve you or someone that you know? If you need help or someone you know is in need, please fill out the benevolence form below and someone will reach out to you.</p>
        </div>
      </section>

      <section className="prayer-section">
        <div className="container" style={{ textAlign: 'center', paddingBottom: '8px' }}>
          <a
            className="btn btn-primary btn-lg"
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Benevolent Help
          </a>
        </div>
      </section>

      <section className="resource-section">
        <div className="container">
          <div className="resource-head">
            <h2>Community Resource List</h2>
            <p>Local help for recovery, counseling, crisis support, and behavioral health across the Tri-Cities. Tap any number to call.</p>
          </div>
          <div className="resource-grid">
            {HELP_RESOURCES.map((r) => (
              <div key={r.name} className="resource-card">
                {r.badge && (
                  <span className="resource-badge"><Icon name="clock" size={12} /> {r.badge}</span>
                )}
                <h3>{r.name}</h3>
                {r.desc && <p className="resource-desc">{r.desc}</p>}
                {(r.phone || r.url || r.url2 || r.address) && (
                <div className="resource-contact">
                  {r.phone && (
                    <div className="resource-line resource-phone">
                      <Icon name="phone" size={16} />
                      <a href={telHref(r.phone)}>{r.phone}</a>
                    </div>
                  )}
                  {r.url && (
                    <div className="resource-line">
                      <Icon name="globe" size={16} />
                      <a href={r.url} target="_blank" rel="noopener noreferrer">{cleanUrl(r.url)}</a>
                    </div>
                  )}
                  {r.url2 && (
                    <div className="resource-line">
                      <Icon name="facebook" size={16} />
                      <a href={r.url2} target="_blank" rel="noopener noreferrer">Facebook group</a>
                    </div>
                  )}
                  {r.address && (
                    <div className="resource-line resource-address">
                      <Icon name="pin" size={16} />
                      <span>{r.address}</span>
                    </div>
                  )}
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Podcast Page (RSS-driven)
// ============================================================

const PODCASTS = [
  {
    id: 'sunday',
    name: 'Hope Church Johnson City',
    short: 'Sunday Sermons',
    tagline: 'Sunday Sermons',
    rss: 'https://media.hopejc.org/feeds/messages.rss',
    apple: 'https://podcasts.apple.com/us/podcast/hope-church-johnson-city/id1608413825',
    spotify: 'https://open.spotify.com/show/6TI7L3PvGpmTrxl43BHzSD',
    description: "Sunday-morning messages from Hope Church Johnson City \u2014 verse-by-verse teaching for everyday life. Listen anywhere you get podcasts, or right here.",
    cover: 'https://hope-media.cowens-09f.workers.dev/files/artwork/feed/messages.jpg',
  },
  {
    id: 'finding-hope',
    name: 'Finding Hope',
    short: 'Finding Hope',
    tagline: 'A weekly conversation',
    rss: 'https://media.hopejc.org/feeds/finding-hope-podcast.rss',
    apple: 'https://podcasts.apple.com/us/podcast/finding-hope/id1702042358',
    spotify: 'https://open.spotify.com/show/5EdKn2XuQZmByAoIw1XCTH',
    description: "Life is hard, but there's always hope. Pastors and friends walk through faith, family, theology, and the hard questions of the Bible.",
    cover: 'https://hope-media.cowens-09f.workers.dev/files/artwork/feed/finding-hope-podcast-2026.jpg',
  },
];

// ------------------------------------------------------------
// Static fallback data (snapshot from the live feeds).
// Used when the browser can't reach the RSS endpoint (offline,
// etc). Our feeds send access-control-allow-origin, so the direct
// fetch normally succeeds and the proxy path is rarely needed --
// Subsplash sent no CORS headers, which is why that proxy exists.
// Audio URLs point at our own R2 storage, not Subsplash's CDN,
// so this snapshot keeps working after Subsplash is cancelled.
// Admins can refresh this snapshot from the Admin > Podcasts panel.
// ------------------------------------------------------------
const FALLBACK_EPISODES = {
  'sunday': [
    { id: 's1', title: 'From Generation to Generation', author: 'Will Easler', pubDate: '2026-08-30', duration: 2794,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/messages/2026/e6f552f0-f0ee-4c18-a56e-1e371a379ab1-sermon.m4a' },
    { id: 's2', title: 'Isaac and Rebekah', author: 'Rick Keller', pubDate: '2026-08-23', duration: 2362,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/messages/2026/1e0fc923-dd7c-41d7-beac-f18f7e819f2d-isaacandrebecca-8.23.26-.mp3' },
    { id: 's3', title: 'Genesis 12-23 Recap - The Lord Will Provide', author: 'Will Easler', pubDate: '2026-08-16', duration: 2826,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/messages/2026/11f8e6d6-c287-4813-8a90-2940b1772af6-sermon.m4a' },
    { id: 's4', title: 'Genesis 1-11 Recap', author: 'Rick Keller', pubDate: '2026-08-09', duration: 2666,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/messages/2026/37ac83ab-a7bf-41bd-ba11-61b647c138a9-genesis1-11recap-8.9.26-.mp3' },
    { id: 's5', title: 'The Faithfulness of the Holy Spirit', author: 'Rick Keller', pubDate: '2026-08-02', duration: 2765,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/messages/2026/22bc53a0-baa1-4c65-80e8-fe2a2b983b1a-05aac16b-c977-46ac-bc69-89e10595f971.mp3' },
  ],
  'finding-hope': [
    { id: 'f1', title: '056 From Generation to Generation | Genesis 25', author: 'Hope Church Johnson City', pubDate: '2026-09-01', duration: 3713,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/finding-hope-podcast/2026/20a6b75b-ca81-46b1-87f5-d27d592ba8c9-hope-podcast_new.mp3' },
    { id: 'f2', title: '055 Isaac and Rebekah | Genesis 24', author: 'Hope Church', pubDate: '2026-08-26', duration: 2043,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/finding-hope-podcast/2026/c00b01e4-c3e3-4ef7-8211-c0e340db767c-ef33ce01-c673-482f-9aaf-1013fb231744.mp3' },
    { id: 'f3', title: '054 The Lord Will Provide', author: 'Hope Church', pubDate: '2026-08-19', duration: 2354,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/finding-hope-podcast/2026/2dc48095-177c-4bd0-a94d-a4078e88393a-b6f06f03-eb1f-4cd5-b256-78f0fdc657b7.mp3' },
    { id: 'f4', title: '053 Genesis 1-11 Recap', author: 'Hope Church', pubDate: '2026-08-13', duration: 2654,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/finding-hope-podcast/2026/dc179000-c196-43ca-9fda-88acb2a56d90-b47a097e-3bf0-4af9-a88a-251d12684f4c.mp3' },
    { id: 'f5', title: '052 The Faithfulness of the Holy Spirit', author: 'Hope Church', pubDate: '2026-08-05', duration: 2656,
      audio: 'https://hope-media.cowens-09f.workers.dev/files/audio/finding-hope-podcast/2026/460165a5-3065-4212-a96b-cb75db2cc5ed-cb537cd8-89ec-43a4-9e19-208263a2937c.mp3' },
  ],
};

function formatDuration(seconds) {
  const s = Number(seconds);
  if (!s || isNaN(s)) return '';
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

function formatDate(d) {
  try {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) { return ''; }
}

function stripHtml(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Parse a Subsplash RSS feed (plain XML). Tolerant of missing fields.
function parseFeed(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  const errNode = doc.querySelector('parsererror');
  if (errNode) throw new Error('Could not parse RSS feed');

  const channel = doc.querySelector('channel');
  if (!channel) throw new Error('No <channel> in feed');

  // iTunes namespace lookup helper
  const getITunes = (parent, tag) => {
    const el = parent.getElementsByTagNameNS('http://www.itunes.com/dtds/podcast-1.0.dtd', tag)[0];
    return el ? (el.getAttribute('href') || el.textContent || '') : '';
  };

  const channelTitle = channel.querySelector(':scope > title')?.textContent?.trim() || '';
  const channelDesc  = channel.querySelector(':scope > description')?.textContent?.trim() || '';
  const channelImage =
    getITunes(channel, 'image') ||
    channel.querySelector(':scope > image > url')?.textContent?.trim() || '';

  const itemNodes = Array.from(channel.querySelectorAll(':scope > item'));
  const items = itemNodes.map((item, i) => {
    const title = item.querySelector(':scope > title')?.textContent?.trim() || `Episode ${i+1}`;
    const subtitle = getITunes(item, 'subtitle') || '';
    const author   = getITunes(item, 'author') || '';
    const summary  = getITunes(item, 'summary') || '';
    const desc     = item.querySelector(':scope > description')?.textContent?.trim() || '';
    const pubDate  = item.querySelector(':scope > pubDate')?.textContent?.trim() || '';
    const duration = getITunes(item, 'duration');
    const enclosure = item.querySelector(':scope > enclosure');
    const audio = enclosure ? enclosure.getAttribute('url') : '';
    const image = getITunes(item, 'image') || channelImage;
    return {
      id: item.querySelector(':scope > guid')?.textContent?.trim() || `${i}`,
      title, subtitle, author,
      summary: stripHtml(summary || desc),
      pubDate, duration, audio, image,
    };
  });

  return { title: channelTitle, description: channelDesc, image: channelImage, items };
}

async function fetchFeed(url) {
  // 1) Try direct (works if feed sends CORS headers)
  try {
    const r = await fetch(url, { headers: { Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.8' } });
    if (r.ok) {
      const text = await r.text();
      const parsed = parseFeed(text);
      if (parsed.items.length || parsed.title) return parsed;
    }
  } catch (e) { /* fall through to proxy */ }

  // 2) Try a CORS-friendly proxy (allorigins) — raw passthrough
  try {
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const r = await fetch(proxied);
    if (r.ok) {
      const text = await r.text();
      return parseFeed(text);
    }
  } catch (e) { /* fall through */ }

  throw new Error('Could not load podcast feed.');
}

function useFeed(channel) {
  const url = channel.rss;
  const fallbackData = useMemoPP(() => ({
    title: channel.name,
    description: channel.description,
    image: channel.cover,
    items: (FALLBACK_EPISODES[channel.id] || []).map(ep => ({
      ...ep,
      summary: '',
      image: channel.cover,
    })),
    isFallback: true,
  }), [channel.id]);

  const [state, setState] = useStatePP({ loading: false, error: null, data: fallbackData });

  useEffectPP(() => {
    let cancel = false;
    // Reset to fallback when channel switches; always show something instantly.
    setState({ loading: false, error: null, data: fallbackData });
    // Attempt a live refresh; if it succeeds, swap in the live data. If it fails
    // (CORS, offline, etc) we silently keep the fallback — no error UI.
    fetchFeed(url)
      .then((data) => {
        if (cancel) return;
        if (data && data.items && data.items.length) {
          setState({ loading: false, error: null, data: { ...data, isFallback: false } });
        }
      })
      .catch(() => { /* keep fallback */ });
    return () => { cancel = true; };
  }, [url]);
  return state;
}

function PlayIcon({ playing }) {
  if (playing) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="5" width="4" height="14" rx="1"/>
        <rect x="14" y="5" width="4" height="14" rx="1"/>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5.5v13c0 .8.9 1.3 1.6.8l10-6.5a1 1 0 0 0 0-1.7l-10-6.4A1 1 0 0 0 7 5.5z"/>
    </svg>
  );
}

function PodcastEpisodeRow({ ep, index, isCurrent, onPlay }) {
  return (
    <article className="podcast-episode">
      <div className="podcast-episode-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="podcast-episode-body">
        <h3 className="podcast-episode-title">{ep.title}</h3>
        <div className="podcast-episode-meta">
          {ep.subtitle && <span className="podcast-episode-subtitle">{ep.subtitle}</span>}
          {ep.subtitle && ep.pubDate && <span className="dot" aria-hidden="true"/>}
          {ep.pubDate && <span>{formatDate(ep.pubDate)}</span>}
          {ep.duration && <span className="dot" aria-hidden="true"/>}
          {ep.duration && <span>{formatDuration(ep.duration)}</span>}
          {ep.author && <span className="dot" aria-hidden="true"/>}
          {ep.author && <span>{ep.author}</span>}
        </div>
      </div>
      <button
        type="button"
        className={`podcast-play-btn ${isCurrent ? 'is-playing' : ''}`}
        onClick={() => onPlay(ep)}
        aria-label={isCurrent ? `Pause ${ep.title}` : `Play ${ep.title}`}
      >
        <PlayIcon playing={isCurrent}/>
      </button>
    </article>
  );
}

function PodcastSkeleton({ rows = 6 }) {
  return (
    <div className="podcast-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="podcast-skeleton-row" key={i}>
          <div className="podcast-skel-block" style={{width: 20, height: 14}}/>
          <div>
            <div className="podcast-skel-block" style={{width: '60%'}}/>
            <div className="podcast-skel-block short"/>
          </div>
          <div className="podcast-skel-circle"/>
        </div>
      ))}
    </div>
  );
}

function ApplePodcastsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3.4 1.7 6.4 4.3 8.2l.4-1.5C4.5 17.1 3.5 14.7 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5c0 2.7-1 5.1-3.2 6.7l.4 1.5C20.3 18.4 22 15.4 22 12c0-5.5-4.5-10-10-10zm0 4.5c-3 0-5.5 2.5-5.5 5.5 0 1.7.8 3.2 2 4.2l.4-1.5C8 13.9 7.5 13 7.5 12c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 1-.5 1.9-1.4 2.7l.4 1.5c1.2-1 2-2.5 2-4.2 0-3-2.5-5.5-5.5-5.5zm0 4a1.5 1.5 0 0 0-1.5 1.5c0 .6.3 1.1.8 1.4L10 22h4l-1.3-8.6c.5-.3.8-.8.8-1.4a1.5 1.5 0 0 0-1.5-1.5z"/>
    </svg>
  );
}
function SpotifyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.5c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1-.4.1-.7-.2-.8-.5-.1-.4.2-.7.5-.8 4-.9 7.4-.5 10.1 1.1.4.2.4.6.2 1zm1.2-2.8c-.3.4-.7.5-1.1.3-2.8-1.7-7-2.2-10.2-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.7-1.1 8.3-.6 11.5 1.4.4.2.5.7.3 1zm.1-2.9c-3.3-2-8.8-2.2-12-1.2a1 1 0 0 1-.5-2c3.7-1.1 9.7-.9 13.5 1.4a1 1 0 1 1-1 1.8z"/>
    </svg>
  );
}
function RssIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 3a16 16 0 0 1 16 16h-3A13 13 0 0 0 5 6V3zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V9zm1.5 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
    </svg>
  );
}

function PodcastChannelView({ channel }) {
  const feed = useFeed(channel);
  const [current, setCurrent] = useStatePP(null);
  const audioRef = useRefPP(null);

  // Reset current episode when channel changes
  useEffectPP(() => { setCurrent(null); }, [channel.id]);

  const onPlay = (ep) => {
    if (!ep.audio) return; // silently ignore episodes with no audio URL
    if (current && current.audio === ep.audio) {
      const a = audioRef.current;
      if (a) { if (a.paused) a.play(); else a.pause(); }
    } else {
      setCurrent(ep);
      setTimeout(() => {
        const a = audioRef.current;
        if (a) { a.play().catch(() => {}); }
      }, 50);
    }
  };

  const cover = feed.data?.image || channel.cover || '';

  return (
    <>
      <section className="podcast-section">
        <div className="container">
          <header className="podcast-channel-header">
            <div className="podcast-cover">
              {cover ? <img src={cover} alt={`${channel.name} cover art`}/> : null}
            </div>
            <div className="podcast-channel-text">
              <div className="eyebrow">{channel.tagline}</div>
              <h1>{channel.name}</h1>
              <p>{channel.description}</p>
              <div className="podcast-channel-links">
                <a className="podcast-link-pill" href={channel.rss} target="_blank" rel="noopener">
                  <RssIcon/> RSS Feed
                </a>
                <a className="podcast-link-pill" href={channel.apple || `https://podcasts.apple.com/search?term=${encodeURIComponent(channel.name)}`} target="_blank" rel="noopener">
                  <ApplePodcastsIcon/> Apple Podcasts
                </a>
                <a className="podcast-link-pill" href={channel.spotify || `https://open.spotify.com/search/${encodeURIComponent(channel.name)}/podcastAndEpisodes`} target="_blank" rel="noopener">
                  <SpotifyIcon/> Spotify
                </a>
              </div>
            </div>
          </header>

          <div className="podcast-episodes-header">
            <h2>Episodes</h2>
            {feed.data && (
              <span className="count">{feed.data.items.length} episode{feed.data.items.length === 1 ? '' : 's'}{feed.data.isFallback ? ' \u00b7 recent' : ''}</span>
            )}
          </div>

          {feed.data && feed.data.items.length > 0 && (
            <div className="podcast-episodes">
              {feed.data.items.map((ep, i) => (
                <PodcastEpisodeRow
                  key={ep.id}
                  ep={ep}
                  index={i}
                  isCurrent={current && current.audio === ep.audio}
                  onPlay={onPlay}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Now-playing dock — only mounted when there's a current episode */}
      {current && (
        <div className="podcast-dock is-open">
          <div className="container podcast-dock-inner">
            <div className="podcast-dock-meta">
              <div className="podcast-dock-show">{channel.short}</div>
              <div className="podcast-dock-title">{current.title}</div>
            </div>
            <audio
              ref={audioRef}
              className="podcast-dock-audio"
              controls
              autoPlay
              src={current.audio}
            />
            <button
              type="button"
              className="podcast-dock-close"
              onClick={() => {
                const a = audioRef.current; if (a) a.pause();
                setCurrent(null);
              }}
              aria-label="Close player"
            >&times;</button>
          </div>
        </div>
      )}
    </>
  );
}

function PodcastPage({ initialChannel }) {
  const [activeId, setActiveId] = useStatePP(initialChannel || PODCASTS[0].id);
  const channel = useMemoPP(() => PODCASTS.find(p => p.id === activeId) || PODCASTS[0], [activeId]);

  // Allow switching via prop change (e.g. footer click while on page)
  useEffectPP(() => {
    if (initialChannel && initialChannel !== activeId) setActiveId(initialChannel);
    // eslint-disable-next-line
  }, [initialChannel]);

  return (
    <div data-screen-label="Page · Podcasts">
      <PageHeader
        eyebrow="Listen"
        title="Hope Church Podcasts"
        lead={"Take Hope with you. Sunday sermons and our weekly Finding Hope conversation \u2014 free, wherever you listen."}
      />
      <div className="podcast-tabs">
        <div className="container">
          <div className="podcast-tabs-inner" role="tablist">
            {PODCASTS.map(p => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === activeId}
                className={`podcast-tab ${p.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(p.id)}
              >
                {p.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PodcastChannelView channel={channel}/>
    </div>
  );
}


// ---------- This Week ----------
// The same list as the app's This Week screen, read live from the CMS's app
// layout, so editing This Week in the CMS on Sunday morning updates the app
// and hopejc.org/this-week together, with no rebuild. The link is what gets
// texted to the congregation.
const THIS_WEEK_CMS = 'https://media.hopejc.org';

// The app's own screens, as pages on this site. A row pointing somewhere the
// site has no page for (the Bible tab, notifications) is left out.
const THIS_WEEK_SCREENS = {
  nextSteps: '/next-steps', serve: '/serve', missions: '/missions', discoverHope: '/discover-hope',
  about: '/about', team: '/team', generations: '/generations', prayer: '/prayer', getHelp: '/get-help',
  contact: '/contact', podcasts: '/podcast', ministries: '/ministries',
  'ministry-kids': '/ministries/kids', 'ministry-linked56': '/ministries/linked56',
  'ministry-students': '/ministries/students', 'ministry-college': '/ministries/college',
  'ministry-women': '/ministries/women', 'ministry-men': '/ministries/men',
  'ministry-worship': '/ministries/worship', 'ministry-fueledbyhope': '/ministries/fueled-by-hope',
};
const THIS_WEEK_TABS = { home: '/', media: '/sermons', events: '/events', give: '/give' };

function thisWeekHref(d) {
  if (!d) return null;
  if (d.kind === 'link' || d.kind === 'web') {
    // Our own pages open here rather than reloading the site.
    return String(d.url || '').replace(/^https:\/\/(www\.)?hopejc\.org(?=\/|$)/, '') || '/';
  }
  if (d.kind === 'tab') return THIS_WEEK_TABS[d.id] || null;
  if (d.kind === 'screen') return THIS_WEEK_SCREENS[d.id] || null;
  return null;
}

function thisWeekIcon(name) {
  const n = String(name || '');
  if (/play|video|mic/.test(n)) return 'play';
  if (/heart|pray/.test(n)) return 'heart';
  if (/gift|give|dollar/.test(n)) return 'gift';
  if (/calendar|clock/.test(n)) return 'calendar';
  if (/book|bible/.test(n)) return 'book';
  if (/news|mail|envelope/.test(n)) return 'mail';
  return 'arrow';
}

function thisWeekDate(day) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day || '');
  if (!m) return '';
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// "No Hope Students – back October 14": a week something is not meeting.
// Shown in amber so it is not read past as one more link.
const THIS_WEEK_NOTICE = /^(no|not meeting|cancel)/i;

function ThisWeekPage() {
  const [week, setWeek] = React.useState(null);
  const [latest, setLatest] = React.useState(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let live = true;
    fetch(`${THIS_WEEK_CMS}/api/public/app-layout`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((layout) => {
        if (!live) return;
        const tw = layout && layout.thisWeek;
        setWeek(tw && tw.enabled !== false ? tw : { rows: [] });
        if (!tw || !tw.latest || tw.latest.enabled !== false) {
          fetch(`${THIS_WEEK_CMS}/api/public/media?branch=messages&limit=1`)
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => { if (live && j && j.media && j.media[0]) setLatest(j.media[0]); })
            .catch(() => {});
        }
      })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, []);

  const rows = ((week && week.rows) || [])
    .filter((r) => r && r.enabled !== false)
    .map((r) => ({ ...r, href: thisWeekHref(r.destination) }))
    .filter((r) => r.href);
  const updated = week && thisWeekDate(week.updated);

  return (
    <div data-screen-label="Page · This Week">
      <PageHeader eyebrow="This Week" title="This week at Hope."
        lead={updated ? `Updated ${updated}.` : 'Notes, the newsletter, the prayer sheet and what’s coming up.'} />
      <section className="this-week">
        <div className="container-narrow">
          {latest && (
            <a className="tw-latest" href={`/sermons/${latest.branch?.slug || 'messages'}/${latest.slug}`}>
              {latest.artwork?.url && <img src={latest.artwork.url} alt="" loading="lazy" />}
              <div className="tw-latest-body">
                <div className="eyebrow">Latest message</div>
                <h2>{latest.title}</h2>
                {latest.speaker && <p>{latest.speaker}</p>}
              </div>
            </a>
          )}
          {!week && !failed && <div className="tw-loading" aria-busy="true">Loading this week…</div>}
          {failed && (
            <p className="tw-empty">This week’s list didn’t load. <a href="/events">See upcoming events</a>.</p>
          )}
          {week && rows.length === 0 && !failed && (
            <p className="tw-empty">Nothing posted yet. <a href="/events">See upcoming events</a>.</p>
          )}
          {rows.length > 0 && (
            <ul className="tw-rows">
              {rows.map((r) => {
                const external = /^https?:/i.test(r.href);
                const notice = THIS_WEEK_NOTICE.test(r.title || '');
                return (
                  <li key={r.id}>
                    <a className={notice ? 'tw-row tw-notice' : 'tw-row'} href={r.href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                      <span className="tw-icon"><Icon name={notice ? 'calendar' : thisWeekIcon(r.icon)} size={20} color={notice ? '#B45309' : 'var(--hope-blue)'} /></span>
                      <span className="tw-title">
                        {notice && <span className="tw-badge">Not meeting</span>}
                        {r.title}
                      </span>
                      <Icon name="chevron" size={18} color="var(--ink-400, #9aa3ad)" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export { PrayerRequestPage, GetHelpPage, PodcastPage, PODCASTS, AppPage, DownloadPage, ThisWeekPage, ApplePodcastsIcon, SpotifyIcon, RssIcon };

// ============================================================
// App Page
// ============================================================
const APP_STORE_URL = 'https://apps.apple.com/us/app/hope-church-jc/id1427669078';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=org.hopejc.app';

function AppPageAppleBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM248.5 84.5c25.9-30.8 25.4-72.2 25.2-78.5-25.2 1.5-54.3 17.2-71 36.6-18.4 20.7-29.2 46.3-26.9 71.3 27.2 2.1 52.2-12 72.7-29.4z"/>
    </svg>
  );
}
function AppPageGoogleBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true">
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z" fill="#00d7fe"/>
      <path d="M104.6 13c-2.5 1.5-4.6 4.5-4.6 9.4v467.2c0 4.5 1.7 7.7 4.5 9.1l163.8-242.5z" fill="#22bb47"/>
      <path d="M325.3 277.7 104.5 498.7c4.5 2.4 11 1.9 16.8-1.5l284-161.7-79.6-58.4z" fill="#ff3a44"/>
      <path d="M484.6 222.5 425.7 188 358.5 256l67.2 67 58.9-33.7c20.9-11.6 20.9-44.6 0-56.2z" fill="#ffce00"/>
    </svg>
  );
}

function AppStoreButtons({ className = '' }) {
  return (
    <div className={`app-stores ${className}`}>
      <a
        className="app-store-btn"
        href={APP_STORE_URL}
        target="_blank" rel="noopener"
        aria-label="Download Hope Church JC on the App Store"
      >
        <AppPageAppleBadge/>
        <div>
          <div className="app-store-btn-small">Download on the</div>
          <div className="app-store-btn-big">App Store</div>
        </div>
      </a>
      <a
        className="app-store-btn"
        href={PLAY_STORE_URL}
        target="_blank" rel="noopener"
        aria-label="Get Hope Church JC on Google Play"
      >
        <AppPageGoogleBadge/>
        <div>
          <div className="app-store-btn-small">Get it on</div>
          <div className="app-store-btn-big">Google Play</div>
        </div>
      </a>
    </div>
  );
}

// hopejc.org/download: the one link to share for the app -- nothing on it but
// the two store buttons. Standalone (no header, footer or announcement), so a
// person who scans a QR code or taps a texted link sees only what they came for.
// The button for their own phone comes first; nothing redirects on its own.
function DownloadPage() {
  const [android, setAndroid] = React.useState(false);
  React.useEffect(() => { setAndroid(/android/i.test(navigator.userAgent)); }, []);
  const apple = (
    <a key="ios" className="app-store-btn download-btn" href={APP_STORE_URL} aria-label="Download Hope Church JC on the App Store">
      <AppPageAppleBadge/>
      <div>
        <div className="app-store-btn-small">Download on the</div>
        <div className="app-store-btn-big">App Store</div>
      </div>
    </a>
  );
  const google = (
    <a key="android" className="app-store-btn download-btn" href={PLAY_STORE_URL} aria-label="Get Hope Church JC on Google Play">
      <AppPageGoogleBadge/>
      <div>
        <div className="app-store-btn-small">Get it on</div>
        <div className="app-store-btn-big">Google Play</div>
      </div>
    </a>
  );
  return (
    <main className="download-page" data-screen-label="Page · Download the app">
      <div className="download-card">
        <img className="download-icon" src="/assets/app-icon.png" alt="" width="120" height="120"/>
        <h1 className="download-title">Hope Church</h1>
        <p className="download-lead">Messages, the Bible, events and giving. Free on iPhone and Android.</p>
        <div className="download-buttons">{android ? [google, apple] : [apple, google]}</div>
      </div>
      <a className="download-home" href="/">hopejc.org</a>
    </main>
  );
}

function AppFeature({ icon, title, children }) {
  return (
    <div className="app-feature-card">
      <div className="app-feature-icon">
        <Icon name={icon} size={22} color="var(--hope-blue)" strokeWidth={1.8}/>
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function AppPage() {
  const features = [
    { icon: 'mic',      title: 'Sermon library',    body: 'Every Sunday message \u2014 audio and video. Pick up where you left off.' },
    { icon: 'book',     title: 'Notes & Bible',     body: 'Follow along with the speaker\u2019s notes and tap any verse to open it in-line.' },
    { icon: 'calendar', title: 'Events & RSVPs',    body: 'See what\u2019s happening this week, register for events, and add them to your calendar.' },
    { icon: 'gift',     title: 'Give in seconds',   body: 'Securely give one-time or recurring \u2014 tithe, missions, or any fund \u2014 right from your phone.' },
  ];

  return (
    <div data-screen-label="Page · The Hope App">
      <section className="app-page-hero">
        <div className="container app-page-hero-inner">
          <div>
            <div className="app-page-eyebrow">The Hope App</div>
            <h1 className="app-page-title">Take Sunday <em>with you.</em></h1>
            <p className="app-page-lead">
              Listen to sermons, follow along with notes, give, send prayer requests, and stay connected to everything happening at Hope &mdash; right from your pocket.
            </p>
            <div><AppStoreButtons/></div>
          </div>
          <div className="app-page-phone-wrap" aria-hidden="true">
            <div className="app-phone">
              <div className="app-phone-notch"></div>
              <div className="app-phone-screen app-phone-screen--image">
                <img src={resources.appScreenshot} alt="Hope Church app screenshot"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-page-features">
        <div className="container">
          <header className="app-page-features-header">
            <div className="eyebrow">Everything in one place</div>
            <h2>Built for the rhythms of our church.</h2>
            <p>The Hope App is how a lot of our church family stays plugged in during the week. Here&rsquo;s what you&rsquo;ll find inside.</p>
          </header>
          <div className="app-page-features-grid">
            {features.map(f => (
              <div key={f.title}>
                <AppFeature icon={f.icon} title={f.title}>{f.body}</AppFeature>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-page-install">
        <div className="container">
          <div className="app-page-install-inner">
            <div className="app-page-install-text">
              <div className="eyebrow">Get it on your phone</div>
              <h2>Two taps and you&rsquo;re in.</h2>
              <p>Free in the App Store and on Google Play. Sign in with your Hope account if you have one &mdash; or just browse as a guest.</p>
              <div><AppStoreButtons/></div>
            </div>
            <ol className="app-page-install-steps">
              <li>Tap the badge for your phone &mdash; App Store or Google Play.</li>
              <li>Install the app (it&rsquo;s free) and open it once installed.</li>
              <li>Optional: sign in to give, save notes, and sync across devices.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
