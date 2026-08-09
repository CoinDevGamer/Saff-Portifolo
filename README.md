# Saff's Pastel Studio

Build a brand-new, complete, responsive portfolio website for a voice actor named Saff.

This should not look like a generic portfolio template or an AI-generated landing page. Give Saff a distinctive visual identity built around voice, performance, sound, and personality.

The website should be simple to use, but visually exceptional. Every visual decision should feel intentional.

## Brand personality

Saff’s website should feel:

* Cute without being childish
* Playful without becoming chaotic
* Creative without sacrificing usability
* Friendly and approachable
* Expressive and memorable
* Suitable for animation, games, narration, characters, and commercial projects
* Personal rather than corporate

Do not make the overall website Roblox-themed. Roblox should appear only as one possible payment method.

## Creative concept

Create a “Pastel Broadcast Studio.”

Combine the visual language of:

* A modern recording studio
* An independent music magazine
* A playful audio interface
* A carefully designed personal portfolio

Use:

* Pastel colour blocks
* Strong dark outlines
* Solid offset shadows
* Sound waves
* Track numbers
* Studio labels
* Audio-console controls
* Small handwritten annotations
* Slightly asymmetric editorial layouts

Keep this as one coherent design system. Do not combine unrelated themes such as scrapbooking, brutalism, glassmorphism, photorealistic cassettes, 3D objects, and torn paper.

## Colour palette

Use:

* Warm paper: `#FFF8EE`
* Bubblegum pink: `#FFB7D5`
* Periwinkle: `#BDB8FF`
* Sky blue: `#A9DDF2`
* Butter yellow: `#FFE78F`
* Mint green: `#BFE8D0`
* Dark ink: `#28222D`
* White: `#FFFFFF`

Use flat colours only.

Use dark `2px` outlines and occasional solid offset shadows such as:

```css
box-shadow: 5px 5px 0 #28222D;
```

Do not apply a border, shadow, or pastel background to every element. Create visual hierarchy.

## Typography

Use:

* Bricolage Grotesque for expressive display headings
* DM Sans for body text, navigation, and controls
* A handwritten font only for tiny annotations

Typography should be one of the main visual features of the website.

Do not use a traditional serif portfolio style.

## Strict restrictions

* Do not use AI-generated images.
* Do not use stock images.
* Do not use fake photographs.
* Do not create a Roblox avatar or character render.
* Do not use gradients.
* Do not use glassmorphism.
* Do not use glowing effects.
* Do not create a generic centred-column landing page.
* Do not place every section inside a rounded white card.
* Do not use pill-shaped buttons everywhere.
* Do not add meaningless floating shapes.
* Do not use excessive empty space.
* Do not add fake testimonials.
* Do not invent clients, awards, experience, or completed projects.
* Do not add a contact form.
* Do not build a fake payment checkout.
* Do not use an em dash anywhere in the public website copy.
* Do not display developer instructions or file paths to public visitors.

## Layout system

Use a maximum content width of approximately `1280px`.

Use a 12-column grid on desktop.

Use asymmetric compositions while preserving clear alignment and reading order.

The website should contain:

1. Navigation
2. Hero and featured showreel
3. Voice demo library
4. About Saff
5. Pricing calculator
6. Payment details
7. Footer

Use coloured section backgrounds and bold section dividers instead of a long sequence of white cards.

## Navigation

Create a compact sticky navigation strip.

Left side:

`saff ♫₊⊹`

Right side:

* Demos
* About
* Pricing
* Build a quote

Give the logo a custom typographic treatment.

The navigation should resemble a clean studio-control strip, with a dark bottom border and a small “LIVE” indicator.

The active navigation item should use a rectangular pastel underline or label.

The “Build a quote” button should look like a tactile studio control:

* Slightly rounded corners
* Dark outline
* Solid offset shadow
* Clear pressed state

Do not use a generic pill-shaped CTA.

On mobile, use a simple accessible menu button.

## Hero section

Make the hero the strongest part of the website.

Use an asymmetric two-part layout.

### Hero identity

Display Saff’s name as a custom wordmark:

“Saff.”

Make the wordmark expressive. Allow letters to sit on slightly different baselines or interact with flat pastel blocks and a waveform line.

Use a responsive size such as:

```css
font-size: clamp(4.5rem, 10vw, 9rem);
```

Below it, display:

“Voice actor for characters, animation, games, narration and creative projects.”

Add a small handwritten annotation:

“have a listen ♫”

Add two distinctive controls:

* Play showreel
* Build a quote

Do not use generic rounded pill buttons.

### Featured showreel

Build the featured showreel directly into the hero as a pastel broadcast console.

Include:

* Track title
* Category
* Play and pause button
* Current playback time
* Total duration
* Seek bar
* Volume control
* Optional download control
* Animated waveform
* “ON AIR” indicator

The player must use real HTML audio functionality.

The main play button should be visually prominent and easy to understand.

When audio plays:

