
import React, { useState } from 'react'
export const HandsVisibleContext = React.createContext({
    handsVisible: false, // 默认值
    setHandsVisible: (i) => {!i}, // 空函数作为默认值
});

export const HandsVisibleProvider = ({ children }) => {
    const [handsVisible, setHandsVisible] = useState(false);

    return (
        <HandsVisibleContext.Provider value={{ handsVisible, setHandsVisible }}>
            {children}
        </HandsVisibleContext.Provider>
    );
};
