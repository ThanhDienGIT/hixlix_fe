import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import instance from '../../axios/instance';

function LixDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [customer, setCustomer] = useState({
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

    const [service, setService] = useState({
        ID_PKS: 0,
        ID_DV: 0,
        DIACHI_KH: "",
        TENKHACHHANGDAIDIEN_CTPKS: "",
        SODIENTHOAIKHACHHANGDAIDIEN_CTPKS: "",
        ACCOUNTKHACHHANG_CTPKS: "",
        MUCCUOC_CTPKS: "",
        HINHTHUCDONG_CTPKS: "",
        NGAYBATDAUDONGCOC_CTPKS: "",
        NGAYKETTHUCDONGCOC_CTPKS: "",
        NHACUNGCAP_CTPKS: 0,
        DIEMHAILONG_CTPKS: 0,
        CAMNHANDICHVU_CTPKS: 0,
        CAMNHANPHUCVU_CTPKS: 0,
        YKIENKHAC: "",
        NGUOITAO_CTPKS: 0,
        NGAYTAO_CTPKS: "",
        NGUOIUPDATE_CTPKS: 0,
        NGAYUPDATE_CTPKS: "",
        IS_DELETED: 0,
    })

    const onChangeCustomer = (e) => {
        setCustomer(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const onChangeservice = (e) => {
        setService(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const getInfoCustomer = (id) => {
        instance.get('getKHByID/' + id).then(res => setCustomer(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.idCustomer !== 0) {
            getInfoCustomer(props.idCustomer)
        }
        instance.get('get_lix').then(res => console.log(res.data)).catch(err => console.log(err))
    }, [props.idCustomer])

    useEffect(() => {
        setService({ ID_DV: 0 });
    }, [service.ID_DV])

    useEffect(() => {
        instance.get('get_lix').then(res => console.log(res.data)).catch(err => console.log(err))
    }, [])

    console.log(service)
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
                    <TextField disabled label="Họ và tên chủ hộ (*)" sx={{ marginTop: 1 }} value={customer.TEN_KH} name={'TEN_KH'} onChange={(e) => { onChangeCustomer(e) }} />
                    <TextField disabled label="Số điện thoại (*)" sx={{ marginTop: 2 }} value={customer.SODIENTHOAI_KH} name={'SODIENTHOAI_KH'} onChange={(e) => { onChangeCustomer(e) }} />
                    <Card sx={{ marginTop: 2 }}>
                        <CardContent sx={{ display: 'flex', width: '900', flexDirection: 'column' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Dịch vụ sử dụng
                            </Typography>
                            <FormControl fullwidth sx={{ marginTop: 1 }}>
                                <InputLabel>Dịch vụ</InputLabel>
                                <Select
                                    value={service.ID_DV}
                                    label='Dịch vụ'
                                    name={'ID_DV'}
                                    onChange={(e) => { onChangeservice(e) }}
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
                                    value={service.NHACUNGCAP_CTPKS}
                                    name="NHACUNGCAP_CTPKS"
                                    onChange={(e) => { onChangeservice(e) }}
                                    label='Nhà cung cấp'
                                >
                                    <MenuItem value={0}>Chọn nhà cung cấp</MenuItem>
                                    {props.provider && props.provider.map(ele => {
                                        return (
                                            <MenuItem key={ele.ID_NHACUNGCAP} value={ele.ID_NHACUNGCAP}>{ele.TEN_NHACUNGCAP}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            <TextField label="Mức cước/tháng" sx={{ marginTop: 2 }} value={service.MUCCUOC_CTPKS} name={'MUCCUOC_CTPKS'} onChange={(e) => { onChangeservice(e) }} />
                            <TextField label="Hình thức đóng" sx={{ marginTop: 2 }} value={service.HINHTHUCDONG_CTPKS} name={'HINHTHUCDONG_CTPKS'} onChange={(e) => { onChangeservice(e) }} />
                            <TextField label="Khách hàng đại diện (*)" sx={{ marginTop: 2 }} value={service.TENKHACHHANGDAIDIEN_CTPKS} name={'TENKHACHHANGDAIDIEN_CTPKS'} onChange={(e) => { onChangeservice(e) }} />
                            <TextField label="Account BRCĐ" sx={{ marginTop: 2 }} value={service.ACCOUNTKHACHHANG_CTPKS} name={'ACCOUNTKHACHHANG_CTPKS'} onChange={(e) => { onChangeservice(e) }} />
                            <TextField label={'Ngày bắt đầu đặt cọc'} InputLabelProps={{
                                shrink: true,
                            }} type="date" value={service.NGAYBATDAUDONGCOC_CTPKS} name={'NGAYBATDAUDONGCOC_CTPKS'} onChange={(e) => { onChangeservice(e) }} sx={{ marginTop: 2 }} />
                            <TextField label={'Ngày kết thúc đặt cọc'} InputLabelProps={{
                                shrink: true,
                            }} type="date" value={service.NGAYKETTHUCDONGCOC_CTPKS} name={'NGAYKETTHUCDONGCOC_CTPKS'} onChange={(e) => { onChangeservice(e) }} sx={{ marginTop: 2 }} />

                            <FormControl fullwidth sx={{ marginTop: 2 }}>
                                <InputLabel>Đánh giá chất lượng dịch vụ</InputLabel>
                                <Select
                                    value={service.CAMNHANDICHVU_CTPKS}
                                    name="CAMNHANDICHVU_CTPKS"
                                    onChange={(e) => { onChangeservice(e) }}
                                    label={'Đánh giá chất lượng dịch vụ'}
                                >

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
                                    value={service.CAMNHANPHUCVU_CTPKS}
                                    name="CAMNHANPHUCVU_CTPKS"
                                    onChange={(e) => { onChangeservice(e) }}
                                >
                                    {props.servicePointList && props.servicePointList.map(ele => {
                                        return (
                                            <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <TextField label="ý kiến khác" multiline sx={{ marginTop: 2 }} value={service.YKIENKHAC} name={'YKIENKHAC'} onChange={(e) => { onChangeservice(e) }} />
                        </CardContent>
                    </Card>
                </Box>

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