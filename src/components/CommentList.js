import React from 'react';
import { Grid, Text } from '../elements/Index';

const CommentList = (props) => {
  console.log(props);
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
  console.log(props);
  const { author, skill, introduce, modifiedAt } = props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Text bold>{author.name}</Text>
        <Text bold margin="0px 4px" color="#F5AD00">
          {skill}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{introduce}</Text>
        <Text margin="0px">{modifiedAt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  author: {},
  skill: 'REACT',
  id: '1',
  name: 'shane',
  introduce: '안녕하세요~~!',
  modifiedAt: '2021-01-01 19:00:00',
};
