import React from 'react';
import { Button } from './shared.jsx';
import { HopeCalendarEmbed } from './embeds.jsx';
// Hope Church — Woven (Women's Ministry) detail page (slug: ministry-women)
// "But speaking the truth in love, we must grow up in every way into him who is
//  the head, into Christ, from whom the whole body, joined and knit together..."
//  — Ephesians 4:15-16
//
// Brand: aligned with Hope Church style guide — blues on white, navy anchors,
// sky-blue washes. The Woven mark is recolored into the Hope palette so the
// ministry sits inside the church identity, not beside it.

function WomenMinistryPage({ onNav }) {
  const FACEBOOK_URL = 'https://www.facebook.com/groups/1441473576255607';
  const CONTACT_EMAIL = 'mailto:woven@hopejc.org?subject=Woven%20Women%27s%20Ministry';

  const rhythms = [
    {
      n: 'Study',
      t: 'The Word, opened together.',
      body: 'Bible studies built around digging into Scripture honestly \u2014 with the kind of conversation that makes you feel both known and stretched. Bring your Bible, your questions, and your coffee.',
    },
    {
      n: 'Gather',
      t: 'Retreats, brunches, nights in.',
      body: 'A few times a year we set everything else down and just show up for each other \u2014 a cabin weekend, a Christmas gathering, a long table on someone\u2019s porch. The moments that knit a community together.',
    },
    {
      n: 'Pray',
      t: 'Carrying each other home.',
      body: 'No prayer request is too small and no season too heavy. We pray for each other by name \u2014 in our groups, in the Facebook thread, and quietly through the week.',
    },
  ];

  return (
    <>
      {/* ===== Section 1: Anchor — Woven mark + mission + Ephesians verse ===== */}
      <section className="wv-anchor">
        <div className="container wv-anchor-inner">
          <div className="wv-anchor-copy">
            <div className="wv-anchor-mark">
              <img src="/assets/woven-logo-blue.png" alt="Woven — Women of Hope"/>
            </div>
            <span className="wv-anchor-eyebrow">A Ministry of Hope Church</span>
            <h1>Joined and <em>knit together</em>.</h1>

            <p className="wv-anchor-mission">
              To build a strong community for women at Hope Church and to <strong>deepen our understanding and knowledge of the Word</strong> through study and prayer.
            </p>

            <div className="wv-anchor-divider"></div>

            <blockquote className="wv-verse">
              <span className="wv-verse-ref">Ephesians 4:15 – 16</span>
              <p>
                &ldquo;But speaking the truth in love, we must grow up in every way into him who is the head, into Christ, from whom the whole body, joined and knit together by every ligament with which it is equipped, as each part is working properly, promotes the body&rsquo;s growth in building itself up in love.&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="wv-anchor-media wv-anchor-media--single">
            <div className="wv-photo-back">
              <img src="/assets/woven-retreat-porch.jpg" alt="The Woven women's retreat group gathered together on a cabin porch at night"/>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Three rhythms — Study, Gather, Pray ===== */}
      <section className="wv-rhythms">
        <div className="container">
          <header className="wv-rhythms-head">
            <span className="wv-eyebrow">How We Grow Together</span>
            <h2>Three rhythms that <em>shape Woven</em>.</h2>
            <p>None of them require a special invitation &mdash; just a willingness to show up once and see.</p>
          </header>
          <div className="wv-rhythms-grid">
            {rhythms.map((r, i) => (
              <article className="wv-rhythm" key={r.n}>
                <div className="wv-rhythm-num">{String(i + 1).padStart(2, '0')} &middot; {r.n}</div>
                <h3>{r.t}</h3>
                <p>{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: "For the season you're in" — dark feature band ===== */}
      <section className="wv-knit">
        <div className="wv-knit-grid">
          <div className="wv-knit-photo">
            <img src="/assets/woven-retreat-porch.jpg" alt="The Woven women's retreat group gathered together on a cabin porch at night"/>
          </div>
          <div className="wv-knit-copy">
            <span className="wv-eyebrow">Every Season</span>
            <h2>For the season you&rsquo;re <em>actually in</em>.</h2>
            <p>
              Newly married. Empty-nester. Walking through grief. In the thick of toddlers. Single and figuring out what&rsquo;s next. <strong>There is no &ldquo;right time&rdquo; in your life</strong> to be part of Woven &mdash; the table is set, the seat is yours, and the women here will meet you exactly where you are.
            </p>
            <p>
              We&rsquo;re not a polished group of women who have it all together. We&rsquo;re a community of imperfect women, knit together by the same Savior, growing up in love together.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Calendar (Subsplash) ===== */}
      <section className="wv-calendar">
        <div className="container">
          <header className="wv-calendar-head">
            <span className="wv-eyebrow">What&rsquo;s Coming Up</span>
            <h2>The Woven <em>calendar</em>.</h2>
            <p>Bible studies, brunches, retreats, and prayer gatherings &mdash; everything happening in Woven, pulled live so you never miss a thing.</p>
          </header>
          <div className="wv-calendar-frame">
            <HopeCalendarEmbed calendar="women"/>
          </div>
        </div>
      </section>

      {/* ===== Section 5: CTA band ===== */}
      <section className="wv-cta-band">
        <div className="container">
          <span className="wv-eyebrow">Get Connected</span>
          <h2>Come find <em>your people</em>.</h2>
          <p>The Woven Facebook group is where week-of details, prayer requests, and last-minute brunches all live. Hop in, introduce yourself, and we&rsquo;ll see you soon.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>Woven Facebook Group</Button>
            <Button variant="outline-on-dark" size="xl" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Woven</Button>
          </div>
          <div className="wv-contact">
            <span className="wv-contact-label">Questions? Contact Jennifer Holifield</span>
            <div className="wv-contact-links">
              <a href="tel:+14239433542">(423) 943-3542</a>
              <span aria-hidden="true">&middot;</span>
              <a href="mailto:woven@hopejc.org">woven@hopejc.org</a>
            </div>
          </div>
          <div className="wv-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { WomenMinistryPage };
