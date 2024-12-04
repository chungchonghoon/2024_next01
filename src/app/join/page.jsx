"use client";
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Page(props) {
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const API_URL = `${LOCAL_API_BASE_URL}/members/join`;
  const router = useRouter(); // useRouter 초기화

  // 텍스트 필드 초기화
  const initUvo = {
    m_id: "",
    m_pw: "",
    m_name: "",
    m_age: "",
  };

  const [uvo, setUvo] = useState(initUvo);
  
  // 모든 입력 필드가 비어있지 않아야 true
  const isBtnChk = !uvo.m_id || !uvo.m_pw || !uvo.m_name || !uvo.m_age;
  
  function changeUvo(e) {
    const { name, value } = e.target;
    setUvo(prev => ({
      ...prev, [name]: value
    }));
  }


  /* SB 프론트에서 서버 다녀오기 */
  function goServer(params) {
    axios.post(API_URL, uvo)
      .then((data) => {
        if (data.data.success) {
          //console.log(data.message);
          alert(data.data.message);

          /* 성공하면 /login 페이지로 이동 */
          router.push("/login");
        } else {
          alert(data.data.message);
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
          <TextField type='text' label='이 름' name='m_name' value={uvo.m_name} onChange={changeUvo} />
          <TextField type='number' label='나 이' name='m_age' value={uvo.m_age} onChange={changeUvo} />
          <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>JOIN</Button>
        </Stack>
      </FormControl>
    </div>
  );
}
export default Page;