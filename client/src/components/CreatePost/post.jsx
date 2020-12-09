import React, { useState } from 'react';
import axios from 'axios';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
import './post.css';
import pic from './createpost.png';

const Post = ({ user, createPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [show, setShow] = useState('none');
  const [error, setError] = useState('');
  const [subs, setSubs] = useState([]);
  const [gotSubs, setGotSubs] = useState(false);
  console.warn(content);
  const test = new FroalaEditor('textarea');

  const config = {
    placeholder: 'Edit Me',
    events: {
      focus(e, editor) {
        console.warn(editor.selection.get());
      },
    },
  };

  const onClick = () => {
    if (show !== 'none' && title !== '') {
      createPost({ title, content, show, poster: user._id });
      setTitle('');
      setContent('');
    } else if (title === '') {
      setError('Must have a title.');
    } else if (show === 'none') {
      setError('Please choose a show to talk about.');
    }
  };

  const getSubs = () => {
    if (!gotSubs) {
      const promises = user.subscriptions.map((showId) => axios.get(`/show/${showId}`).catch());
      Promise.all(promises)
        .then((results) => results.map((sub) => sub.data))
        .then((shows) => {
          setSubs(shows);
          setGotSubs(true);
        })
        .catch();
    }
  };

  return (
    <div>
      <h1 id="header">Create a post</h1>
      <div id="post-sub-header"> share your thoughts with the world!</div>
      <div className="create-post-form">
        <select className="choose-show" onChange={(e) => setShow(e.target.value)}>
          <option className="choose-show" value="none">Choose a Show</option>
          {subs.map((sub, i) => <option key={sub + i} value={sub.id}>{sub.name}</option>)}
          {getSubs()}
        </select>
        <div className="title-container">
          <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
        </div>
        <div className="content-container">
          <FroalaEditor tag="textarea" id="post-text" model={content} onModelChange={(e) => setContent(e)} placeholder="what's your message?" />
        </div>
        <button id="submit-button" onClick={onClick}>submit post</button>
        <h4 id="error-message">{error}</h4>
      </div>
      <img id="pic" src={pic} alt="pic" />
    </div>
  );
};

export default Post;
