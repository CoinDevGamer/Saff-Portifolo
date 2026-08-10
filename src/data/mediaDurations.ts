/** Measured lengths used when browser media metadata does not provide one. */
const mediaDurations: Record<string, number> = {
  "/audio/1 queen marika.mp3": 1.802449,
  "/audio/2 jinx.mp3": 5.276735,
  "/audio/3 relena.mp3": 4.623673,
  "/audio/4 relena.mp3": 4.231837,
  "/audio/5 monotonous evil scientist.mp3": 6.243265,
  "/audio/6 onyx.mp3": 2.873469,
  "/audio/7 onyx.mp3": 2.66449,
  "/audio/Shop_Progress.mp4": 13.737333,
  "/audio/desk agent line 1.mp3": 3.526531,
  "/audio/desk agent line 2.mp3": 3.422041,
  "/audio/finalscene1.mp3": 2.507755,
  "/audio/finalscene2.mp3": 1.959184,
  "/audio/finalscene3.mp3": 2.403265,
  "/audio/finalscene4.mp3": 2.951837,
  "/audio/finalscene4(2).mp3": 2.586122,
  "/audio/finalscene5.mp3": 1.985306,
};

export function getMediaDuration(audioFile: string) {
  return mediaDurations[audioFile] ?? 0;
}
