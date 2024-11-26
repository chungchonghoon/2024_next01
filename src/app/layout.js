// layout.js는 선택이다. (RootLayout 제외)
// layout이 필요없는 간단한 페이지에서는 생략 가능하다.

import Link from "next/link";

// 페이지 전체의 공통구조를 렌더링 할 때 사용한다.

// 아래 컴포넌트는 부모 컴포넌트
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ textAlign: "center" }}>
        {/* <header style={{ marginTop:"50px" }}>공통 헤더</header> */}
        {/* 자식컴포넌트가 렌더링 된다. */}
        {/* {children} */}
        {/* <footer style={{ marginTop:"50px" }}>공통 푸터</footer> */}

        {/* WEB을 눌렀을 때 메인 페이지로 오게 됨. <Link to="">가 아닌 <Link href="> */}
        <h1><Link href="/"> WEB </Link></h1>

        <ol>
            {/*
              next.js에서 동적 라우팅 사용하기
              read\[id] 란 이름으로 폴더 생성 하기
              */}
            <li><Link href="/read/1">HTML</Link></li>
            <li><Link href="/read/2">CSS</Link></li>
            <li><Link href="/read/3">JS</Link></li>

            {/* 
            마찬가지로 /gallery 이면 gallery 폴더를 찾는다. (gallery 폴더를 생성하자) 
            (gallery 폴더안에 page.jsx(필수), layout.jsx(선택)이 있어야 한다.) 
            */}
            <li><Link href="/gallery">image</Link></li>
            <li>ItemList ( 외부서버 )</li>
            <li>GuestBook ( 내(Spring) 서버 )</li>

        </ol>
        <hr />
        {children}
        <hr />
        <ul>
            {/* 
            /create 이면 create 폴더를 찾는다. 
            (create 폴더안에 page.jsx(필수), layout.jsx(선택)이 있어야 한다.) 
            */}
            <li><Link href="/create">Create</Link></li>
            <li>Update</li>
            <li><input type="button" value="delete" /></li>
        </ul>
      </body>
    </html>
  );
}
