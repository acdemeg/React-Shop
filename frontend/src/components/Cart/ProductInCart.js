import React from 'react';
import TrashButton from './TrashButton';
import MinusButton from './MinusButton';
import PlusButton from './PlusButton';
import Count from './Count';
import './Cart.css';

function ProductInCart({ item, onIncrease, onDecrease, onDelete }) {
  const { nameProduct, count, total, pathImage } = item;

  return (
    <div className="cart-goods">
      <TrashButton onDelete={onDelete} />
      <MinusButton onDecrease={onDecrease} />
      <Count count={count} />
      <PlusButton onIncrease={onIncrease} />

      <div className="cart-goods-image">
        <img src={`/upload/${pathImage}`} width="80px" height="80px" />
      </div>
      <div className="cart-goods-title"> {nameProduct} </div>
      <div className="cart-goods-price"> {`${total}$`} </div>
    </div>
  );
}

export default ProductInCart;
