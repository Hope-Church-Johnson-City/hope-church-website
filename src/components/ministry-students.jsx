import React from 'react';
import { Button } from './shared.jsx';
import { PageHeader } from './pages.jsx';
import { HopeCmsEmbed, HopeCalendarEmbed } from './embeds.jsx';
import { useServiceTimes, useFourthServiceLive } from '../serviceTimes.jsx';
// Hope Church — Hope Students ministry detail page (slug: ministry-students)
// 7th–12th grade. Wednesday-night driven + Sunday morning rhythm.

function StudentsMinistryPage({ onNav }) {
  const st = useServiceTimes();
  const fourthLive = useFourthServiceLive();
  const LEARN_MORE_URL = 'https://mytt.ag/pbk16kkr?utm_source=ig&utm_medium=social&utm_content=link_in_bio';
  const SERVE_URL = 'https://hopejc.churchcenter.com/people/forms/346151';

  // What a Wednesday night holds. These used to be numbered "01 · The Beat"
  // ... "04 · The Beat", which read as a countdown to something and named a
  // thing the ministry does not have.
  const beats = [
    { t: 'Worship',      p: 'Loud, honest, and led by students. We come in singing — together.' },
    { t: 'Message',      p: 'A real word for where students actually are — the questions, the pressure, the in-between.' },
    { t: 'Small Groups', p: 'The room shrinks. Real friends, real leaders, real conversation.' },
    { t: 'Fun',          p: 'Games, food, hangouts — the reason most students keep coming back.' },
  ];

  return (
    <>
      <PageHeader
        eyebrow="7th – 12th Grade"
        title="Hope Students"
        lead="Wednesday nights and Sunday mornings — friendships and honest conversations about faith for middle school and high school students."
      />

      {/* ===== Section 1: Intro / who this is for ===== */}
      <section className="hs-intro">
        <div className="container hs-intro-inner">
          <div className="hs-intro-copy">
            <span className="hs-intro-eyebrow">Made For Students</span>
            <h2>The next six years <em>matter</em>.</h2>
            <p className="lead">Middle school and high school is where most students decide what they really believe. We don&rsquo;t want them to figure that out alone.</p>
            <p>Hope Students is a place where 7th–12th graders are known by name, walked alongside by leaders who actually show up, and given room to ask the real questions. We&rsquo;re committed to pursuing the growth of <strong>every student</strong> who walks through our doors.</p>
            <div className="hs-intro-stats">
              <div>
                <div className="hs-stat-num">7<em>–</em>12</div>
                <div className="hs-stat-label">Grade</div>
              </div>
              <div>
                <div className="hs-stat-num">6:30<em>–</em>8:30<span style={{fontSize:'0.7em'}}>pm</span></div>
                <div className="hs-stat-label">Wed Night</div>
              </div>
              <div>
                <div className="hs-stat-num">{fourthLive ? 4 : 3}<em>×</em></div>
                <div className="hs-stat-label">Sundays</div>
              </div>
            </div>
          </div>
          <div className="hs-intro-media">
            <div className="hs-intro-photo">
              <img src="/assets/students-worship-lead.jpg" alt="A Hope Students worship leader on stage with arm raised"/>
            </div>
            <div className="hs-intro-tag">Hope Students</div>
            <div className="hs-intro-logo-chip">
              <img src="/assets/hopestudents-logo-black.png" alt="Hope Students mark"/>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: Wednesday Night — the main event ===== */}
      <section className="hs-wednesday">
        <div className="container hs-wed-inner">
          <div className="hs-wed-copy">
            <span className="eyebrow">The Main Event</span>
            <h3 className="hs-wed-day">Wednesday <em>Night.</em></h3>
            <div className="hs-wed-times">
              <span className="hs-wed-times-label">Every Wed</span>
              <span className="hs-wed-times-val">6:30 – 8:30pm</span>
            </div>
            <p className="lead">The whole student ministry meets at Hope Church — 7th through 12th, together in one room.</p>
            <p>Every gathering includes worship, teaching, small groups, and fellowship. It&rsquo;s the night of the week most of our students bring a friend.</p>
          </div>
          <div className="hs-beats">
            {beats.map((b) => (
              <article className="hs-beat" key={b.t}>
                <h4>{b.t}</h4>
                <p>{b.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: Sunday mornings (secondary rhythm) ===== */}
      <section className="hs-sunday">
        <div className="container hs-sunday-inner">
          <div className="hs-sunday-copy">
            <span className="eyebrow">Sunday Mornings</span>
            <h2>Worship with us, <em>every weekend</em>.</h2>
            <p>Hope Students worships with the whole church in the auditorium on Sunday mornings. Sit with your family, find your friends, or grab a leader — there&rsquo;s a row saved for you.</p>
            <div className="hs-sunday-times">
              <span className="hs-sunday-time">{st.first}</span>
              <span className="hs-sunday-time">{st.second}</span>
              <span className="hs-sunday-time">{st.third}</span>
              {fourthLive && <span className="hs-sunday-time">{st.fourth}</span>}
            </div>
          </div>
          <div className="hs-sunday-photo">
            <img src="/assets/students-worship.jpg" alt="Hope Students worshipping with arms raised"/>
          </div>
        </div>
      </section>

      {/* ===== Messages ===== */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <header className="hs-gallery-head">
            <span className="eyebrow">Messages</span>
            <h2>Catch the <em>latest message</em>.</h2>
            <p>Missed a Wednesday night? Watch the most recent Hope Students message, or dig into the full archive any time.</p>
          </header>
          <div style={{maxWidth: 900, margin: '0 auto'}}>
            <HopeCmsEmbed slug="students-messages" title="Hope Students messages"/>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Mosaic — community in pictures ===== */}
      <section className="hs-gallery">
        <div className="container">
          <header className="hs-gallery-head">
            <span className="eyebrow">A Glimpse Inside</span>
            <h2>This is what <em>showing up</em> looks like.</h2>
            <p>Worship nights, prayer circles, small groups, dress-up themes — every part of Hope Students is built around real students walking with Jesus and with each other.</p>
          </header>
          <div className="hs-mosaic">
            <figure className="hs-mosaic-item tall">
              <img src="/assets/students-prayer-guys.jpg" alt="A group of students praying together in a circle"/>
              <figcaption className="caption">Prayer</figcaption>
            </figure>
            <figure className="hs-mosaic-item small1">
              <img src="/assets/students-smallgroup-girls.jpg" alt="A girls' small group in conversation with a leader"/>
              <figcaption className="caption">Small Groups</figcaption>
            </figure>
            <figure className="hs-mosaic-item small2">
              <img src="/assets/students-worship-lead.jpg" alt="A student leading worship from the stage"/>
              <figcaption className="caption">Worship</figcaption>
            </figure>
            <figure className="hs-mosaic-item wide">
              <img src="/assets/students-group-fun.jpg" alt="Hope Students dressed up for a themed night, posing for a group photo"/>
              <figcaption className="caption">Theme Nights</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ===== Section 5: Calendar ===== */}
      <section className="hs-calendar">
        <div className="container">
          <header className="hs-calendar-head">
            <span className="eyebrow">What&rsquo;s Coming Up</span>
            <h2>The Hope Students calendar.</h2>
            <p>Wednesday nights, retreats, service days, and the rest — everything happening in Hope Students, pulled live so you never miss a thing.</p>
          </header>
          <div className="hs-calendar-frame">
            <HopeCalendarEmbed calendar="students"/>
          </div>
        </div>
      </section>

      {/* ===== Section 6: CTA band ===== */}
      <section className="hs-cta-band">
        <img className="hs-cta-band-mark" src="/assets/hopestudents-logo-white.png" alt="" aria-hidden="true"/>
        <div className="container" style={{position:'relative', zIndex:1}}>
          <span className="eyebrow">Get Involved</span>
          <h2>Bring a friend. <em>Or come walk with them.</em></h2>
          <p>Students &mdash; everything you need lives on our Linktree (info, sign-ups, hangouts, group chats). Adults &mdash; we&rsquo;re always looking for leaders who&rsquo;ll show up and know our students by name.</p>
          <div className="cta-band-actions">
            <Button variant="primary" size="xl" iconRight="arrow" onClick={() => window.open(LEARN_MORE_URL, '_blank', 'noopener')}>Hope Students Linktree</Button>
            <Button variant="outline-on-dark" size="xl" icon="hands" onClick={() => window.open(SERVE_URL, '_blank', 'noopener')}>Serve with Students</Button>
          </div>
          <div className="hs-cta-back">
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('ministries');}}>&larr; Back to all ministries</a>
          </div>
        </div>
      </section>
    </>
  );
}

export { StudentsMinistryPage };
