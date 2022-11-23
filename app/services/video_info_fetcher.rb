class VideoInfoFetcher
  def initialize(youtube_url, user)
    @youtube_url = youtube_url
    @user        = user
  end

  def perform
    video = Movie.new
    return [false, 'Please enter a Youtube Video URL'] if @youtube_url.blank?

    message = nil
    begin
      youtube_video = VideoInfo.new(@youtube_url)
    rescue VideoInfo::UrlError => e
      message = 'Url format is invalid'
    rescue => e
      message = e.message
    end
    if message.present?
      return false, message
    elsif youtube_video.present? && !youtube_video.available?
      return false, 'Video is not available'
    end

    video.title = youtube_video.title
    video.youtube_url = @youtube_url
    video.youtube_id = youtube_video.video_id
    video.description = youtube_video.description
    video.thumbnail = youtube_video.thumbnail_large
    video.embed_url = youtube_video.embed_url
    video.embed_code = youtube_video.embed_code
    video.user = @user
    video.save
    status, message = video.persisted? ?
        [true, 'Movie was successfully created.'] :
        [false, video.errors.full_messages.join(', ')]
    return status, message, video
  end

  def self.perform(youtube_url, user)
    video_fetcher = VideoInfoFetcher.new(youtube_url, user)
    video_fetcher.perform
  end

end