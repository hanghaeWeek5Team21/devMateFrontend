import React from "react";
import { Grid, Image, Text, Button, HeartButton } from "../elements/index";
import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { ActionCreator as postActions } from "../redux/modules/Post_module";

const Post = React.memo((props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Text bold>{props.user_info.name}</Text>
          </Grid>
          <Grid padding="16px">
            <Text>{props.skill}</Text>
          </Grid>
        </Grid>
        <Grid>
          <Image src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text margin="0px 10px 0px 3px" font-size="24px" bold>
            댓글 {props.comment_cnt}개
          </Text>

          <Text margin="0px" bold>
            좋아요 {props.like_cnt}개
          </Text>

          <HeartButton
            _onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(postActions.toggleLikeFB(props.id));
            }}
            is_like={props.is_like}
          ></HeartButton>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Post.defaultProps = {
  name: "shane",
  image_url: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  skill: "React",
  comment_cnt: 10,
  like_cnt: 0,
  is_like: false,
  introduce: "안녕하세요~~!",
};

export default Post;
