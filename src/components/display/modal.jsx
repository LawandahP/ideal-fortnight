import React from 'react'
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles'


import { FiX } from 'react-icons/fi';
import Controls from '../controls/Controls';
import PaperHeader from './paperHeader';


const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: "2px",
        position: 'absolute',
        top: "5px"
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {

    const { title, icon, children, openPopup, setOpenPopup, openModal, setOpenModal, fullScreen, sx } = props;
    const classes = useStyles();

    return (
        <Dialog 
            sx={sx}
            open={openPopup || openModal} 
            fullWidth={true} fullScreen={fullScreen} 
            classes={{ paper: classes.dialogWrapper }}
            TransitionComponent={Transition}
        >

            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <p>
                        <PaperHeader noDivider heading={title}>
                            {icon}
                        </PaperHeader>
                    </p>
                    <Controls.CancelButton
                        onClick={ setOpenPopup ? () => setOpenPopup(false) : setOpenModal ? () => setOpenModal(false) :  ""}>
                        {/* // onClick={ setOpenModal ? () => setOpenModal(false) :  ""}> */}
                        {/* <FiX /> */}
                    </Controls.CancelButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}