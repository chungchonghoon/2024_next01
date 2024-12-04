"use client";

/* mui 사용시엔 클라이언트 컴포넌트에서 만 사용하자. */
import { Divider, Grid2 } from '@mui/material';

import './itemList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

function Page(props) {
    const [list, setList] = useState([]); // 상품 목록
     const [loading,setLoading] = useState(true); // 로딩 상태
     const [error,setError] = useState(null); // 에러 상태
    const MAKEUP_API_BASE_URL = process.env.NEXT_PUBLIC_MAKEUP_API_BASE_URL;

    /* B 가져올 JSON 데이터가 있는 인터넷 주소 */
    // const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    // next.config.mjs 에서 경로 설정 해줘서 축약 가능해짐.

    const API_URL = `${MAKEUP_API_BASE_URL}/v1/products.json?brand=maybelline`; // 프록시된 API URL

    /* B 데이터 가져오기 --> axios 사용*/
    const getData = async () => {
        try {
            setLoading(true);; // 로딩 상태 시작
            const response = await axios.get(API_URL); // axios를 사용한 API 호출
            setList(response.data.slice(0, 12));
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError(error.message);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    // B 최초 한번만 실행 : , []
    useEffect(() => {
        getData();
    }, [])

    /* B list 데이터 출력하기 */
    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
            <h2>베스트 상품</h2>
            <Divider />
            <Grid2 container spacing={2}>
                {list.map(k => {
                    // size={{ xs:3  }} =>  전체 12개에 3개를 차지한다. (한줄에 4개)
                    return <Grid2 key={k.id} size={{ xs: 3 }}>
                        <Link href={'/view/' + k.id}>
                        <img src={k.image_link} alt="" className='img_item'/>
                        <strong>{k.name}</strong>
                        <span className='txt_info'>{k.category} &nbsp; &nbsp; {k.product_type}</span>
                        <strong className='num_price'>{k.price}</strong>
                        </Link>
                    </Grid2>
                })}
            </Grid2>
        </div>
    );
}

export default Page;

        
        // axios.get( // method --> get
        //     API_URL
        //     // B 성공하면 .then(res=>{}), 실패하면 .catch(error=>{})    
        // ).then(res => {
        //     // console.log(res.data);
        //     // setList(res.data);

        //     // B 상위 12개 데이터만 추출
        //     setList(res.data.slice(0, 12));
        // }).catch(
        //     console.log("Error 발생")
        // )