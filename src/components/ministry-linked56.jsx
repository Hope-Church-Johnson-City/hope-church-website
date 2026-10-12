import React from 'react';
import { Button } from './shared.jsx';
import { HopeCalendarEmbed } from './embeds.jsx';
// Hope Church — Linked 56 ministry detail page (slug: ministry-linked56)
// 5th–6th grade tweens. Hope Tweens sub-brand. Identity in Christ.
// Copy sourced from Linked 56 print/social materials.

function Linked56MinistryPage({ onNav }) {
  const SERVE_URL = 'https://hopejc.churchcenter.com/people/forms/589479';
  const FB_URL = 'https://www.facebook.com/groups/6330937060346904/';

  return (
    <>
      {/* ===== Dark artistic hero ===== */}
      <section className="l56-hero">
        <div className="l56-hero-art" aria-hidden="true">
          <span className="l56-shard l56-shard-1"></span>
          <span className="l56-shard l56-shard-2"></span>
          <span className="l56-shard l56-shard-3"></span>
          <span className="l56-shard l56-shard-4"></span>
          <span className="l56-shard l56-shard-5"></span>
          <span className="l56-shard l56-shard-6"></span>
        </div>
        <div className="container l56-hero-inner">
          <h1 className="l56-hero-title">Linked 56</h1>
          <p className="l56-hero-eyebrow">A Special Ministry for Fifth and Sixth Graders</p>
          <p className="l56-hero-lead">Linked 56 is a distinct group specifically crafted for 5th and 6th graders, focusing on their unique needs. At Hope Church, our mission is to guide these young individuals in discovering and embracing their identity in Christ, helping them to deepen their relationship with Jesus during this crucial phase of their lives.</p>
          <div className="l56-hero-actions">
            <button className="l56-hero-btn" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve</button>
            <button className="l56-hero-btn" onClick={() => window.open(FB_URL, '_blank', 'noopener')}>Linked Facebook Group</button>
          </div>
        </div>
      </section>

      {/* ===== Hope Tweens brand card + Investing in Our Tweens' Futures ===== */}
      <section className="l56-brand">
        <div className="container l56-brand-inner">
          <div className="l56-brand-card">
            <img src="/assets/linked56-logo.png" alt="Linked 56 &mdash; fingerprint mark"/>
            <div className="l56-brand-card-mark">
              <span className="l56-brand-card-hope">HOPE</span>
              <span className="l56-brand-card-tweens">TWEENS</span>
            </div>
          </div>
          <div className="l56-brand-copy">
            <h2 className="l56-brand-title">Investing in Our Tweens&rsquo; Futures</h2>
            <p className="l56-brand-body">By investing in the lives of our tweens, we will empower and spiritually prepare them for a smooth transition into our Student Ministry and beyond. Regarding our Next Generation, we aim to walk alongside each parent or guardian, assisting them in nurturing and guiding their families.</p>
          </div>
        </div>
      </section>

      {/* ===== Wednesday Nights ===== */}
      <section className="l56-block">
        <div className="container l56-block-inner">
          <h2 className="l56-block-title">Wednesday Nights</h2>
          <p className="l56-block-body">Linked56 is for 5th and 6th graders and meets on Sundays during the 9:00am, 11:00am and 12:45pm services, and on Wednesdays at 6:30pm. On Wednesdays, students connect with friends through fun games, enjoy pizza, and grow in their faith through engaging Bible study. This semester, we&rsquo;re learning practical skills for studying the Bible on our own&mdash;discovering how to understand God&rsquo;s Word, apply it to everyday life, and build a lasting relationship with Jesus. Linked56 is a place where preteens can belong, have fun, ask questions, and grow together in their walk with Christ.</p>
          <dl className="l56-meta">
            <div className="l56-meta-row">
              <dt>When</dt>
              <dd>Sundays &amp; Wednesdays, 6:30pm</dd>
            </div>
            <div className="l56-meta-row">
              <dt>Who</dt>
              <dd>5th &amp; 6th Graders</dd>
            </div>
            <div className="l56-meta-row">
              <dt>What to Expect</dt>
              <dd>Pizza, games, friendships, and biblical teaching that helps students connect with God and His Word.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== Photo strip ===== */}
      <section className="l56-photo-section">
        <div className="container">
          <div className="l56-photo-frame">
            <img src="/assets/linked56-classroom.png" alt="Linked 56 students gathered for a lesson"/>
          </div>
        </div>
      </section>

      {/* ===== Calendar ===== */}
      <section className="l56-block l56-calendar-section">
        <div className="container l56-block-inner">
          <h2 className="l56-block-title">What&rsquo;s Coming Up</h2>
          <p className="l56-block-times">The Linked 56 calendar</p>
          <p className="l56-block-body">Events, retreats, service days, and milestones &mdash; everything happening in Linked 56, pulled live so you never miss a thing.</p>
          <div className="l56-calendar-frame">
            <HopeCalendarEmbed calendar="linked-56"/>
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="l56-cta">
        <div className="container l56-cta-inner">
          <h2 className="l56-cta-title">Walk with our tweens.</h2>
          <p className="l56-cta-body">Linked 56 needs Bible teachers, game leaders, and general helpers each week. Sign up to serve, or join the parent group to stay in the loop.</p>
          <div className="l56-cta-actions">
            <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve in Linked 56</Button>
            <Button variant="outline-on-dark" size="xl" icon="facebook" onClick={() => window.open(FB_URL, '_blank', 'noopener')}>Linked Facebook Group</Button>
          </div>
          <div className="l56-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { Linked56MinistryPage };
