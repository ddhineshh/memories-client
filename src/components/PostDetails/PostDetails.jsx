import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link, useHistory, useParams } from 'react-router-dom';

import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

const PostDetails = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const { post, posts, isLoading } = useSelector(state => state.posts);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);


  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  else if (!post) return null;


  const recommendedPosts = posts.filter(({ _id }) => post._id !== _id);

  const openPost = (_id) => history.push(`/post/${_id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post?.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag, index) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }} key={index} >
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post?.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post?.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='' />
        </div>
      </div>
      {
        recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography variant="h5" gutterBottom>You might also like</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {
                recommendedPosts.map(({ title, message, name, likeCount, selectedFile, _id }) => (
                  <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id} >
                    <Typography variant='h6' gutterBottom >{title}</Typography>
                    <Typography variant='subtitle2' gutterBottom >{name}</Typography>
                    <Typography variant='subtitle2' gutterBottom >{message}</Typography>
                    <Typography variant='subtitle1' gutterBottom >Likes: {likeCount?.length}</Typography>
                    <img className={classes.recommendedPostsImage} src={selectedFile} width='200px' alt=''/>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </Paper>
  )
}

export default PostDetails