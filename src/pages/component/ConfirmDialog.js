import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


function ConfirmDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const confirm = () => {
        props.deleteProof()
        props.handleClose()
    }

    const cancel = () => {
        props.handleClose()
    }

    return (
        <Dialog open={props.open}
            fullScreen={fullScreen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='sm' >
            <DialogTitle>
                <Typography sx={{ maxWidth: 250 }} variant='h4'>
                    {props.title}
                </Typography>

            </DialogTitle>
            <DialogContent>
                <Typography sx={{ maxWidth: 250 }} variant='h6'>
                    {props.content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant={'contained'} onClick={confirm}>Đồng ý</Button>
                <Button variant={'outlined'} color={'error'} onClick={cancel}>Hủy bỏ</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog