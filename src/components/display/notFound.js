import React from 'react'
import { NotFoundContainer, NotFoundWrapper, NotFoundIcon, NotFoundText } from './elements'
import { FcInfo } from 'react-icons/fc'

const NotFound = ({children, text}) => {
    return (
        <NotFoundContainer>
            <NotFoundWrapper>
                <NotFoundIcon>{children}</NotFoundIcon>
                <NotFoundText>{text}</NotFoundText>
            </NotFoundWrapper>
        </NotFoundContainer>
    )
}

export default NotFound