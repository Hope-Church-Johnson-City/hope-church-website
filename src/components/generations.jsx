import React from 'react';
import { resources } from '../resources.js';
// Hope Church — Generations campaign page (/generations) plus the teaser band
// that sits on the home page under "We saved you a seat."
//
// Ported from the Generations campaign design canvas. The design was authored
// as a standalone page with its own header and footer; those are dropped here
// because the site Layout already supplies both. Everything else — copy,
// section order, imagery, and the Church Center giving embed — is carried over
// as designed, with the inline styles moved into /assets/generations.css so the
// page picks up dark mode along with the rest of the site.

const GIVING_URL = 'https://hopejc.churchcenter.com/giving/to/generations-fund';
const GIVING_EMBED = `${GIVING_URL}?open-in-church-center-modal=true&embed=true`;
const CONTACT_EMAIL = 'info@hopejc.org';

// The stair-step motif from the Generations logo lockup, drawn in markup so it
// stays crisp and responsive. Widths/colors live in generations.css.
function GenerationsBars() {
  return (
    <div className="gen-bars" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

// ---------- Home page teaser ----------
// Rendered on the home page directly beneath NewHereBlock.
function GenerationsHomeBlock({ onGenerations }) {
  return (
    <section className="gen-home-band">
      <img
        className="gen-home-band-img"
        src={resources.generationsLandHero}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="gen-home-band-scrim" />
      <div className="container gen-home-inner">
        <div className="gen-home-copy">
          <p className="gen-home-eyebrow">The Generations Campaign</p>
          <GenerationsBars />
          <h2>A permanent home for Hope Church.</h2>
          <p className="gen-home-lead">
            We&rsquo;re under contract to purchase twenty acres and build a
            church of our own &mdash; a place to worship together, space for
            kids and students to grow up in the faith, a space for all ages to
            fellowship and grow in the grace and knowledge of Jesus Christ, and
            a front door that stays open in this community for decades.
          </p>
          <div className="gen-home-actions">
            <a
              className="gen-btn gen-btn-light"
              href={GIVING_URL}
              target="_blank"
              rel="noopener"
            >
              Give to Generations
            </a>
            <button className="gen-btn gen-btn-outline" onClick={onGenerations}>
              See the vision
            </button>
          </div>
          <p className="gen-home-verse">
            &ldquo;One generation shall commend your works to another.&rdquo;
            &mdash; Psalm 145:4
          </p>
        </div>
        <div className="gen-home-photo">
          <img
            src={resources.generationsLand2}
            alt="Aerial view of the twenty acres Hope Church is raising support to purchase"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// ---------- Full campaign page ----------
function GenerationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gen-hero">
        <img
          className="gen-hero-img"
          src={resources.generationsLandHero}
          alt="Aerial view of the twenty-acre property"
        />
        <div className="gen-hero-scrim" />
        <div className="container gen-hero-inner">
          <GenerationsBars />
          <h1>GENERATIONS</h1>
          <p className="gen-hero-lead">
            We&rsquo;re raising support to purchase twenty acres and build a
            permanent home for Hope Church &mdash; a place for the people who
            come after us.
          </p>
          <div className="gen-hero-actions">
            <a
              className="gen-btn gen-btn-light"
              href={GIVING_URL}
              target="_blank"
              rel="noopener"
            >
              Give to Generations
            </a>
            <a className="gen-btn gen-btn-outline" href="#vision">
              See the vision
            </a>
          </div>
          <p className="gen-hero-verse">
            &ldquo;One generation shall commend your works to another.&rdquo;
            &mdash; Psalm 145:4
          </p>
        </div>
      </section>

      {/* The vision */}
      <section className="gen-vision" id="vision">
        <div className="container gen-vision-grid">
          <div>
            <p className="gen-eyebrow">The Vision</p>
            <h2>God is moving!</h2>
            <p>
              God is moving in and through Hope Church. For years, Hope has met
              in borrowed and rented space, and God has continued to move.
              Generations is our next step of faith: twenty acres of land and a
              building to call home that God can continue to move for
              generations to come.
            </p>
            <p>
              This is more than a building. It&rsquo;s a place to worship
              together, space for kids and students to grow up in the faith, a
              space for all ages to fellowship and grow in the grace and
              knowledge of Jesus Christ, and a front door that stays open to
              continue to invite people home.
            </p>
            <p>
              We are excited that God is opening doors for us to walk through in
              faith. Will you partner with us on this journey?
            </p>
          </div>
          <div className="gen-vision-photos">
            <div className="gen-photo gen-photo-wide">
              <img
                src={resources.generationsWorship}
                alt="Hope Church worshipping together"
                loading="lazy"
              />
            </div>
            <div className="gen-photo gen-photo-half">
              <img src={resources.generationsKids} alt="Hope Kids" loading="lazy" />
            </div>
            <div className="gen-photo gen-photo-half">
              <img
                src={resources.lobbyWelcome}
                alt="Fellowship in the lobby"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The land */}
      <section className="gen-land">
        <div className="container gen-land-grid">
          <figure>
            <div className="gen-photo">
              <img
                src={resources.generationsLand2}
                alt="The property looking across the fields toward town"
                loading="lazy"
              />
            </div>
            <figcaption>
              Twenty acres of open field, minutes from where we gather now.
            </figcaption>
          </figure>
          <figure>
            <div className="gen-photo">
              <img
                src={resources.generationsLand3}
                alt="Wide view of the property and the surrounding valley"
                loading="lazy"
              />
            </div>
            <figcaption>
              Road frontage, room to build, and neighborhoods on every side.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Give */}
      <section className="gen-give" id="give">
        <div className="container">
          <div className="gen-give-head">
            <p className="gen-eyebrow">Give</p>
            <h2>Give to Generations</h2>
            <p>
              Every gift goes to the Generations Fund. Give once or set up a
              recurring gift &mdash; it all goes to the land and the building.
            </p>
          </div>
          <div className="gen-give-frame">
            <iframe
              src={GIVING_EMBED}
              title="Give to the Generations Fund"
              loading="lazy"
              allow="payment"
            />
          </div>
          <div className="gen-give-fallback">
            <a
              className="btn btn-primary btn-lg"
              href={GIVING_URL}
              target="_blank"
              rel="noopener"
            >
              Open giving in Church Center
            </a>
            <p>Form not loading? Use the button &mdash; it opens the same secure page.</p>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="gen-questions">
        <div className="container gen-questions-inner">
          <h2>Questions about Generations?</h2>
          <p>
            If you have questions, contact us or talk with a pastor after any service.
          </p>
          <a className="btn btn-secondary btn-lg" href={`mailto:${CONTACT_EMAIL}`}>
            Email us about Generations
          </a>
        </div>
      </section>
    </>
  );
}

export { GenerationsPage, GenerationsHomeBlock };
