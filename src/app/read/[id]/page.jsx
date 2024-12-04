import ReadOne from '@/app/page/ReadOne';
import ReadThree from '@/app/page/ReadThree';
import ReadTwo from '@/app/page/ReadTwo';
import React from 'react';

/* 동적 쿼리는 props로 URL의 id를 받아 각각 다른 str을 출력한다.*/
async function Page({params}) {
    /* 
    동적라우팅의 URL의 id를 받을 땐, 
    await params을 통해 거치고 다시 id를 받아야 한다. 
    */
    const param = await params; 
    const msg = param.id;
    let str = "";
    if (msg === '1') {
        str = "HTML 선택";
    } else if (msg === '2') {
        str = "CSS 선택";

    } else if (msg === '3') {
        str = "JavaScript 선택";

    }
    return (
        <>
            <h3>하이</h3>
            {/* <h3>{str}</h3> */}
            <hr />
            <h3>{msg === '1' ? 'html 선택' : msg === '2' ? 'css 선택' : 'js 선택'}</h3> 

            {/* 조건식이 맞으면 컴포넌트 페이지를 열기 */}
            <h3>{msg === '1' ? <ReadOne /> : msg === '2' ? <ReadTwo /> : <ReadThree />}</h3> 
        </>
    );
}

export default Page;