import React from "react";
import { Grid, Input, Text, Button, Image } from "../elements/Index";
import axios from "axios";
import { config } from "../shared/config";
import { getCookie } from '../shared/Cookie';

const PostEdit = (props) => {
    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [pwd_check, setPwdCheck] = React.useState('');
    const [user_name, setUserName] = React.useState('');
    const [skill, setSkill] = React.useState('');
    const [introduce, setIntroduce] = React.useState('');
    const [image_url, setImageURL] = React.useState('https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg');

    const postEdit = () => {
        if (
            id === '' ||
            pwd === '' ||
            user_name === '' ||
            skill === '' ||
            introduce === '' ||
            image_url === ''
        ) {
            window.alert('모두 입력해주세요');
            return;
        }
        if (pwd !== pwd_check) {
            window.alert('비밀번호와 일치하지 않습니다.');
            return;
        }

        axios.patch(config.api + '/api/user', {
            password: pwd,
            name: user_name,
            skill: skill,
            introduce: introduce,
            image_url: image_url
        },
            { withCredentials: true })
            .then(
                response => {
                    if (response.data.res) {
                        window.alert(response.data.msg);
                        document.location.href = "/";
                    } else {
                        window.alert(response.data.msg);
                    }
                }
            );
    };

    React.useEffect(() => {
        if (typeof getCookie("user") === "undefined"
            || getCookie("user") === "null"
            || typeof getCookie("is_login") === "undefined"
            || typeof getCookie("is_login") === "false"
            || getCookie("is_login") === "null") {
            window.alert('로그인이 되어있지 않습니다.');
            document.location.href = "/login";
        }
        axios.get(config.api + '/api/user/' + getCookie("user"),
            { withCredentials: true })
            .then((response) => {
                if (!response.data.res) {
                    window.alert('회원정보를 불러오지 못했습니다.');
                    document.location.href = "/login";
                }
                const result = response.data.result;
                setId(result.username);
                setUserName(result.name);
                setSkill(result.skill);
                setIntroduce(result.introduce);
                setImageURL(result.imageUrl);
                document.getElementById("edit-email").value = result.username;
                document.getElementById("edit-name").value = result.name;
                document.getElementById("edit-introduce").value = result.introduce;
            })
            .catch((error) => {
                console.log(error);
                window.alert('로그인 실패!');
            });
    }, []);

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Grid is_flex>
                    <Grid padding="16px">
                        <Image size="400" src="http://via.placeholder.com/400x300" />
                        <input type="file" />
                        <Button>업로드</Button>
                    </Grid>
                    <Grid padding="16px">
                        <Text size="32px" bold>
                            회원수정
                        </Text>
                        <Grid padding="16px 0px">
                            <Input
                                id="edit-email"
                                label="이메일"
                                placeholder="이메일을 입력해주세요"
                                value={id}
                                readOnly={true}
                                _onChange={(e) => {
                                    setId(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid padding="16px 0px">
                            <Input
                                id="edit-name"
                                label="이름"
                                placeholder="이름을 입력해주세요"
                                value={user_name}
                                _onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid padding="16px 0px">
                            <Input
                                type="password"
                                label="비밀번호"
                                placeholder="비밀번호을 입력해주세요"
                                _onChange={(e) => {
                                    setPwd(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid padding="16px 0px">
                            <Input
                                type="password"
                                label="비밀번호 확인"
                                placeholder="비밀번호를 다시 입력해주세요"
                                _onChange={(e) => {
                                    setPwdCheck(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ width: '100%', height: '1px', background: 'red' }}></div>
                {/* <label for="skill">주특기 선택</label> */}
                <input
                    type="radio"
                    name="skill"
                    value="SPRING"
                    checked={skill == "SPRING" && true}
                    onChange={(e) => {
                        setSkill(e.target.value);
                    }}
                />
                SPRING
                <input
                    type="radio"
                    name="skill"
                    value="NODE"
                    checked={skill == "NODE" && true}
                    onChange={(e) => {
                        setSkill(e.target.value);
                    }}
                />
                NODE
                <input
                    type="radio"
                    name="skill"
                    value="REACT"
                    checked={skill == "REACT" && true}
                    onChange={(e) => {
                        setSkill(e.target.value);
                    }}
                />
                REACT
                <Input
                    id="edit-introduce"
                    label="자기소개"
                    // multiLine (사용할 경우 작성이 안되는 에러가 납니다.)
                    _onChange={(e) => {
                        setIntroduce(e.target.value);
                    }}
                    value={introduce}
                />
                <Button margin="24px 0px 0px 0px" _onClick={postEdit}>
                    등록하기
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default PostEdit;
