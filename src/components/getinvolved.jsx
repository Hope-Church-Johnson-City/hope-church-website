import React from 'react';
import { Icon, Button, SectionHeader } from './shared.jsx';
import { PageHeader } from './pages.jsx';
import { useNextDiscoverHope } from '../discoverHope.js';
// Hope Church — "Get Involved" subpages: Groups, Missions, Connect Card, Discover Hope

const { useState: useStateGI } = React;

// ---------- Groups ----------
function LifeGroupsPage({ onNav }) {
  const groups = [
    { day: 'Mondays', time: '6:30pm', name: 'Young Adults', host: 'The Owens · East Side', desc: 'Twenties and thirties figuring out faith, work, and what comes next — together.', spots: 'A few seats left' },
    { day: 'Tuesdays', time: '6:00am', name: 'Men\u2019s Breakfast', host: 'Central Diner · Gray', desc: 'Bible, coffee, and eggs before the workday starts. Bring a friend.', spots: 'Open' },
    { day: 'Tuesdays', time: '7:00pm', name: 'Women in the Word', host: 'The Hollands\u2019 home', desc: 'A study through the gospel of John. Childcare provided on a rotating basis.', spots: 'Open' },
    { day: 'Wednesdays', time: '6:30pm', name: 'Families with Littles', host: 'The Reyes\u2019 home', desc: 'For parents in the trenches with kids ages 0–6. Kids welcome.', spots: 'Open' },
    { day: 'Thursdays', time: '7:00pm', name: 'Couples Group', host: 'The Whitfields\u2019 home', desc: 'Married couples in any season — newlyweds, empty nesters, in-betweens.', spots: 'Full · waitlist' },
    { day: 'Sundays', time: '5:00pm', name: 'Empty Nesters', host: 'The Parks\u2019 home', desc: 'Slow Sunday dinners, honest conversation, prayer for grown kids and aging parents.', spots: 'Open' },
  ];
  return (
    <>
      <PageHeader eyebrow="Get Involved" title="Find your people." lead="Sunday is where we gather. Groups are where friendships grow — in homes, around tables, throughout the week." />

      {/* Why groups */}
      <section className="visit-section" style={{paddingBottom: 60}}>
        <div className="container">
          <div className="lifegroups-why">
            <div className="lifegroups-why-copy">
              <span className="eyebrow">Why a group?</span>
              <h2>Faith was never meant to be lived alone.</h2>
              <p>The early church didn&rsquo;t just gather on Sundays — they shared meals, prayed for each other, and walked through real life side by side. Groups are how we keep that pattern at Hope.</p>
              <p>Most groups meet weekly in someone&rsquo;s home for about 90 minutes — a meal or snack, time in Scripture, and time to pray for each other.</p>
            </div>
            <div className="lifegroups-why-cards">
              <div className="lifegroups-why-card">
                <div className="lifegroups-why-num">01</div>
                <h4>Meet weekly</h4>
                <p>Same place, same time, every week. Consistency is where trust grows.</p>
              </div>
              <div className="lifegroups-why-card">
                <div className="lifegroups-why-num">02</div>
                <h4>Open the Bible</h4>
                <p>Groups follow along with the Sunday teaching or work through a book together.</p>
              </div>
              <div className="lifegroups-why-card">
                <div className="lifegroups-why-num">03</div>
                <h4>Pray for each other</h4>
                <p>Real prayer for real stuff — kids, jobs, marriages, health, faith.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group directory */}
      <section className="ministries-section" style={{paddingTop: 60}}>
        <div className="container">
          <SectionHeader eyebrow="Open Groups" title="Currently meeting." lead="Browse our active groups and reach out to a host. Don’t see one that fits? Let us know and we’ll help you start one." align="center"/>
          <div className="lifegroups-grid">
            {groups.map(g => (
              <article className="lifegroup-card" key={g.name}>
                <div className="lifegroup-when">
                  <span className="lifegroup-day">{g.day}</span>
                  <span className="lifegroup-time">{g.time}</span>
                </div>
                <h3>{g.name}</h3>
                <div className="lifegroup-host">{g.host}</div>
                <p>{g.desc}</p>
                <div className="lifegroup-foot">
                  <span className={`lifegroup-spots ${g.spots.includes('Full') ? 'is-full' : ''}`}>{g.spots}</span>
                  <a className="ministry-card-link" href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('connect');}}>Join group <Icon name="arrow" size={14}/></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Start one */}
      <section className="lifegroups-start">
        <div className="container lifegroups-start-inner">
          <div>
            <span className="eyebrow on-dark">Lead a group</span>
            <h2>Could you host?</h2>
            <p>You don&rsquo;t need a seminary degree or a perfect living room. If you can open your home and care for a few people, we&rsquo;ll train you, support you, and walk with you.</p>
          </div>
          <div className="lifegroups-start-cta">
            <Button variant="primary" size="lg" iconRight="arrow" onClick={()=>onNav && onNav('connect')}>Talk to our Groups Director</Button>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Missions ----------
function MissionsPage({ onNav }) {
  const international = [
    {
      name: 'Nicaragua School Diriamba',
      loc: 'Diriamba, Nicaragua',
      desc: 'DHS in Nicaragua sponsors over 300 children yearly. Mama Nubia started this school many years ago in a very humble setting, and God has provided growth, development, and recognition for this project.',
      link: null,
      href: null,
      img: '/assets/missions/nicaragua-school.jpg',
      imgFit: 'cover',
    },
    {
      name: 'Ethnos Movement International',
      loc: 'George, South Africa',
      desc: 'Ethnos\u2019 mission is to train and send small, specialized mission teams to the least reached people groups, areas, and vulnerable communities. These teams function as catalysts to develop and activate grassroots and organic discipleship movements.',
      link: 'ethnosmi.org',
      href: 'https://ethnosmi.org',
      img: '/assets/missions/emi.png',
      imgFit: 'contain',
    },
    {
      name: 'Steve & Kimberly Bradley',
      loc: 'South Africa',
      desc: 'Steve and Kimberly have been serving in the mission community for over 25 years. They are currently serving in South Africa.',
      link: 'ethnosmi.org',
      href: 'https://ethnosmi.org',
      img: '/assets/missions/bradley-family.jpg',
      imgFit: 'cover',
    },
  ];

  const national = [
    {
      name: 'Favor City Church',
      loc: 'Henderson, NV',
      desc: 'Favor City started as a church plant through the SEND network and is located near Las Vegas. Hope Church partners with the SEND network to help plant churches nationally.',
      link: 'favorcitylv.com',
      href: 'https://favorcitylv.com',
      img: '/assets/missions/favor-city.jpg',
      imgFit: 'cover',
    },
    {
      name: 'Shadow Hills North',
      loc: 'North Las Vegas, NV',
      desc: 'Shadow Hills North is another church plant through the SEND network and is located near Las Vegas. Hope Church partners with the SEND network to help plant churches nationally.',
      link: 'liberatechurch.com',
      href: 'https://liberatechurch.com',
      img: '/assets/missions/the-hills.jpg',
      imgFit: 'contain',
    },
  ];

  const local = [
    {
      name: 'Recovery Soldiers Ministry',
      loc: 'Elizabethton, TN',
      desc: 'RSM provides men and women with a faith-based recovery program that promotes spiritual development through practical biblical teaching, and comprehensive life skills that release them from the bondage of addiction.',
      link: 'recoverysoldiersministries.org',
      href: 'https://recoverysoldiersministries.org',
      img: '/assets/missions/rsm.png',
      imgFit: 'cover',
    },
    {
      name: 'Coalition for Kids',
      loc: 'Johnson City, TN',
      desc: 'For over 20+ years, C4K has provided children a nurturing, faith-based environment. From humble beginnings in Johnson City, they\u2019ve expanded to multiple locations, serving hundreds of children daily.',
      link: 'coalitionforkids.org',
      href: 'https://coalitionforkids.org',
      img: '/assets/missions/c4k.png',
      imgFit: 'cover',
    },
    {
      name: 'VOHM',
      loc: 'Piney Flats, TN',
      desc: 'Vessel of Honor Ministry\u2019s (VOHM) heart is reaching the unreached with the Gospel and committing ourselves to the care and nourishment of orphaned children.',
      link: 'www.vohmintl.org',
      href: 'https://www.vohmintl.org',
      img: '/assets/missions/vohm.jpg',
      imgFit: 'cover',
    },
    {
      name: 'The Well',
      loc: 'Johnson City, TN',
      desc: 'The Well is a non-denominational campus ministry seeking to make Jesus Christ known among the college students of Northeast Tennessee.',
      link: 'thewelljc.com',
      href: 'https://thewelljc.com',
      img: '/assets/missions/the-well.jpg',
      imgFit: 'cover',
    },
    {
      name: 'Agape Women\u2019s Services',
      loc: 'Johnson City, TN',
      desc: 'Located in the heart of Johnson City, Agape Women\u2019s Services is staffed by state-licensed medical professionals that provide accurate information, free services, and practical support with a holistic and compassionate approach.',
      link: 'agapewomensservices.com',
      href: 'https://agapewomensservices.com/',
      img: '/assets/missions/agape.jpg',
      imgFit: 'contain',
    },
  ];

  const PartnerCard = ({ p }) => (
    <article className="missions-partner-v2">
      <div className={`missions-partner-img missions-partner-img-${p.imgFit || 'cover'}`}>
        {p.img
          ? <img src={p.img} alt={p.name} loading="lazy"/>
          : <div className="missions-partner-img-placeholder">
              <Icon name="camera" size={36}/>
              <span>Image coming soon</span>
            </div>}
      </div>
      <div className="missions-partner-body">
        {p.href
          ? <a className="missions-partner-name" href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a>
          : <span className="missions-partner-name">{p.name}</span>}
        <div className="missions-partner-loc">{p.loc}</div>
        <p>{p.desc}</p>
        {p.href && (
          <a className="missions-partner-link" href={p.href} target="_blank" rel="noopener noreferrer">
            {p.link} <Icon name="arrow" size={13}/>
          </a>
        )}
      </div>
    </article>
  );

  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Missions."
        lead={<><span className="missions-verse">&ldquo;Go therefore and make disciples of all nations.&rdquo;</span><span className="missions-verse-ref">Matthew 28:19</span></>}
      />

      {/* Heart */}
      <section className="visit-section missions-intro">
        <div className="container missions-intro-inner">
          <p className="missions-intro-copy">
            We believe that missions is a vital part of the church. God has positioned Hope Church to be extremely generous — we are active locally, nationally, and throughout all parts of the world.
          </p>
          <div className="missions-tiers">
            <div className="missions-tier"><div className="missions-tier-num">01</div><h4>Local</h4><p>Johnson City &amp; the Tri-Cities</p></div>
            <div className="missions-tier"><div className="missions-tier-num">02</div><h4>National</h4><p>Church planting across the U.S.</p></div>
            <div className="missions-tier"><div className="missions-tier-num">03</div><h4>International</h4><p>Long-term partners on three continents</p></div>
          </div>
        </div>
      </section>

      {/* Active Missionary Partners */}
      <section className="missions-partners-section">
        <div className="container">
          <div className="missions-section-head">
            <span className="eyebrow">Who we walk with</span>
            <h2>Active Missionary Partners</h2>
            <p>A short list, on purpose. We&rsquo;d rather go deep with a few partners than spread thin across many.</p>
          </div>

          <div className="missions-tier-block">
            <header className="missions-tier-head">
              <h3>International Partners</h3>
              <span className="missions-tier-count">{international.length} partners</span>
            </header>
            <div className="missions-partners-v2">
              {international.map(p => <PartnerCard p={p} key={p.name}/>)}
            </div>
          </div>

          <div className="missions-tier-block">
            <header className="missions-tier-head">
              <h3>National Partners</h3>
              <span className="missions-tier-count">{national.length} partners</span>
            </header>
            <div className="missions-partners-v2">
              {national.map(p => <PartnerCard p={p} key={p.name}/>)}
            </div>
          </div>

          <div className="missions-tier-block">
            <header className="missions-tier-head">
              <h3>Local Partners</h3>
              <span className="missions-tier-count">{local.length} partners</span>
            </header>
            <div className="missions-partners-v2">
              {local.map(p => <PartnerCard p={p} key={p.name}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* Give to missions */}
      <section className="lifegroups-start">
        <div className="container lifegroups-start-inner">
          <div>
            <span className="eyebrow on-dark">Three ways in</span>
            <h2>Pray. Give. Go.</h2>
            <p>Not everyone is called to board a plane — but everyone can pray. Everyone can give. Some are called to go. Talk to us about where you fit.</p>
          </div>
          <div className="lifegroups-start-cta" style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <Button variant="primary" size="lg" iconRight="arrow" onClick={()=>onNav && onNav('give')}>Give to Missions</Button>
            <Button variant="outline-on-dark" size="lg" onClick={()=>onNav && onNav('connect')}>Get in touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Connect Card ----------
function ConnectCardPage() {
  const formUrl = 'https://hopejc.churchcenter.com/people/forms/341611';
  return (
    <>
      <PageHeader eyebrow="Get Involved" title="Let us know you’re here." lead="Fill out a quick Connect Card so we can get to know you and keep you in the loop on what’s happening at Hope." />
      <section className="visit-section">
        <div className="container connect-embed-single">
          <div className="connect-embed-wrap">
            <iframe
              src={`${formUrl}?open_in_church_center_modal=false`}
              title="Hope Church Connect Card"
              className="connect-embed"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- Discover Hope (new members class) ----------
function DiscoverHopePage({ onNav }) {
  // The next class comes from the events calendar in the CMS (src/discoverHope.js).
  // Adding next month's Discover Hope there, with its sign-up link, puts it here.
  const next = useNextDiscoverHope();
  const signupOpen = next.open;

  return (
    <>
      <PageHeader eyebrow="Get Involved" title="Discover Hope." lead="A one-night class for anyone considering partnering with Hope Church — first Wednesday of every month at 6:30pm." />

      {/* Partnership manifesto */}
      <section className="discover-intro">
        <div className="container discover-intro-inner">
          <div className="discover-intro-copy">
            <span className="eyebrow">Partnership at Hope</span>
            <h2>More than membership.</h2>
            <p className="lead">Partnership is the term we use for our church &ldquo;membership.&rdquo; We don&rsquo;t want people to simply become members — we want people to partner with us in the mission and vision to which God has called His church.</p>
            <p>Membership often refers to the benefits you receive from being part of a group or organization. Although partnering with a committed body of Christ is certainly beneficial, it&rsquo;s about so much more than your personal benefit.</p>
            <p><strong>Partnership is a commitment to actively participate in that body of believers.</strong> We believe God has not called us to sit back and be served, but to take an active role in serving and ministering in order to build up and strengthen the body of Christ.</p>
          </div>
          <aside className="discover-callout">
            <div className="discover-callout-eyebrow">Every first Wednesday</div>
            <div className="discover-callout-date">
              <span className="discover-callout-day">Wed</span>
              <span className="discover-callout-time">6:30pm</span>
            </div>
            <div className="discover-callout-where">
              <strong>Hope Church</strong>
              5034 Bobby Hicks Hwy<br/>Johnson City, TN
            </div>
            <ul className="discover-callout-list">
              <li>About 90 minutes</li>
              <li>Childcare provided</li>
              <li>No commitment to attending</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* What we cover */}
      <section className="discover-cover">
        <div className="container">
          <SectionHeader eyebrow="What we cover" title="An hour and a half. The whole picture." lead="Discover Hope provides the opportunity to learn more about the mission and vision of our church and to ask any questions you may have regarding partnership." align="center"/>
          <div className="discover-grid">
            <div className="discover-card">
              <div className="discover-num">01</div>
              <h3>Our story</h3>
              <p>How Hope started in 2022, where we&rsquo;ve been, and where we believe God is leading us next.</p>
            </div>
            <div className="discover-card">
              <div className="discover-num">02</div>
              <h3>What we believe</h3>
              <p>A walk through our Statement of Faith — the doctrines that anchor everything we teach.</p>
            </div>
            <div className="discover-card">
              <div className="discover-num">03</div>
              <h3>How we&rsquo;re structured</h3>
              <p>Elders, pastors, staff, and the role partners play in shepherding the church together.</p>
            </div>
            <div className="discover-card">
              <div className="discover-num">04</div>
              <h3>What partnership means</h3>
              <p>The commitments we make to each other — and the joy of being part of a committed body.</p>
            </div>
            <div className="discover-card">
              <div className="discover-num">05</div>
              <h3>Your next step</h3>
              <p>How to take the step into partnership at Hope — and what to expect if you do.</p>
            </div>
            <div className="discover-card discover-card-q">
              <div className="discover-num">06</div>
              <h3>Your questions</h3>
              <p>The last block of the night is yours. Bring anything — theological, practical, or personal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign up */}
      <section className="visit-section" id="signup">
        <div className="container visit-grid">
          <div>
            {signupOpen ? (
              <div className="visit-card discover-form-card">
                <h2>Save my spot</h2>
                <div className="sub">Sign up for the next Discover Hope session. We&rsquo;ll send a reminder a couple days out.</div>
                <div className="discover-signup">
                  <div className="discover-signup-next">
                    <span className="discover-signup-label">Next class</span>
                    <strong>{next.label}</strong>
                    <span className="discover-signup-time">{next.time} &middot; Hope Church</span>
                  </div>
                  {/* Church Center blocks framing on /registrations/* — this has
                      to open in a new tab. See src/discoverHope.js for details. */}
                  <a
                    className="btn btn-primary btn-lg discover-signup-btn"
                    href={next.signupUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    Sign up for Discover Hope
                    <Icon name="arrow" size={16}/>
                  </a>
                  <p className="discover-signup-note">
                    Takes you to our Church Center sign-up. Takes about a minute.
                  </p>
                </div>
              </div>
            ) : (
              <div className="visit-card discover-form-card discover-form-card-soon">
                <h2>Sign up coming soon</h2>
                <div className="sub">{next.label
                  ? <>The next class is <strong>{next.label}</strong> at {next.time}. Sign-up opens soon.</>
                  : <>Registration for the next Discover Hope isn&rsquo;t open just yet.</>}</div>
                <div className="discover-signup discover-signup-soon">
                  <p>Discover Hope meets the <strong>first Wednesday of every month at 6:30pm</strong>. We post the sign-up here as soon as the next class opens &mdash; usually a few weeks ahead.</p>
                  <p>Don&rsquo;t want to keep checking back? Reach out and we&rsquo;ll let you know the moment it&rsquo;s live.</p>
                  <Button variant="secondary" size="lg" onClick={()=>onNav('contact')} iconRight="arrow">Contact us</Button>
                </div>
              </div>
            )}
          </div>
          <aside className="visit-aside">
            <h3>Common questions</h3>
            <div className="discover-faq">
              <details>
                <summary>Do I have to become a partner?</summary>
                <p>Not at all. Plenty of people come to Discover Hope to learn more and decide later — or to ask questions they&rsquo;ve been holding for a while. No one is required to become a partner.</p>
              </details>
              <details>
                <summary>What if I&rsquo;ve never been to Hope?</summary>
                <p>Welcome! It&rsquo;s actually a great way to learn who we are without waiting through a few Sundays to piece it together.</p>
              </details>
              <details>
                <summary>What about my kids?</summary>
                <p>We provide childcare during the class for infants through 6th grade. Let us know on the form so we can plan staffing.</p>
              </details>
              <details>
                <summary>How long is the class?</summary>
                <p>About 90 minutes. We start at 6:30pm and aim to have you out the door by 8:00pm.</p>
              </details>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export { LifeGroupsPage, MissionsPage, ConnectCardPage, DiscoverHopePage };
