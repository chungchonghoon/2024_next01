import Image from 'next/image';
import React from 'react';

function ReadOne(props) {
    return (
        <>
            <h3>Read-1</h3>
            <Image src="/images/tree-1.jpg" alt="" width={300} height={300} />   
        </>
    );
}

export default ReadOne;