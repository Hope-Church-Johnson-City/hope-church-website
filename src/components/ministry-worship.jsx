import React from 'react';
import { Icon, Button } from './shared.jsx';
import { useServiceTimes } from '../serviceTimes.jsx';
// Hope Church — Worship & Tech detail page (slug: ministry-worship)
// "Worship the LORD with gladness; come into his presence with singing!"
//   — Psalm 100:2
//
// The team that leads the room on Sunday — voices and instruments on
// stage, and the often-invisible crew running sound, ProPresenter slides,
// and the live stream from the booth. This page treats both halves with
// equal weight because every Sunday needs both.

function WorshipMinistryPage({ onNav }) {
  const st = useServiceTimes();
  const SIGNUP_URL = 'https://hopejc.churchcenter.com/people/forms/343190';
  const CONTACT_EMAIL = 'mailto:info@hopejc.org?subject=Worship%20%26%20Tech%20Team';

  // Roles grid — concrete, honest descriptions of every seat that
  // serves on a Sunday. Tagged with whether it's on stage or in the booth.
  const roles = [
    {
      group: 'On Stage',
      name: 'Vocals',
      body: 'Lead and harmony singers carrying the room each week. We rotate leads and welcome strong background voices.',
      tags: ['Lead', 'Harmony', 'BGV'],
      icon: 'mic',
    },
    {
      group: 'On Stage',
      name: 'Instruments',
      body: 'Acoustic and electric guitars, bass, keys, drums, and the occasional auxiliary. We pair experienced players with developing ones.',
      tags: ['Acoustic', 'Electric', 'Bass', 'Keys', 'Drums'],
      icon: 'music',
    },
    {
      group: 'In the Booth',
      name: 'Sound',
      body: 'Front-of-house engineer mixing the band and pastor through our digital console. Training provided — we love taking new tech volunteers from zero.',
      tags: ['FOH', 'In-ears', 'Console'],
      icon: 'sliders',
    },
    {
      group: 'In the Booth',
      name: 'ProPresenter',
      body: 'Running lyrics, sermon notes, scripture, and announcement slides for the room and the stream. If you can pay attention and click on cue, you can do this.',
      tags: ['Slides', 'Lyrics', 'Scripture'],
      icon: 'monitor',
    },
    {
      group: 'In the Booth',
      name: 'Live Stream',
      body: 'Cameras, switcher, and stream audio so the families at home feel like they\u2019re in the room. We need camera ops and a director on rotation.',
      tags: ['Cameras', 'Switching', 'Stream'],
      icon: 'video',
    },
    {
      group: 'On Stage',
      name: 'Lighting',
      body: 'Setting the room \u2014 from a quiet acoustic moment to a full-band chorus. A great place to start if you love production and want to learn.',
      tags: ['Cues', 'Color', 'Mood'],
      icon: 'sparkles',
    },
  ];

  // Inline icons used by role cards (kept here so the page is self-contained
  // and we don't need to extend the global Icon set).
  function RoleIcon({ name }) {
    const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
    switch (name) {
      case 'mic':
        return (<svg {...common}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="17" x2="12" y2="22"/></svg>);
      case 'music':
        return (<svg {...common}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>);
      case 'sliders':
        return (<svg {...common}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>);
      case 'monitor':
        return (<svg {...common}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>);
      case 'video':
        return (<svg {...common}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>);
      case 'sparkles':
        return (<svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>);
      default:
        return null;
    }
  }

  return (
    <>
      {/* ===== Section 1: Anchor hero — full-bleed stage photo ===== */}
      <section className="wt-anchor">
        <div className="wt-anchor-bg" aria-hidden="true"></div>
        <div className="container wt-anchor-inner">
          <div className="wt-anchor-copy">
            <span className="wt-anchor-eyebrow">A Ministry of Hope Church</span>

            <h1>
              <span className="line">Worship</span>
              <span className="line tech"><span className="amp">&amp;</span> Tech.</span>
            </h1>

            <p className="wt-anchor-lead">
              The team that leads us in song and runs the room every weekend &mdash; voices, instruments, sound, slides, cameras, and lights. <strong>Skilled musicians and trained tech volunteers serving side by side</strong>, plus a place to start if you&rsquo;re new.
            </p>

            <div className="wt-anchor-actions">
              <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(SIGNUP_URL, '_blank', 'noopener')}>Sign Up to Serve</Button>
              <Button variant="outline-on-dark" size="xl" onClick={() => window.location.href = CONTACT_EMAIL}>Ask a question</Button>
            </div>

            <dl className="wt-anchor-facts">
              <div>
                <dt>Rehearsal</dt>
                <dd>Thu <s>6:30 PM</s></dd>
              </div>
              <div>
                <dt>Run-through</dt>
                <dd>Sun <s>6:30 AM</s></dd>
              </div>
              <div>
                <dt>Training</dt>
                <dd>Provided</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Two teams ===== */}
      <section className="wt-teams">
        <div className="container">
          <header className="wt-teams-head">
            <span className="wt-eyebrow">Two Teams, One Sunday</span>
            <h2>Lead the room <em>together</em>.</h2>
            <p>Worship and Tech are one ministry at Hope &mdash; the musicians on stage and the crew in the booth show up for the same call and the same Sunday.</p>
          </header>

          <div className="wt-teams-grid">
            <article className="wt-team worship">
              <div className="wt-team-photo" role="img" aria-label="Worship leaders singing on stage"></div>
              <div className="wt-team-body">
                <span className="wt-team-tag">Worship Team</span>
                <h3>On the stage.</h3>
                <p className="wt-team-desc">Skilled musicians and singers leading the church into worship every weekend. We rotate weekly, build chemistry in rehearsal, and welcome players ready to commit to the team.</p>
                <ul className="wt-team-roles">
                  <li>Vocals</li>
                  <li>Acoustic</li>
                  <li>Electric</li>
                  <li>Bass</li>
                  <li>Keys</li>
                  <li>Drums</li>
                </ul>
              </div>
            </article>

            <article className="wt-team tech">
              <div className="wt-team-photo" role="img" aria-label="Sound engineer mixing front of house"></div>
              <div className="wt-team-body">
                <span className="wt-team-tag">Tech Team</span>
                <h3>In the booth.</h3>
                <p className="wt-team-desc">The crew running sound, ProPresenter, cameras, and lights. No experience needed for most roles &mdash; we have plenty of training and resources, and we love starting brand-new volunteers from scratch.</p>
                <ul className="wt-team-roles">
                  <li>Sound</li>
                  <li>ProPresenter</li>
                  <li>Cameras</li>
                  <li>Stream</li>
                  <li>Lighting</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Section 3: The crew (roles grid) ===== */}
      <section className="wt-crew">
        <div className="container">
          <header className="wt-crew-head">
            <div>
              <span className="wt-eyebrow">The Whole Crew</span>
              <h2>Every seat that makes <em>Sunday work</em>.</h2>
            </div>
            <p>Pick the one that fits your wiring. We&rsquo;ll meet you wherever you&rsquo;re starting from &mdash; experienced players welcome, and we love training brand-new tech volunteers.</p>
          </header>
          <div className="wt-crew-grid">
            {roles.map((r, i) => (
              <article className="wt-role" key={r.name}>
                <div className="wt-role-head">
                  <span className="wt-role-icon"><RoleIcon name={r.icon}/></span>
                  <span className="wt-role-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{r.name}</h3>
                <p>{r.body}</p>
                <div className="wt-role-meta">
                  {r.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4: The week (schedule) ===== */}
      <section className="wt-week">
        <div className="wt-week-grid">
          <div className="wt-week-photo">
            <img src="/assets/tech-propresenter.jpg" alt="ProPresenter operator running slides for a Sunday service"/>
            <span className="wt-week-photo-label">Sunday Morning</span>
          </div>
          <div className="wt-week-body">
            <span className="wt-eyebrow">The Week</span>
            <h2>How we <em>prepare</em>.</h2>
            <p>Two times a week is all it takes. We rehearse together on Thursday and run the full set on Sunday morning before the doors open.</p>

            <ol className="wt-schedule">
              <li className="wt-sched-row">
                <div className="wt-sched-time">6:30<s>Thursday PM</s></div>
                <div className="wt-sched-detail">
                  <h4>Worship Rehearsal <span className="who">Worship team</span></h4>
                  <p>Our worship team meets on Thursday evenings to rehearse for the upcoming Sunday. We meet at 6:30pm and rehearsal usually lasts until 8:00pm.</p>
                </div>
              </li>
              <li className="wt-sched-row">
                <div className="wt-sched-time">{st.runthrough.replace('am','')}<s>Sunday AM</s></div>
                <div className="wt-sched-detail">
                  <h4>Sunday Run-Through <span className="who">Worship + Tech</span></h4>
                  <p>Our worship and tech teams meet on Sunday mornings at {st.runthrough} to do one last run through before services begin. We run through the entire service&rsquo;s worship and are usually finished up by {st.runthroughEnd}.</p>
                </div>
              </li>
              <li className="wt-sched-row">
                <div className="wt-sched-time">{st.first.replace('am','')}<s>Sunday Services</s></div>
                <div className="wt-sched-detail">
                  <h4>Three Services <span className="who">Tech all services</span></h4>
                  <p>Doors open and we&rsquo;re live. Worship rotates by service; tech serves through all three. Coffee, prayer, and a real seat at the table for every volunteer on schedule.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ===== Section 5: CTA band ===== */}
      <section className="wt-cta-band">
        <div className="container">
          <span className="wt-eyebrow">Get Involved</span>
          <h2>Come <em>serve</em> on Sunday.</h2>
          <p>Experienced or brand new &mdash; if you&rsquo;re ready to show up on Thursday and Sunday and serve this church, we&rsquo;ll find the seat that fits.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(SIGNUP_URL, '_blank', 'noopener')}>Sign Up Here</Button>
            <Button variant="outline-on-dark" size="xl" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Worship &amp; Tech</Button>
          </div>
          <div className="wt-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { WorshipMinistryPage };
