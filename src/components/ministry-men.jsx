import React from 'react';
import { Button } from './shared.jsx';
import { HopeCalendarEmbed } from './embeds.jsx';
// Hope Church — H.I.T. Men (Men's Ministry) detail page (slug: ministry-men)
// "Do not be conformed to this world, but be transformed by the renewal of
//  your mind, that by testing you may discern what is the will of God, what is
//  good and acceptable and perfect."  — Romans 12:2
//
// H.I.T. = Honor, Integrity, and Transformation. Two weekly small groups
// (Monday evenings and Tuesday mornings). Built around the men's-groups
// forest artwork the church already uses, scaled into the Hope identity:
// deep navy + sky-blue with a single rust-orange dash recalling the
// artwork's signature underline.

function MenMinistryPage({ onNav }) {
  const FACEBOOK_URL = 'https://www.facebook.com/groups/1549868935515769';
  const CONTACT_EMAIL = 'mailto:info@hopejc.org?subject=H.I.T.%20Men%27s%20Ministry';

  const pillars = [
    {
      letter: 'H',
      word: 'Honor',
      body: 'Showing up for each other on purpose. Honoring God, our wives, our kids, our neighbors \u2014 and the men around the table who choose to walk this out with us.',
    },
    {
      letter: 'I',
      word: 'Integrity',
      body: 'Being the same man on Monday morning as we are on Sunday morning. Honest about the wins, honest about the gaps, accountable in both.',
    },
    {
      letter: 'T',
      word: 'Transformation',
      body: 'Renewing our minds in the Word and trusting God to do the long, slow work of making us new \u2014 in our marriages, our work, our walk with Him.',
    },
  ];

  const meets = [
    {
      tag: 'Group 01 \u00b7 Evenings',
      title: 'Monday Evening Study',
      day: 'Mondays',
      time: '6:30 \u2013 8:00 PM',
      where: 'Student Room',
      body: 'Weekly studies exploring a rotating shelf of books for Christian men \u2014 books that promote a deeper understanding of faith and a stronger spiritual walk with the Lord. <strong>We have a great group already, and welcome new men any time.</strong>',
    },
    {
      tag: 'Group 02 \u00b7 Mornings',
      title: 'Tuesday Morning \u2014 Exploring our Sermons',
      day: 'Tuesdays',
      time: '7:00 \u2013 8:00 AM',
      where: 'Student Room',
      body: 'Relationship-building over coffee, then a deep dive into the previous Sunday\u2019s sermon \u2014 unpacking the critical topics together. <strong>Support, friendship, and biblical conversation.</strong>',
    },
  ];

  return (
    <>
      {/* ===== Section 1: Anchor — H.I.T. lockup + Romans 12:2 + Lewis ===== */}
      <section className="mn-anchor">
        <div className="container mn-anchor-inner">
          <div className="mn-anchor-copy">
            <span className="mn-anchor-eyebrow">A Ministry of Hope Church</span>

            <h1>Honor. Integrity. <em>Transformation</em>.</h1>

            <p className="mn-anchor-mission">
              Building deep relationships that truly share life &mdash; leading to real <strong>accountability with God and self</strong>. A sacred space where men feel safe to share tough issues, desires, feelings, and emotions without judgement.
            </p>

            <div className="mn-anchor-divider"></div>

            <blockquote className="mn-verse">
              <span className="mn-verse-ref">Romans 12:2</span>
              <p>
                &ldquo;Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.&rdquo;
              </p>
            </blockquote>

            <blockquote className="mn-lewis">
              <p>Friendship is born at that moment when one person says to another: &lsquo;What! You too? I thought I was the only one.&rsquo;</p>
              <cite>&mdash; C.S. Lewis</cite>
            </blockquote>
          </div>

          <div className="mn-anchor-media" aria-hidden="false">
            <div className="mn-logo">
              <img src="/assets/hit-men-logo.png" alt="H.I.T. Men &mdash; Honor, Integrity, Transformation"/>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Three pillars — Honor, Integrity, Transformation ===== */}
      <section className="mn-pillars">
        <div className="container">
          <header className="mn-pillars-head">
            <span className="mn-eyebrow">What H.I.T. stands for</span>
            <h2>Three words we&rsquo;re <em>actually trying to live</em>.</h2>
            <p>None of these come easy on your own. That&rsquo;s the whole point of doing it together.</p>
          </header>
          <div className="mn-pillars-grid">
            {pillars.map(p => (
              <article className="mn-pillar" key={p.letter}>
                <div className="mn-pillar-letter">{p.letter}<sup>.</sup></div>
                <h3>{p.word}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: Two meeting opportunities ===== */}
      <section className="mn-meets">
        <div className="container">
          <header className="mn-meets-head">
            <span className="mn-eyebrow">Small Group Opportunities</span>
            <h2>Two ways to <em>get around the table</em>.</h2>
            <p>The Men&rsquo;s Ministry runs two weekly groups so there&rsquo;s a rhythm that fits your week. Same heart, different schedule &mdash; pick one and show up once.</p>
          </header>

          <div className="mn-meets-grid">
            {meets.map((m, i) => (
              <article className="mn-meet" key={m.title}>
                <div
                  className="mn-meet-bg"
                  style={{ backgroundImage: `url(/assets/mens-groups-hero.jpg)` }}
                ></div>
                <div className="mn-meet-inner">
                  <span className="mn-meet-tag">{m.tag}</span>
                  <h3>{m.title}</h3>
                  <dl className="mn-meet-when">
                    <div><dt>Day</dt><dd>{m.day}</dd></div>
                    <div><dt>Time</dt><dd>{m.time}</dd></div>
                    <div><dt>Where</dt><dd>{m.where}</dd></div>
                  </dl>
                  <p dangerouslySetInnerHTML={{ __html: m.body }}/>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4: Calendar (Subsplash) ===== */}
      <section className="mn-calendar">
        <div className="container">
          <header className="mn-calendar-head">
            <span className="mn-eyebrow">What&rsquo;s Coming Up</span>
            <h2>The H.I.T. Men <em>calendar</em>.</h2>
            <p>Studies, breakfasts, service days, and the occasional cookout &mdash; pulled live so you never miss a thing.</p>
          </header>
          <div className="mn-calendar-frame">
            <HopeCalendarEmbed calendar="men"/>
          </div>
        </div>
      </section>

      {/* ===== Section 5: CTA band ===== */}
      <section className="mn-cta-band">
        <div className="container">
          <span className="mn-eyebrow">Get Connected</span>
          <h2>Pull up <em>a chair</em>.</h2>
          <p>The H.I.T. Men Facebook group is where the week-of details, prayer requests, and last-minute plans all live. Hop in, say hello, and we&rsquo;ll see you Monday or Tuesday.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>H.I.T. Men Facebook Group</Button>
            <Button variant="outline-on-dark" size="xl" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about H.I.T. Men</Button>
          </div>
          <div className="mn-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { MenMinistryPage };
