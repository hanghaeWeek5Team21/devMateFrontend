import axios from "axios";
import React from "react";

function LogIn() {
  // 이렇게 보내주시면 됩니다.
  function postMessage() {
    axios.get("http://13.124.12.129/api/test", { withCredentials: true });
    axios.post(
      "http://13.124.12.129/api/test",
      { user_id: 1, content: "test" },
      { withCredentials: true }
    );
    axios.patch(
      "http://13.124.12.129/api/test",
      { user_id: 1, content: "test" },
      { withCredentials: true }
    );
    axios.delete("http://13.124.12.129/api/test", { withCredentials: true });
  }
  // 회원가입 예시
  function register() {
    axios
      .post(
        "http://13.124.12.129/api/user",
        {
          username: "dohyung97022",
          password: "1234",
          name: "김도형",
          skill: "SPRING",
          introduce: "안녕하세요 김도형입니다",
          image_url: "www.url.com",
        },
        { withCredentials: true }
      )
      .then((response) => response.data);
  }
  // 회원수정 예시
  function patch_account() {
    axios
      .patch(
        "http://13.124.12.129/api/user",
        {
          password: "1234",
          name: "형도김",
          skill: "SPRING",
          introduce: "안녕하세요 김도형입니다",
          image_url: "www.url.com",
        },
        { withCredentials: true }
      )
      .then((response) => response.data);
  }
  // 모든 회원정보 가져오기 예시
  function get_account() {
    axios
      .get("http://13.124.12.129/api/user", { withCredentials: true })
      .then((response) => response.data);
  }
  // 단일 회원정보 가져오기 예시
  function get_one_account() {
    axios
      .get("http://13.124.12.129/api/user/1", { withCredentials: true })
      .then((response) => response.data);
  }
  // 댓글 작성 예시
  function post_comment() {
    axios
      .post(
        "http://13.124.12.129/api/comment",
        {
          user_id: 1,
          contents: "댓글입니다",
        },
        { withCredentials: true }
      )
      .then((response) => response.data);
  }
  // 댓글 삭제 예시
  function delete_comment() {
    axios
      .delete("http://13.124.12.129/api/comment/1", { withCredentials: true })
      .then((response) => response.data);
  }
  // 댓글 수정 예시
  function patch_comment() {
    axios
      .patch(
        "http://13.124.12.129/api/comment/1",
        {
          contents: "수정 수정 댓글입니다",
        },
        { withCredentials: true }
      )
      .then((response) => response.data);
  }
  // 좋아요 작성 예시
  function post_like() {
    axios
      .post(
        "http://13.124.12.129/api/likes",
        {
          user_id: 1,
        },
        { withCredentials: true }
      )
      .then((response) => response.data);
  }
  // 좋아요 삭제 예시
  function delete_like() {
    axios
      .delete("http://13.124.12.129/api/likes/1", { withCredentials: true })
      .then((response) => response.data);
  }

  return (
    <div className="login-template">
      <button onClick={postMessage}>테스트</button>
      <br />
      <button onClick={register}>회원가입</button>
      <br />
      <button onClick={patch_account}>회원수정</button>
      <br />
      <button onClick={register}>회원가입</button>
      <br />
      <button onClick={get_account}>모든 회원정보 가져오기</button>
      <br />
      <button onClick={get_one_account}>단일 회원정보 가져오기</button>
      <br />
      <button onClick={post_comment}>댓글 작성</button>
      <br />
      <button onClick={delete_comment}>댓글 삭제</button>
      <br />
      <button onClick={patch_comment}>댓글 수정</button>
      <br />
      <button onClick={post_like}>좋아요 작성</button>
      <br />
      <button onClick={delete_like}>좋아요 삭제</button>
      <br />

      <div className="title">로그인</div>
      {/* 로그인만 폼으로 부탁드립니다 */}
      <form action="http://13.124.12.129/api/user/login" method="post">
        <div className="input-wrapper">
          <input type="text" name="username" placeholder="username" />
          <br />
          <input type="password" name="password" placeholder="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LogIn;

axios
  .post(
    "http://13.124.12.129/api/user",
    {
      username: "dohyung97022",
      password: "1234",
      name: "김도형",
      skill: "SPRING",
      introduce: "안녕하세요 김도형입니다",
      image_url: "www.url.com",
    },
    { withCredentials: true }
  )
  .then((response) => response.data);

axios.post(
  "http://13.124.12.129/api/comment",
  {
    user_id: 1,
    contents: "댓글입니다",
  },
  { withCredentials: true }
);
