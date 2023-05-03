/**
 * Formats time in seconds to a string in the format of mm:ss
 * @param time Time in seconds
 * @returns Time in the format of mm:ss
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
