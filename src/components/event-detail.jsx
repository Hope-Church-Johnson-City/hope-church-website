/* Hope Church — a single event, rendered by the website itself.

   This used to be a bare page rendered by the CMS worker and proxied in, which
   meant no header, no nav and no footer: opening an event felt like leaving the
   site. It is now a real route, so it sits inside the normal Layout.

   Data comes from two places on purpose:
     • src/generated/events.json, fetched at build time, so the pre-rendered HTML
       carries the real title, description and Open Graph image for link previews
     • a live fetch on mount, so an edit in the CMS appears without a redeploy

   An event created since the last build has no pre-rendered file. Vercel checks
   the filesystem first, so those fall through to the CMS-rendered page instead:
   plainer, but with the right title, description and preview image. The obvious
   alternative -- falling back to the SPA shell -- was worse, because index.html
   is the pre-rendered HOME page, so a texted link previewed as the homepage and
   told Google the event was a duplicate of it. */
import React, { useEffect, useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Link, useParams } from 'react-router-dom';
import { SITE_ORIGIN } from '../nav.js';
import BUILT_EVENTS from '../generated/events.json';

const CMS_ORIGIN = 'https://media.hopejc.org';
const BRAND = 'Hope Church · Johnson City, TN';

const bySlug = (slug) => BUILT_EVENTS.find((e) => e.slug === slug) || null;

// A web address typed into a description, up to the next space. Punctuation
// that ends the sentence ("…sign up here: https://x.com/a.") is not part of it.
const URL_RE = /https?:\/\/[^\s<>"]+/g;
const URL_TAIL = /[.,;:!?'")\]]+$/;

function Linked({ line }) {
  const out = [];
  let last = 0;
  for (const m of line.matchAll(URL_RE)) {
    const url = m[0].replace(URL_TAIL, '');
    out.push(line.slice(last, m.index));
    out.push(
      <a key={m.index} href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    );
    last = m.index + url.length;
  }
  out.push(line.slice(last));
  return out;
}

// Plain text with blank lines becomes paragraphs. The CMS stores what the
// author typed, so this must not assume any markup; web addresses in it
// become links.
function Paragraphs({ text }) {
  if (!text) return null;
  return (
    <>
      {String(text)
        .replace(/\r\n/g, '\n')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>
            {p.split('\n').map((line, j, arr) => (
              <React.Fragment key={j}>
                <Linked line={line} />
                {j < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
    </>
  );
}

function Fact({ label, show = true, children }) {
  if (!show || !children) return null;
  return (
    <div className="ev-fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function EventDetailPage() {
  const { slug } = useParams();
  const built = bySlug(slug);
  const [event, setEvent] = useState(built);
  // "missing" only after a live lookup fails -- never on first paint, or an
  // event created since the last build would flash "not found" before loading.
  const [state, setState] = useState(built ? 'ready' : 'loading');

  useEffect(() => {
    let cancelled = false;
    setEvent(bySlug(slug));
    setState(bySlug(slug) ? 'ready' : 'loading');
    fetch(`${CMS_ORIGIN}/api/public/calendar/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((fresh) => { if (!cancelled) { setEvent(fresh); setState('ready'); } })
      .catch(() => { if (!cancelled) setState((s) => (bySlug(slug) ? 'ready' : 'missing')); });
    return () => { cancelled = true; };
  }, [slug]);

  if (state === 'loading') {
    return (
      <section className="ev-page">
        <div className="container ev-narrow">
          <p className="ev-loading">Loading this event…</p>
        </div>
      </section>
    );
  }

  if (state === 'missing' || !event) {
    return (
      <>
        <Head><title>{`Event not found | ${BRAND}`}</title><meta name="robots" content="noindex" /></Head>
        <section className="ev-page">
          <div className="container ev-narrow">
            <h1 className="ev-title">We couldn’t find that event.</h1>
            <p className="ev-missing">It may have already happened, or the link may be out of date.</p>
            <Link className="btn btn-primary" to="/events">See what’s coming up</Link>
          </div>
        </section>
      </>
    );
  }

  const title = `${event.title} | ${BRAND}`;
  const desc = (event.summary || event.description || '').replace(/\s+/g, ' ').trim().slice(0, 155);
  const canonical = `${SITE_ORIGIN}/events/${event.slug}`;
  const ogImage = event.image ? SITE_ORIGIN + event.image : `${SITE_ORIGIN}/assets/og-image.jpg`;
  const mapHref = event.location_address
    ? `https://maps.google.com/?q=${encodeURIComponent(event.location_address)}`
    : null;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="event" />
        <meta property="og:site_name" content="Hope Church" />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <section className="ev-page">
        <div className="container ev-narrow">
          <Link className="ev-back" to="/events">&larr; All events</Link>

          <header className="ev-head">
            <p className="ev-when">
              {event.when_label}
              {event.time_label ? <span className="ev-dot" aria-hidden="true">·</span> : null}
              {event.time_label}
            </p>
            {/* A cancelled event keeps its page. The CMS also puts "Cancelled:" in
                front of the title for apps that predate the flag; here the flag
                draws a label and the real title, struck through. */}
            {event.cancelled && <p className="ev-cancelled">Cancelled</p>}
            <h1 className={event.cancelled ? 'ev-title ev-title--x' : 'ev-title'}>
              {event.cancelled ? (event.base_title || event.title) : event.title}
            </h1>
            {(() => {
              if (event.cancelled && event.cancel_note) return <p className="ev-summary">{event.cancel_note}</p>;
              const s = (event.summary || '').trim();
              const d = (event.description || '').replace(/\s+/g, ' ').trim();
              if (!s || d.startsWith(s.replace(/\s+/g, ' '))) return null;
              return <p className="ev-summary">{s}</p>;
            })()}
          </header>

          {event.image && (
            <img
              className="ev-hero"
              src={CMS_ORIGIN + event.image}
              alt={event.image_alt || ''}
              width="1920"
              height="1080"
            />
          )}

          <div className="ev-body">
            <div className="ev-copy">
              <Paragraphs text={event.description} />
              {event.signup_url && (
                <a
                  className="btn btn-primary ev-cta"
                  href={event.signup_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.signup_label || 'Sign up'}
                </a>
              )}
            </div>

            <aside className="ev-side">
              <dl className="ev-facts">
                <Fact label="When">
                  <span className="ev-strong">{event.when_label}</span>
                  {event.time_label && <><br />{event.time_label}</>}
                </Fact>
                <Fact label="Where" show={!!(event.location_name || event.location_address)}>
                  {event.location_name && <span className="ev-strong">{event.location_name}</span>}
                  {mapHref && (
                    <>
                      {event.location_name && <br />}
                      <a href={mapHref} target="_blank" rel="noopener noreferrer">
                        {event.location_address}
                      </a>
                    </>
                  )}
                  {event.location_notes && <><br /><span className="ev-note">{event.location_notes}</span></>}
                </Fact>
                <Fact label="Questions" show={!!(event.contact_name || event.contact_email || event.contact_phone)}>
                  {event.contact_name && <>{event.contact_name}<br /></>}
                  {event.contact_email && (
                    <><a href={`mailto:${event.contact_email}`}>{event.contact_email}</a><br /></>
                  )}
                  {event.contact_phone && (
                    <a href={`tel:${String(event.contact_phone).replace(/[^\d+]/g, '')}`}>
                      {event.contact_phone}
                    </a>
                  )}
                </Fact>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
