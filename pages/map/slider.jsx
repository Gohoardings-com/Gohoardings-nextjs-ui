import React from "react";
import ReactSlider from "react-slider";
import "./slider.css"

const Slider = (props) => {
  const HandleDistance = async (e) => {
    props.onChange(e);
 }
 
  return (
    <ReactSlider
      className="customSlider"
      thumbClassName="customSlider-thumb"
      data-legendnum="2"
      trackClassName="customSlider-track"
      markClassName="customSlider-mark"
      marks={1}
      min={0}
      max={3}
      defaultValue={1}
      onChange={(e) => HandleDistance(e)}
    />
  );
};

export default Slider;