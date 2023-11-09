import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import instance from '../../axios/instance';
import ConfirmChange from './ConfirmChange';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import viLocale from 'date-fns/locale/vi';
import { viVN } from '@mui/x-date-pickers/locales';

function LixEdit(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertError, setOpenAlertError] = useState(false);
    const [contentNotifi, setContenNotifi] = useState('')

    const alertError = (string) => {
        setContenNotifi(string)
        setOpenAlertError(true)
    }

    const closeError = () => {
        setOpenAlertError(false)
        setContenNotifi('')
    }

    const alertSuccess = (string) => {
        setContenNotifi(string)
        setOpenAlertSuccess(true)
    }

    const closeSuccess = () => {
        setContenNotifi('')
        setOpenAlertSuccess(false)
    }

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
        ID_KH: props.customer,
        TENKHACHHANGDAIDIEN_CTPKS: "",
        SODIENTHOAIKHACHHANGDAIDIEN_CTPKS: "",
        ACCOUNTKHACHHANG_CTPKS: "",
        MUCCUOC_CTPKS: "",
        HINHTHUCDONG_CTPKS: "",
        NGAYBATDAUDONGCOC_CTPKS: "",
        NGAYKETTHUCDONGCOC_CTPKS: "",
        THOIGIANLAPDAT_CTPKS: "",
        THOIGIANNGUNG_CTPKS: "",
        NHACUNGCAP_CTPKS: 0,
        DIEMHAILONG_CTPKS: 0,
        CAMNHANDICHVU_CTPKS: 0,
        CANNHANPHUCVU_CTPKS: 0,
        YKIENKHAC: "",
        NGUOITAO_CTPKS: 0,
        NGAYTAO_CTPKS: format(new Date(), 'yyyy-MM-dd'),
        NGUOIUPDATE_CTPKS: 0,
        NGAYUPDATE_CTPKS: "",
        IS_DELETED: 0,
    })


    const [open, setOpen] = useState(false)

    // const openDiaLog = () => {
    //     setOpen(true)
    // }

    const closeDiaLog = () => {
        setOpen(false)
    }
    // const [refService, setRefService] = useState()

    const onChangeCustomer = (e) => {
        setCustomer(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const onChangeDate1 = (e) => {
        setService(prevService => ({
            ...prevService,
            ['NGAYBATDAUDONGCOC_CTPKS']: format(e, 'yyyy-MM-dd')
        }));
    }

    const onChangeDate2 = (e) => {
        setService(prevService => ({
            ...prevService,
            ['NGAYKETTHUCDONGCOC_CTPKS']: format(e, 'yyyy-MM-dd')
        }));
    }

    const onChangeDate3 = (e) => {
        setService(prevService => ({
            ...prevService,
            ['THOIGIANLAPDAT_CTPKS']: format(e, 'yyyy-MM-dd')
        }));
    }

    const onChangeDate4 = (e) => {
        setService(prevService => ({
            ...prevService,
            ['THOIGIANNGUNG_CTPKS']: format(e, 'yyyy-MM-dd')
        }));
    }

    const onChangeservice = (e) => {
        const { name, value } = e.target;

        setService(prevService => ({
            ...prevService,
            [name]: value
        }));
    };


    const getInfoCustomer = (id) => {
        instance.get('getKH_ByID_LIX/' + id).then(res => setCustomer(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.idCustomer !== 0) {
            getInfoCustomer(props.idCustomer)
        }
    }, [props.idCustomer])

    const createSurvey = () => {
        if (service.ID_DV !== 0) {
            instance.post('AddEditLix', service)
                .then(res => {
                    alertSuccess(res.data);
                    callAPI()
                })
                .catch(err => {
                    alertError(err)
                    console.log(err)
                })
        } else {
            alertError('Xin vui lòng chọn dịch vụ khảo sát')
        }

    }


    const reloadData = () => {
        setService({
            ID_PKS: 0,
            ID_DV: service.ID_DV !== 0 ? service.ID_DV : 0,
            ID_KH: props.idCustomer !== 0 ? props.idCustomer : 0,
            DIACHI_KH: "",
            TENKHACHHANGDAIDIEN_CTPKS: "",
            SODIENTHOAIKHACHHANGDAIDIEN_CTPKS: "",
            ACCOUNTKHACHHANG_CTPKS: "",
            MUCCUOC_CTPKS: "",
            HINHTHUCDONG_CTPKS: "",
            NGAYBATDAUDONGCOC_CTPKS: "",
            NGAYKETTHUCDONGCOC_CTPKS: "",
            THOIGIANLAPDAT_CTPKS: "",
            THOIGIANNGUNG_CTPKS: "",
            NHACUNGCAP_CTPKS: 0,
            DIEMHAILONG_CTPKS: 0,
            CAMNHANDICHVU_CTPKS: 0,
            CANNHANPHUCVU_CTPKS: 0,
            YKIENKHAC: "",
            NGUOITAO_CTPKS: 0,
            NGAYTAO_CTPKS: "",
            NGUOIUPDATE_CTPKS: 0,
            NGAYUPDATE_CTPKS: "",
            IS_DELETED: 0,
        })
    }
    const reloadDataBack = () => {
        setService({
            ID_PKS: 0,
            ID_DV: 0,
            ID_KH: 0,
            DIACHI_KH: "",
            TENKHACHHANGDAIDIEN_CTPKS: "",
            SODIENTHOAIKHACHHANGDAIDIEN_CTPKS: "",
            ACCOUNTKHACHHANG_CTPKS: "",
            MUCCUOC_CTPKS: "",
            HINHTHUCDONG_CTPKS: "",
            NGAYBATDAUDONGCOC_CTPKS: "",
            NGAYKETTHUCDONGCOC_CTPKS: "",
            THOIGIANLAPDAT_CTPKS: "",
            THOIGIANNGUNG_CTPKS: "",
            NHACUNGCAP_CTPKS: 0,
            DIEMHAILONG_CTPKS: 0,
            CAMNHANDICHVU_CTPKS: 0,
            CANNHANPHUCVU_CTPKS: 0,
            YKIENKHAC: "",
            NGUOITAO_CTPKS: 0,
            NGAYTAO_CTPKS: "",
            NGUOIUPDATE_CTPKS: 0,
            NGAYUPDATE_CTPKS: "",
            IS_DELETED: 0,
        })
    }


    const callAPI = () => {
        instance.get(`getLix_By_IdCustomer_and_IdService/${props.idCustomer}/${service.ID_DV}/${1}`)
            .then(res => {
                console.log(res.data)
                if (res.data === 'Khách hàng không có phiếu khảo sát đã tạo thành công' || res.data === 'Chưa có dịch vụ này') {
                    setService({
                        ID_PKS: 0,
                        ID_DV: service.ID_DV,
                        ID_KH: customer.ID_KH,
                        DIACHI_KH: "",
                        TENKHACHHANGDAIDIEN_CTPKS: "",
                        SODIENTHOAIKHACHHANGDAIDIEN_CTPKS: "",
                        ACCOUNTKHACHHANG_CTPKS: "",
                        MUCCUOC_CTPKS: "",
                        HINHTHUCDONG_CTPKS: "",
                        NGAYBATDAUDONGCOC_CTPKS: "",
                        NGAYKETTHUCDONGCOC_CTPKS: "",
                        THOIGIANLAPDAT_CTPKS: "",
                        THOIGIANNGUNG_CTPKS: "",
                        NHACUNGCAP_CTPKS: 0,
                        DIEMHAILONG_CTPKS: 0,
                        CAMNHANDICHVU_CTPKS: 0,
                        CANNHANPHUCVU_CTPKS: 0,
                        YKIENKHAC: "",
                        NGUOITAO_CTPKS: 0,
                        NGAYTAO_CTPKS: format(new Date(), 'yyyy-MM-dd'),
                        NGUOIUPDATE_CTPKS: 0,
                        NGAYUPDATE_CTPKS: "",
                        IS_DELETED: 0,
                    })
                } else {
                    var a = res.data;
                    a['ID_KH'] = customer.ID_KH
                    setService(a)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.idCustomer !== 0 && service.ID_DV !== 0) {
            callAPI()
        }
        if (service.ID_DV === 0) {
            reloadData()
        }

    }, [service.ID_DV])


    useEffect(() => {
        if (props.iddv && props.iddv !== 0) {
            setService(prevService => ({
                ...prevService,
                ['ID_DV']: props.iddv
            }));
        }

    }, [props.iddv])




    console.log(props.iddv)


    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullScreen={fullScreen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='xs'
            fullWidth={true}
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
                                    disabled={service.ID_DV !== 0 ? false : true}
                                >
                                    <MenuItem value={0}>Chọn nhà cung cấp</MenuItem>
                                    {props.provider && props.provider.map(ele => {
                                        return (
                                            <MenuItem key={ele.ID_NCC} value={Number(ele.ID_NCC)}>{ele.TEN_NCC}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            <TextField label="Mức cước/tháng" type={'number'} sx={{ marginTop: 2 }} value={service.MUCCUOC_CTPKS} name={'MUCCUOC_CTPKS'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} />
                            <TextField label="Hình thức đóng" sx={{ marginTop: 2 }} value={service.HINHTHUCDONG_CTPKS} name={'HINHTHUCDONG_CTPKS'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} />
                            <TextField label="Khách hàng đại diện (*)" sx={{ marginTop: 2 }} value={service.TENKHACHHANGDAIDIEN_CTPKS} name={'TENKHACHHANGDAIDIEN_CTPKS'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} />
                            <TextField label="Số điện thoại khách hàng đại diện (*)" sx={{ marginTop: 2 }} value={service.SODIENTHOAIKHACHHANGDAIDIEN_CTPKS} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} />
                            <TextField label="Account BRCĐ" sx={{ marginTop: 2 }} value={service.ACCOUNTKHACHHANG_CTPKS} name={'ACCOUNTKHACHHANG_CTPKS'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} />


                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                                localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DatePicker
                                    inputProps={{ size: 'small' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date(service.NGAYBATDAUDONGCOC_CTPKS)}
                                    label={'Ngày bắt đầu đặt cọc'}
                                    name={'NGAYBATDAUDONGCOC_CTPKS'}
                                    onChange={(e) => { onChangeDate1(e) }} disabled={service.ID_DV !== 0 ? false : true} sx={{ marginTop: 2 }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="dd/MM/yyyy" />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                                localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DatePicker
                                    inputProps={{ size: 'small' }}
                                    label={'Ngày kết thúc đặt cọc'} InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date(service.NGAYKETTHUCDONGCOC_CTPKS)}
                                    name={'NGAYKETTHUCDONGCOC_CTPKS'}
                                    onChange={(e) => { onChangeDate2(e) }} disabled={service.ID_DV !== 0 ? false : true} sx={{ marginTop: 2 }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="dd/MM/yyyy" />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                                localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DatePicker
                                    inputProps={{ size: 'small' }}
                                    label={'Ngày lắp đặt'} InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date(service.THOIGIANLAPDAT_CTPKS)}
                                    name={'THOIGIANLAPDAT_CTPKS'}
                                    onChange={(e) => { onChangeDate3(e) }} disabled={service.ID_DV !== 0 ? false : true} sx={{ marginTop: 2 }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="dd/MM/yyyy" />
                            </LocalizationProvider>


                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                                localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DatePicker
                                    inputProps={{ size: 'small' }}
                                    label={'Ngày ngưng'} InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date(service.THOIGIANNGUNG_CTPKS)}
                                    name={'THOIGIANNGUNG_CTPKS'}
                                    onChange={(e) => { onChangeDate4(e) }} disabled={service.ID_DV !== 0 ? false : true} sx={{ marginTop: 2 }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="dd/MM/yyyy" />
                            </LocalizationProvider>

                            {/* <TextField label={'Ngày bắt đầu đặt cọc'} InputLabelProps={{
                                shrink: true,
                            }} type="date" value={service.NGAYBATDAUDONGCOC_CTPKS} name={'NGAYBATDAUDONGCOC_CTPKS'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} sx={{ marginTop: 2 }} />
                            <TextField label={'Ngày kết thúc đặt cọc'} InputLabelProps={{
                                shrink: true,
                            }} type="date" value={service.NGAYKETTHUCDONGCOC_CTPKS} name={'NGAYKETTHUCDONGCOC_CTPKS'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} sx={{ marginTop: 2 }} /> */}

                            <FormControl fullwidth sx={{ marginTop: 2 }}>
                                <InputLabel>Đánh giá chất lượng dịch vụ</InputLabel>
                                <Select
                                    value={service.CAMNHANDICHVU_CTPKS}
                                    name="CAMNHANDICHVU_CTPKS"
                                    onChange={(e) => { onChangeservice(e) }}
                                    label={'Đánh giá chất lượng dịch vụ'}
                                    disabled={service.ID_DV !== 0 ? false : true}
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
                                    value={service.CANNHANPHUCVU_CTPKS}
                                    name="CANNHANPHUCVU_CTPKS"
                                    onChange={(e) => { onChangeservice(e) }}
                                    disabled={service.ID_DV !== 0 ? false : true}
                                >
                                    {props.servicePointList && props.servicePointList.map(ele => {
                                        return (
                                            <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <TextField label="ý kiến khác" multiline sx={{ marginTop: 2 }} value={service.YKIENKHAC} name={'YKIENKHAC'} onChange={(e) => { onChangeservice(e) }} disabled={service.ID_DV !== 0 ? false : true} />
                        </CardContent>
                    </Card>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant={'outlined'} color={'primary'} onClick={createSurvey} autoFocus>
                    Lưu khảo sát
                </Button>
                <Button variant={'outlined'} color={'error'} onClick={
                    () => {
                        props.handleClose()
                        reloadDataBack()
                    }

                }>Huỷ</Button>
            </DialogActions>
            <ConfirmChange
                open={open}
                handleClose={closeDiaLog}
                callAPI={callAPI}
                reloadPage={reloadData}
                createBallot={createSurvey}
            />
            <Snackbar open={openAlertSuccess} autoHideDuration={6000} onClose={closeSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={closeSuccess} severity="success" sx={{ width: '100%' }}>
                    {contentNotifi && contentNotifi}
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertError} autoHideDuration={6000} onClose={closeError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
                    {contentNotifi && contentNotifi}
                </Alert>
            </Snackbar>
        </Dialog>



    )
}

export default LixEdit