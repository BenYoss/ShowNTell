import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FeedItem from './feedItem.jsx';

import './homefeed.css';

const HomeFeed = ({ posts, handleUserClick, user, setPosts }) => (
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

export default HomeFeed;
