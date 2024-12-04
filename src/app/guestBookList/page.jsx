"use client"
import { useEffect, useState } from 'react';
import './guestBookList.css';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import useAuthStore from '../../../store/authStore';

function Page(props) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    /* SB 가져올 JSON 데이터가 있는 스프링부트 주소 */
    // const API_URL = "http://localhost:8080/api/guestbook/list";
    const API_URL = `${LOCAL_API_BASE_URL}/guestbook/list`;
    const {isAuthenticated} = useAuthStore();

    // next.config.mjs 에서 경로 설정 해줘서 축약 가능해짐.
    // const API_URL = "/guestbook/list";

    /* SB 스프링부트 JSON 데이터 가져오기 --> axios 사용*/
    const getData = async () => {
        try {
            setLoading(true); // 로딩 상태 시작
            const response = await axios.get(API_URL); // axios를 활용한 API 호출
            const data = response.data.data;
            setList(data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    // 최초 한 번만 실행
    useEffect(() => {
        getData();
    }, []);

    // 로딩 중 화면
    if (loading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
    }
    // 에러 발생 시 화면
    if (error) {
        return <div style={{ textAlign: "center", padding: "20px", color: "red" }}>Error: {error}</div>;
    }
    // 로딩 완료 후 화면
    return (
        <>
            <h2 className="title">GuestBookList</h2>
            {/* 로그인 된 상태이면 쓰기 버튼 표시 */}
            {isAuthenticated && (
                <div style={{textAlign:"right", marginRight:"250px"}}>
                        <Button variant='contained' color="primary">
                            <Link href="/guestBookWrite" style={{color: "white"}}>쓰기</Link>
                        </Button>
                </div>    
            )}
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">이름</TableCell>
                            <TableCell className="table-header">제목</TableCell>
                            <TableCell className="table-header">등록일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* 삼항 연산자를 사용 한 조건부 렌더링 */}
                        {/* 없을 때 */}
                        { list.length === 0 ?
                            <TableRow>
                                 <TableCell colSpan={2} style={{textAlign: "center"}}>
                                    <h3>등록 된 게시물이 없습니다.</h3>
                                    </TableCell>
                            </TableRow>
                            
                        /* 있을 때 */
                        : list.map((item) => (
                            <TableRow key={item.gb_idx}>
                                <TableCell className="table-cell">{item.gb_name}</TableCell>
                                <TableCell className="table-cell">
                                    <Link href={`/guestBookDetails/${item.gb_idx}`}>{item.gb_subject}</Link>
                                </TableCell>
                                <TableCell className="table-cell">{item.gb_regdate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Page;