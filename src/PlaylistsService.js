const { Pool } = require('pg');

class PlaylistsService {
  constructor(songsService) {
    this._pool = new Pool();
    this._songsService = songsService;
  }

  async getPlaylistSongsByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT playlists.id, playlists.name FROM playlists WHERE playlists.id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const songs = await this._songsService.getSongByPlaylistId(playlistId);

    return {
      playlist: {
        ...result.rows[0],
        songs,
      },
    };
  }
}

module.exports = PlaylistsService;
