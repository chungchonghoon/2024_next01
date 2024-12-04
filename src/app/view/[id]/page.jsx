/*
 B Next.js에서 page.jsx import 하는 법 (@ 하면 src 폴더로 감)
 */
"use client";
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

/* 
B 동적라우팅 id를 받을 땐 1. async fuction, 2. {params}, 3. const param = await params;, 
                        4. const id = param.id;
*/

// SB2 클라이언트 컴포넌트로 데이터 가져오고 출력하기
    function Page({params}) {
     const MAKEUP_API_BASE_URL = process.env.NEXT_PUBLIC_MAKEUP_API_BASE_URL;
     const [item, setItem] = useState(null); // 데이터 상태
     const [loading, setLoading] = useState(true); // 로딩 상태
     const [error, setError] = useState(null); // 에러 상태

     useEffect(()=>{
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
                const {id} = await Promise.resolve(params);
                const API_URL
                 = `${MAKEUP_API_BASE_URL}/v1/products/${id}.json`

                // 데이터 가져오기
                const response = await axios.get(API_URL);
                setItem(response.data);
            } catch (error) {
                console.error("Error : ", error);
                setError("failed");
            }finally{
                setLoading(false); // 로딩 종료
            }
        };

      fetchData();
    },[params, MAKEUP_API_BASE_URL]);
    
    // 로딩 중
    if (loading){
        return <div style={{ textAlign: "center", padding: "20px"}}>Loading...</div>;
    }

    // 에러 발생시
    if (error){
        return (
            <div style={{textAlign: "center", padding: "20px", color:"red"}}>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        );
    }

    // 로딩 완료 후
    return (
        <>
            <div className='wrap'>
                <div className='img_itemimg'>
                    <img src={item.image_link} alt={item.name} width={300} height={300} />
                </div>
                <div className='info_item'>
                    <strong className='tit_item'>{item.name}</strong>
                    <strong className='num_price'>$ {item.price}</strong>
                    <span className='txt_info'>
                        {item.category ? `${item.category}/` : ""} {item.product_type}
                    </span>
                    <Button variant='contained' color='success'>구매하기</Button>
                    <Button variant='contained' color='error'>취소하기</Button>
                </div>
                <div className='disWrap'>
                    <hr />
                    <h1 style={{margin: "20px"}}> Description</h1>
                    <div style={{paddingBottom: "20px", fontSize: "24px"}}>{item.description}</div>
                </div>
            </div>
        </>
    );
    }
    
    export default Page;
    /* B ``를 사용해서 id를 URL에 넣어준다. */
    // const API_URL = `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`;


    //  Server  /makeup/v1/products/477.json
    //  Server  https://makeup-api.herokuapp.com/api/v1/products/477.json

     // next.config.mjs 에서 경로 설정 해줘서 축약 가능해짐.
    // const API_URL = `/makeup/v1/products/${id.trim()}.json`;
    // console.log(API_URL);
    // try {
    //     const response = await axios.get(API_URL);
    //     const item = response.data;
    //     return <Item item={item} />;
    // } catch (error) {
    //     console.error("Error : ", error)
    //     return <div>Error</div>;
    // }

    // B 한 개이지만 객체이다. 객체: {} , 여러 개 리스트: []
    /* const [item, setItem] = useState({}); */

    /* B 데이터 가져오기 --> axios 사용*/
    /* const getData = () => {

        axios.get( // method --> get
            API_URL
            // B 성공하면 .then(res=>{}), 실패하면 .catch(error=>{})    
        ).then(res => {
            // console.log(res.data);
            setItem(res.data);
        }).catch(
            console.log("Error 발생")
        )
    } */

    // B 최초 한번만 실행: , []
    /* useEffect(() => {
        getData();
    }, []) */

    //return (
        // B 현재 여기서 만들어도 되지만, 별도로 컴포넌트를 만들어서 import 하자.
        //<>
            // Item 폴더 만들 때 소문자로 해야 함 
            //<Item item={item} />   
        //</>
    //); 
// }
