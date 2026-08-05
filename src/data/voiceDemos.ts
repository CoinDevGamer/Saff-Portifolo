/**
 * VOICE DEMO LIBRARY
 * ------------------
 * This is the single place where every recording on the site is configured.
 *
 * HOW TO ADD A RECORDING
 *   1. Drop the audio file (mp3 recommended) into `public/audio/`.
 *   2. Copy one of the objects below and paste it into the array.
 *   3. Give it a unique `id`, a `title`, a `category`, and set
 *      `audioFile` to "/audio/<your-file-name>.mp3".
 *
 * HOW TO REMOVE A RECORDING
 *   Delete its object from the array (and optionally delete the file from
 *   `public/audio/`).
 *
 * HOW TO RENAME A RECORDING
 *   Change the `title` value. The `id` can stay the same.
 *
 * HOW TO CHANGE A CATEGORY
 *   Change `category` to one of: "Character" | "Animation" | "Video Games" |
 *   "Narration" | "Commercial" | "Other". Filters update automatically.
 *
 * HOW TO REORDER RECORDINGS
 *   Move the objects up or down in the array. Track numbers are generated
 *   from the array order, so no other change is needed.
 *
 * HOW TO CHOOSE THE FEATURED SHOWREEL
 *   Set `featured: true` on exactly one recording. It plays in the hero
 *   console. If none are featured, the hero shows a friendly
 *   "showreel unavailable" state.
 *
 * HOW TO ENABLE OR DISABLE DOWNLOADING
 *   Set `downloadable: true` to show a download control, `false` to hide it.
 *
 * NOTE: `isSample: true` marks temporary placeholder audio so it is clearly
 * labelled on the site. Remove that flag once a real recording is uploaded.
 */

export type VoiceDemoCategory =
  | "Character"
  | "Animation"
  | "Video Games"
  | "Narration"
  | "Commercial"
  | "Other";

export type VoiceDemo = {
  id: string;
  title: string;
  category: VoiceDemoCategory;
  description?: string;
  audioFile: string;
  downloadable: boolean;
  featured: boolean;
  /** Temporary placeholder audio, shown with a "SAMPLE" label. */
  isSample?: boolean;
};

export const categories: Array<"All" | VoiceDemoCategory> = [
  "All",
  "Character",
  "Animation",
  "Video Games",
  "Narration",
  "Commercial",
  "Other",
];

export const voiceDemos: VoiceDemo[] = [
  {
    id: "showreel",
    title: "Showreel",
    category: "Other",
    description: "A short run through range, tone and character switches.",
    audioFile: "/audio/sample-1.mp3",
    downloadable: true,
    featured: true,
    isSample: true,
  },
  {
    id: "character-01",
    title: "Small creature, big opinions",
    category: "Character",
    description: "Bright, squeaky, a little bit rude.",
    audioFile: "/audio/sample-2.mp3",
    downloadable: true,
    featured: false,
    isSample: true,
  },
  {
    id: "animation-01",
    title: "Best friend energy",
    category: "Animation",
    description: "Warm and bouncy read for a series pilot.",
    audioFile: "/audio/sample-3.mp3",
    downloadable: false,
    featured: false,
    isSample: true,
  },
  {
    id: "games-01",
    title: "Quest giver",
    category: "Video Games",
    description: "Calm, steady, gently mysterious.",
    audioFile: "/audio/sample-4.mp3",
    downloadable: true,
    featured: false,
    isSample: true,
  },
  {
    id: "narration-01",
    title: "Long form narration",
    category: "Narration",
    description: "Even pacing for explainers and documentaries.",
    audioFile: "/audio/sample-5.mp3",
    downloadable: false,
    featured: false,
    isSample: true,
  },
  {
    id: "commercial-01",
    title: "Friendly brand read",
    category: "Commercial",
    description: "Conversational, upbeat, thirty second spot.",
    audioFile: "/audio/sample-6.mp3",
    downloadable: true,
    featured: false,
    isSample: true,
  },
  {
    id: "other-01",
    title: "Silly voices reel",
    category: "Other",
    description: "Odds and ends from recording sessions.",
    audioFile: "/audio/sample-7.mp3",
    downloadable: false,
    featured: false,
    isSample: true,
  },
];

export const featuredDemo = voiceDemos.find((demo) => demo.featured) ?? null;
