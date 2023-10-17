import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

function LixDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [customer, setCustomer] = useState({
        ID_KH: 0,
        ID_NV: 0,
        ID_DVHC: 0,
        TEN_KH: "Nguyễn Văn Hùng Anh",
        DIACHI_KH: "",
        SODIENTHOAI_KH: "",
        CCCD_KH: "",
        SONHANKHAU_KH: "",
        NGAYSINH_KH: "",
        NGHENGHIEP_KH: "",
        MAHUYEN_KH: 0,
        MAXA_KH: 0,
        BAOHONG_KH: false,
        THOIGIANLAPDAT_KH: "",
        THOIGIANNGUNG_KH: "",
        FILENAME_KH: "",
        NGAYTAO_KH: format(new Date(), 'yyyy-MM-dd'),
        NGUOITAO_KH: 0,
        GHICHU_KH: "",
    })

    const getInfoCustomer = () => {
        //Callapi
        setCustomer({
            ID_KH: 0,
            ID_NV: 0,
            ID_DVHC: 0,
            TEN_KH: "",
            DIACHI_KH: "",
            SODIENTHOAI_KH: "",
            CCCD_KH: "",
            SONHANKHAU_KH: "",
            NGAYSINH_KH: "",
            NGHENGHIEP_KH: "",
            MAHUYEN_KH: 0,
            MAXA_KH: 0,
            BAOHONG_KH: false,
            THOIGIANLAPDAT_KH: "",
            THOIGIANNGUNG_KH: "",
            FILENAME_KH: "",
            NGAYTAO_KH: format(new Date(), 'yyyy-MM-dd'),
            NGUOITAO_KH: 0,
            GHICHU_KH: "",
        })
    }

    const [form, setForm] = useState([
        { form: 1 }
    ])

    const addForm = () => {
        setForm(rev => [...rev, { form: form.length + 1 }])
    }


    useEffect(() => {
        getInfoCustomer(props.idCustomer)
    }, [props.idCustomer])

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullScreen={fullScreen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#0099ff', color: 'white', width: '900' }}>
                Khảo sát LIX
            </DialogTitle>
            <DialogContent>

                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <TextField label="Họ và tên chủ hộ (*)" sx={{ marginTop: 1 }} value={customer.TEN_KH} name={'TEN_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <TextField label="Số điện thoại (*)" sx={{ marginTop: 2 }} />
                    <TextField label="CCCD (*)" sx={{ marginTop: 2 }} value={customer.CCCD_KH} name={'CCCD_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel >Quận huyện (*)</InputLabel>
                        <Select
                            label='Quận huyện'
                            value={customer.MAHUYEN_KH}
                            name={'MAHUYEN_KH'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <MenuItem value={0}>Chọn quận huyện</MenuItem>
                            {props.wards && props.wards.filter(x => x.ID_CHA_DVHC === null).map(ele => {
                                return (
                                    <MenuItem key={ele.ID_DVHC} value={ele.ID_DVHC}>{ele.TEN_DVHC}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel>Xã phường (*)</InputLabel>
                        <Select
                            label='Xã phường'
                            value={customer.MAXA_KH}
                            name={'MAXA_KH'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <MenuItem value={0}>Chọn xã phường</MenuItem>
                            {props.wards && props.wards.filter(x => x.ID_CHA_DVHC !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.ID_DVHC} value={ele.ID_DVHC}>{ele.TEN_DVHC}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <TextField label="Địa chỉ (*)" multiline sx={{ marginTop: 2 }} value={customer.DIACHI_KH} name={'DIACHI_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <TextField label="Số nhân khẩu" sx={{ marginTop: 2 }} value={customer.SONHANKHAU_KH} name={'SONHANKHAU_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <TextField label="Ngày sinh nhật"
                        InputLabelProps={{
                            shrink: true,
                        }} type={'date'} sx={{ marginTop: 2 }} value={customer.NGAYSINH_KH} name={'NGAYSINH_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <TextField label="Nghề nghiệp" sx={{ marginTop: 2 }} value={customer.NGHENGHIEP_KH} name={'NGHENGHIEP_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <FormControl sx={{ marginTop: 2 }} >
                        <FormLabel id="demo-row-radio-buttons-group-label">Đã biết số báo hỏng</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={customer.BAOHONG_KH}
                            name={'BAOHONG_KH'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <FormControlLabel value={false} control={<Radio />} label="Chưa biết" />
                            <FormControlLabel value={true} control={<Radio />} label="Đã biết" />
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
                                            label='Dịch vụ'
                                        >
                                            <MenuItem value={0}>Chọn dịch vụ</MenuItem>
                                            {props.serviceList && props.serviceList.map(ele => {
                                                return (
                                                    <MenuItem key={ele.ID_DV} value={ele.ID_DV}>{ele.TEN_DV}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ marginTop: 2 }}>
                                        <InputLabel>Nhà cung cấp</InputLabel>
                                        <Select
                                            value={2}
                                            label='Loại dịch vụ'
                                        >
                                            <MenuItem value={0}>Chọn nhà cung cấp</MenuItem>
                                            {props.provider && props.provider.map(ele => {
                                                return (
                                                    <MenuItem key={ele.ID_NHACUNGCAP} value={ele.ID_NHACUNGCAP}>{ele.TEN_NHACUNGCAP}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                    <TextField label="Mức cước/tháng" sx={{ marginTop: 2 }} />
                                    <TextField label="Hình thức đóng" sx={{ marginTop: 2 }} />
                                    <TextField label="Khách hàng đại diện (*)" sx={{ marginTop: 2 }} />
                                    <TextField label="Account BRCĐ" sx={{ marginTop: 2 }} />
                                    <TextField label={'Ngày bắt đầu đặt cọc'} type="date" value={'2023-10-09'} sx={{ marginTop: 2 }} />
                                    <TextField label={'Ngày kết thúc đặt cọc'} type="date" value={'2023-12-09'} sx={{ marginTop: 2 }} />

                                    <FormControl fullwidth sx={{ marginTop: 2 }}>
                                        <InputLabel>Đánh giá chất lượng dịch vụ</InputLabel>
                                        <Select
                                            value={8}
                                            label='10'>

                                            {props.servicePointList && props.servicePointList.map(ele => {
                                                return (
                                                    <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullwidth sx={{ marginTop: 2 }}>
                                        <InputLabel>Đánh giá cảm nhận về chất lượng dịch vụ </InputLabel>
                                        <Select
                                            value={8}
                                            label='10'>
                                            {props.servicePointList && props.servicePointList.map(ele => {
                                                return (
                                                    <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                                )
                                            })}
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