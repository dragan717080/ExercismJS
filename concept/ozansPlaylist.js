/**
 * Removes duplicate tracks from a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} new playlist with unique entries
 */
export const removeDuplicates = (playlist) => Array.from(new Set(playlist));

/**
 * Checks whether a playlist includes a track.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {boolean} whether the track is in the playlist
 */
export const hasTrack = (playlist, track) => playlist.includes(track);

/**
 * Adds a track to a playlist.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {string[]} new playlist
 */
export const addTrack = (playlist, track) => !playlist.includes(track) ? [...playlist, track] : playlist;

/**
 * Deletes a track from a playlist.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {string[]} new playlist
 */
export const deleteTrack = (playlist, track) => {
  for (const [index, item] of Object.entries(playlist)) {
    if (item === track) {
      playlist.splice(index, 1);
      break;
    }
  }

  return playlist;
}

/**
 * Lists the unique artists in a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} list of artists
 */
export const listArtists = (playlist) => Array.from(new Set(playlist.map(x => x.split('- ')[1])));
