import React from 'react';
import { resources } from '../resources.js';
import { Icon, Button, SectionHeader } from './shared.jsx';
import { useServiceTimes } from '../serviceTimes.jsx';
import { HopeCmsEmbed, GiveEmbed, HopeCalendarEmbed } from './embeds.jsx';
import { PODCASTS, ApplePodcastsIcon, SpotifyIcon, RssIcon } from './pages-extra.jsx';
import { KidsMinistryPage } from './ministry-kids.jsx';
import { Linked56MinistryPage } from './ministry-linked56.jsx';
import { StudentsMinistryPage } from './ministry-students.jsx';
import { CollegeMinistryPage } from './ministry-college.jsx';
import { WomenMinistryPage } from './ministry-women.jsx';
import { MenMinistryPage } from './ministry-men.jsx';
import { WorshipMinistryPage } from './ministry-worship.jsx';
import { FueledByHopeMinistryPage } from './ministry-fueledbyhope.jsx';
// Hope Church — subpages: Visit, About, Sermons, Events, Give, Ministries, Serve, NextSteps, Contact

const { useState: useStateP } = React;

// ---------- PageHeader (reused) ----------
function PageHeader({ eyebrow, title, lead }) {
  return (
    <section className="page-header">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}

// ---------- Visit Page ----------
function VisitPage() {
  const st = useServiceTimes();
  // The Connect Card, the same Planning Center form as /connect-card.
  const formUrl = 'https://hopejc.churchcenter.com/people/forms/341611';
  return (
    <>
      <PageHeader eyebrow="I'm New" title="We'll meet you at the Next Steps table." lead="Let us know you're coming and we'll look for you in the lobby, show you around, and help you find your way in." />
      <section className="visit-section">
        <div className="container visit-grid">
          <div className="connect-embed-wrap">
            <iframe
              src={`${formUrl}?open_in_church_center_modal=false`}
              title="Hope Church Connect Card"
              className="connect-embed"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
          <aside className="visit-aside">
            <h3>What to expect</h3>
            <div className="visit-expect">
              {[
                { icon: 'clock', t: 'About 75 minutes', p: 'Worship, a message, and time to pray. Come as you are — jeans or a tie, both work.' },
                { icon: 'kids', t: 'Kids are a joy', p: st.isNew ? `Classrooms for infants through 6th grade at the ${st.second} & ${st.third} services — the ${st.first} service is nursery & preschool only.` : 'Safe, fun classrooms at every service for infants through 6th grade.' },
                { icon: 'pin', t: 'Come to the Next Steps table', p: 'You\u2019ll find it in the lobby. Our volunteers there can answer your questions, help you find your next step, and get you plugged in.' },
              ].map(x => (
                <div className="visit-expect-item" key={x.t}>
                  <div className="visit-expect-icon"><Icon name={x.icon} size={18} color="var(--hope-blue)"/></div>
                  <div className="visit-expect-text"><strong>{x.t}</strong><p>{x.p}</p></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

// ---------- About Page ----------
function AboutPage({ onNav }) {
  const mission = [
    {
      title: 'Love God',
      refs: 'Deuteronomy 6:4-6 · Matthew 22:37-38',
      body: 'We are commanded by God to love Him with all our heart, soul, and mind. Every fiber of our being is to love God — and from this, everything else flows.',
      values: [
        { t: 'God\u2019s Word', p: 'Scripture is our final authority. We teach it plainly and let it shape every part of how we live.' },
        { t: 'Prayer', p: 'We talk to God before we talk about Him. Prayer isn\u2019t a warm-up — it\u2019s the work.' },
      ],
    },
    {
      title: 'Love People',
      refs: 'Matthew 22:39',
      body: 'When we love God, love for people flows from us. Jesus directly commands us to love our neighbor as ourselves.',
      values: [
        { t: 'Relationships', p: 'Faith grows best around tables and in living rooms. We were made to be together.' },
        { t: 'Generosity', p: 'What we have isn\u2019t ours to hoard. We give freely because God gave first.' },
      ],
    },
    {
      title: 'Make Disciples',
      refs: 'Matthew 28:18-20',
      body: 'God\u2019s design for the Church is not to keep the Gospel to ourselves. He commands us to make disciples — sharing His love with others.',
      values: [
        { t: 'Kingdom Mindset', p: 'We play for the bigger team. The kingdom is wider than our walls — or our name.' },
        { t: 'Replication', p: 'We make disciples who make disciples — and plant churches who plant churches.' },
      ],
    },
  ];
  const doctrines = [
    {
      t: 'Doctrine of God',
      paragraphs: ['We believe God eternally exists as one essence and three distinct persons: God the Father, God the Son, and God the Holy Spirit — each of whom is fully God.'],
      refs: 'Matthew 28:18-20 · John 1:14 · Hebrews 1:3 · Colossians 1:15-20 · John 15:26-27 · Ephesians 1:13-14 · Psalm 24:1',
    },
    {
      t: 'Doctrine of Revelation',
      paragraphs: ['God has made Himself known to the world in Jesus Christ, the Scriptures, and creation. The Bible, being God\u2019s inspired and authoritative Word, is His witness of Himself to humanity — and is therefore free from falsehood and error.'],
      refs: 'Hebrews 1:1-2 · 2 Timothy 3:16 · Psalm 8 · Romans 1:20 · Colossians 1:15 · Hebrews 1:3 · John 5:19 · Isaiah 40:6-8 · Romans 10:14-17',
    },
    {
      t: 'Doctrine of Creation & Providence',
      paragraphs: ['God created the world from nothing and governs all things at all times in all places.'],
      refs: 'Genesis 1:1-2 · Psalm 24:1 · Genesis 1:3-31 · Colossians 1:17',
    },
    {
      t: 'Doctrine of Humanity',
      paragraphs: ['All humanity is created in the image of God and possesses intrinsic dignity and worth.'],
      refs: 'Genesis 1:27-30 · 1 Corinthians 10:31 · 1 Timothy 3 · Titus 1',
    },
    {
      t: 'Doctrine of Sin',
      paragraphs: ['Sin has fractured all things, leaving the world in desperate need of salvation.'],
      refs: 'Genesis 3 · Romans 3:9-20 · Ephesians 2:1-3',
    },
    {
      t: 'Doctrine of Salvation',
      paragraphs: ['Salvation is by grace alone, through faith alone, in Christ alone.'],
      refs: 'John 3:5-8 · Hebrews 10:19-25 · Galatians 2:20',
    },
    {
      t: 'Doctrine of the Church',
      paragraphs: ['The Church is the body of Christ, sent into the world to shine forth the glory of God.'],
      refs: '1 Corinthians 12:12-31 · Matthew 28:18-20',
      sub: [
        {
          t: 'Gifts of the Holy Spirit',
          paragraphs: [
            'The gifts of the Holy Spirit we see on display in the New Testament are still active within the life of the church today. They did not end with the closing of the New Testament or the death of the last apostles (1 Corinthians 12:1-11). The gifts are empowering for the church — dispensed by the Holy Spirit when necessary and good for the encouragement and empowerment of the body — and should always be used in good order, with the purpose of strengthening and unifying the church.',
            'We believe in the healing power of God, done according to His sovereign will. While we always pray in faith for healing, our faith is not grounded in the promise that God will heal, but that He is fully able to heal. We acknowledge that not everyone will be healed; healing takes place by the will of God, not the will of man (Acts 14:10; 19:12; 16:18; 20:9-10; 2 Corinthians 12:8-9; Galatians 4:12-14; Phil 2:26-27; 2 Tim 4:20). Our ultimate hope is not in the healing of our earthly bodies, but in the redemption of our eternal souls.',
            'The gift of tongues, as presented in the book of Acts, was given by the Holy Spirit to enable people to understand the Gospel in their native tongue regardless of the language spoken (Acts 2:3,7,8; 1 Corinthians 14:21). We believe the gift of tongues is still an active gift. Authoritative messages given in tongues to be spoken over the church body should also be accompanied by an interpretation provided by the Holy Spirit (1 Corinthians 14:6, 27-28). The gift of tongues is also given in the form of prayer — used as communication between that person and the Lord.',
          ],
        },
        {
          t: 'Baptism',
          paragraphs: ['Based on the precedent set in the New Testament, we believe baptism should follow conversion, by immersion in water. Baptism by immersion symbolically depicts the believer\u2019s union to Christ through His death and resurrection (Romans 6:1-14).'],
        },
      ],
    },
    {
      t: 'Doctrine of the Resurrection',
      paragraphs: ['Jesus Christ is returning to the world in the future to judge the living and the dead.'],
      refs: 'Revelation 20:7-15 · Revelation 21:1-5',
    },
  ];
  return (
    <>
      <PageHeader eyebrow="About" title="A church for the Tri-Cities." lead="Hope Church was planted in 2022 in the heart of Gray, Tennessee — a contemporary community rooted deeply in the Word of God." />

      {/* How it all started */}
      <section className="about-origin">
        <div className="container about-origin-inner">
          <div className="about-origin-copy">
            <span className="eyebrow">Our Story</span>
            <h2>How it all started.</h2>
            <p className="lead">Hope Church was planted in 2022 by a group of believers who wanted to create a contemporary church experience — one not encumbered by traditional constraints, but still deeply founded in the Word of God.</p>
            <p>We began meeting at Daniel Boone High School in March of 2022. Soon after, we renovated part of a building in the heart of Gray at <a href="https://www.google.com/maps/search/?api=1&query=5034+Bobby+Hicks+Hwy+Johnson+City+TN" target="_blank" rel="noopener" className="origin-address-link">5034 Bobby Hicks Highway</a>, and that&rsquo;s where you&rsquo;ll find us today.</p>
            <p>We believe this is a place where God can move in and through the Tri-Cities, and we pray He continues to guide us as we walk in faith along the path He has set before us.</p>
          </div>
          <div className="about-origin-photo">
            <div className="photo-placeholder">
              <img src={resources.aboutOriginWorship} alt="The Hope Church congregation worshiping together in the Daniel Boone High School auditorium" />
            </div>
          </div>
        </div>
      </section>

      {/* Expanding the vision */}
      <section className="about-vision">
        <div className="container about-vision-inner">
          <div className="about-vision-photo">
            <div className="photo-placeholder">
              <img src={resources.aboutVisionWelcome} alt="Hope Church families walking into the Main Entrance on a Sunday morning" />
            </div>
          </div>
          <div className="about-vision-copy">
            <span className="eyebrow on-dark">The Vision</span>
            <h2>Expanding the kingdom.</h2>
            <blockquote className="scripture-quote">
              <span className="open-quote" aria-hidden="true">&ldquo;</span>
              And they devoted themselves to the apostles&rsquo; teaching and to fellowship, to the breaking of bread and to prayers.
              <cite>Acts 2:42</cite>
            </blockquote>
            <p>We strive for everything we do at Hope Church to fall under that vision — Scripture-based teaching, fellowship, breaking of bread, and prayer.</p>
            <p>Our goal is for the church to grow in depth and knowledge of the Word. And our prayer is to keep expanding the kingdom by planting more churches with the same calling: loving God, loving people, and making disciples <em>(2 Timothy 2:2)</em>.</p>
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="about-faith">
        <div className="container about-faith-inner">
          <SectionHeader eyebrow="Statement of Faith" title="What we believe." align="center" />
          <p className="about-faith-intro">
            Hope Church is committed to and believes in the local church. We believe the local church is the conduit God uses to equip and care for His people. We believe God&rsquo;s Word is a cohesive story of the Gospel that points to Jesus Christ — the only Hope for this world — and that it is important for the church to establish doctrinal truths according to what the Scriptures teach.
          </p>
          <blockquote className="about-faith-epigraph">
            &ldquo;What comes into our minds when we think about God is the most important thing about us.&rdquo;
            <cite>A.W. Tozer</cite>
          </blockquote>

          <div className="doctrines-list">
            {doctrines.map((d, i) => (
              <details className="doctrine doctrine-accordion" key={d.t}>
                <summary>
                  <span className="doctrine-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="doctrine-title">{d.t}</span>
                  <span className="doctrine-chevron" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <div className="doctrine-body">
                  {d.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                  {d.refs && <div className="doctrine-refs">{d.refs}</div>}
                  {d.sub && (
                    <div className="doctrine-sub">
                      {d.sub.map(s => (
                        <div className="doctrine-sub-item" key={s.t}>
                          <h4>{s.t}</h4>
                          {s.paragraphs.map((p, k) => <p key={k}>{p}</p>)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="container">
          <header className="about-mission-header">
            <span className="eyebrow">Mission &amp; Vision</span>
            <h2 className="about-mission-title">
              Love God. <br/>Love people. <br/><em>Make disciples.</em>
            </h2>
            <p className="about-mission-intro">
              Our desire is a simple mission statement our congregation can grab a hold of — summed up in three parts. How we envision that playing out in the life of our church breaks down into six core values that flow out of our mission.
            </p>
          </header>

          <div className="mission-grid">
            {mission.map((m, i) => (
              <article className="mission-pillar" key={m.title}>
                <div className="mission-pillar-mark">{String(i + 1).padStart(2, '0')}</div>
                <h3>{m.title}.</h3>
                <div className="mission-pillar-refs">{m.refs}</div>
                <p>{m.body}</p>
                <div className="mission-values">
                  <span className="mission-values-label">Core values</span>
                  {m.values.map(v => (
                    <div className="mission-value" key={v.t}>
                      <h4>{v.t}</h4>
                      <p>{v.p}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="about-mission-coda">We hope our story will become your story — and that God will use you to impact His Kingdom.</p>
        </div>
      </section>

      {/* Team CTA */}
      <section className="about-team-cta">
        <div className="container about-team-cta-inner">
          <div className="about-team-cta-copy">
            <span className="eyebrow">Leadership &amp; Staff</span>
            <h2>Meet the team.</h2>
            <p>Our elders, pastors, directors, and the rest of the leadership and staff who serve the church each Sunday — and through the week.</p>
            <div><Button variant="primary" size="lg" iconRight="arrow" onClick={() => onNav && onNav('team')}>Meet the team</Button></div>
          </div>
          <div className="about-team-cta-photo">
            <div className="photo-placeholder">
              <img src={resources.aboutTeamGroup} alt="The Hope Church leadership team standing together on stage in front of the Hope Church logo" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Team Page ----------
function TeamPage() {
  const elders = [
    { name: 'Rick Keller',    role: 'Lead Pastor / Elder', img: '/assets/elder-rick.png',   email: 'rkeller@hopejc.org' },
    { name: 'Will Easler',    role: 'Lead Pastor / Elder', img: '/assets/elder-will.jpg',   email: 'weasler@hopejc.org' },
    { name: 'David Wallace',  role: 'Elder',               img: '/assets/elder-david.jpg',  email: 'elders@hopejc.org'  },
    { name: 'Tommy Snapp',    role: 'Elder',               img: '/assets/elder-tommy.jpg',  email: 'elders@hopejc.org'  },
    { name: 'Jason Gaede',    role: 'Elder',               img: '/assets/elder-jason.jpg',  email: 'elders@hopejc.org'  },
    { name: 'Jeff Mann',      role: 'Elder',               img: '/assets/elder-jeff.jpg',   email: 'elders@hopejc.org'  },
    { name: 'Steve Tallent',  role: 'Elder',               img: '/assets/elder-steve.jpg',  email: 'elders@hopejc.org'  },
  ];
  const staff = [
    { name: 'Rick Keller',     role: 'Lead Pastor',       img: '/assets/elder-rick.png',     email: 'rkeller@hopejc.org'    },
    { name: 'Will Easler',     role: 'Lead Pastor',       img: '/assets/elder-will.jpg',     email: 'weasler@hopejc.org'    },
    { name: 'Jesse Broughton', role: 'Executive Pastor',  img: '/assets/staff-jesse.jpg',    email: 'jbroughton@hopejc.org' },
    { name: 'Cameron Owens',   role: 'Worship Pastor',    img: '/assets/staff-cameron.jpg',  email: 'cowens@hopejc.org'     },
    { name: 'Logan Harris',    role: 'Next-Gen Pastor',   img: '/assets/staff-logan.jpg',    email: 'lharris@hopejc.org'    },
    { name: 'Ashley Tipton',   role: 'Kids Director',     img: '/assets/staff-ashley.jpg',   email: 'atipton@hopejc.org'    },
    { name: 'Stacie Taylor',   role: 'Linked56 Director', img: '/assets/staff-stacie.jpg',   email: 'staylor@hopejc.org'    },
  ];
  const support = [
    { name: 'Gemma Johnson',      role: 'Office Administrator',     img: '/assets/staff-gemma.jpeg',     email: 'gjohnson@hopejc.org' },
    { name: 'Stacie Taylor',      role: 'Administrative Assistant', img: '/assets/staff-stacie.jpg',     email: 'staylor@hopejc.org'  },
    { name: 'Gabrielle Day',      role: 'Financial Assistant',      img: '/assets/staff-gabrielle.jpg',  email: 'gday@hopejc.org'     },
  ];
  return (
    <>
      <PageHeader eyebrow="Leadership &amp; Team" title="The people behind Hope." lead="Our elders, pastors, and staff team — who&rsquo;d love to meet you on a Sunday or at the office during the week." />

      {/* Elders */}
      <section className="staff-section team-elders-section">
        <div className="container">
          <SectionHeader eyebrow="Elders" title="Our elder board." lead="Hope Church is led by a plurality of elders who shepherd, teach, and pray for the church alongside the pastors." align="center" />
          <div className="staff-grid staff-grid-elders">
            {elders.map(e => (
              <div className="staff-card elder-card" key={e.name}>
                <div className="staff-photo elder" style={{backgroundImage: `url('${e.img}')`}} />
                <h4>{e.name}</h4>
                <div className="role">{e.role}</div>
                {e.email && <a className="elder-email" href={`mailto:${e.email}`}>{e.email}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="staff-section team-staff-section">
        <div className="container">
          <SectionHeader eyebrow="Staff" title="Our staff team." lead="Pastors and directors leading Hope&rsquo;s ministries day to day." align="center" />
          <div className="staff-grid staff-grid-elders">
            {staff.map(s => (
              <div className="staff-card elder-card" key={s.name}>
                <div className="staff-photo elder" style={{backgroundImage: `url('${s.img}')`}} />
                <h4>{s.name}</h4>
                <div className="role">{s.role}</div>
                {s.email && <a className="elder-email" href={`mailto:${s.email}`}>{s.email}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff */}
      <section className="staff-section team-support-section">
        <div className="container">
          <SectionHeader eyebrow="Support Staff" title="Behind the scenes." lead="The team keeping the office running and our ministries supported." align="center" />
          <div className="staff-grid staff-grid-elders staff-grid-support">
            {support.map(s => (
              <div className="staff-card elder-card" key={s.name}>
                <div className="staff-photo elder" style={{backgroundImage: `url('${s.img}')`}} />
                <h4>{s.name}</h4>
                <div className="role">{s.role}</div>
                {s.email && <a className="elder-email" href={`mailto:${s.email}`}>{s.email}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Sermons Page (Subsplash embed) ----------
function SermonsPage() {
  return (
    <>
      <PageHeader eyebrow="Sermons" title="Catch up, go deeper." lead="Every Sunday message, searchable and free. Listen on the app, on Apple Podcasts, or right here." />
      <section className="messages-section">
        <div className="container">
          {/* The two things most people arrive for, side by side. auto-fit
              rather than a media query: they sit two-up while there is room
              for a readable 16:9 player each, and stack the moment there
              is not. */}
          <div style={{maxWidth: 980, margin: '0 auto 56px', display:'grid',
                       gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))',
                       gap: 28, alignItems:'start'}}>
            <div>
              <div style={{fontSize:11, fontWeight:900, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12}}>Latest Sunday message</div>
              <HopeCmsEmbed slug="messages" query="?only=latest"
                            title="The latest Sunday message" height={430}/>
            </div>
            <div>
              <div style={{fontSize:11, fontWeight:900, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12}}>Latest Finding Hope episode</div>
              <HopeCmsEmbed slug="finding-hope-podcast" query="?only=latest"
                            title="The latest Finding Hope episode" height={430}/>
            </div>
          </div>

          {/* Subscribe / RSS — two podcast cards with subscribe pills */}
          <div className="sermons-subscribe" style={{maxWidth: 980, margin: '0 auto 56px'}}>
            <header className="sermons-subscribe-head">
              <span className="eyebrow">Subscribe &amp; Listen</span>
              <h2>Have the latest episode ready every week.</h2>
              <p>Subscribe in your favorite podcast app and every new episode lands automatically — ready for your commute, your walk, or whenever fits your week.</p>
            </header>
            <div className="sermons-podcasts">
              {PODCASTS.map(p => (
                <article className="sermons-podcast-card" key={p.id}>
                  <div className="sermons-podcast-cover">
                    {p.cover ? <img src={p.cover} alt={`${p.name} cover art`} loading="lazy"/> : null}
                  </div>
                  <div className="sermons-podcast-body">
                    <div className="sermons-podcast-tagline">{p.tagline}</div>
                    <h3 className="sermons-podcast-name">{p.name}</h3>
                    <p className="sermons-podcast-desc">{p.description}</p>
                    <div className="sermons-podcast-links podcast-channel-links">
                      <a className="podcast-link-pill" href={p.apple || `https://podcasts.apple.com/search?term=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener">
                        <ApplePodcastsIcon/> Apple Podcasts
                      </a>
                      <a className="podcast-link-pill" href={p.spotify || `https://open.spotify.com/search/${encodeURIComponent(p.name)}/podcastAndEpisodes`} target="_blank" rel="noopener">
                        <SpotifyIcon/> Spotify
                      </a>
                      <a className="podcast-link-pill" href={p.rss} target="_blank" rel="noopener">
                        <RssIcon/> RSS Feed
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* The whole library: Sunday, Mid-Week, Students and Finding Hope
              behind one set of tabs, served by our own CMS. This replaced
              three separate Subsplash embeds. */}
          <div style={{borderTop:'1px solid var(--border-hairline)', paddingTop: 48}}>
            <div style={{fontSize:11, fontWeight:900, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:20}}>Watch any message</div>
            <HopeCmsEmbed slug="all" title="Hope Church message library" height={1280}/>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Events Page ----------
function EventsPage() {
  return (
    <>
      <PageHeader eyebrow="Events" title="What's happening at Hope." />
      <section className="events-section">
        <div className="container">
          {/* The all-church calendar. Leaving `calendar` off is deliberate:
              the default lives on the server, so nothing here names one. */}
          <HopeCalendarEmbed limit={30} height={1100} title="Upcoming events at Hope Church" />
        </div>
      </section>
    </>
  );
}

// Old styled events page (kept as reference, not exported)
function _EventsPageStyled() {
  const events = [
    { m: 'May', d: '03', title: 'Starting Point Class', time: 'Sun · 10:00am', loc: 'Room 204', tag: 'New Here', desc: 'If you\u2019re new to Hope (or new to faith), this is the easiest place to start.' },
    { m: 'May', d: '09', title: 'Community Serve Day', time: 'Sat · 9:00am', loc: 'Riverside Park', tag: 'Serve', desc: 'A morning of cleanup, gardening, and meeting neighbors.' },
    { m: 'May', d: '16', title: 'Baptism Sunday', time: 'All services', loc: 'Main Auditorium', tag: 'Milestone', desc: 'Celebrating new life in Christ at every service.' },
    { m: 'May', d: '22', title: 'Women\u2019s Breakfast', time: 'Sat · 8:30am', loc: 'Fellowship Hall', tag: 'Gather', desc: 'Coffee, breakfast, and honest conversation.' },
    { m: 'May', d: '28', title: 'Men\u2019s Cookout', time: 'Fri · 6:30pm', loc: 'The Pavilion', tag: 'Gather', desc: 'Burgers, lawn games, and a short word.' },
    { m: 'Jun', d: '07', title: 'Kids VBS Registration', time: 'Open now', loc: 'Online', tag: 'Kids', desc: 'VBS is July 14\u201318. Don\u2019t miss the early bird price.' },
  ];
  return (
    <>
      <PageHeader eyebrow="Events" title="What's happening at Hope." lead="Classes, gatherings, serve days, and milestones — all pulled live from Planning Center." />
      <section className="events-section">
        <div className="container">
          <div className="events-grid">
            {events.map(e => (
              <article className="event-card-big" key={e.title}>
                <div className="event-card-big-img">
                  <div className="event-date">
                    <div className="event-month">{e.m}</div>
                    <div className="event-day">{e.d}</div>
                  </div>
                </div>
                <div className="event-card-big-body">
                  <span className="event-tag">{e.tag}</span>
                  <h3>{e.title}</h3>
                  <p>{e.time} · {e.loc}</p>
                  <p style={{color:'var(--fg-2)', marginBottom:16}}>{e.desc}</p>
                  <Button variant="secondary" size="sm" iconRight="arrow">Register</Button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

// ---------- Give Page ----------
function GivePage() {
  return (
    <div data-screen-label="Page · Give">
      {/* Compact hero banner — verse only, embed appears immediately below */}
      <section className="give-banner" aria-labelledby="give-banner-title">
        <div className="container give-banner-inner">
          <div className="eyebrow give-banner-eyebrow">Generosity</div>
          <h1 id="give-banner-title" className="give-banner-title">Giving</h1>
          <p className="give-banner-verse">
            <em>“For where your treasure is, there your heart will be also.”</em>
            <span className="give-banner-cite">— Matthew 6:21</span>
          </p>
        </div>
      </section>

      {/* Ways to Give — embed first, list alongside */}
      <section className="give-ways">
        <div className="container">
          <div className="give-ways-grid">
            <aside className="give-embed-wrap" aria-label="Online giving form">
              <div className="give-embed-card">
                <div className="give-embed-card-head">
                  <div>
                    <div className="eyebrow">Online Giving</div>
                    <h3>Give to Hope</h3>
                  </div>
                </div>
                <GiveEmbed/>
              </div>
            </aside>

            <div className="give-ways-list">
              <header className="give-ways-list-head">
                <h2>Ways to give</h2>
                <div className="give-ways-rule" aria-hidden="true"></div>
              </header>

              <article className="give-way">
                <div className="give-way-icon"><Icon name="check" size={18} color="var(--hope-blue)"/></div>
                <div className="give-way-body">
                  <h3>Give online</h3>
                  <p>Use the form here, or give through the Hope Church mobile app — one-time or recurring.</p>
                </div>
              </article>

              <article className="give-way">
                <div className="give-way-icon"><Icon name="hands" size={18} color="var(--hope-blue)"/></div>
                <div className="give-way-body">
                  <h3>Give in person</h3>
                  <p>Place your offering in the box at the back of the auditorium on Sunday mornings.</p>
                </div>
              </article>

              <article className="give-way">
                <div className="give-way-icon"><Icon name="mail" size={18} color="var(--hope-blue)"/></div>
                <div className="give-way-body">
                  <h3>Mail a check</h3>
                  <p>Make checks payable to Hope Church:</p>
                  <address className="give-way-address">
                    Hope Church<br/>
                    P.O. Box 8576<br/>
                    Johnson City, TN 37615
                  </address>
                </div>
              </article>

              <div className="give-secure">
                <Icon name="check" size={14} color="var(--success)"/>
                <span>Encrypted, secure giving. Your information is private.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Give */}
      <section className="give-why">
        <div className="container give-why-inner">
          <h2 className="give-why-title">Why we give.</h2>
          <div className="give-why-rule" aria-hidden="true"></div>
          <p className="give-why-body">
            God is generous and so he calls us to be as well. What we do with what God has given us shows the world where our hearts are at and helps proclaim the gospel. We want to glorify God with every area of our lives, and that includes what we do with our finances.
          </p>
        </div>
      </section>

      {/* Closing thanks band */}
      <section className="give-thanks">
        <div className="container">
          <p className="give-thanks-eyebrow">Thank you</p>
          <p className="give-thanks-body">Your generosity makes Sunday mornings, kids&apos; ministry, students, missions, and care for our neighbors possible. We&apos;re grateful for every gift.</p>
        </div>
      </section>
    </div>
  );
}

// ---------- Ministries, Serve, NextSteps, Contact (lighter pages) ----------
const MINISTRIES = [
  { slug: 'ministry-kids',       age: 'Birth · 4th Grade',   title: 'Kids Ministry',        desc: 'A safe, joyful space where kids learn who Jesus is through stories, songs, and a whole lot of play.' },
  { slug: 'ministry-linked56',   age: '5th · 6th Grade',     title: 'Linked 56',            desc: 'A space made just for 5th and 6th graders — the bridge between kids and students.' },
  { slug: 'ministry-students',   age: '7th · 12th Grade',    title: 'Students',             desc: 'Wednesday nights and Sunday mornings — real friendships and honest conversations about faith.' },
  { slug: 'ministry-college',    age: 'Ages 18 – 30',         title: 'College & Career',     desc: 'A community of young adults navigating college, the workforce, and everything in between — with Christ-centered guidance.' },
  { slug: 'ministry-women',      age: 'Women of Hope',       title: 'Woven Women\u2019s Ministry', desc: 'Women gathering to study Scripture, share life, and grow together in every season.' },
  { slug: 'ministry-men',        age: 'Men of Hope',         title: 'Men\u2019s Ministry',  desc: 'Brothers sharpening brothers — Bible studies, breakfasts, and a community that shows up.' },
  { slug: 'ministry-worship',    age: 'Sunday Mornings',     title: 'Worship & Tech',       desc: 'The team that leads us in song and runs the sound, lights, and slides every weekend.' },
  { slug: 'ministry-fueledbyhope', age: 'Senior Adults',     title: 'Fueled by Hope',       desc: 'Our senior adult ministry — gatherings, trips, and community for the second half of life.' },
];

function MinistriesPage({ onNav }) {
  return (
    <>
      <PageHeader eyebrow="Ministries" title="A place for every age." lead="From nursery to retirement, Hope has a community for every stage of life. Find the one that fits you and your family." />
      <section className="ministries-section">
        <div className="container">
          <div className="ministries-grid">
            {MINISTRIES.map(m => (
              <div className="ministry-card" key={m.slug} onClick={() => onNav && onNav(m.slug)} style={{cursor:'pointer'}}>
                <div className="ministry-card-age">{m.age}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <a className="ministry-card-link" href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav(m.slug);}}>Learn more <Icon name="arrow" size={14}/></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Request Form — separate CTA since it's a form, not a ministry */}
      <section className="cta-band">
        <div className="container">
          <span className="eyebrow">For our Hope family</span>
          <h2>Hosting an event at Hope?</h2>
          <p>Submit an event request form to reserve space, request childcare, or get your ministry event on the church calendar.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" onClick={() => window.open('https://hopejc.churchcenter.com/calendar/forms/12134', '_blank', 'noopener')} iconRight="arrow">Event Request Form</Button>
          </div>
        </div>
      </section>
    </>
  );
}

// Generic placeholder page for each individual ministry — to be designed out
function MinistryDetailPage({ slug, onNav }) {
  // Dedicated pages override the placeholder
  if (slug === 'ministry-kids') {
    return <KidsMinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-linked56') {
    return <Linked56MinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-students') {
    return <StudentsMinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-college') {
    return <CollegeMinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-women') {
    return <WomenMinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-men') {
    return <MenMinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-worship') {
    return <WorshipMinistryPage onNav={onNav}/>;
  }
  if (slug === 'ministry-fueledbyhope') {
    return <FueledByHopeMinistryPage onNav={onNav}/>;
  }

  const m = MINISTRIES.find(x => x.slug === slug);
  if (!m) return null;
  return (
    <>
      <PageHeader eyebrow={m.age} title={m.title} lead={m.desc} />
      <section className="ministries-section">
        <div className="container" style={{textAlign:'center', maxWidth: 720}}>
          <p style={{fontSize: 18, color:'var(--fg-2)', marginBottom: 28}}>
            We&rsquo;re building out a dedicated page for {m.title} — events, leaders, and how to get involved are coming soon.
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <Button variant="primary" size="lg" onClick={() => onNav && onNav('contact')} iconRight="arrow">Get in touch</Button>
            <Button variant="outline" size="lg" onClick={() => onNav && onNav('ministries')}>Back to all ministries</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ServePage() {
  const groups = [
    {
      eyebrow: '01',
      name: 'First Impressions',
      intro: 'Volunteers on our First Impressions team welcome all guests who enter the church. In addition to greeting people, volunteers answer questions and help guests find their way around. You are one of the very first impressions our guests will have at Hope. Please arrive 30 minutes before the start of service. This early arrival allows time to grab a snack and have fellowship with other volunteers, and most importantly: to pray, receive location assignments, pick up name tags, and get instructions for the day.',
      teams: [
        {
          t: 'Join the First Impressions Team',
          p: 'One team, five ways to serve. When you sign up we\u2019ll learn a little about you and help match you to the role that fits best — no experience needed.',
          roles: [
            { name: 'Parking Lot', desc: 'Directing parking, securing the campus, and welcoming families as they arrive.' },
            { name: 'Greeters', desc: 'Smiling, eye contact, and a real conversation with every person who walks in.' },
            { name: 'Next Steps', desc: 'Front-lines team for first-time visitors — general info, childcare, seating, and more.' },
            { name: 'Ushers', desc: 'Greeting, seating, collecting tithes and offerings, and tidying the room afterward.' },
            { name: 'Fellowship', desc: 'Preparing coffee and food so people feel at home and want to stay a while.' },
          ],
          href: 'https://hopejc.churchcenter.com/people/forms/343187',
          wide: true,
        },
      ],
    },
    {
      eyebrow: '02',
      name: 'Kids & Students',
      intro: 'From nursery through high school, we love the next generation at Hope — and we need people who&rsquo;ll show up week after week to walk with them.',
      teams: [
        { t: 'Kids', p: 'We love kids at Hope Church! Our kids ministry is committed to the growth of each and every child that walks through our doors. Our kids ministry is from babies to 4th grade. We need Bible teachers, craft & game leaders, as well as general help.', href: 'https://hopejc.churchcenter.com/people/forms/343180' },
        { t: 'Linked 56', p: 'We love our Hope tweens! Linked 56 is committed to helping each and every 5th and 6th grader discover their true identity in Christ. Our group meets on Sunday mornings and Wednesday nights. We welcome Bible teachers, game leaders, and general helpers.', href: 'https://hopejc.churchcenter.com/people/forms/589479' },
        { t: 'Students', p: "We love our students! Our student ministry is committed to pursuing the growth of each and every student that walks through our doors. The whole student ministry meets on Wednesday nights from 6:30pm\u20138:30pm at Hope Church. Each gathering includes worship, a message, small group interactions, and fun!", href: 'https://hopejc.churchcenter.com/people/forms/343175' },
      ],
    },
    {
      eyebrow: '03',
      name: 'Worship & Tech',
      intro: 'The team that makes Sundays sound and look right — for the band on stage and the people in the seats.',
      teams: [
        { t: 'Worship', p: 'We love to worship as believers in Christ! Worship is such an important part of each and every service at Hope Church. Our worship team is made of skilled musicians and singers. We rehearse on Thursday nights at 6:30pm for about an hour and have a run through at 6:30am on Sundays. Experienced volunteers welcome — and we offer training for those new to serving!', href: 'https://hopejc.churchcenter.com/people/forms/343190' },
        { t: 'Sound and Tech', p: "We are always in need of people to help run slides and sound! Our tech and sound teams arrive on Sunday mornings at 6:30am to do a run through with the worship team, then serve in all three services. We have plenty of training and resources to help you know what to do on a Sunday morning or Wednesday night.", href: 'https://hopejc.churchcenter.com/people/forms/343190' },
      ],
    },
  ];

  return (
    <>
      <PageHeader eyebrow="Serve" title="Serving is how we grow." lead="There&rsquo;s a team for everyone — from an hour a month to every Sunday. Pick one that fits your gifts, your schedule, and the season you&rsquo;re in." />
      <section className="serve-page">
        <div className="container">
          {groups.map((g, gi) => (
            <div className="serve-group" key={g.name}>
              <header className="serve-group-head">
                <span className="serve-group-num">{g.eyebrow}</span>
                <h2>{g.name}</h2>
                <p dangerouslySetInnerHTML={{__html: g.intro}}/>
              </header>
              <div className="ministries-grid">
                {g.teams.map(t => (
                  <div className={`ministry-card ${t.wide ? ' ministry-card-wide' : ''}`} key={t.t}>
                    <h3>{t.t}</h3>
                    <p>{t.p}</p>
                    {t.roles && (
                      <ul className="ministry-card-roles">
                        {t.roles.map(r => (
                          <li key={r.name}>
                            <strong>{r.name}</strong>
                            <span>{r.desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a className="ministry-card-link" href={t.href} target="_blank" rel="noopener noreferrer">Sign up <Icon name="arrow" size={14}/></a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function NextStepsPage({ onNav }) {
  const steps = [
    { n: '01', t: 'Plan a Visit', p: 'Come experience a Sunday — meet us at the Next Steps table in the lobby.' },
    { n: '02', t: 'Discover Hope', p: 'A class that explains who we are and how to get connected.' },
    { n: '03', t: 'Join a Group', p: 'Groups are where the real friendships happen.' },
    { n: '04', t: 'Serve on a Team', p: 'Use your gifts to make Sundays happen — training provided.' },
    { n: '05', t: 'Get Baptized', p: 'Ready to go public with your faith? We\u2019d love to celebrate with you.' },
  ];
  return (
    <>
      <PageHeader eyebrow="Next Steps" title="Five steps in." lead="Not a ladder to climb — just a path most people find helpful." />
      <section className="steps-rails">
        <div className="container-narrow">
          {steps.map(s => (
            <div className="step-rail" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div className="step-rail-body">
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                iconRight="arrow"
                onClick={() => {
                  if (s.t === 'Join a Group') {
                    window.open('https://hopejc.churchcenter.com/groups/life-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment', '_blank', 'noopener');
                    return;
                  }
                  const map = { 'Plan a Visit': 'visit', 'Discover Hope': 'discover', 'Serve on a Team': 'serve', 'Get Baptized': 'events' };
                  onNav(map[s.t]);
                }}
              >Start</Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  // Planning Center form — submissions land in PCO People and notify info@hopejc.org.
  const formUrl = 'https://hopejc.churchcenter.com/people/forms/1235481';
  return (
    <>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you." lead="Whether you have a question, need prayer, or simply want to introduce yourself — every message lands with a real person on our team." />
      <section className="visit-section">
        <div className="container visit-grid">
          <div className="connect-embed-wrap">
            <iframe
              src={`${formUrl}?open_in_church_center_modal=false`}
              title="Contact Hope Church"
              className="connect-embed"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
          <aside className="visit-aside">
            <h3>Hope Church</h3>
            <div className="visit-expect">
              <div className="visit-expect-item">
                <div className="visit-expect-icon"><Icon name="pin" size={18} color="var(--hope-blue)"/></div>
                <div className="visit-expect-text"><strong>Address</strong><p>5034 Bobby Hicks Hwy<br/>Johnson City, TN 37615</p></div>
              </div>
              <div className="visit-expect-item">
                <div className="visit-expect-icon"><Icon name="clock" size={18} color="var(--hope-blue)"/></div>
                <div className="visit-expect-text"><strong>Office hours</strong><p>Monday &ndash; Thursday, 9am &ndash; 4pm</p></div>
              </div>
              <div className="visit-expect-item">
                <div className="visit-expect-icon"><Icon name="mail" size={18} color="var(--hope-blue)"/></div>
                <div className="visit-expect-text"><strong>Email &amp; phone</strong><p><a href="mailto:info@hopejc.org">info@hopejc.org</a><br/>(423) 207-3341</p></div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export { PageHeader, VisitPage, AboutPage, TeamPage, SermonsPage, EventsPage, GivePage, MinistriesPage, MinistryDetailPage, MINISTRIES, ServePage, NextStepsPage, ContactPage };
