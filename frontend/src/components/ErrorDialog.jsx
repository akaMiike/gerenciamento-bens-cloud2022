import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from 'react';

export function ErrorDialog( { dialogData } ) {
    const { isOpen, onClose, title, description, closeButtonName = "Fechar" } = dialogData

    if (!isOpen) return <></>

    return <div>
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb: "12px"}}>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{closeButtonName}</Button>
            </DialogActions>
        </Dialog>
    </div>
}