import React from 'react';
import notFound from '../../assets/images/notFound.png';

const NotFoundView = () => {
    return (
        <div>
            <img src={notFound} alt="" style={{maxWidth: 400}} />
        </div>
    )
}

export default NotFoundView;