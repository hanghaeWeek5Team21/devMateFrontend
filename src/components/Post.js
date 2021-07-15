import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text, HeartButton } from '../elements/Index';
import { history } from '../redux/configureStore';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/Post_module';

const Post = React.memo((props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid padding="16px" width="auto">
            <Text bold>{props.name}</Text>
          </Grid>
          <Grid padding="16px" width="auto">
            <Text bold>{props.skill}</Text>
          </Grid>
        </Grid>
        <Grid width="100px">
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
              dispatch(postActions.toggleLikeDB(props.id));
            }}
            is_like={props.is_like}
          ></HeartButton>
        </Grid>
        <Grid padding="16px">
          <Text margin="0px">{props.introduce}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Post.defaultProps = {
  name: 'shane',
  image_url:
    'https://devmate.s3.ap-northeast-2.amazonaws.com/image/frontend/loading.gif',
  skill: 'React',
  comment_cnt: 10,
  like_cnt: 0,
  is_like: false,
  introduce: '안녕하세요~~!',
};

export default Post;
