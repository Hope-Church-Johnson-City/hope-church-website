/* Hope Church — route table.

   This replaces the old "page is a string in React state" model with real,
   individually addressable, pre-rendered URLs. Every existing page component is
   reused unchanged; we simply give each one a path and keep the familiar
   onNav(key) callback working by wiring it to the router.

   vite-react-ssg walks this `routes` array at build time and writes one static
   HTML file per concrete path (dist/events/index.html, dist/about/index.html …)
   so search engines and first-paint both get real, complete HTML. */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { initReveal } from './motion.js';
import { applyPillSpace } from './pillSpace.js';

// useLayoutEffect warns during pre-rendering, where there is no layout.
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import { KEY_TO_PATH, pathFor, keyForPath } from './nav.js';
import Seo from './seo.jsx';
import { useAnnouncement, renderRich } from './announcement.jsx';
import ServiceTimesModal from './components/ServiceTimesModal.jsx';

// The header, footer and announcement bar are on every page, so they are in
// the main bundle. Each page's own code is loaded per route (`lazy` below):
// a visitor downloads only the page they are on, and vite-react-ssg still
// pre-renders every page in full and adds <link rel="modulepreload"> for that
// page's chunk to its HTML.
import { AnnouncementBar, SiteHeader, Footer } from './components/shared.jsx';

/* ---------- navigation helper ---------- */
// Returns an onNav(key) function with the exact signature every component
// already expects, but backed by the router instead of setState.
function useNav() {
  const navigate = useNavigate();
  return useCallback(
    (key) => {
      navigate(pathFor(key));
    },
    [navigate]
  );
}

/* ---------- small utilities ---------- */
// A link with a #section (the app's This Week rows use these) lands on that
// section instead of the top of the page.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);
  return null;
}

// Preserve any old, indexed/bookmarked "?page=key" deep links by forwarding
// them to the new clean URL. Runs only in the browser (inside an effect).
function LegacyPageRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p && KEY_TO_PATH[p]) navigate(KEY_TO_PATH[p], { replace: true });
    } catch {
      /* ignore */
    }
  }, [navigate]);
  return null;
}

/* ---------- 404 ---------- */
function NotFound() {
  return (
    <>
      <Seo pageKey="home" />
      <section
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        <p style={{ fontSize: 14, letterSpacing: '0.08em', opacity: 0.6 }}>
          ERROR 404
        </p>
        <h1 style={{ fontSize: 36, margin: '12px 0 16px' }}>
          We couldn’t find that page
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.8 }}>
          The page you’re looking for may have moved or no longer exists.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn btn-primary" to="/">
            Back to home
          </Link>
        </p>
      </section>
    </>
  );
}

/* ---------- shared layout (header + footer wrap every page) ---------- */
function Layout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const firstPath = useRef(location.pathname);

  // Motion (see src/motion.js): reveal what is below the fold as it scrolls
  // in, and fade the page in after a client-side navigation. Neither runs for
  // the first page load, which is the pre-rendered HTML as it is.
  useBrowserLayoutEffect(() => {
    const main = mainRef.current;
    if (main && location.pathname !== firstPath.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      main.removeAttribute('data-pt');
      void main.offsetWidth; // restart the animation on a second navigation
      main.setAttribute('data-pt', 'in');
    }
    applyPillSpace(main);
    return initReveal(main);
  }, [location.pathname]);
  // Breakpoints change both the page's own top padding and the pill's size.
  useEffect(() => {
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => applyPillSpace(mainRef.current), 120); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);
  const current = keyForPath(location.pathname);
  const onNav = useNav();

  // The announcement comes from the CMS now -- the same document the apps read.
  // Its text and schedule used to be constants here; see src/announcement.jsx.
  const [announcement, dismissAnnouncement] = useAnnouncement(location.pathname);

  return (
    <div data-screen-label={`Site · ${current}`}>
      <ScrollToTop />
      <LegacyPageRedirect />
      <AnnouncementBar
        visible={!!announcement}
        text={announcement ? renderRich(announcement.text) : null}
        link={announcement ? announcement.link : null}
        onDismiss={dismissAnnouncement}
      />
      <SiteHeader onNav={onNav} current={current} dark={false} />
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer onNav={onNav} />
      <Analytics />
      <ServiceTimesModal />
    </div>
  );
}

/* ---------- page wrapper: injects SEO head + onNav into each page ---------- */
function View({ pageKey, Comp, extraProps }) {
  const onNav = useNav();
  return (
    <>
      <Seo pageKey={pageKey} />
      <Comp onNav={onNav} {...(extraProps || {})} />
    </>
  );
}

// A route's page, once its chunk has loaded. Each `lazy` below calls import()
// directly (not through a helper) because vite-react-ssg reads the import out
// of the function's source to add the chunk's modulepreload to the page.
const page = (pageKey, Comp, extraProps) => ({
  element: <View pageKey={pageKey} Comp={Comp} extraProps={extraProps} />,
});

