import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as PostActions } from "../redux/modules/Post_module";
import { actionCreators as userActions } from '../redux/modules/User_module';
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements/Index";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;


  React.useEffect(() => {
    dispatch(userActions.loginDB());
    if (post_list.length < 2) {
      dispatch(PostActions.getPostDB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"} padding="20px 0px">
        <InfinityScroll
          callNext={() => {
            console.log("next!");
            // dispatch(PostActions.getPostFB(paging.next));
          }}
          // is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {Object.keys(post_list).map((i) => {
            return (
              <Grid
                key={i.id}
                bg="#ffffff"
                _onClick={() => {
                  history.push(`/post/${i.id}`);
                }}
              >
                <Post {...post_list[i]} />
              </Grid>
            );
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  name: "shane",
  image_url: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  skill: "React",
  comment_cnt: 10,
  like_cnt: 0,
  is_like: false,
  introduce: "안녕하세요~~!",
};

export default PostList;
