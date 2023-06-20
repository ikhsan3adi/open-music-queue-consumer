const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1 GROUP BY songs.id',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = SongsService;
