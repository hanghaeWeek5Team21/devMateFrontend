import React from 'react';
import { Grid, Text, Button } from '../elements/Index';
import { getCookie } from '../shared/Cookie';
import { actionCreators as commentActions } from '../redux/modules/Comment_module';


const CommentList = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        {Object.keys(props).map((i) => {
          return (
            <CommentItem key={i} {...props[i]} />
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { author, contents, modifiedAt, id } = props;

  const deleteCommentFunc = () => {
    commentActions.deleteCommentDB(id);
  };

  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Text bold>{author.name}</Text>
        <Text bold margin="0px 4px" color="#F5AD00">
          {author.skill}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{modifiedAt}</Text>
      </Grid>
      <Grid>
        {getCookie("user") === author.id.toString() ?
          <Button width="50px" margin="0px 2px" _onClick={deleteCommentFunc}>삭제</Button>
          : ''}
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  id: 0,
  author: {},
  contents: '안녕하세요~~!',
  modifiedAt: '2021-01-01 19:00:00',
};
