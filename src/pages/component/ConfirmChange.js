import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '../../../node_modules/@mui/material/index';

function ConfirmChange(props) {
    
    const confirm = () => {
        props.createBallot()
        props.handleClose()
    }

    const cancel = () => {
        props.reloadPage()
        props.handleClose()
    }
    
    return (
        <Dialog open={props.open} >
            <DialogTitle>
            <Typography sx={{maxWidth:250}} variant='h4'>
            Xác nhận lưu các thay đổi
            </Typography>
               
                </DialogTitle>
            <DialogContent>
                <Typography sx={{maxWidth:250}} color={'primary'}>
                    Nhấn đồng ý để lưu các nội dung khảo sát hiện tại 
                </Typography>
                <Typography sx={{maxWidth:250}} color={'error'}>
                    Nhấn Hủy bỏ để giữ nguyên nội dung khảo sát
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant={'contained'} onClick={confirm}>Đồng ý</Button>
                <Button variant={'outlined'} color={'error'} onClick={cancel}>Hủy bỏ</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmChange