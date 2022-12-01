import { Tooltip } from '@mui/material'
import React from 'react'
import { ToolTipAlertIcon } from './elements'

const TooltipAlert = ({title}) => {
    return (
        <Tooltip title={title} placement="bottom-start">
            <ToolTipAlertIcon />
        </Tooltip>
        
    )
}

export default TooltipAlert

