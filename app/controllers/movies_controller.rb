class MoviesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :find_movie, only: %w[vote]

  def index
    movies = Movie.limit(10).desc(:id)
    @res = []
    movies.each do |m|
      data = Movie.response_json(m)
      current_vote = user_signed_in? ? m.current_vote(current_user) : nil
      data[:current_vote] = current_vote
      @res << data
    end
    render json: @res
  end

  # Share youtube video
  # POST /movie/share
  def create
    logger.info movie_params.inspect
    successful, message, movie = VideoInfoFetcher.perform(movie_params[:youtube_url], current_user)
    if successful
      response_json(200, 'success', Movie.response_json(movie))
    else
      response_json(406, message)
    end
  end

  # POST /movie/vote
  def vote
    return response_json(404, 'Movie not found') if vote_params[:id].empty?

    vote = Movie.vote(@movie, current_user, vote_params[:type])
    return response_json(406, "Type #{vote_params[:type]} not supported") unless vote

    response_data = Movie.response_json(@movie)
    response_data[:current_vote] = @movie.current_vote(current_user)
    response_json(200, 'success', response_data)
  end

  private

  def movie_params
    params.require(:movie).permit(:youtube_url)
  end

  def vote_params
    params.require(:movie).permit(:id, :type)
  end

  def find_movie
    @movie = Movie.find(vote_params[:id]) unless vote_params[:id].empty?
  rescue => e
    response_json(404, e.message)
  end

  def response_json(code, mess, data = {})
    render json: {
      statusCode: code,
      message: mess,
      movie: data
    }, status: code
  end
end
