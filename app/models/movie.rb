class Movie
  include Mongoid::Document
  include Mongoid::Timestamps
  include Vote

  field :youtube_id, type: String
  field :title, type: String
  field :description, type: String
  field :youtube_url, type: String
  field :thumbnail, type: String
  field :embed_url, type: String
  field :embed_code, type: String

  belongs_to :user

  validates_presence_of :youtube_id, :youtube_url
  validates_length_of :youtube_id, minimum: 8, maximum: 16

  index({ youtube_id: 1 })

  def self.response_json(movie)
    {
      id: movie.id.to_s,
      youtube_id: movie.youtube_id,
      user_id: movie.user.id.to_s,
      username: movie.user.username,
      description: movie.description,
      title: movie.title,
      thumbnail: movie.thumbnail,
      embed_url: movie.embed_url,
      embed_code: movie.embed_code,
      up_count: movie.up_count.abs,
      down_count: movie.down_count.abs
    }
  end

  def self.vote(movie, user, type)
    return false unless ['up', 'down'].include?(type)

    if type == 'up'
      movie.upvote(user)
    else
      movie.downvote(user)
    end

    movie.save!
  end
end
