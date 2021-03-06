import React from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Input, Button } from '../elements/Index';
import { actionCreators as commentActions } from '../redux/modules/Comment_module';

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState();

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    commentActions.postComment(comment_text, props.post_id);
    setCommentText('');
    document.location.reload();
  };

  return (
    <React.Fragment>
      <Grid is_flex padding="16px">
        <Input
          placeholder="내용을 입력해주세요"
          _onChange={onChange}
          value={comment_text}
          width="90%"
        />
        <Grid margin="auto" width="auto">
          <Button width="50px" margin="0px 2px" _onClick={write}>
            작성
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
