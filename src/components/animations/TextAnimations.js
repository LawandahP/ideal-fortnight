
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AuthText } from '../../auth/users/resetPassword/elements'


const animation = keyframes`
    0% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px);}
    25% { opacity: 1; transform: translateY(0) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);}
    75% { opacity: 1; transform: translateY(0) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);}
    100% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px);}
`
export const Wrapper = styled.span`
    display: flex;

    span {
        opacity: 0;
        animation-name: ${animation};
        animation-duration: 6s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    span:nth-child(1) {
        animation-delay: 0.1s;
    }
`

export const TextAnimation = ({text}) => {

    const reactArray = text.split("")
    return (
        <Wrapper>
            {reactArray.map((item, index) =>(
                <span key={index}>
                    <AuthText orange>{item}</AuthText>
                </span>
            ))}
        </Wrapper>
    )
}

