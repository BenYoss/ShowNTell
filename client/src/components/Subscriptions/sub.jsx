import React, { useState } from 'react';
import axios from 'axios';
import './sub.css';
import Profile from './Profile.jsx';

const Sub = ({ user, setView }) => {
  const [subs, setSubs] = useState([]);
  const [gotSubs, setGotSubs] = useState(false);

  const getSubs = () => {
    if (!gotSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((show) => show.data))
        .then((shows) => {
          setSubs(shows);
          setGotSubs(true);
        })
        .catch();
    }
  };

  return (
    <div id="profileDiv">
      <Profile />
      <h1 id="header" style={{ position: 'absolute', left: '45%', width: '100%', top: '25%' }}>Subscriptions:</h1>
      <div style={{ position: 'absolute', left: '55%', bottom: '50%', width: '100%' }}>
        {getSubs()}
        {subs.map((sub, i) => (
          <div
            className="sub"
            key={sub + i}
            data-id={sub.id}
            onClick={(e) => setView(e.target.dataset.id)}
          >
            {sub.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sub;
