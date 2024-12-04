"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import './guestBookDetails.css';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import useAuthStore from "../../../../store/authStore";
import { useRouter } from "next/navigation";



// SB Next.js에서 Detail 폴더에 있는 page.jsx import 하는 법 (@ 하면 src 폴더로 감)
//  
// import Detail from '@/app/detail/page';

/* SB 서버 컴포넌트는 function 앞에 async를 붙이고, useState, useEffect, useClient 사용 못 함. */
function Page({ params }) {

    /* SB await params -> param -> param.id 로 파라미터 값 받기 */
    // const param = await params;
    // const gb_idx = param.id;

    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const [item, setItem] = useState(null); // 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const { isAuthenticated, token } = useAuthStore(); // 로그인 여부를 zustand에서 꺼내 쓰자.
    const router = useRouter();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 시작
                // params 언래핑: Promise로 감싸진 값을 꺼내는 과정
                // Promise.resolve(params)의 역할
                // Promise.resolve()는 전달된 값을 Promise 객체로 변환합니다.
                // 만약 params가 이미 Promise라면, 원래 Promise를 반환합니다.
                // 만약 params가 일반 객체라면, 이를 즉시 해결된(resolved) Promise로 감쌉니다.
                // Promise인지 아닌지 신경 쓰지 않고 항상 비동기적으로 다룰 수 있습니다.
                // const resolvedParams = await Promise.resolve(params); // params 언래핑
                // const { id } = resolvedParams; // id 추출
                const { id } = await Promise.resolve(params);
                const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${id}`;

                // 데이터 가져오기
                const response = await axios.get(API_URL);
                const data = response.data;
                if (data.success) {
                    setItem(data.data);
                } else {
                    setError("failed");

                }
            } catch (error) {
                console.error("Error : ", error);
                setError("failed");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, [params, LOCAL_API_BASE_URL]);

    // update
    const handleUpdate = async () => {
        // 수정 페이지로 이동
        router.push(`/guestBookUpdate/${item.gb_idx}`);
    }

    // delete
    const handleDelete = async () => {
        // 버튼을 항상 활성화 할 경우 필요하다.
        // if(!isAuthenticated){
        //     alert("로그인이 필요합니다.");
        //     router.push("/login");
        // }

        // 상세보기 성공했을 때 데이터를 item에 넣음
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/delete/${item.gb_idx}`;
        try {
            const response = await axios.get(API_URL,{
                headers: {
                    Authorization : `Bearer ${token}`
                } 
        });
            if(response.data.success){
                alert(response.data.message);
                router.push("/guestBookList");
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            console.error("delete Error:", error);
        }

    }


    // 로딩 중
    if (loading) {
        return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
    }

    // 에러 발생시
    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        );
    }

    // 로딩 완료 후
    return (
        <>
            <h2 className="title">GuestBookList</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">이름</TableCell>
                            <TableCell className="table-cell">{item.gb_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">이메일</TableCell>
                            <TableCell className="table-cell">{item.gb_email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">제목</TableCell>
                            <TableCell className="table-cell">{item.gb_subject}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">내용</TableCell>
                            <TableCell className="table-cell">{item.gb_content}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-cell">등록일</TableCell>
                            <TableCell className="table-cell">{item.gb_regdate.substring(0, 10)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    disabled={!isAuthenticated}
                >수정</Button>

                <Button variant="contained"
                    color="error"
                    onClick={handleDelete}
                    style={{ marginLeft: "10px" }}
                    disabled={!isAuthenticated}
                >삭제</Button>
            </div>
        </>
    );
}

export default Page;
/* SB 가져올 JSON 데이터가 있는 스프링부트 주소 */
// next.config.mjs 에서 경로 설정 해줘서 축약 가능해짐.
// const API_URL = `/guestbook/detail?gb_idx=${gb_idx}`;


/* SB await axios.get(API_URL)로 API_URL에 있는 데이터를 item에 담고 Detail 컴포넌트로 보내기 */
//     try {
//         const response = await axios.get(API_URL);
//         const item = response.data;
//         return <Detail item={item} />;
//     } catch (error) {
//         console.error("Error : ", error)
//         return <div>Error</div>;
//     }
