import React from 'react';
import { PageHeader } from './shared.jsx';
// Hope Church — legal/info pages: Privacy + Accessibility

// ---------- Shared layout ----------
function LegalPage({ eyebrow, title, lead, updated, children }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      <section className="legal-page">
        <div className="container legal-inner">
          {updated && <p className="legal-updated">Last updated: {updated}</p>}
          <div className="legal-body">{children}</div>
        </div>
      </section>
    </>
  );
}

// ---------- Privacy ----------
function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="What Hope Church collects on this website and in our app, why, and what you can do about it."
      updated="September 18, 2026"
    >
      <p>
        Hope Church (&ldquo;we&rdquo;, &ldquo;us&rdquo;) runs hopejc.org and the Hope Church
        app for iPhone and Android. This policy explains what we collect, why, and what you
        can do about it. We have tried to write it in plain English rather than legal
        boilerplate.
      </p>
      <p>
        The short version: we collect very little, we do not sell anything about you, there
        is no advertising anywhere in our app or on our website, and you can delete your
        account and everything in it yourself, at any time.
      </p>

      <h2>When you use the website</h2>
      <p>
        Our website records anonymous, aggregate visit statistics &mdash; which pages are
        opened, roughly where in the world visitors are, and what kind of device they used.
        It is counted in aggregate and is not tied to a name, an email address, or a profile.
        We use it to understand which pages are useful.
      </p>
      <p>
        We do not use advertising cookies or tracking pixels, and we do not share website
        visitors with advertisers.
      </p>
      <p>
        When you fill out a form &mdash; a connect card, prayer request, event registration or
        the contact form &mdash; we collect what you type: usually your name, email address,
        phone number, and whatever you choose to tell us. Those forms are hosted by Planning
        Center, our church management system.
      </p>

      <h2>When you use the app</h2>
      <p>
        <strong>You do not need an account to use most of the app.</strong> Messages, events,
        the Bible, giving and everything else work without signing in.
      </p>
      <p><strong>If you create an account</strong> (with an email address, Sign in with Apple, or Google), we store:</p>
      <ul>
        <li>your email address, and the name and profile photo you choose to add;</li>
        <li>sermon notes you write;</li>
        <li>your place in a message you are part-way through;</li>
        <li>verses you highlight and notes you write in the Bible reader.</li>
      </ul>
      <p>
        That is stored so it follows you between your phone and any other device you sign in
        on. It belongs to you. Nobody else who uses the app can see it, and we do not read it
        to target anything at you.
      </p>
      <p>
        <strong>Your church record.</strong> If the email on your account is confirmed and
        matches your record in Planning Center, our church database, we link the two. That lets
        our staff see which app account is yours and send a notification to a group or team
        you are part of. Deleting your account removes the link.
      </p>
      <p>
        <strong>Notifications.</strong> If you turn on notifications, your device gives us a
        notification token so we can send announcements to your phone. The token identifies the
        app on that device. If you are signed in, we also note which account the device belongs
        to and the name on that account, so notifications meant for you reach you and our staff
        can see who has notifications turned on. You choose which kinds of notification you get
        in the app&rsquo;s notification settings. With the token the app sends a second random
        identifier, used only to recognise when your phone has been given a new token so the
        same notification is not sent to it twice. On an iPhone it stays on the phone even if
        the app is deleted and installed again. Deleting your account removes all of this,
        including that identifier.
      </p>
      <p>
        <strong>How the app is used.</strong> The app sends us basic usage information: a
        random identifier created when the app is installed, the app version, and which
        screens and messages get opened. This tells us things like how many people listened to
        a message &mdash; never who listened to what as a matter of record. The random
        identifier is not your device&rsquo;s advertising ID, and before we store it, it is
        scrambled with a secret key. We keep that scrambled identifier with each day the app is
        opened, which is how we count how many people use it; it is not connected to your name
        or your account. We do not have, and do not use, any advertising identifier.
      </p>
      <p>
        <strong>Searches</strong> you type in the app are sent to our own server to find
        matching messages and Bible passages. They are not stored against you or your account.
      </p>

      <h2>Giving</h2>
      <p>
        Giving is handled by Planning Center, through their Church Center service. Card and
        bank details are entered on Planning Center&rsquo;s own secure pages &mdash; they never
        pass through our app, our website or our servers, and we never see or store them.
        Planning Center&rsquo;s <a href="https://www.planningcenter.com/privacy" target="_blank"
        rel="noopener">privacy policy</a> covers that part.
      </p>

      <h2>Who else is involved</h2>
      <p>
        We use a small number of services to run all of this. They process information on our
        behalf and are not permitted to use it for their own purposes:
      </p>
      <ul>
        <li><strong>Planning Center</strong> &mdash; giving, event registrations, groups, forms, and our church records.</li>
        <li><strong>Google Firebase</strong> &mdash; app accounts, profile photos, the storage that syncs your notes and highlights, and notification delivery.</li>
        <li><strong>Apple</strong> &mdash; notifications to iPhones.</li>
        <li><strong>Cloudflare</strong> &mdash; hosts our sermon library, audio, and app data.</li>
        <li><strong>Vercel</strong> &mdash; hosts this website.</li>
        <li><strong>YouTube</strong> &mdash; some videos are played in the app and on the site through YouTube&rsquo;s player, which is subject to Google&rsquo;s privacy policy.</li>
      </ul>

      <h2>What we never do</h2>
      <ul>
        <li>We do not sell, rent or trade your information.</li>
        <li>We do not show advertising, and we do not share anything with advertisers.</li>
        <li>We do not track you across other companies&rsquo; apps or websites.</li>
      </ul>

      <h2>Deleting your account and your information</h2>
      <p>
        You can delete your account, and everything stored with it, from inside the app: tap the
        person icon at the top right of the Home screen, scroll down, and choose{' '}
        <strong>Delete account</strong>. It removes
        your notes, saved places, Bible highlights and profile, and it cannot be undone.
      </p>
      <p>
        If you no longer have the app installed, you can ask us to delete your account here:{' '}
        <a href="/delete-account">hopejc.org/delete-account</a>.
      </p>
      <p>
        We act on deletion requests within 30 days. Anonymous, aggregated counts that cannot be
        linked to you &mdash; for example &ldquo;180 people listened to this message&rdquo;
        &mdash; remain, because there is nothing in them to identify.
      </p>

      <h2>Children</h2>
      <p>
        The app is intended for a general audience and is not directed at children under 13,
        and we do not knowingly create accounts for them. Information about children who attend
        our programmes &mdash; Hope Kids check-in, student ministry registration &mdash; is
        provided by a parent or guardian, is held in Planning Center, and is used only for the
        safety and care of your child while they are with us. Access is limited to the
        volunteers and staff serving that ministry, and it is not part of the app&rsquo;s
        account system.
      </p>

      <h2>Email and texts</h2>
      <p>
        You can unsubscribe from any email at any time using the link at the bottom of the
        message, or by replying STOP to a text. We&rsquo;ll still reach out personally about
        things you&rsquo;ve specifically asked us about &mdash; a prayer request, a visit, a
        baptism.
      </p>

      <h2>Cookies</h2>
      <p>
        This site uses small data files (cookies) to remember your preferences, such as light
        or dark mode and the last page you viewed. You can disable cookies in your browser
        settings; the site will still work, but a few preferences may not be remembered
        between visits.
      </p>

      <h2>Sermon video and YouTube</h2>
      <p>
        We publish our sermons to our own YouTube channel using a media system we run
        ourselves. That system uses YouTube API Services to upload our videos and to
        confirm which channel it is connected to. Our use of those features is also
        covered by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener">
        YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy"
        target="_blank" rel="noopener">Google Privacy Policy</a>.
      </p>
      <p>
        Our system stores an authorization token for our own channel, the channel&rsquo;s name,
        and the video ID of each sermon we upload. It does not read viewer data, watch
        history, comments, or analytics, and it has no access to any channel other than ours.
      </p>
      <p>
        Our staff can disconnect the channel at any time inside our media system, or revoke
        access directly at <a href="https://security.google.com/settings/security/permissions"
        target="_blank" rel="noopener">Google&rsquo;s permissions page</a>. Revoking access
        deletes the stored token and stops any future uploads; sermons already on YouTube stay
        there until we remove them.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us at any time to see, update, or delete the information we hold about
        you. Email <a href="mailto:info@hopejc.org">info@hopejc.org</a> and we&rsquo;ll take
        care of it.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how any of this works, we will update this page and change the date at
        the top.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about this policy or how your information is handled,
        please reach out:
      </p>
      <p className="legal-contact">
        <strong>Hope Church</strong><br/>
        5034 Bobby Hicks Hwy<br/>
        Johnson City, TN 37615<br/>
        (423) 207-3341<br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a>
      </p>
    </LegalPage>
  );
}

