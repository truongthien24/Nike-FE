import React from 'react'
import HeadingArea from './compontents/HeadingArea';
import SliderGiay from './compontents/SliderBook';

const AreaBook = (props) => {
    // Props
    const { data } = props;
    return (
        <div>
            <HeadingArea title={data?.title} />
            <SliderGiay data={data?.data} />
        </div>
    )
}

export default AreaBook