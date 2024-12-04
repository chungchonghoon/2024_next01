"use client";
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// zustand store 호출
import useAuthStore from '../../../store/authStore';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const API_URL = `${LOCAL_API_BASE_URL}/members/login`;

    /* next/navigation import 해야 함 */
    const router = useRouter(); // useRouter 초기화

    const { login } = useAuthStore(); // zustand login 함수 가져오기


    // 텍스트 필드 초기화
    const initUvo = {
        m_id: "",
        m_pw: ""
    }

    const [uvo, setUvo] = useState(initUvo);

    // 모든 입력 필드가 비어있지 않아야 true
    const isBtnChk = !uvo.m_id || !uvo.m_pw;

    function changeUvo(e) {
        const { name, value } = e.target;
        setUvo(prev => ({
            ...prev, [name]: value
        }));
    }

    function goServer(params) {
        axios.post(API_URL, uvo)
            .then(response => {
                const data = response.data;
                if (data.success) {
                    console.log(data.data)
                    alert(data.message);

                    // zustand 에서 가져온 login 함수 사용해서 회원정보, 토큰 데이터 담기
                    login(data.data, data.token);

                    router.push('/');
                } else {
                    alert(data.message);

                    /* 실패하면 텍스트필드 초기화 */
                    setUvo(initUvo);
                    
                }
            });
    }

    return (
        <div>
            <FormControl>
                {/* Stack : 수직정렬 */}
                <Stack direction='column' spacing={1} alignItems='center'>
                    <Avatar />
                    <TextField type='text' label='아이디' name='m_id' value={uvo.m_id} onChange={changeUvo} />
                    <TextField type='password' label='패스워드' name='m_pw' value={uvo.m_pw} onChange={changeUvo} />
                    <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>Sign in</Button>
                </Stack>
            </FormControl>
        </div>
    );
}

export default Page;