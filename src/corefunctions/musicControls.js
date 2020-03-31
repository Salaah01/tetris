/**Helper functions to easily play and pause the music. */
const musicElement = () => document.getElementById("tetris-music");

export const playMusic = () => musicElement().play();
export const pauseMusic = () => musicElement().pause();