* Activate the “ON AIR” light
* Animate the waveform
* Change the player’s shadow position slightly
* Change the play icon to pause
* Update the playback time correctly

When audio pauses or ends:

* Stop the waveform animation
* Deactivate the “ON AIR” light
* Restore the correct play icon

Do not create a normal white audio card.

If no featured audio has been uploaded, show a friendly unavailable state. Do not expose a file path or developer message.

## Voice demo library

Use the heading:

“Pick a voice. Press play.”

Supporting text:

“Character work, animation, games, narration and more.”

Create rectangular studio-channel filters:

* All
* Character
* Animation
* Video Games
* Narration
* Commercial
* Other

Do not use generic rounded filter pills.

Display voice demos as numbered studio tracks.

Each track must include:

* Track number
* Recording title
* Category
* Optional short description
* Duration
* Play and pause control
* Compact waveform
* Seek functionality
* Optional download control

Inactive tracks should remain compact.

When a visitor selects or plays a track:

* Pause the previously active recording
* Expand the selected track
* Reveal the complete waveform and seek controls
* Change the track’s pastel background
* Add a small “NOW PLAYING” label
* Preserve a stable layout without large jumps

Alternate between the approved pastel colours while keeping all track controls consistent.

Do not present placeholder recordings as real professional work. Clearly label temporary content as a sample.

## Audio-file management

Visitors must not be able to upload recordings.

Create a single data file:

`src/data/voiceDemos.ts`

Each recording should support:

```ts
type VoiceDemo = {
  id: string;
  title: string;
  category:
    | "Character"
    | "Animation"
    | "Video Games"
    | "Narration"
    | "Commercial"
    | "Other";
  description?: string;
  audioFile: string;
  downloadable: boolean;
  featured: boolean;
};
```

Store recordings inside:

`public/audio/`

Add developer comments inside the data file explaining how to:

* Add a recording
* Remove a recording
* Rename a recording
* Change its category
* Reorder recordings
* Choose the featured showreel
* Enable or disable downloading

Use `preload="metadata"` where appropriate. Do not download every complete audio file when the page first loads.

Do not add Supabase, authentication, a database, or an admin dashboard.

## About section

Use the heading:

“A little about me”

Use this temporary biography:

“Hi, I’m Saff. I enjoy experimenting with different voices and helping characters and ideas feel more expressive. I’m open to animation, games, narration and other creative voice work.”

Present this section like clean album liner notes or studio credits.

On the opposite side, display:

“Available for”

* Character voices
* Animation
* Video games
* Narration
* Commercial work
* Independent projects

Present these services as rectangular studio labels or credit lines, not rounded tags.

Include one subtle CSS or SVG microphone-cable line connecting parts of the composition.

Do not include a photograph or generated image.

## Pricing calculator

Use the heading:

“Build your quote”

Supporting text:

“Add the lines you need for a quick project estimate.”

Design the calculator as a compact pastel mixing console.

Use a split layout:

* Line controls on the left
* Estimate receipt on the right

### Payment currency

Create a tactile physical-style switch for:

* USD
* Robux

Do not calculate Robux using a live exchange rate. Use the separate fixed prices supplied below.

### Short lines

Display:

“Short lines”

“Around 10 words or fewer”

Prices:

* `$4 per line`
* `800 Robux per line`

### Long lines

Display:

“Long lines”

“More than 10 words”

Prices:

* `$6 per line`
* `1,000 Robux per line`

Each line type must have:

* Minus button
* Current quantity
* Plus button
* Minimum value of zero
* Keyboard input support
* Accessible labels

Style the controls like square mixer buttons or mechanical counters. Keep them obvious and easy to use.

### Calculation logic

Use this exact logic:

```ts
const totalLines = shortLines + longLines;

const usdSubtotal = shortLines * 4 + longLines * 6;
const usdEstimate = totalLines === 0 ? 0 : Math.max(10, usdSubtotal);

const robuxSubtotal = shortLines * 800 + longLines * 1000;
const robuxEstimate = totalLines === 0 ? 0 : Math.max(3000, robuxSubtotal);
```

Minimum project fee:

* `$10 USD`
* `3,000 Robux`

When no lines are selected, show `$0` or `0 Robux`.

Once at least one line is selected, apply the relevant minimum project fee when the subtotal is lower than the minimum.

### Estimate panel

Style the result like a clean studio receipt or printed session summary.

Show:

* Number of short lines
* Number of long lines
* Line subtotal
* Minimum-fee adjustment, when applicable
* Estimated total
* Reset button

When the minimum fee applies, display:

“The minimum project fee has been applied.”

Below the total, display:

“This is an estimate, not a final invoice. Pricing is negotiable depending on the project.”

Format Robux amounts with commas.

## What the price includes

Display:

“What’s included”

* Up to 3 takes per line
* Basic clean-up and editing

Keep this visually connected to the calculator.

Do not add services or fees that Saff has not provided.

## Payment details

Integrate payment details beneath the estimate.

USD payment:

* Label: `PayPal`
* Display: `paypal.me/s4ffvcer`
* Link: `https://paypal.me/s4ffvcer`

