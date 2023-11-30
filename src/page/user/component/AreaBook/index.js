import React from 'react'
import HeadingArea from './compontents/HeadingArea';
import SliderShoe from './compontents/SliderShoe';

const AreaBook = (props) => {
    // Props
    const { data } = props;
    return (
        <div>
            <HeadingArea title={data?.title} />
            <SliderShoe data={data?.data} />
        </div>
    )
}

export default AreaBook