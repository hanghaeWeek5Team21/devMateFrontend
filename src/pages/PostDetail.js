import React from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
// import Permit from '../shared/Permit';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/Post_module';

const PostDetail = (props) => {
  // const dispatch = useDispatch();
  console.log(props);
  // const id = props.match.params.id;

  // const post_list = useSelector((store) => store.post.list);

  // const post_idx = post_list.findIndex((p) => p.id === id);
  // const post = post_list[post_idx];

  // React.useEffect(() => {
  //   if (post) {
  //     return;
  //   }

  //   dispatch(postActions.getOnePostFB(id));
  // }, []);

  return (
    <React.Fragment>
      {/* {post && <Post {...post} />}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} /> */}
      <Post />
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
