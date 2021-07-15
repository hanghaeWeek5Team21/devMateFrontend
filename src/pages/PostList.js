import React from "react";
import styled from "styled-components";
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

  React.useEffect(() => {
    if (getCookie("is_login") == "true") {
      dispatch(userActions.loginDB());
    }

    dispatch(PostActions.getPostDB());
  }, []);

  return (
    <React.Fragment>
      <WrapPost>
        <InfinityScroll loading={is_loading}>
          {Object.keys(post_list).map((i) => {
            return (
              <WrapPost
                key={post_list[i].id}
                onClick={() => {
                  document.location.href =
                    "/detail/" + post_list[i].id.toString();
                }}
              >
                <Post key={post_list[i].id} {...post_list[i]} />
              </WrapPost>
            );
          })}
        </InfinityScroll>
      </WrapPost>
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

const WrapPost = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: "#ddafff";
  margin: 20px 20px;
`;

export default PostList;
