import { defineConfig } from "tinacms";

// TinaCloud connects this repo to the admin editor.
// Set these in Vercel (and a local .env for `npm run dev`):
//   NEXT_PUBLIC_TINA_CLIENT_ID  — from your TinaCloud project
//   TINA_TOKEN                  — read-only token from TinaCloud
// The branch Tina edits: the deployed branch on Vercel, else "main".
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  // The admin editor is emitted here and served at /admin on the site.
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Uploaded images land in public/assets, matching the site's existing paths.
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "serviceTimes",
        label: "Service Times",
        path: "content/settings",
        format: "json",
        match: { include: "service-times" },
        // Singleton: one document, not a list you can add to or delete.
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          {
            type: "string",
            name: "first",
            label: "First service time",
            description: 'e.g. "7:30am" — nursery & preschool only',
            required: true,
          },
          {
            type: "string",
            name: "second",
            label: "Second service time",
            description: 'e.g. "9:15am"',
            required: true,
          },
          {
            type: "string",
            name: "third",
            label: "Third service time",
            description: 'e.g. "11:00am"',
            required: true,
          },
          {
            type: "string",
            name: "stream",
            label: "Livestreamed service",
            description: "Which service time is streamed on YouTube/Facebook",
            required: true,
          },
          {
            type: "string",
            name: "runthrough",
            label: "Sunday run-through — start",
            description: "Worship & tech team run-through start time",
            required: true,
          },
          {
            type: "string",
            name: "runthroughEnd",
            label: "Sunday run-through — end",
            required: true,
          },
          {
            type: "string",
            name: "firstServiceClasses",
            label: "Kids classes at first service",
            description: 'e.g. "Nursery & preschool only"',
          },
          {
            type: "string",
            name: "otherServiceClasses",
            label: "Kids classes at second & third services",
            description: 'e.g. "All classes (nursery–Linked 56)"',
          },
        ],
      },
    ],
  },
});
