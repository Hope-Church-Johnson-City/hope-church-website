import React from 'react';
import serviceTimes from '../content/settings/service-times.json';

/* Hope Church — Sunday service times, single source of truth.

   These values are now edited through the CMS (admin → "Service Times").
   They live in content/settings/service-times.json; this module just reads
   that file so every component and the SEO/structured data stay in sync.

   Editable fields:
     first / second / third  — the three Sunday service start times
     stream                  — which service is livestreamed
     runthrough / runthroughEnd — worship & tech Sunday run-through window
     firstServiceClasses     — kids classes offered at the first service
     otherServiceClasses     — kids classes at the second & third services */

// `isNew` is retained for components that branch on it (the nursery/preschool
// split is now the permanent schedule, so it is always true).
const TIMES = { ...serviceTimes, isNew: true };

export const SERVICE_TIMES = TIMES;

export function KidsServiceNote({ className }) {
  const st = useServiceTimes();
  return (
    <p className={className}>
      <strong>Heads up for the {st.first} service:</strong> we offer nursery &amp; preschool only.
      Kindergarten&ndash;4th grade and Linked 5&ndash;6th grade classes meet at the {st.second} and {st.third} services.
    </p>
  );
}

export function useServiceTimes() {
  return TIMES;
}
