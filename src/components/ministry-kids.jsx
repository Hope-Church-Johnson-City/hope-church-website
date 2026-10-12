import React from 'react';
import { Icon, Button } from './shared.jsx';
import { PageHeader } from './pages.jsx';
import { HopeCalendarEmbed } from './embeds.jsx';
import { useServiceTimes, useFourthServiceLive, KidsServiceNote } from '../serviceTimes.jsx';
// Hope Church — Kids Ministry detail page (slug: ministry-kids)
// Uses PageHeader, Button, Icon from shared.jsx.

function KidsMinistryPage({ onNav }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  const SERVE_URL = 'https://hopejc.churchcenter.com/people/forms/343180';
  const FB_URL = 'https://www.facebook.com/groups/422411476309472';

  const pillars = [
    { word: 'Love',  color: '#FF3FB4', body: 'Help kids know the love of Jesus in a personal way.' },
    { word: 'Grow',  color: '#7CD64A', body: 'Encourage them to grow in their faith journey.' },
    { word: 'Serve', color: '#A86BFF', body: 'Teach them to serve one another with joy.' },
    { word: 'Go',    color: '#FF8A2C', body: 'Equip them to go into the world and share His message.' },
  ];

  const ages = [
    {
      label: 'Birth · 36 Months',
      title: 'Infants & Toddlers',
      body: 'Loving care for our littlest ones in a secure, nurturing space. Trained volunteers offer comfort and attention so parents can fully engage in worship.',
      icon: 'heart',
    },
    {
      label: 'Ages 3 · 5',
      title: 'Preschoolers',
      body: 'Interactive Bible lessons, memory verses, a snack, and hands-on activities that help kids grow in their understanding of God\u2019s love.',
      icon: 'sparkles',
    },
    {
      label: 'Kindergarten · 4th Grade',
      title: 'Elementary',
      body: 'Kids worship with their families and are then dismissed to age-specific classes for engaging Bible lessons and fun activities that build a strong foundation.',
      icon: 'book',
    },
  ];

  const safety = [
    { t: 'Background checks',  p: 'Every Hope Kids and Next Generation volunteer is thoroughly screened, carefully selected, and trained for their role.' },
    { t: 'Secure check-in',    p: 'Children check in at drop-off and receive a name tag with a unique family code. Parents present the matching tag at pickup.' },
    { t: 'Authorized pickup',  p: 'Children are released only to the adult holding the matching pickup tag — no exceptions, no shortcuts.' },
    { t: 'Trained team',       p: 'Each volunteer is prepared to serve with integrity, compassion, and responsibility — and is never alone with a child.' },
  ];

  const gallery = [
    { src: '/assets/kids-lesson.jpg',   caption: 'Sunday morning lesson · large group',     span: 'wide' },
    { src: '/assets/kids-crafts.jpg',   caption: 'Crafts & creative time',                  span: 'tall' },
    { src: '/assets/kids-nativity.jpg', caption: 'The annual Christmas program',            span: 'wide' },
    { src: '/assets/kids-amped.jpg',    caption: 'Hope Kids on the road · Amped trip',      span: 'tall' },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Nursery · 4th Grade"
        title="Kids Ministry"
        lead="At Hope, every child matters deeply to God &mdash; and to us. Our heart is to build real relationships with each child, creating a safe, joyful place where they can encounter the Gospel and grow as lifelong disciples of Jesus."
      />

      {/* ===== Intro + Love / Grow / Serve / Go pillars ===== */}
      <section className="kids-intro">
        <div className="container kids-intro-inner">
          <div className="kids-intro-copy">
            <span className="eyebrow">Our Heart</span>
            <h2>Helping kids discover <em>Christ in them</em>.</h2>
            <p className="lead">More than just childcare. From nursery through 4th grade we aim to build meaningful relationships with each child &mdash; pointing them, week after week, toward a life rooted in Christ.</p>
            <p>Guided by our motto &mdash; <strong>Love. Grow. Serve. Go.</strong> &mdash; every moment in Hope Kids is intentional. We partner with parents and guardians to walk alongside families as they shepherd their children in faith.</p>
          </div>
          <div className="kids-intro-photo">
            <div className="photo-placeholder kids-photo-frame">
              <img src="/assets/kids-lesson.jpg" alt="A Hope Kids teacher leads kids through a Bible lesson on a Sunday morning"/>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="kids-pillars">
            {pillars.map(p => (
              <div className="kids-pillar" key={p.word} style={{'--pillar-color': p.color}}>
                <span className="kids-pillar-dot"></span>
                <h3>{p.word}<span className="kids-pillar-stop">.</span></h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Hope Kids logo / Hyfi curriculum (dark) ===== */}
      <section className="kids-foundation">
        <div className="container kids-foundation-inner">
          <div className="kids-foundation-logo">
            <img src="/assets/hopekids-logo.png" alt="Hope Kids — Love. Grow. Serve. Go."/>
          </div>
          <div className="kids-foundation-copy">
            <span className="eyebrow">Building a Strong Foundation</span>
            <h2>A Biblical foundation for the next generation.</h2>
            <p>There&rsquo;s nothing more important than investing in the spiritual growth of our next generation. Our mission is to help children build a solid, lasting Biblical foundation &mdash; one that will carry them through every stage of life and into adulthood with confidence in their faith.</p>
            <p>To support this, we use the <strong>&lsquo;Hyfi&rsquo; curriculum by Lifeway</strong> &mdash; a Christ-centered tool that helps kids understand the Bible as a unified story. As they move through our ministry from early childhood onward, they&rsquo;ll journey through the entire Bible multiple times with engaging lessons, creative activities, and hands-on crafts designed to deepen their understanding and love for God&rsquo;s Word.</p>
            <p className="kids-foundation-coda">Together, we&rsquo;re raising up a generation that knows God, loves His Word, and boldly lives out His truth.</p>
          </div>
        </div>
      </section>

      {/* ===== Sunday Mornings ===== */}
      <section className="kids-sundays">
        <div className="container">
          <header className="kids-section-head">
            <span className="eyebrow">Sunday Mornings</span>
            <h2>A fun, safe, Christ-centered space for every age.</h2>
            <div className="kids-service-times">
              <span>{st.first}</span><span className="kids-dot">&middot;</span>
              <span>{st.second}</span><span className="kids-dot">&middot;</span>
              <span>{st.third}</span>
              {fourthLive && <><span className="kids-dot">&middot;</span><span>{st.fourth}</span></>}
            </div>
            <KidsServiceNote className="kids-service-note" />
          </header>

          <div className="kids-ages">
            {ages.map((a, i) => (
              <article className="kids-age-card" key={a.title}>
                <div className="kids-age-num">{String(i+1).padStart(2,'0')}</div>
                <span className="kids-age-label">{a.label}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>

          <div className="kids-checkin-note">
            <Icon name="clock" size={18} color="var(--hope-blue)"/>
            <p><strong>Check-in opens 10 minutes before each service</strong> &mdash; giving parents time to get kids settled before worship begins. At the end of service, K&ndash;4th graders are picked up in their classrooms.</p>
          </div>
        </div>
      </section>

      {/* ===== Inside Hope Kids — photo gallery ===== */}
      <section className="kids-gallery-section">
        <div className="container">
          <header className="kids-section-head kids-section-head-center">
            <span className="eyebrow">Inside Hope Kids</span>
            <h2>Learning, laughter, and lasting friendships.</h2>
          </header>
          <div className="kids-gallery">
            {gallery.map((g, i) => (
              <figure className={`kids-gallery-item kids-gallery-${g.span}`} key={i}>
                <img src={g.src} alt={g.caption}/>
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Safety ===== */}
      <section className="kids-safety">
        <div className="container kids-safety-inner">
          <div className="kids-safety-copy">
            <span className="eyebrow">Safety First</span>
            <h2>Committed to your child&rsquo;s safety.</h2>
            <p>At Hope Church, the safety and well-being of every child in our care is a top priority. We&rsquo;re committed to providing a secure environment where families can feel confident and kids can thrive.</p>
            <p>You can relax knowing your child is not only learning and growing &mdash; but is also in safe, trusted hands.</p>
          </div>
          <ul className="kids-safety-list">
            {safety.map(s => (
              <li key={s.t}>
                <div className="kids-safety-check"><Icon name="check" size={16}/></div>
                <div>
                  <strong>{s.t}</strong>
                  <p>{s.p}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Calendar (Subsplash) ===== */}
      <section className="kids-calendar">
        <div className="container">
          <header className="kids-section-head kids-section-head-center">
            <span className="eyebrow">What&rsquo;s Coming Up</span>
            <h2>The Hope Kids calendar.</h2>
            <p>Family events, kids&rsquo; nights, and special Sundays &mdash; everything happening in Hope Kids, pulled live so you never miss a thing.</p>
          </header>
          <div className="kids-calendar-frame">
            <HopeCalendarEmbed calendar="kids"/>
          </div>
        </div>
      </section>

      {/* ===== CTA band — Parents serve + Facebook ===== */}
      <section className="kids-cta-band">
        <div className="container">
          <span className="eyebrow">Parents</span>
          <h2>Serve alongside your kids.</h2>
          <p>We invite and encourage parents to serve in Hope Kids on a rotating basis. There are many ways to get involved &mdash; and it&rsquo;s a great way to get to know other families with young children at Hope. If you&rsquo;re new to Hope, we ask that you complete our Discover Hope class before serving.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve in Hope Kids</Button>
            <Button variant="outline-on-dark" size="xl" icon="facebook" onClick={() => window.open(FB_URL, '_blank', 'noopener')}>Facebook Group</Button>
          </div>
          <div className="kids-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { KidsMinistryPage };