Robux payment:

* Label: `Roblox`
* Display: `@objectorator`
* Link: `https://www.roblox.com/users/2429226044/profile`

Also display:

“Gift cards may be accepted according to their USD value, rounded up to an available gift-card amount.”

Add:

“Please confirm the project and final price with Saff before sending payment.”

External links must open safely using:

```html
target="_blank"
rel="noopener noreferrer"
```

Do not request payment details through the website.

## Motion and tween system

Motion should communicate interaction and audio state. Do not add movement simply for decoration.

Animate only transform and opacity where possible.

Use this easing for smooth entrances:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

### Initial page entrance

Animate:

1. Logo
2. Hero wordmark
3. Supporting copy
4. Featured audio console

Use a short stagger of approximately `70ms`.

Each element should transition from:

* `opacity: 0`
* `translateY: 12px`

To:

* `opacity: 1`
* `translateY: 0`

Complete the full entrance within approximately `650ms`.

Do not replay the entire entrance after internal navigation.

### Buttons

Hover:

* Move upward by `2px`
* Increase the visible offset shadow
* Duration: `160ms`

Pressed:

* Scale to `0.97`
* Move toward the shadow
* Duration: `90ms`

Release:

* Return over `180ms`

Do not add repeated bouncing.

### Audio player

When play is pressed:

* Transition the play icon into pause over `160ms`
* Activate “ON AIR” over `180ms`
* Shift the console shadow over `220ms`
* Start the waveform animation

Animate waveform bars using:

```css
transform: scaleY();
transform-origin: bottom;
```

Use deterministic durations between approximately `420ms` and `760ms`.

Animate waveforms only while the corresponding recording is playing.

### Demo tracks

When a track becomes active:

* Change the background colour over `220ms`
* Move it upward by `3px`
* Reveal additional controls over `280ms`
* Display “NOW PLAYING” with a short fade

Avoid abrupt height jumps.

### Calculator

When plus or minus is pressed:

* Compress the control for `90ms`
* Scale the quantity to `1.12`
* Return it to normal over `180ms`

When the total changes:

* Fade from `opacity: 0.65` to `1`
* Move from `translateY(5px)` to `0`
* Duration: `220ms`

Currency switch:

* Move over `240ms`
* Keep the calculator dimensions stable
* Update all displayed prices immediately and accurately

### Scroll reveals

Reveal each major section once using:

* `opacity: 0` to `1`
* `translateY: 18px` to `0`
* Duration: `420ms`
* Trigger when approximately `20%` of the section is visible

Stagger only the main immediate children by `50ms`.

Do not animate every paragraph or icon separately.

### Reduced motion

Respect `prefers-reduced-motion`.

When enabled:

* Remove scroll reveals
* Remove decorative looping animation
* Remove scaling and translation
* Preserve immediate functional state changes
* Keep audio and calculator functionality complete

## Accessibility

* Use semantic HTML.
* Support keyboard navigation.
* Add visible focus states.
* Ensure buttons have accessible names.
* Make every touch target at least `44px`.
* Use `aria-live="polite"` for calculator-total changes.
* Do not rely on colour alone to communicate playback state.
* Ensure text contrast meets accessibility requirements.
* Keep audio controls usable by keyboard and screen reader.
* Ensure the website remains understandable if animations are disabled.

## Mobile design

Design mobile intentionally.

* Stack the wordmark above the featured player.
* Keep the featured play button visible near the top.
* Use full-width demo tracks.
* Keep category filters horizontally scrollable if necessary.
* Stack calculator controls above the estimate.
* Reduce nonessential decoration.
* Prevent horizontal overflow.
* Preserve all audio features.
* Keep line-counter buttons large enough to tap.
* Do not simply shrink the desktop website.

## Technical quality

* Use React and TypeScript.
* Create reusable components.
* Create one reusable `VoiceDemoPlayer`.
* Create one reusable `LineCounter`.
* Keep pricing values inside `src/data/pricing.ts`.
* Do not scatter hardcoded prices across components.
* Keep audio data inside `src/data/voiceDemos.ts`.
* Use CSS transitions for simple tweens.
* Only use an animation library if it is already installed.
* Do not install a large dependency for basic animations.
* Avoid unnecessary re-renders during audio playback.
* Do not leave console errors.
* Do not leave TypeScript errors.
* Do not create nonfunctional buttons.
* Optimise loading performance.
* Add appropriate page title, description, and social metadata.

## Final result

The completed website should feel like entering Saff’s personal voice studio.

Its most memorable features should be:

* The expressive Saff wordmark
* The featured “ON AIR” showreel console
* The colourful studio-track demo library
* The interactive mixing-console quote calculator
* The precise and satisfying motion system

Keep it visually impressive through art direction, hierarchy, typography, colour, and interaction quality. Do not make it impressive by adding unnecessary clutter.

Build the complete working website now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3e5c8c21-53f6-477c-9f61-bdced35a8cad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