// ---------- Delete your account ----------
// Google Play requires that anyone who made an account in the app can ask for
// it to be deleted from the web, not only from inside the app, because they may
// have uninstalled it already. This URL goes in the Play Data safety form, so it
// has to stay reachable and stay put.
function DeleteAccountPage() {
  return (
    <LegalPage
      eyebrow="Your Account"
      title="Delete your account"
      lead="How to remove your Hope Church app account and everything stored with it."
      updated="September 18, 2026"
    >
      <p>
        If you made an account in the <strong>Hope Church</strong> app, you can delete it and
        everything stored with it. You do not need an account to use the app, so deleting one
        does not stop you watching messages, reading the Bible, or giving.
      </p>

      <h2>The fastest way: in the app</h2>
      <ol>
        <li>Open the Hope Church app.</li>
        <li>Tap the person icon at the top right of the Home screen.</li>
        <li>Tap <strong>Delete account</strong> and confirm.</li>
      </ol>
      <p>Your account is removed straight away.</p>

      <h2>If you no longer have the app</h2>
      <p>
        Email <a href="mailto:info@hopejc.org?subject=Delete%20my%20account">info@hopejc.org</a>{' '}
        from the address you used to sign up, with the subject <strong>Delete my account</strong>,
        and we will remove it for you. We will confirm by email when it is done, within 30 days.
      </p>

      <h2>What gets deleted</h2>
      <ul>
        <li>Your account and sign-in details</li>
        <li>Your name and profile photo</li>
        <li>Sermon notes you have written</li>
        <li>Your saved place in any message</li>
        <li>Bible verses you have highlighted and notes on them</li>
        <li>The notification registration for your devices</li>
      </ul>
      <p>
        This cannot be undone, and it removes the same information whether you delete it
        yourself or ask us to.
      </p>

      <h2>What remains</h2>
      <p>
        Anonymous totals &mdash; for example that a message was listened to 180 times &mdash;
        remain, because they contain nothing that identifies you.
      </p>
      <p>
        Giving records are separate. They are kept by Planning Center and, because
        contributions have to be recorded for tax and accounting reasons, they are not removed
        by deleting your app account. To ask about giving records, contact the church office.
      </p>

      <h2>Questions</h2>
      <p className="legal-contact">
        <strong>Hope Church</strong><br/>
        5034 Bobby Hicks Hwy<br/>
        Johnson City, TN 37615<br/>
        (423) 207-3341<br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a>
      </p>
      <p>
        See our <a href="/privacy">Privacy Policy</a> for everything else we hold and why.
      </p>
    </LegalPage>
  );
}

