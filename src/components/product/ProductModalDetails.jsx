import React from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../ui/ImageLoader';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { displayMoney, displayActionMessage } from '../../helpers/utils'; 

const ProductModalDetails = ({ product, dispatch, foundOnBasket }) => {
  const onAddToBasket = () => {
    if (foundOnBasket(product.id)) {
      dispatch(removeFromBasket(product.id));
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(addToBasket(product));
      displayActionMessage('Item added to basket', 'success');
    }
  };

  return !product ? null : (
    <div className="product-modal">
      <div className="product-modal-image-wrapper">
        <ImageLoader 
            alt={product.name}
            className="product-modal-image"
            src={product.image} 
        />
      </div>
      <div className="product-modal-details">
        <h3>{product.name}</h3>
        <span>Brand: <strong>{product.brand}</strong></span>
        <br/>
        <span>Description:&nbsp;</span>
        <span>{product.description}</span>
        <br/>
        <h1>{displayMoney(product.price)}</h1>
        <div className="product-modal-action">
          <button 
              className={`button button-small ${foundOnBasket(product.id) ? 'button-border button-border-gray' : ''}`} 
              onClick={onAddToBasket}
          >
            {foundOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductModalDetails.propType = {
  product: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  foundOnBasket: PropTypes.func.isRequired
};

export default ProductModalDetails;
