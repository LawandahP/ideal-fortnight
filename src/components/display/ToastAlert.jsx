import React  from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


import { FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';


function ToastAlert({severity, children, variant, icon}) {

    const [open, setOpen] = React.useState(true);

    return (

            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                        variant={variant}
                        severity={severity}
                        icon={severity === 'error' ? <FiAlertTriangle fontSize='inherit'/> : severity === "info" ? <FiInfo /> : "" }
                        action={
                            <IconButton
                            aria-label="close"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                        <FiX fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    {children}
                    </Alert>
                </Collapse>
            </Box>
        
    )
}
export default ToastAlert;