// ---------- Accessibility ----------
function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      lead="We want everyone to be able to engage with Hope Church &mdash; on our campus, online, and through this website."
      updated="May 1, 2026"
    >
      <h2>Our commitment</h2>
      <p>
        Hope Church is committed to making this website, our building, and our Sunday
        experience welcoming and usable for people of all abilities. We&rsquo;re working to meet
        the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener">
        WCAG 2.1 Level AA</a> standards for digital accessibility, and we keep improving as
        we learn.
      </p>

      <h2>On this website</h2>
      <ul>
        <li>Color combinations are chosen to meet AA contrast guidelines in both light and dark modes.</li>
        <li>Images include descriptive alternative text where they carry information.</li>
        <li>The site can be navigated using a keyboard alone &mdash; no mouse required.</li>
        <li>Headings, landmarks, and form labels are structured for screen readers.</li>
        <li>You can scale text up to 200% without breaking the layout.</li>
        <li>A dark mode is available for low-light reading and light sensitivity.</li>
      </ul>

      <h2>On Sunday mornings</h2>
      <ul>
        <li>Our building is fully wheelchair accessible, including the main entrance, worship center, restrooms, and kids&rsquo; check-in.</li>
        <li>Reserved parking is available close to the front doors.</li>
        <li>Large-print bulletins are available at the welcome desk on request.</li>
        <li>Closed captions and a sermon transcript are posted with each message on this site.</li>
        <li>A quiet room with audio of the service is available for nursing parents, sensory needs, or anyone who needs a break.</li>
      </ul>

      <h2>For Hope Kids &amp; Students</h2>
      <p>
        Our Kids and Student ministries welcome children of all abilities. If your child has
        sensory, mobility, or medical needs, please let us know before you visit so we can
        prepare a buddy, a quieter space, or whatever helps them feel at home.
      </p>

      <h2>Tell us how we can do better</h2>
      <p>
        Accessibility is never finished &mdash; it&rsquo;s an ongoing practice. If you run into
        something on this site that doesn&rsquo;t work for you, or if there&rsquo;s a barrier on
        campus we haven&rsquo;t thought of, please tell us. We take every report seriously and
        will respond within five business days.
      </p>
      <p className="legal-contact">
        <strong>Hope Church &mdash; Accessibility</strong><br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a><br/>
        (423) 207-3341
      </p>
    </LegalPage>
  );
}

