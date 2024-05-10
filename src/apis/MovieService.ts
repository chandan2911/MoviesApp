import Api from './apis';

export default class MovieService {
  static async getMoviesByYear(year: number, page: number) {
    const sortBy = 'popularity.desc';
    const voteCount = 100;
    const response = await Api.get('/discover/movie', {
      params: {
        primary_release_year: year,
        page: page,
        sort_by: sortBy,
        'vote_count.gte': voteCount,
      },
    });
    return response;
  }
  static async getMoviesByGenre(genreId: number, page: number, year: number) {
    const sortBy = 'popularity.desc';
    const voteCount = 100;
    const response = await Api.get('/discover/movie', {
      params: {
        with_genres: genreId.toString(),
        page: page,
        sort_by: sortBy,
        'vote_count.gte': voteCount,
        primary_release_year: year,
      },
    });
    return response;
  }
  static async getGenres() {
    const response = await Api.get('/genre/movie/list');
    return response;
  }
  static async getBySearch(query: string, page: number) {
    const response = await Api.get('/search/movie', {
      params: {
        query: query,
        page: page,
        include_adult: false,
      },
    });
    return response;
  }
}
