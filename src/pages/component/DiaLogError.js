import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '../../../node_modules/@mui/material/index';

function DiaLogError(props) {


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
          <Button onClick={props.handleClose} size='small' variant="contained" color={'error'} >Xác nhận</Button>
          <Button onClick={props.handleClose} size='small' variant="outlined" autoFocus>
            Quay lại
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DiaLogError