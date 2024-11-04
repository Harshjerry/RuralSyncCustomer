import React from 'react';
import './Front.css';

import Navbar from "./../Navbar/Navbar";
const Front = () => {
    return (
        <div className="Front_cont">
            <Navbar/>
            <img className="front_img" src="./villag1.png" alt="where" />
            <div className='logo_cont'>
                <img src="./logo_rs.png" alt="" className='logoimg' />
            </div>

            <div className='front_content'>
                <div className='content_left'>
                    <div className="content_left">
                        <h4>Where</h4>
                        <h1>
                            RURAL<span className="needs">NEEDS</span>
                        </h1>
                    </div>

                </div>
                <div className='content_right'>
                    <h4>Meets</h4>
                    <h1>
                        INNOVATION<span className="needs">SOLUTIONS</span>
                    </h1>
                </div>
            </div>

        </div>
    );
};

export default Front;
