import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OverallPiechart = (targetPercentage,title,duration = 1000) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = targetPercentage / (duration / 10);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetPercentage) {
                start = targetPercentage;
                clearInterval(timer);
            }
            setPercentage(Math.round(start));
        }, 10);

        return () => clearInterval(timer);
    }, [targetPercentage, duration]);

    return (
        <div>
            <h1 className='flex flex-row items-center justify-center pt-6'>{title}</h1>
        <div style={{ width: '50px', height: '50px', position:'relative', left:'550px',top:'100px' }}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
            styles={buildStyles({
                pathColor: '#YE1E1E', // Set your desired color here
                textColor:  '#000000',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
            })}
            />
        </div>
        </div>
    );
}

export default OverallPiechart