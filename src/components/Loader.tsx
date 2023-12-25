import React from 'react';

const Loader = () => {
    return (
        <div className='mt-16'>
            <div className="animate-spin w-52 h-52 border-gray-700 border-8 mx-auto my-auto"></div>
            <div className="text-center mt-16 text-2xl">Loading...</div>
        </div>
    );
};

export default Loader;