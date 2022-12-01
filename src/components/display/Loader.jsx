import React from 'react';

import { Spinner, SpinnerContainer } from './elements';

export const Loader = ({btn}) => {
    return (
        <SpinnerContainer btn={btn}>
            <Spinner btn={btn} />
        </SpinnerContainer>
    )
}

export default Loader