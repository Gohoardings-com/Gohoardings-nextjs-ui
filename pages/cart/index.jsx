import React from 'react';
import dynamic from 'next/dynamic';

const Cart = dynamic(() => import("./cart"), {
  ssr: false,
});
const index = () => {
  return (
    <>
      <Cart/>
    </>
  );
}

export default index;
