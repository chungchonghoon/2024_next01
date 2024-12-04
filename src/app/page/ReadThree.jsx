import Image from 'next/image';
import React from 'react';

function ReadThree(props) {
    return (
        <>
            <h3>Read-3</h3>
            <Image src="/images/tree-3.jpg" alt="" width={300} height={300} />   
        </>
    );
}

export default ReadThree;