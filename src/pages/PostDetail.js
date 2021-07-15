import React from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { Grid } from '../elements/Index';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as detailActions } from '../redux/modules/Detail_module';

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail.info);
  const comment_list = useSelector((state) => state.detail.info.comments);

  let href = window.location.href;
  let user_id = href.substring(href.lastIndexOf('/') + 1);

  console.log(detail.introduce);

  React.useEffect(() => {
    dispatch(detailActions.getDetailDB(user_id));
  }, []);

  return (
    <React.Fragment>
      <Grid height="100vh">
        <Grid width="400px" margin="auto">
          <Post {...detail} />
        </Grid>
        <Grid width="70%" margin="auto">
          <CommentWrite post_id={user_id} />
          <CommentList {...comment_list} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
