
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Grid, Image, Text, HeartButton } from "../elements/Index";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post_module";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Post = React.memo((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.name}
          </Avatar>
        }
        title={props.skill}
      />
      <CardMedia className={classes.media} src={props.image_url} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
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

// import React from "react";
// import styled from "styled-components";
// import { Grid, Image, Text, HeartButton } from "../elements/Index";
// import { history } from "../redux/configureStore";

// import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/Post_module";

// const Post = React.memo((props) => {
//   const dispatch = useDispatch();

//   console.log(props);

//   return (
//     <React.Fragment>
//       <WrapPost>
//         <Grid is_flex margin="16px">
//           <Grid is_flex width="auto">
//             <Text bold>{props.name}</Text>
//           </Grid>
//           <Grid padding="16px">
//             <Text>{props.skill}</Text>
//           </Grid>
//         </Grid>
//         {/* <Grid is_flex padding="10px">
//           <Grid is_flex>
//             <Text margin="0" size="24px" bold>
//               {props.name}
//             </Text>
//           </Grid>
//           <Grid is_flex>
//             <Text margin="0" size="16px" bold textAlign="end">
//               {props.skill}
//             </Text>
//           </Grid>
//         </Grid> */}
//         <Grid>
//           <Image src={props.image_url} />
//         </Grid>
//         <Grid padding="16px">
//           <Text margin="0px 10px 0px 3px" font-size="24px" bold>
//             댓글 {props.comment_cnt}개
//           </Text>

//           <Text margin="0px" bold>
//             좋아요 {props.like_cnt}개
//           </Text>

//           <HeartButton
//             _onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               dispatch(postActions.toggleLikeDB(props.id));
//             }}
//             is_like={props.is_like}
//           ></HeartButton>
//         </Grid>
//         <Grid padding="16px">
//           <Text>{props.contents}</Text>
//         </Grid>
//       </WrapPost>
//     </React.Fragment>
//   );
// });

Post.defaultProps = {
  name: 'shane',
  image_url:
    'https://devmate.s3.ap-northeast-2.amazonaws.com/image/frontend/loading.gif',
  skill: 'React',
  comment_cnt: 10,
  like_cnt: 0,
  is_like: false,
  introduce: "안녕하세요~~!",
};
