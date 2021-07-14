import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as PostActions } from "../redux/modules/Post_module";
import { actionCreators as userActions } from "../redux/modules/User_module";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements/Index";
import { getCookie } from "../shared/Cookie";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const is_loading = useSelector((state) => state.post.is_loading);

  const { history } = props;

  React.useEffect(() => {
    if (getCookie('is_login') == 'true') {
      dispatch(userActions.loginDB());
    }

    if (post_list.length < 2) {
      dispatch(PostActions.getPostDB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"} padding="20px 0px">
        <InfinityScroll loading={is_loading}>
          {Object.keys(post_list).map((i, idx) => {
            return (
              <Grid
                key={post_list[i].id}
                bg="#ffffff"
                margin="8px 0px"
                _onClick={() => {
                  history.push(`/post/${i.id}`);
                }}
              >
                <Post key={post_list[i].id} {...post_list[i]} />
              </Grid>
            );
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  id: "1",
  name: "shane",
  image_url: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  skill: "React",
  comment_cnt: 10,
  like_cnt: 0,
  is_like: false,
  introduce: "안녕하세요~~!",
};

export default PostList;
