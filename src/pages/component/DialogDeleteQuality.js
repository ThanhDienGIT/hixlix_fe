import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '../../../node_modules/@mui/material/index';
import instance from '../../axios/instance';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


// Create an instance of Notyf
const notyf = new Notyf({
  duration: 3500,
  position: {
      x: 'right',
      y: 'top',
  },
  dismissible: true
});

function DialogDeleteQuality(props) {

  const handleDelete = async () => {
    await instance.delete('deletequality/' + Number(props.idquality))
      .then((res) => {
        if (res.data.status === 'success') {
          notyf.success(res.data.message)
          props.handleClose()
          props.callApi()
        }
        else {
          const errorMessages = res.data.message;
          // Xử lý lỗi khác
          notyf.error(errorMessages);
        }
      }).catch((error) => {
        if (error.response) {
          // Lỗi phản hồi từ phía máy chủ
          const errorMessages = error.response.data.message;
          notyf.error(errorMessages);
        } else {
          // Lỗi khác, ví dụ: lỗi kết nối
          notyf.error('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
      });
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant='h4' color={'error'}>{"Xác nhận xóa"}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} size='small' variant="contained" color={'error'} >Xác nhận</Button>
        <Button onClick={props.handleClose} size='small' variant="outlined" autoFocus>
          Quay lại
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteQuality