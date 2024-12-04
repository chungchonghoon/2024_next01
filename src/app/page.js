import Image from "next/image";
import img01 from "/public/images/coffee-blue.jpg"

/* 
  page.js는 필수이다. (생략 불가) 
  각 경로(/, /about, /content .. )마다 페이지를 렌더링하려면
  해당 경로의 page.js 파일이 반드시 필요하다.
*/

import ItemList from './itemList/page';

// 아래 컴포넌트는 자식컴포넌트이다.
export default function Home() {
  return (

    // {해당 내용은 부모컴포넌트의 props => {children}에 삽입된다.}
    <>
      {/* <h1>Welcome Home</h1> */}

      {/* 이미지는 퍼블릭에 images폴더를 만들자 */}
      {/* 이미지 자체를 import 하지 않으면 너비와 높이를 넣어줘야 한다. */}
      {/* <p><Image src="/images/coffee-blue.jpg" alt="" width={100} height={100}/></p> // Image라는 컴포넌트가 존재하니 사용하자 */}

      {/* import한 이미지의 너비와 높이의 설정은 선택사항이다. */}
      {/* 
      <p><Image src={img01} /></p>
      <p><Image src={img01} width={50} height={50}/></p> 
      */}

      <ItemList></ItemList>

    </>
  );
}
