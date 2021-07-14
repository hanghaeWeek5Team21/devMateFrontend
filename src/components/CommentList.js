import React from 'react';
import { Grid, Text } from '../elements/Index';

const CommentList = () => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { name, skill, introduce, insert_dt } = props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Text bold>{name}</Text>
        <Text bold margin="0px 4px" color="#F5AD00">
          {skill}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{introduce}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  skill: 'REACT',
  id: '1',
  name: 'shane',
  introduce: '안녕하세요~~!',
  insert_dt: '2021-01-01 19:00:00',
};
