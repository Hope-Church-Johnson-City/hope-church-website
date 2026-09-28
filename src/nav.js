/* Hope Church — single source of truth mapping internal page keys to real URLs.

   Historically the site was one page and "navigation" just swapped a `page`
   string in React state. Every component still speaks in those keys via the
   `onNav(key)` callback. This map translates those keys to real routed URLs so
   we can keep all the existing components untouched while giving each page its
   own crawlable address. */

export const SITE_ORIGIN = 'https://www.hopejc.org';

// page key  ->  URL path
export const KEY_TO_PATH = {
  home: '/',
  visit: '/visit',
  about: '/about',
  team: '/team',
  sermons: '/sermons',
  events: '/events',
  ministries: '/ministries',
  'ministry-kids': '/ministries/kids',
  'ministry-linked56': '/ministries/linked56',
  'ministry-students': '/ministries/students',
  'ministry-college': '/ministries/college',
  'ministry-women': '/ministries/women',
  'ministry-men': '/ministries/men',
  'ministry-worship': '/ministries/worship',
  'ministry-fueledbyhope': '/ministries/fueled-by-hope',
  give: '/give',
  generations: '/generations',
  serve: '/serve',
  nextsteps: '/next-steps',
  contact: '/contact',
  lifegroups: '/life-groups',
  missions: '/missions',
  connect: '/connect',
  discover: '/discover-hope',
  prayer: '/prayer',
  gethelp: '/get-help',
  podcast: '/podcast',
  'podcast-finding-hope': '/podcast/finding-hope',
  app: '/app',
  download: '/download',
  privacy: '/privacy',
  'delete-account': '/delete-account',
  accessibility: '/accessibility',
  terms: '/terms',
};

export const PATH_TO_KEY = Object.fromEntries(
  Object.entries(KEY_TO_PATH).map(([key, path]) => [path, key])
);

// key -> path, with a safe fallback to the homepage.
export function pathFor(key) {
  return KEY_TO_PATH[key] || '/';
}

// path -> key (used to light up the active nav item), defaulting to 'home'.
export function keyForPath(pathname) {
  const clean =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  if (PATH_TO_KEY[clean]) return PATH_TO_KEY[clean];
  // A single event lives at /events/<slug>, which is not in the map. Without
  // this the header highlights Home while the visitor is plainly on an event
  // page. Same for a sermon under /sermons/<...>.
  const section = clean.split('/')[1];
  if (section === 'events') return 'events';
  if (section === 'sermons') return 'sermons';
  return 'home';
}
