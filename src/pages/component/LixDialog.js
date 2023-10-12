import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '../../../node_modules/@mui/material/index';

function LixDialog(props) {

    const [form, setForm] = useState([
        { form: 1 }
    ])

    const addForm = () => {
        setForm(rev => [...rev, { form: form.length + 1 }])
    }



    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullScreen
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#0099ff', color: 'white', width: '900' }}>
                Khảo sát LIX
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} >
                    <TextField disabled label="Họ và tên chủ hộ (*)" sx={{ marginTop: 1 }} />
                    <TextField disabled label="Địa chỉ (*)" multiline sx={{ marginTop: 2 }} />
                    <TextField label="Số điện thoại (*)" sx={{ marginTop: 2 }} />
                    <TextField label="Số điện thoại khách hàng đại diện (*)" sx={{ marginTop: 2 }} />
                    <TextField label="Số nhân khẩu" sx={{ marginTop: 2 }} />
                    <TextField label="Khách hàng đại diện (*)" sx={{ marginTop: 2 }} />
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
                    {form.map(element => {
                        return (
                            <Card key={element} sx={{ marginTop: 2 }}>
                                <CardContent sx={{ display: 'flex', width: '900', flexDirection: 'column' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Dịch vụ sử dụng
                                    </Typography>
                                    <FormControl fullwidth sx={{ marginTop: 1 }}>
                                        <InputLabel>Dịch vụ</InputLabel>
                                        <Select
                                            value='1'
                                            label='Dịch vụ'>
                                            <MenuItem value='1'>FTTH</MenuItem>
                                            <MenuItem>MyTv</MenuItem>
                                            <MenuItem>Di động TS/TT</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ marginTop: 2 }}>
                                        <InputLabel>Nhà cung cấp</InputLabel>
                                        <Select
                                            value={2}
                                            label='Loại dịch vụ'
                                        >
                                            <MenuItem value={2}>VNPT</MenuItem>
                                            <MenuItem>Viettel</MenuItem>
                                            <MenuItem>FPT</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField label="Mức cước/tháng" sx={{ marginTop: 2 }} />
                                    <TextField label="Hình thức đóng" sx={{ marginTop: 2 }} />
                                    
                                        <TextField label={'Ngày bắt đầu đặt cọc'} type="date" value={'2023-10-09'} sx={{ marginTop: 2 }} />
                                        <TextField label={'Ngày kết thúc đặt cọc'} type="date"value={'2023-12-09'}  sx={{ marginTop: 2 }} />
                                 
                                    <FormControl fullwidth sx={{ marginTop: 2 }}>
                                            <InputLabel>Đánh giá chất lượng dịch vụ</InputLabel>
                                            <Select
                                                value={8}
                                                label='10'>
                                                <MenuItem>1</MenuItem>
                                                <MenuItem>2</MenuItem>
                                                <MenuItem>3</MenuItem>
                                                <MenuItem>4</MenuItem>
                                                <MenuItem>5</MenuItem>
                                                <MenuItem>6</MenuItem>
                                                <MenuItem>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem>9</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullwidth sx={{ marginTop: 2 }}>
                                            <InputLabel>Đánh giá cảm nhận về chất lượng DV </InputLabel>
                                            <Select
                                                value={8}
                                                label='10'>
                                                <MenuItem>1</MenuItem>
                                                <MenuItem>2</MenuItem>
                                                <MenuItem>3</MenuItem>
                                                <MenuItem>4</MenuItem>
                                                <MenuItem>5</MenuItem>
                                                <MenuItem>6</MenuItem>
                                                <MenuItem>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem>9</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField label="ý kiến khác" multiline sx={{ marginTop: 2 }} />

                                </CardContent>
                            </Card>
                        )
                    })}

                </Box>
                <Button onClick={addForm}>Thêm dịch vụ</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Huỷ</Button>
                <Button onClick={props.handleClose} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>



    )
}

export default LixDialog