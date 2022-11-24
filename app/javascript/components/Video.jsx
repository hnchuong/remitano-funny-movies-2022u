import React, { useState } from 'react';
import Axios from "axios";

function Video({ video }) {
  const [upCount, setUpCount] = useState(video.up_count);
  const [downCount, setDownCount] = useState(video.down_count);
  const [currentVote, setCurrentVote] = useState(video.current_vote);

  handleVote = (movieId, voteType) => () => {
    Axios({
      method: 'post',
      url: '/movies/'+ movieId + '/vote',
      data: { authenticity_token: localStorage.authToken, movie: { id: movieId, type: voteType} }
    }).then((response) => {
      if (voteType == 'up') {
        setUpCount(upCount => upCount + 1);
        setCurrentVote('up');
      } else {
        setDownCount(downCount => downCount + 1);
        setCurrentVote('down');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="video d-flex flex-row">
      <div className="video-emb" dangerouslySetInnerHTML={{__html: video.embed_code}}/>

      <div className="video-info d-flex flex-wrap">
        <div className="flex-grow-1">
          <p className="title">{ video.title }</p>
          <p className="user">Shared by { video.username }</p>
          <p className="like-count">
            { upCount }
            <i className='bi-hand-thumbs-up'></i>
            { downCount }
            <i className='bi-hand-thumbs-down'></i>
          </p>
        </div>
        <div className='like-actions'>
          { (currentVote === null || currentVote === '') ?
            <div>
              <i className='bi-hand-thumbs-up' onClick={handleVote(video.id, 'up')}/>
              <i className='bi-hand-thumbs-down' onClick={handleVote(video.id, 'down')}/>
            </div> :
            <div>
              { (currentVote === 'up') && <i className='bi-hand-thumbs-up-fill'/> }
              { (currentVote === 'down') && <i className='bi-hand-thumbs-down-fill'/> }
            </div>
          }
        </div>

        <div className="description-wrapper"><label>Description: </label>
          <div className="description">
            { video.description }
          </div>
        </div>

      </div>

    </div>
  );
}

export default Video;
