import React from "react";
import Slider from "react-slick";

import './Sliders.sass';

export class SimpleSlider extends React.Component{
  render(){
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      swipeToSlide: true
    };
    return (
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    );
  }
}

export class ChooseDeviceSlider extends React.Component{
  render(){
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      swipeToSlide: true
    };

    console.log(this.props)
    const { slides, component } = this.props
    const props = {
      value: this.props.value,
      onChange: this.props.onChange
    }

    return (
      <Slider {...settings}>
        {
          slides.map((slide, i)=>
            <div key={i}>
              {React.createElement(component, {...props, ...slide})}
            </div>
          )
        }
      </Slider>
    );
  }
}

