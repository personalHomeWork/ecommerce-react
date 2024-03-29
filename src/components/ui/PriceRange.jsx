import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { displayMoney } from '../../helpers/utils';

const PriceRange = ({ 
  min, 
  max,
  initMin,
  initMax,
  onPriceChange,
  productsLength 
}) => {
  const [minState, setMinState] = useState(initMin ? initMin : min);
  const [maxState, setMaxState] = useState(initMax ? initMax : max);
  const slider = useRef(null);
  const inputMin = useRef(null);
  const inputMax = useRef(null);
  const rangeMin = useRef(null);
  const rangeMax = useRef(null);

  useEffect(() => {
    setMinState(initMin ? initMin : min);
    setMaxState(initMax ? initMax : max);
  }, [initMin, initMax]);

  const onRangeChange = () => {
    let slide1 = +rangeMin.current.value;
    let slide2 = +rangeMax.current.value;

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }

    setMinState(slide1);
    setMaxState(slide2);
    onPriceChange(slide1, slide2);
  };

  const onInputChange = () => {
    const valMin = +inputMin.current.value;
    const valMax = +inputMax.current.value;
    
    if (valMin > valMax) {
      const tmp = valMin;
      inputMin.current.value = valMax;
      inputMax.current.value = tmp;
    }

    setMinState(valMin);
    setMaxState(valMax);
    onPriceChange(valMin, valMax);
  };

  return (
    <div 
        className="price-range" 
        ref={slider}
    >
      <div className="price-range-control">
        <input 
            className="price-range-input"
            disabled={productsLength === 0}
            max={max}
            min={min} 
            onChange={onInputChange}
            ref={inputMin}
            type="number" 
            value={minState}
          />
        — 
        <input 
            className="price-range-input"
            disabled={productsLength === 0}
            max={max}
            min={min}
            onChange={onInputChange}
            ref={inputMax}
            type="number" 
            value={maxState} 
        />
      </div>
      <div className="price-range-control">
        <input 
            className="price-range-slider"
            disabled={productsLength === 0}
            max={max} 
            min={min}
            onChange={onRangeChange}
            ref={rangeMin}
            step="50" 
            type="range" 
            value={minState} 
        />
        <input 
            className="price-range-slider"
            disabled={productsLength === 0}
            max={max} 
            min={min}
            onChange={onRangeChange}
            ref={rangeMax} 
            step="20"
            type="range"
            value={maxState} 
        />
      </div>
      <div className="price-range-scale">
        <span className="price-range-price">{displayMoney(min)}</span>
        <span className="price-range-price">{displayMoney(max)}</span>
      </div>
    </div>
  );
};

PriceRange.propType = {
  min: PropTypes.number,
  max: PropTypes.number,
  onMaxPriceChange: PropTypes.func,
  onMinPriceChange: PropTypes.func
};

export default PriceRange;
