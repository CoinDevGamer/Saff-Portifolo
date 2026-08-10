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
 * HOW TO ADD SUBTITLES
 *   Add a `subtitles` array to a recording. Times are in seconds:
 *
 *   subtitles: [
 *     { start: 0, end: 2.5, text: "First spoken line" },
 *     { start: 2.5, end: 5.8, text: "Next spoken line" },
 *   ],
 *
 * NOTE: `isSample: true` marks temporary placeholder audio so it is clearly
 * labelled on the site. Remove that flag once a real recording is uploaded.
 */

export type VoiceDemoCategory =
  "Character" | "Animation" | "Video Games" | "Narration" | "Commercial" | "Other";

export type VoiceDemoSubtitle = {
  start: number;
  end: number;
  text: string;
};

export type VoiceDemo = {
  id: string;
  title: string;
  category: VoiceDemoCategory;
  description?: string;
  audioFile: string;
  downloadable: boolean;
  featured: boolean;
  /** Optional timed captions. Start and end values are measured in seconds. */
  subtitles?: VoiceDemoSubtitle[];
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
    id: "queen-marika",
    title: "Queen Marika",
    category: "Video Games",
    description: "A dramatic character performance as Queen Marika.",
    // Audio length: 1.80 seconds
    subtitles: [
      { start: 0, end: 0.8, text: "Have you reconsidered" },
      { start: 0.8, end: 1.8, text: "my offer?" },
    ],
    audioFile: "/audio/1 queen marika.mp3",
    downloadable: true,
    featured: true,
  },
  {
    id: "jinx",
    title: "Jinx",
    category: "Character",
    description: "A lively character voice performance as Jinx.",
    // Audio length: 5.28 seconds
    subtitles: [
      { start: 0, end: 2.1, text: "You're weak." },
      { start: 2.1, end: 3.5, text: "But don't worry." },
      { start: 3.5, end: 5.28, text: "That doesn't matter anymore." },
    ],
    audioFile: "/audio/2 jinx.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "relena-01",
    title: "Relena Take 1",
    category: "Character",
    description: "The first character performance as Relena.",
    // Audio length: 4.62 seconds
    subtitles: [
      { start: 0, end: 2.3, text: "They cannot perceive me." },
      { start: 2.3, end: 4.62, text: "Mere humans, then..." },
    ],
    audioFile: "/audio/3 relena.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "relena-02",
    title: "Relena Take 2",
    category: "Character",
    description: "An alternate character performance as Relena.",
    // Audio length: 4.23 seconds
    subtitles: [
      { start: 0, end: 1.3, text: "I have dwelt here" },
      { start: 1.3, end: 4.23, text: "since the age of wandering spheres." },
    ],
    audioFile: "/audio/4 relena.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "evil-scientist",
    title: "Monotonous Evil Scientist",
    category: "Character",
    description: "A controlled, understated evil scientist character voice.",
    // Audio length: 6.24 seconds
    subtitles: [
      { start: 0, end: 1.1, text: "Hey, hey." },
      { start: 1.1, end: 2.5, text: "Don't be scared." },
      { start: 2.5, end: 4, text: "It will all be over soon." },
      { start: 4, end: 6.24, text: "Ah ha ha ha ha! [Breathes]" },
    ],
    audioFile: "/audio/5 monotonous evil scientist.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "onyx-01",
    title: "Onyx Take 1",
    category: "Character",
    description: "The first character performance as Onyx.",
    // Audio length: 2.87 seconds
    subtitles: [{ start: 0, end: 2.87, text: "Skill matters but so does instinct." }],
    audioFile: "/audio/6 onyx.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "onyx-02",
    title: "Onyx Take 2",
    category: "Character",
    description: "An alternate character performance as Onyx.",
    // Audio length: 2.66 seconds
    subtitles: [
      { start: 0, end: 1.5, text: "Look around." },
      { start: 1.5, end: 2.66, text: "Choose what you need." },
    ],
    audioFile: "/audio/7 onyx.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "shop-progress",
    title: "Shop Progress",
    category: "Video Games",
    description: "A short in-game shop scene performance.",
    // Video length: 13.74 seconds
    subtitles: [
      { start: 0, end: 1.5, text: "Starting..." },
      { start: 1.5, end: 5, text: "Ah, here to decide, are you?" },
      { start: 5, end: 13.73, text: "[Background music]" },
    ],
    audioFile: "/audio/Shop_Progress.mp4",
    downloadable: true,
    featured: false,
  },
  {
    id: "desk-agent-line-01",
    title: "Desk Agent Line 1",
    category: "Video Games",
    description: "The first desk agent dialogue line.",
    // Audio length: 3.53 seconds
    subtitles: [
      { start: 0, end: 1.75, text: "Appointment at 7:45." },
      { start: 1.75, end: 3.52, text: "You have the interview, correct?" },
    ],
    audioFile: "/audio/desk agent line 1.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "desk-agent-line-02",
    title: "Desk Agent Line 2",
    category: "Video Games",
    description: "The second desk agent dialogue line.",
    // Audio length: 3.42 seconds
    subtitles: [
      { start: 0, end: 1.7, text: "Have a seat, please." },
      { start: 1.7, end: 3.42, text: "Mr. Shinohara will be with you shortly." },
    ],
    audioFile: "/audio/desk agent line 2.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "final-scene-01",
    title: "Final Scene Part 1",
    category: "Video Games",
    description: "The first part of the final scene performance.",
    // Audio length: 2.51 seconds
    subtitles: [{ start: 0, end: 2.5, text: "Winter changed everything." }],
    audioFile: "/audio/finalscene1.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "final-scene-02",
    title: "Final Scene Part 2",
    category: "Video Games",
    description: "The second part of the final scene performance.",
    // Audio length: 1.96 seconds
    subtitles: [{ start: 0, end: 1.95, text: "It didn't arrive like a disaster." }],
    audioFile: "/audio/finalscene2.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "final-scene-03",
    title: "Final Scene Part 3",
    category: "Video Games",
    description: "The third part of the final scene performance.",
    // Audio length: 2.40 seconds
    subtitles: [{ start: 0, end: 2.4, text: "It settled. Quietly." }],
    audioFile: "/audio/finalscene3.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "final-scene-04",
    title: "Final Scene Part 4",
    category: "Video Games",
    description: "The fourth part of the final scene performance.",
    // Audio length: 2.95 seconds
    subtitles: [{ start: 0, end: 2.95, text: "At first... it felt normal?" }],
    audioFile: "/audio/finalscene4.mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "final-scene-04-alt",
    title: "Final Scene Part 4 Alternate",
    category: "Video Games",
    description: "An alternate take of the fourth part of the final scene.",
    // Audio length: 2.59 seconds
    subtitles: [{ start: 0, end: 2.58, text: "At first... it felt normal?" }],
    audioFile: "/audio/finalscene4(2).mp3",
    downloadable: true,
    featured: false,
  },
  {
    id: "final-scene-05",
    title: "Final Scene Part 5",
    category: "Video Games",
    description: "The fifth part of the final scene performance.",
    // Audio length: 1.99 seconds
    subtitles: [{ start: 0, end: 1.98, text: "Snowfall came early that year..." }],
    audioFile: "/audio/finalscene5.mp3",
    downloadable: true,
    featured: false,
  },
];

export const featuredDemo = voiceDemos.find((demo) => demo.featured) ?? null;