// ---------- Terms of Service ----------
function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lead="The basics of using this site and the sermon media we publish through it."
      updated="August 31, 2026"
    >
      <h2>About this site</h2>
      <p>
        This site is operated by Hope Church Johnson City, 5034 Bobby Hicks Hwy, Suite 10,
        Gray, TN 37615. It exists to share sermon audio, video, and written notes with our
        congregation and with anyone who wants to listen.
      </p>

      <h2>Our content</h2>
      <p>
        Sermon recordings, notes, artwork, and other media on this site remain the property
        of Hope Church. You are welcome to listen, watch, share links, and use our content
        for personal and non-commercial purposes. Please don&rsquo;t re-publish it, sell it,
        or present it as your own.
      </p>

      <h2>Embedded video</h2>
      <p>
        Some pages embed video hosted on YouTube. Using those players is also governed by the
        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener"> YouTube
        Terms of Service</a> and the <a href="https://policies.google.com/privacy"
        target="_blank" rel="noopener">Google Privacy Policy</a>.
      </p>

      <h2>Availability</h2>
      <p>
        We offer this site as-is. We work to keep it available and accurate, but we can&rsquo;t
        promise uninterrupted access, and we may add, change, or remove content at any time.
      </p>

      <h2>Your information</h2>
      <p>
        Anything you share with us through this site is handled according to our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, please ask &mdash; we&rsquo;d rather explain than have you
        guess.
      </p>
      <p className="legal-contact">
        <strong>Hope Church</strong><br/>
        5034 Bobby Hicks Hwy, Suite 10<br/>
        Gray, TN 37615<br/>
        (423) 207-3341<br/>
        <a href="mailto:info@hopejc.org">info@hopejc.org</a>
      </p>
    </LegalPage>
  );
}

export { PrivacyPage, AccessibilityPage, TermsPage, DeleteAccountPage };
