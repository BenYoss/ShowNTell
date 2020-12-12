import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegCommentDots, FaTimes, FaGift } from 'react-icons/fa';
import './homefeed.css';
import ReactGiphySearchbox from 'react-giphy-searchbox';

const Reply = ({ id, place, user, setPosts }) => {
  const [feed, setFeed] = useState();
  const [message, setMessage] = useState();
  const [name, setName] = useState();
  const [test, setTest] = useState();
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState('');
  const [array, setArray] = useState([]);
  const [currentLike, setCurrentLike] = useState();
  const [number, setNumber] = useState('');
  const [gifView, setgifView] = useState(false);

  const getFeed = () => {
    if (!feed) {
      axios.get(`/feeds/${id}`)
        .then(({ data }) => {
          setFeed(data._id);
          setMessage(data.content);
          setTest(data.user);
          setArray(data.comment);
          setCurrentLike(data.likes.includes(user.id));
          setNumber(data.likes.length);
        });
    }
  };

  const getName = () => {
    if (test && !name) {
      axios.get(`/postUser/${test}`)
        .then(({ data }) => {
          setName(data.name);
        }).catch();
    }
  };
  const gifPost = (gif) => {
    setgifView(false);
    axios.post('/replys/gif', { url: gif.images.original.url, slug: gif.slug, feed })
      .then(({ data }) => {
        setArray(data.comment);
        axios
          .get('/posts')
          .then((result) => {
            setPosts(result.data);
          });
      });
  };

  return (
    <div>
      <div className="comment">
        {getFeed()}
        {getName()}
        <div className="comment-author">{name || null}</div>
        <small id="comment-content">{`${message}` || null}</small>
        <br />
        <img src={message} alt="" />
        <div className="like-count">{number}</div>
        <FaHeart
          className={currentLike ? 'liked-button' : 'post-like-btn'}
          onClick={() => {
            axios.get(`/likedPost/${id}`)
              .then(() => {
                if (currentLike) {
                  setNumber(number - 1);
                } else {
                  setNumber(number + 1);
                }
                setCurrentLike(!currentLike);
                axios
                  .get('/posts')
                  .then((result) => {
                    setPosts(result.data);
                  });
              });
          }}
        >
          {currentLike ? 'unlike' : 'like'}
        </FaHeart>
        <div>
          {
          reply ? (
            <div className="comment-box">
              <input
                className="reply-comment-txt-box"
                placeholder="what are your thoughts?"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button
                className="submit-reply-comment-btn"
                onClick={() => {
                  setReply(false);
                  axios.post(`/replys/${feed}/${content}`)
                    .then(({ data }) => {
                      setContent('');
                      setArray(data.comment);
                      axios
                        .get('/posts')
                        .then((result) => {
                          setPosts(result.data);
                        });
                    });
                }}
              >
                submit
              </button>
              <FaTimes
                className="x-btn"
                onClick={() => {
                  setReply(false);
                }}
              />
            </div>
          ) : <FaRegCommentDots className="post-comment-btn" onClick={() => setReply(true)} />
        }
          {!gifView && (
            <FaGift
              className="gif-button-2"
              onClick={() => setgifView(true)}
            />
          )}
        </div>

        <div className="post-comment-btn">
          {gifView && (
            <div className="comment-box">
              <FaTimes
                className="gif-x-btn"
                onClick={() => {
                  setgifView(false);
                }}
              />
              <ReactGiphySearchbox apiKey={process.env.GIPHY} onSelect={(item) => gifPost(item)} />
            </div>
          )}
        </div>

      </div>
      <div style={{ left: `${place}px`, position: 'relative' }}>
        {array.map((value, i) => {
          return (<Reply key={value + i} id={value} user={user} place={place + 75} />);
        })}
      </div>
    </div>
  );
};

export default Reply;
