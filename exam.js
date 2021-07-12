import axios from "axios";
import React from "react";

function LogIn() {
  function postMessage() {
    // axios,fetch 는 post, delete가 가능은 하지만
    // 현제 로그인된 회원 정보를 받는 것이 불가능합니다.
    axios({
      method: "post",
      url: "http://localhost/thread",
      data: {
        title: "title",
        content: "anything",
      },
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      crossdomain: true,
    });

    fetch("http://localhost/thread", {
      method: "FETCH",
      body: JSON.stringify({
        title: "이게 된다면",
        content: "손모가지 하나 받자",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      // credentials: 'include',
    });
  }

  // axios("http://mysite.com/api/things/", {
  //     method: "post",
  //     data: someJsonData,
  //     withCredentials: true
  // })

  return (
    <div className="login-template">
      <button onClick={postMessage}>작성</button>
      <div className="title">User Login</div>

      <form action="http://localhost/thread" method="post">
        <div className="input-wrapper">
          <input type="hidden" name="_method" value="post" id="method" />
          <div class="login-id-label thread-creator-title">제목</div>
          <input
            type="text"
            name="title"
            class="login-input-box thread-creator-title"
          />
          <div class="login-id-label">내용</div>
          <input type="text" name="content" class="thread-input-box" />
        </div>
        <button type="submit">작성</button>
      </form>

      <form action="http://localhost/user/login" method="post">
        <div className="input-wrapper">
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          회원이 아니시라면 회원가입 후 로그인 해주세요.
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LogIn;


<form action="http://13.124.12.129/api/user/login" method="post"> <div className="input-wrapper"> <input type="text" name="username" placeholder="username" /> <br /> <input type="password" name="password" placeholder="password" /> </div> <button type="submit">로그인</button> </form>

로그인

회원가입

function patch_account() { axios.patch('http://13.124.12.129/api/user', { password: "1234", name: "형도김", skill: "SPRING", introduce: "안녕하세요 김도형입니다", image_url: "www.url.com" }, { withCredentials: true }); }

아이피

13.124.12.129 