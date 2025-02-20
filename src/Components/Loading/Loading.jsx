// import React from 'react';
import loadingIcon from '../../../src/assets/loading/undraw_to-do_06xe.svg'; // Adjust path as needed

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={loadingIcon} alt="Loading..." className="w-96 " />
        </div>
    );
};

export default Loading;
