import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import { FiAlertOctagon } from "react-icons/fi";
// import Controls from './controls/Controls';
import Slide from "@mui/material/Slide";
import Controls from "../controls/Controls";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: "2px",
        position: "absolute",
        top: "5px",
    },
    dialogTitle: {
        textAlign: "center",
    },
    dialogContent: {
        textAlign: "center",
    },
    dialogAction: {
        justifyContent: "center",
    },
    titleIcon: {
        "&:hover": {
            cursor: "default",
        },
        "& .MuiSvgIcon-root": {
            fontSize: "8rem",
            // backgroundColor: theme.palette.secondary.light,
            // color: theme.palette.secondary.main,
        },
    },
}));

export default function ConfirmDialog(props) {
    const {
        confirmDialog,
        setConfirmDialog,
        confirmDialog2,
        setConfirmDialog2,
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={confirmDialog.open}
            classes={{ paper: classes.dialog }}
            TransitionComponent={Transition}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <FiAlertOctagon
                        style={{ fontSize: "5rem", color: "red" }}
                    />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">{confirmDialog.title}</Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Controls.ActionButton
                    edit
                    onClick={
                        // confirmDialog  ? () => setConfirmDialog({ ...confirmDialog, open: false }) :
                        // confirmDialog2 ? () => setConfirmDialog2({ ...confirmDialog2, open: false }) : ""
                        () =>
                            setConfirmDialog({
                                ...confirmDialog,
                                open: false,
                            })
                    }
                >
                    no
                </Controls.ActionButton>
                <Controls.ActionButton onClick={confirmDialog.onConfirm}>
                    yes
                </Controls.ActionButton>
            </DialogActions>
        </Dialog>
    );
}
