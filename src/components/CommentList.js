import React from 'react';
import { Grid, Text, Button } from '../elements/Index';
import { getCookie } from '../shared/Cookie';
import { actionCreators as commentActions } from '../redux/modules/Comment_module';

const CommentList = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        {Object.keys(props).map((i) => {
          return <CommentItem key={i} {...props[i]} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { author, contents, modifiedAt, id } = props;
  let yms = modifiedAt.substring(0, 10);
  let hm = modifiedAt.substring(11, 16);
  let newModi = yms + '  ' + hm;

  const deleteCommentFunc = () => {
    commentActions.deleteCommentDB(id);
  };

  return (
    <Grid is_flex>
      <Grid>
        <Grid>
          <Grid is_flex width="auto" margin="4px 0px">
            <Text bold color="#000000" margin="0px">
              {author.name}
            </Text>
            <Text bold color="#F5AD00" margin="0px 4px">
              {author.skill}
            </Text>
          </Grid>
          <Grid margin="4px 0px">
            <Text margin="0px" color="#212121">
              {contents}
            </Text>
          </Grid>
          <Grid margin="4px 0px">
            <Text margin="0px" size="12px" color="#A0A0A0">
              {newModi}
            </Text>
          </Grid>
        </Grid>
      </Grid>
      <Grid margin="auto" width="auto">
        {getCookie('user') === author.id.toString() ? (
          <Button width="50px" margin="0px 2px" _onClick={deleteCommentFunc}>
            삭제
          </Button>
        ) : (
          ''
        )}
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
