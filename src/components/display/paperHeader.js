import React from 'react'
import { TLeaseFlex } from '../../screens/lease/elements'
import { NgDivider } from '../../screens/maintenance/elements'
import { FlexWrapper, IconText, Icon } from '../../screens/user.elements'

const PaperHeader = ({heading, children, noDivider}) => {
    return (
        <>
            <TLeaseFlex>
                <FlexWrapper>
                    <Icon>
                        {children}
                    </Icon>
                    <IconText header>
                        {heading}
                    </IconText>
                </FlexWrapper>
            </TLeaseFlex>
            { noDivider ? "" : <NgDivider />}
        </>
        
    )
}

export default PaperHeader