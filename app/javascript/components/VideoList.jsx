// import React from 'react';
import React, { useState, useEffect } from "react";
// import "./styles.scss";
import Axios from "axios";
import Video from './Video';
import ShareVideo from "./ShareVideo";

function VideoList() {
  const [videos, setVideos] = useState([]);

  const handleSubmitVideo = (url, handleClose) => (e) => {
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/movies.json',
      data: { authenticity_token: localStorage.authToken, movie: { youtube_url: url } }
    }).then((response) => {
      setVideos([response.data.movie, ...videos])
      handleClose();
    })
    .catch(() => {
      handleClose();
    });
    handleClose();
  }

  const fetchVideos = async () => {
    const { data } = await Axios.get(
      "/movies.json"
    );
    const videos = data;
    setVideos(videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      { localStorage.currentUser !== '' && <ShareVideo handleSubmitVideo={ handleSubmitVideo }/> }
      {
        (videos.length > 0) ?
            (videos.map((video) =>
              <Video key={ video["id"] } video={ video }/>)) :
          <p>No movies are shared yet.</p>
      }
    </>

  );
}

export default VideoList;
