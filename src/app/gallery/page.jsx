import Image from 'next/image';
import './gallery.css'; /* 같은 폴더안에 CSS파일 만들면 됨 */

function page(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <td><Image src="/images/tree-1.jpg" alt="" width={50} height={50}></Image></td>
                    <td><Image src="/images/tree-2.jpg" alt="" width={50} height={50}></Image></td>
                    <td><Image src="/images/tree-3.jpg" alt="" width={50} height={50}></Image></td>
                </tr>
                <tr>
                    <td><Image src="/images/tree-4.jpg" alt="" width={50} height={50}></Image></td>
                    <td><Image src="/images/tree-5.jpg" alt="" width={50} height={50}></Image></td>
                    <td><Image src="/images/tree-6.jpg" alt="" width={50} height={50}></Image></td>
                </tr>
            </tbody>
        </table>
    );
}

export default page;