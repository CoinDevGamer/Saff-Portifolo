# Voice showcase audio

Put all voice showcase audio files in this folder.

For example, a file stored here as:

```text
public/audio/character-demo.mp3
```

should be linked in `src/data/voiceDemos.ts` as:

```ts
audioFile: "/audio/character-demo.mp3",
```

The same format works for MP4, WAV, and OGG files:

```ts
audioFile: "/audio/short-clip.mp4",
```

File names are case-sensitive after the site is published. Use simple lowercase
names with hyphens, such as `animation-demo.mp3`, and make sure the extension in
`voiceDemos.ts` exactly matches the uploaded file.
