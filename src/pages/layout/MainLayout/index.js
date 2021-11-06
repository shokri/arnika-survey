import React from 'react';
import './styles.scss';

const MainLayout = ({ children }) => {

    return (
        <div className="wrapper-pages">
            {children}
        </div>
    );
}

export default MainLayout;