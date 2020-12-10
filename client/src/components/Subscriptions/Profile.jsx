import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles({
  root: {
    width: '48%',
    position: 'absolute',
    top: '25%',
    marginRight: '-50px',
    marginLeft: '40px',
  },
  media: {
    height: 550,
    width: '100%',
    objectFit: 'cover',
  },
  space: {
    marginBottom: 15,
  },
});

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    // state will equal info from the currently logged in user OR these default values
    image: '', show: 'Share your favorite show!', description: 'Say a little about yourself!',
  });

  //  USE USE EFFECT HERE
  // const getCurrentUser = () => {
  //   return axios.get('/user')
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleClickOpen = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const showChange = (e) => {
    const favShow = e.target.value;
    setValues({ ...values, show: favShow });
  };

  const descriptionChange = (e) => {
    const des = e.target.value;
    setValues({ ...values, description: des });
  };

  const handleSubmit = () => {
    // retrieve the data from the DialogContent
    setOpen(false);
    // axios.post('')
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.uoh.cl/assets/img/no_img.jpg"
        />
        <CardContent>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            style={{ fontWeight: 'fontWeightBold', fontSize: 25, color: '#000000' }}
          >
            My current favorite show:
          </Typography>
          <Typography
            className={classes.space}
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: 20, color: '#3588C8' }}
          >
            { values.show }
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            style={{ fontWeight: 'fontWeightBold', fontSize: 25, color: '#000000' }}
          >
            About Me:
          </Typography>
          <Typography
            className={classes.space}
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: 25, color: '#3588C8' }}
          >
            { values.description }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Edit Profile
        </Button>
        <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="show"
              label="current favorite show"
              type="text"
              fullWidth
              onChange={showChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="about me"
              type="text"
              fullWidth
              onChange={descriptionChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit Changes
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