export const routes = [
  // Outside the Layout on purpose: the page to share for the app carries
  // nothing but the store buttons (see DownloadPage).
  {
    path: '/download',
    lazy: () => import('./components/pages-extra.jsx').then(({ DownloadPage }) => ({
      element: (<><Seo pageKey="download" /><DownloadPage /><Analytics /></>),
    })),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: () => import('./components/homepage.jsx').then((m) => page('home', m.HomePage)) },
      { path: 'visit', lazy: () => import('./components/pages.jsx').then((m) => page('visit', m.VisitPage)) },
      { path: 'about', lazy: () => import('./components/pages.jsx').then((m) => page('about', m.AboutPage)) },
      { path: 'team', lazy: () => import('./components/pages.jsx').then((m) => page('team', m.TeamPage)) },
      { path: 'sermons', lazy: () => import('./components/pages.jsx').then((m) => page('sermons', m.SermonsPage)) },
      { path: 'events', lazy: () => import('./components/pages.jsx').then((m) => page('events', m.EventsPage)) },
      // One event. Rendered here rather than proxied from the CMS so it keeps
      // the site header, nav and footer. Pre-rendered per event at build time
      // (see includedRoutes in vite.config.js); anything newer falls back to
      // the SPA shell and fetches live.
      { path: 'events/:slug', lazy: () => import('./components/event-detail.jsx').then((m) => ({ Component: m.default })) },
      { path: 'ministries', lazy: () => import('./components/pages.jsx').then((m) => page('ministries', m.MinistriesPage)) },
      { path: 'ministries/kids', lazy: () => import('./components/ministry-kids.jsx').then((m) => page('ministry-kids', m.KidsMinistryPage)) },
      { path: 'ministries/linked56', lazy: () => import('./components/ministry-linked56.jsx').then((m) => page('ministry-linked56', m.Linked56MinistryPage)) },
      { path: 'ministries/students', lazy: () => import('./components/ministry-students.jsx').then((m) => page('ministry-students', m.StudentsMinistryPage)) },
      { path: 'ministries/college', lazy: () => import('./components/ministry-college.jsx').then((m) => page('ministry-college', m.CollegeMinistryPage)) },
      { path: 'ministries/women', lazy: () => import('./components/ministry-women.jsx').then((m) => page('ministry-women', m.WomenMinistryPage)) },
      { path: 'ministries/men', lazy: () => import('./components/ministry-men.jsx').then((m) => page('ministry-men', m.MenMinistryPage)) },
      { path: 'ministries/worship', lazy: () => import('./components/ministry-worship.jsx').then((m) => page('ministry-worship', m.WorshipMinistryPage)) },
      { path: 'ministries/fueled-by-hope', lazy: () => import('./components/ministry-fueledbyhope.jsx').then((m) => page('ministry-fueledbyhope', m.FueledByHopeMinistryPage)) },
      { path: 'give', lazy: () => import('./components/pages.jsx').then((m) => page('give', m.GivePage)) },
      { path: 'generations', lazy: () => import('./components/generations.jsx').then((m) => page('generations', m.GenerationsPage)) },
      { path: 'serve', lazy: () => import('./components/pages.jsx').then((m) => page('serve', m.ServePage)) },
      { path: 'next-steps', lazy: () => import('./components/pages.jsx').then((m) => page('nextsteps', m.NextStepsPage)) },
      { path: 'contact', lazy: () => import('./components/pages.jsx').then((m) => page('contact', m.ContactPage)) },
      { path: 'life-groups', lazy: () => import('./components/getinvolved.jsx').then((m) => page('lifegroups', m.LifeGroupsPage)) },
      { path: 'missions', lazy: () => import('./components/getinvolved.jsx').then((m) => page('missions', m.MissionsPage)) },
      { path: 'connect', lazy: () => import('./components/getinvolved.jsx').then((m) => page('connect', m.ConnectCardPage)) },
      { path: 'discover-hope', lazy: () => import('./components/getinvolved.jsx').then((m) => page('discover', m.DiscoverHopePage)) },
      { path: 'prayer', lazy: () => import('./components/pages-extra.jsx').then((m) => page('prayer', m.PrayerRequestPage)) },
      { path: 'get-help', lazy: () => import('./components/pages-extra.jsx').then((m) => page('gethelp', m.GetHelpPage)) },
      { path: 'podcast', lazy: () => import('./components/pages-extra.jsx').then((m) => page('podcast', m.PodcastPage, { initialChannel: 'sunday' })) },
      { path: 'podcast/finding-hope', lazy: () => import('./components/pages-extra.jsx').then((m) => page('podcast-finding-hope', m.PodcastPage, { initialChannel: 'finding-hope' })) },
      { path: 'app', lazy: () => import('./components/pages-extra.jsx').then((m) => page('app', m.AppPage)) },
      { path: 'this-week', lazy: () => import('./components/pages-extra.jsx').then((m) => page('thisweek', m.ThisWeekPage)) },
      { path: 'privacy', lazy: () => import('./components/pages-legal.jsx').then((m) => page('privacy', m.PrivacyPage)) },
      // Linked from the privacy policy and from Google Play's Data safety form,
      // so this path has to stay put once it is published.
      { path: 'delete-account', lazy: () => import('./components/pages-legal.jsx').then((m) => page('delete-account', m.DeleteAccountPage)) },
      { path: 'terms', lazy: () => import('./components/pages-legal.jsx').then((m) => page('terms', m.TermsPage)) },
      { path: 'accessibility', lazy: () => import('./components/pages-legal.jsx').then((m) => page('accessibility', m.AccessibilityPage)) },
      // Concrete 404 route so the build emits a real /404 page; copied to
      // dist/404.html in the postbuild step for Vercel to serve.
      { path: '404', element: <NotFound /> },
      // Client-side catch-all for unknown URLs.
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
