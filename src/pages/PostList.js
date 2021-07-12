import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreator as PostActions } from "../redux/modules/Post_module";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements/Index";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  React.useEffect(() => {
    if (post_list < 2) {
      // dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"} padding="20px 0px">
        <InfinityScroll
          callNext={() => {
            console.log("next!");
            // dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            return (
              <Grid
                key={p.id}
                bg="#ffffff"
                _onClick={() => {
                  history.push(`/post/${p.id}`);
                }}
              >
                <Post {...p} />
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
