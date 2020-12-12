import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FeedItem from './feedItem.jsx';

import './homefeed.css';

const HomeFeed = ({ posts, handleUserClick, user, setPosts }) => {
  const [selectPost, setSelectPost] = useState('');

  const useStyles = makeStyles((theme) => ({
    hide: {
      display: 'none',
    },
    drawer: {
      width: 1000,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: 1000,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }));

  return (
    <div>
      <div className="home-title"> Home feed</div>
      <div className="home-feed-container">
        {posts
          ? posts.map((post, i) => (
            <FeedItem
              handleUserClick={handleUserClick}
              post={post}
              setPosts={setPosts}
              key={post + i}
              user={user}
            />
          ))
          : null}
      </div>
    </div>
  );
};

export default HomeFeed;
