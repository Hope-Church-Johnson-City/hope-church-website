import React from 'react';
import { Button } from './shared.jsx';
import { PageHeader } from './pages.jsx';
import { HopeCalendarEmbed } from './embeds.jsx';
import { useServiceTimes, useFourthServiceLive } from '../serviceTimes.jsx';
// Hope Church — College & Career ministry detail page (slug: ministry-college)
// Ages 18–30. Young adults navigating college, work, and the in-between years.
// Anchored in Jeremiah 29:11 — "plans to give you hope and a future."

function CollegeMinistryPage({ onNav }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  const FACEBOOK_URL = 'https://www.facebook.com/groups/966091859004086/';
  const CONTACT_EMAIL = 'mailto:info@hopejc.org?subject=College%20%26%20Career%20Group';

  const pillars = [
    {
      n: 'Career',
      t: 'Work that matters.',
      body: 'Choosing a major, starting a first job, switching paths \u2014 we walk through the decisions of vocation with Christ at the center, not the side.',
    },
    {
      n: 'Decisions',
      t: 'The big calls.',
      body: 'Where to live, who to marry, what to say yes (and no) to. The years between 18 and 30 hold more pivotal decisions than any other season \u2014 you weren\u2019t meant to make them alone.',
    },
    {
      n: 'Relationships',
      t: 'People who stay.',
      body: 'Dating, friendship, family, and finding your people in a new city. We build the kind of community that actually shows up \u2014 for the wins and the wilderness.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Ages 18 – 30"
        title="College & Career"
        lead="A community of young adults navigating college, the workforce, and everything in between — with Christ-centered guidance, friendships, and a heart for the years ahead."
      />

      {/* ===== Section 1: Anchor verse + intro ===== */}
      <section className="cc-anchor">
        <div className="container cc-anchor-inner">
          <div className="cc-anchor-copy">
            <span className="cc-verse-ref">Jeremiah 29:11</span>
            <p className="cc-anchor-verse">
              <span className="quoted">&ldquo;Plans to prosper you and not to harm you,</span> <em>plans to give you hope and a future.&rdquo;</em>
            </p>
            <p className="cc-anchor-attr">Declares the Lord</p>
            <p className="cc-anchor-lead">Our College &amp; Career ministry was developed to bring together young adults and provide an environment for spiritual support &mdash; whether you&rsquo;re in college, already in the workforce, or establishing a career after school.</p>
            <p className="cc-anchor-body">Hope Church has a heart for this ministry, and is dedicated to shepherding and discipling young people through the complexities of career choices, important life decisions, and changing relationships. Opportunities for devotion and fellowship are available weekly.</p>
          </div>
          <div className="cc-anchor-media">
            <div className="cc-anchor-photo">
              <img src="/assets/college-auditorium-group.jpg" alt="The Hope College and Career group gathered together on the steps in front of the Hope Church auditorium"/>
            </div>
            <div className="cc-anchor-chip">
              <span className="label">Our People</span>
              <div className="val">Students, grads, and young professionals.</div>
              <div className="sub">Tri-Cities, TN · Ages 18–30</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Three pillars — career, decisions, relationships ===== */}
      <section className="cc-pillars">
        <div className="container">
          <header className="cc-pillars-head">
            <span className="eyebrow">What We Walk Through</span>
            <h2>The decisions of this decade <em>matter</em>.</h2>
            <p>Most of the choices that shape the next forty years get made in the next ten. We&rsquo;re here for all of them &mdash; together, on our knees, and with the Word open.</p>
          </header>
          <div className="cc-pillars-grid">
            {pillars.map((p, i) => (
              <article className="cc-pillar" key={p.n}>
                <div className="cc-pillar-num">{String(i + 1).padStart(2, '0')} · {p.n}</div>
                <h3>{p.t}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: Weekly rhythm — Group + Sunday mornings ===== */}
      <section className="cc-rhythm">
        <div className="container">
          <header className="cc-rhythm-head">
            <span className="eyebrow">Where We Gather</span>
            <h2>Two rhythms that <em>anchor the week</em>.</h2>
          </header>
          <div className="cc-rhythm-grid">
            <article className="cc-rhythm-card primary">
              <span className="cc-rhythm-day">The Main Thing</span>
              <h3>College &amp; Career <em>Group.</em></h3>
              <div className="cc-rhythm-times">
                <span>Weekly</span>
                <span className="cc-dot">·</span>
                <span>In Homes</span>
                <span className="cc-dot">·</span>
                <span>Tri-Cities</span>
              </div>
              <p className="lead">A weekly gathering in someone&rsquo;s living room &mdash; dinner on the counter, the Word in our laps, and the kind of conversation you can&rsquo;t have on a Sunday morning.</p>
              <p>We dig into Scripture, pray for each other by name, and walk through whatever this season is throwing at you &mdash; a job change, a hard relationship, a question about calling. <strong>Strengthen your faith and friendships</strong> here.</p>
            </article>

            <article className="cc-rhythm-card">
              <span className="cc-rhythm-day">Sunday Mornings</span>
              <h3>Worship together.</h3>
              <div className="cc-rhythm-times">
                <span>{st.first}</span>
                <span className="cc-dot">·</span>
                <span>{st.second}</span>
                <span className="cc-dot">·</span>
                <span>{st.third}</span>
                {fourthLive && <><span className="cc-dot">·</span><span>{st.fourth}</span></>}
              </div>
              <p>Find your row in the auditorium and worship with the whole church. Many of our group sit together at the {st.second.replace('am','')} &mdash; grab a coffee in the lobby first and come find us.</p>
              <p>After service, stick around. The lobby is where most of our friendships actually start.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Passion 2025 — full-bleed dark feature ===== */}
      <section className="cc-passion">
        <div className="container cc-passion-inner">
          <header className="cc-passion-head">
            <span className="cc-passion-eyebrow">January 2025 · Atlanta</span>
            <h2>We went to <em>Passion 2025</em> together.</h2>
            <p>Tens of thousands of 18&ndash;25 year olds. Three nights of worship in State Farm Arena. A group of young adults from Hope, shoulder to shoulder, lifting their hands to Jesus. Trips like this are a glimpse of what we&rsquo;re building all year.</p>
          </header>

          <div className="cc-passion-mosaic">
            <figure className="cc-passion-tile hero">
              <img src="/assets/college-passion-stage.jpg" alt="The Passion 2025 stage at State Farm Arena lit up in red with thousands of college-age students in the crowd"/>
              <figcaption className="caption">State Farm Arena</figcaption>
            </figure>
            <figure className="cc-passion-tile side1">
              <img src="/assets/college-passion-girls.jpg" alt="Four young women from Hope Church smiling for a photo in front of the Passion stage"/>
              <figcaption className="caption">Our Group</figcaption>
            </figure>
            <figure className="cc-passion-tile side2">
              <img src="/assets/college-passion-crowd.jpg" alt="The Passion 2025 crowd with hands raised in worship under bright pink stage lights"/>
              <figcaption className="caption">Worship Night</figcaption>
            </figure>
          </div>

          <div className="cc-passion-stats">
            <div className="cc-passion-stat">
              <div className="cc-passion-stat-num">55K<em>+</em></div>
              <div className="cc-passion-stat-label">Students Gathered</div>
            </div>
            <div className="cc-passion-stat">
              <div className="cc-passion-stat-num">3</div>
              <div className="cc-passion-stat-label">Nights of Worship</div>
            </div>
            <div className="cc-passion-stat">
              <div className="cc-passion-stat-num">1</div>
              <div className="cc-passion-stat-label">Hope Family</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: Life in this season ===== */}
      <section className="cc-life">
        <div className="container cc-life-inner">
          <div className="cc-life-photo">
            <img src="/assets/college-housegroup.jpg" alt="The College and Career group gathered around a kitchen island filled with food at a host home"/>
          </div>
          <div className="cc-life-copy">
            <span className="eyebrow">Life In This Season</span>
            <h2>Around the table, <em>almost weekly.</em></h2>
            <p>Most of what we do isn&rsquo;t flashy. It&rsquo;s a potluck spread on a host&rsquo;s kitchen counter, Bibles cracked open on the coffee table, prayer requests on a sticky note, and someone always staying late to help with dishes.</p>
            <p>If you&rsquo;re new to the area, just out of school, or just figuring out what&rsquo;s next &mdash; <strong>there&rsquo;s a seat at the table for you.</strong> Show up once and you&rsquo;ll know within an hour whether this is your group. We think it will be.</p>
          </div>
        </div>
      </section>

      {/* ===== Section 6: Calendar (Subsplash) ===== */}
      <section className="cc-calendar">
        <div className="container">
          <header className="cc-calendar-head">
            <span className="eyebrow">What’s Coming Up</span>
            <h2>The College &amp; Career calendar.</h2>
            <p>Group nights, hangouts, service days, and the next big trip &mdash; everything happening in this ministry, pulled live so you never miss a thing.</p>
          </header>
          <div className="cc-calendar-frame">
            <HopeCalendarEmbed calendar="college"/>
          </div>
        </div>
      </section>

      {/* ===== Section 7: CTA band ===== */}
      <section className="cc-cta-band">
        <div className="container">
          <span className="eyebrow">Get Connected</span>
          <h2>Come once. <em>You&rsquo;ll know.</em></h2>
          <p>Join the private Facebook group for week-of details on Group nights, hangouts, and trips. Or reach out and we&rsquo;ll point you to the next gathering.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" icon="facebook" onClick={() => window.open(FACEBOOK_URL, '_blank', 'noopener')}>College &amp; Career Facebook</Button>
            <Button variant="outline-on-dark" size="xl" iconRight="arrow" onClick={() => window.location.href = CONTACT_EMAIL}>Ask about Groups</Button>
          </div>
          <div className="cc-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { CollegeMinistryPage };
