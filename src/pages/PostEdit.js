import React from "react";
import { Grid, Input, Text, Button, Image } from "../elements/Index";
import axios from "axios";
import { config } from "../shared/config";
import { getCookie } from '../shared/Cookie';
import { checkRegex, emailRegex } from '../shared/Regex';

const PostEdit = (props) => {
    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [pwd_check, setPwdCheck] = React.useState('');
    const [user_name, setUserName] = React.useState('');
    const [skill, setSkill] = React.useState('');
    const [introduce, setIntroduce] = React.useState('');
    const [image_url, setImageURL] = React.useState(null);

    const uploadImage = () => {
        let file = document.getElementById("image-input").files[0];
        if (file == null) {
            window.alert("파일을 입력해주세요.");
            return;
        }
        const spinner = 'https://devmate.s3.ap-northeast-2.amazonaws.com/image/frontend/loading.gif';
        document.getElementById("image-show").src = spinner;
        const formData = new FormData();
        formData.append('file', file);
        axios.post(config.api + '/api/file/image', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(
                response => {
                    if (response.data.res) {
                        document.getElementById("image-show").src = response.data.result;
                        window.alert(response.data.msg);
                        setImageURL(response.data.result);
                    } else {
                        window.alert(response.data.msg);
                    }
                }
            );
    };

    const postEdit = () => {
        if (
            id === '' ||
            pwd === '' ||
            user_name === '' ||
            skill === '' ||
            introduce === ''
            // || image_url === null
        ) {
            window.alert('모두 입력해주세요');
            return;
        }
        if (!checkRegex(emailRegex, id)) {
            window.alert('이메일 형식이 맞지 않습니다.');
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

    const background = {
        backgroundImage: `url("https://cdn.codingworldnews.com/news/photo/202106/4144_5858_3337.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        height: "calc(100vh - 61px)",
    }

    return (
        <React.Fragment>
            <div style={background}>
                <Grid border_radius="20px" padding="16px" width="50vw" margin="50px auto auto" marginTop='30px'>
                    <Text size="32px" bold width="100%">
                        회원수정
                    </Text>
                    <Grid is_flex>
                        <div style={{ display: "flex", alignItems: 'center', width: '50vw', justifyContent: 'center' }}>
                            <div>
                                <img
                                    id="image-show"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        margin: 'auto',
                                        width: '20vw',
                                    }}
                                    src="http://via.placeholder.com/400x300"
                                />
                                <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <input type="file" style={{ width: '10vw' }} id="image-input" />
                                    <Button _onClick={uploadImage}>업로드</Button>
                                </div>
                            </div>
                        </div>
                        <Grid padding="16px">
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
                    <div style={{ width: '100%', height: '1px', background: '#b8b8b8', marginBottom: '20px' }}></div>
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
                        margin="10px 0px 0px 0px"
                        id="edit-introduce"
                        label="자기소개"
                        _onChange={(e) => {
                            setIntroduce(e.target.value);
                        }}
                        value={introduce}
                    />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button margin="24px 0px 0px 0px" _onClick={postEdit}>
                            등록하기
                        </Button>
                    </div>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default PostEdit;
