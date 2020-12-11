import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '48%',
    position: 'absolute',
    top: '25%',
    marginRight: '-50px',
    marginLeft: '40px',
    borderRadius: '20px',
  },
  media: {
    height: 550,
    width: '100%',
    objectFit: 'cover',
  },
  space: {
    marginBottom: 15,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    image: '', show: '', description: '', id: '',
  });

  useEffect(() => {
    return axios.get('/user')
      .then(({ data }) => {
        setValues({ ...values,
          image: data.image !== undefined ? data.image : 'https://www.uoh.cl/assets/img/no_img.jpg',
          show: data.favShow !== undefined ? data.favShow : 'Share your favorite show!',
          description: data.description !== undefined ? data.description : 'Say a little about yourself!',
          id: data._id !== undefined ? data._id : null });
      })
      .catch((err) => console.warn(err));
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    const newInfo = {
      image: values.image,
      show: values.show,
      description: values.description,
      id: values.id,
    };
    setOpen(false);
    axios.put('user/profile', { newInfo });
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={values.image}
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
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="about me"
              type="text"
              fullWidth
              onChange={handleChange}
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
