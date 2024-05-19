import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {

  const classes = useStyles();

  const post = useSelector(state => currentId ? state.posts.posts.find(post => post._id === currentId) : null);

  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: "", message: "", tags: "", selectedFile: ""
  });

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name },history));
    }
    clear();
  };
  const clear = (e) => {
    setCurrentId(null);
    setPostData({
      title: "", message: "", tags: "", selectedFile: ""
    });
  };

  if (!user?.result?.name) {
    return (

      <Paper className={classes.paper} elevation={6} >
        <Typography variant="h6" align="center" >
          Please Login to continue
        </Typography>
      </Paper>
    )

  }

  return (
    <Paper className={classes.paper} elevation={6} >
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} />
        <TextField name='message' variant='outlined' label='Message..' fullWidth value={postData.message} onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }} />
        <TextField name='tags' variant='outlined' label='Tags' placeholder='Eg: nature,trees,cars' fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(',') }) }} />
        <div className={classes.posfileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>clear</Button>
        </div>
      </form>
    </Paper>
  )
}

export default Form