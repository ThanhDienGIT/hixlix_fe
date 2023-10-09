import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box,  FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '../../../node_modules/@mui/material/index';

function AddCustomer(props) {


    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{backgroundColor:'#0099ff',color:'white'}}>
                Form thêm khách hàng
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} >
                    <TextField label="Họ và tên chủ hộ" sx={{ marginTop: 1 }} />
                    <TextField label="Địa chỉ" multiline sx={{ marginTop: 2 }} />
                    <TextField label="Số điện thoại" sx={{ marginTop: 2 }} />
                    <TextField label="Số nhân khẩu" sx={{ marginTop: 2 }} />
                    <TextField label="Khách hàng đại diện hợp đồng" sx={{ marginTop: 2 }} />
                    <TextField label="Account BRCĐ" sx={{ marginTop: 2 }} />
                    <TextField label="Ngày sinh nhật" sx={{ marginTop: 2 }} />
                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel >Quận huyện</InputLabel>
                        <Select
                            label='Quận huyện' >
                            <MenuItem>hello</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel>Xã phường</InputLabel>
                        <Select
                            label='Xã phường'>
                            <MenuItem>hello</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Địa chỉ cụ thể" sx={{ marginTop: 2 }} />
                    <TextField label="Nghề nghiệp" sx={{ marginTop: 2 }} />
                    <FormControl sx={{ marginTop: 2 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Đã biết số báo hỏng</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Đã biết" />
                            <FormControlLabel value="2" control={<Radio />} label="Chưa biết" />
                        </RadioGroup>
                    </FormControl>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Disagree</Button>
                <Button onClick={props.handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCustomer