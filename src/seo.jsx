/* Hope Church — per-page SEO metadata.

   Each route renders <Seo pageKey="events" /> which emits a unique <title>,
   meta description, canonical URL, and Open Graph tags into <head> at build
   time (via vite-react-ssg's <Head>). Unique titles + canonical tags are what
   resolve Google Search Console's "Duplicate without user-selected canonical"
   warning, because every URL now describes itself distinctly. */
import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_ORIGIN, pathFor } from './nav.js';

const BRAND = 'Hope Church · Johnson City, TN';
const DEFAULT_DESC =
  'Hope Church — a contemporary church in Gray / Johnson City, Tennessee. Love God. Love people. Make disciples. Join us on Sunday mornings.';
const OG_IMAGE = '/assets/og-image.jpg';

// pageKey -> { title, description }. Titles are kept under ~60 characters and
// descriptions under ~155 so they don't get truncated in search results.
export const META = {
  home: {
    title: BRAND,
    description: DEFAULT_DESC,
  },
  visit: {
    title: `Plan a Visit | ${BRAND}`,
    description:
      'New to Hope Church? Here’s what to expect on a Sunday in Gray / Johnson City, TN — service times, kids check-in, parking, and how to find us.',
  },
  about: {
    title: `About Us | ${BRAND}`,
    description:
      'Our story, beliefs, and vision. Hope Church is a contemporary church in Gray / Johnson City, TN with a heart to love God, love people, and make disciples.',
  },
  team: {
    title: `Our Team | ${BRAND}`,
    description:
      'Meet the pastors, elders, and staff who lead and serve Hope Church in Gray / Johnson City, Tennessee.',
  },
  sermons: {
    title: `Sermons | ${BRAND}`,
    description:
      'Watch and listen to recent messages from Hope Church. Catch up on the current series or revisit past sermons any time.',
  },
  events: {
    title: `Events | ${BRAND}`,
    description:
      'Upcoming events, gatherings, and special services at Hope Church in Gray / Johnson City, TN. See what’s happening and plan to join us.',
  },
  ministries: {
    title: `Ministries | ${BRAND}`,
    description:
      'Ministries for every age and stage at Hope Church — kids, students, college, men, women, worship, and more. Find your place to connect and grow.',
  },
  'ministry-kids': {
    title: `Kids Ministry | ${BRAND}`,
    description:
      'Hope Kids is a safe, fun, age-appropriate environment where children encounter Jesus on Sundays at Hope Church in Gray / Johnson City, TN.',
  },
  'ministry-linked56': {
    title: `Linked 5&6 | ${BRAND}`,
    description:
      'Linked 5&6 is Hope Church’s ministry for 5th and 6th graders — that in-between stage, with a place to belong, grow, and have fun.',
  },
  'ministry-students': {
    title: `Student Ministry | ${BRAND}`,
    description:
      'Hope Students is our ministry for teenagers — a place for middle and high schoolers to belong, grow in faith, and build real friendships.',
  },
  'ministry-college': {
    title: `College Ministry | ${BRAND}`,
    description:
      'College-age ministry at Hope Church — community, discipleship, and Groups for students and young adults in the Johnson City area.',
  },
  'ministry-women': {
    title: `Women’s Ministry (Woven) | ${BRAND}`,
    description:
      'Woven is the women’s ministry of Hope Church — gatherings, studies, and friendships that connect women to God and to one another.',
  },
  'ministry-men': {
    title: `Men’s Ministry (H.I.T.) | ${BRAND}`,
    description:
      'H.I.T. is the men’s ministry of Hope Church — men pursuing Christ together through community, accountability, and service.',
  },
  'ministry-worship': {
    title: `Worship & Tech | ${BRAND}`,
    description:
      'The Worship & Tech ministry leads Hope Church in worship each Sunday. Learn how to use your gifts in music, audio, video, and production.',
  },
  'ministry-fueledbyhope': {
    title: `Fueled by Hope | ${BRAND}`,
    description:
      'Fueled by Hope is our coffee and hospitality ministry — creating a warm welcome for everyone who walks through the doors at Hope Church.',
  },
  give: {
    title: `Give | ${BRAND}`,
    description:
      'Give to Hope Church. Your generosity fuels ministry in Gray / Johnson City and beyond. Give securely online or learn about other ways to give.',
  },
  generations: {
    title: `Generations Campaign | ${BRAND}`,
    description:
      'Generations is Hope Church\u2019s campaign to purchase twenty acres and build a permanent home in Gray / Johnson City, TN. See the vision and give.',
  },
  serve: {
    title: `Serve | ${BRAND}`,
    description:
      'Find a serving team that fits your gifts and schedule at Hope Church. Everyone has a place to make a difference.',
  },
  nextsteps: {
    title: `Next Steps | ${BRAND}`,
    description:
      'Not sure where to start? Take your next step at Hope Church — get connected, get baptized, join a group, or become a member.',
  },
  contact: {
    title: `Contact | ${BRAND}`,
    description:
      'Get in touch with Hope Church in Gray / Johnson City, TN. Find our address, service times, phone, and email, or send us a message.',
  },
  lifegroups: {
    title: `Groups | ${BRAND}`,
    description:
      'Groups are where real community happens at Hope Church. Find a group that meets near you and take your next step toward belonging.',
  },
  missions: {
    title: `Missions | ${BRAND}`,
    description:
      'Hope Church partners with local, national, and global missions. Meet the partners we support and how you can be part of the mission.',
  },
  connect: {
    title: `Connect Card | ${BRAND}`,
    description:
      'Say hi, share a prayer request, or take a next step. Fill out the Hope Church Connect Card and we’ll follow up with you.',
  },
  discover: {
    title: `Discover Hope | ${BRAND}`,
    description:
      'Discover Hope is our new-members class, held the first Wednesday of each month. Learn our story, beliefs, and how to get involved.',
  },
  prayer: {
    title: `Prayer Requests | ${BRAND}`,
    description:
      'Share a prayer request with the Hope Church team. We would be honored to pray with you and for you.',
  },
  gethelp: {
    title: `Get Help | ${BRAND}`,
    description:
      'Need help, or know someone who does? Fill out the Hope Church benevolence form and someone will reach out to you.',
  },
  podcast: {
    title: `Hope Church Podcast | ${BRAND}`,
    description:
      'Listen to the Hope Church podcast — Sunday messages and more, available on Apple Podcasts, Spotify, and wherever you listen.',
  },
  'podcast-finding-hope': {
    title: `Finding Hope Podcast | ${BRAND}`,
    description:
      'The Finding Hope podcast from Hope Church — conversations and encouragement to help you find hope in Jesus. Listen wherever you get podcasts.',
  },
  app: {
    title: `Our App | ${BRAND}`,
    description:
      'Download the Hope Church app for sermons, events, giving, and more — available on the App Store and Google Play.',
  },
  thisweek: {
    title: `This Week | ${BRAND}`,
    description: 'Sermon notes, the newsletter, the prayer sheet and what is happening at Hope Church this week.',
  },
  download: {
    title: `Download the App | ${BRAND}`,
    description: 'Get the Hope Church app on the App Store or Google Play.',
  },
  privacy: {
    title: `Privacy Policy | ${BRAND}`,
    description: 'How Hope Church collects, uses, and protects your information.',
  },
  'delete-account': {
    title: `Delete your account | ${BRAND}`,
    description: 'How to delete your Hope Church app account and everything stored with it.',
  },
  terms: {
    title: `Terms of Service | ${BRAND}`,
    description:
      'The terms that cover use of the Hope Church website and the sermon media we publish.',
  },
  accessibility: {
    title: `Accessibility | ${BRAND}`,
    description:
      'Hope Church is committed to making our website accessible to everyone. Read our accessibility statement and how to reach us with feedback.',
  },
};

export function metaFor(pageKey) {
  return META[pageKey] || META.home;
}

export default function Seo({ pageKey = 'home' }) {
  const { title, description } = metaFor(pageKey);
  const canonical = SITE_ORIGIN + pathFor(pageKey);
  const ogImage = SITE_ORIGIN + OG_IMAGE;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hope Church" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hope Church — Love God. Love people. Make disciples. Sundays in Gray / Johnson City, TN." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
