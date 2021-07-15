import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { yellow, grey } from "@material-ui/core/colors";

import { Text, HeartButton } from "../elements/Index";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post_module";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    maxHeight: 500,
    backgroundColor: grey[100],
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: yellow[700],
    width: theme.spacing(7),
    height: theme.spacing(6),
    fontSize: 18,
    fontWeight: 700,
  },
  height: {
    height: 100,
    margin: 5,
  },
}));

const Post = React.memo((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            variant="square"
            className={classes.avatar}
          >
            {props.name}
          </Avatar>
        }
        title={
          <Text margin="0px 10px 0px 3px" size="17px" bold>
            {props.skill}
          </Text>
        }
      />
      <CardMedia className={classes.media} image={props.image_url} />
      <CardContent>
        <Typography
          variant="body1"
          color="textSecondary"
          component="div"
          overflow="scroll"
          className={classes.height}
        >
          {props.introduce}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
      </CardActions>
    </Card>
  );
});

export default Post;

Post.defaultProps = {
  name: "shane",
  image_url:
    "https://devmate.s3.ap-northeast-2.amazonaws.com/image/frontend/loading.gif",
  skill: "React",
  comment_cnt: 10,
  like_cnt: 0,
  is_like: false,
  introduce: "안녕하세요~~!",
};