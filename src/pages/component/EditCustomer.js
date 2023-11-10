import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '../../../node_modules/@mui/material/index';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../axios/instance';
// import { format } from 'date-fns';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import viLocale from 'date-fns/locale/vi';
import { viVN } from '@mui/x-date-pickers/locales';
import { format } from 'date-fns';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function EditCustomer(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [xaphuong, setXaphuong] = useState([])
    const [ap, setAp] = useState([])
    // const [form, setForm] = useState([
    //     { form: 1 }
    // ])
    // const [customer, setCustomer] = useState({
    //     ID_KH: 0,
    //     ID_NV: 0,
    //     ID_DVHC: 0,
    //     TEN_KH: "",
    //     DIACHI_KH: "",
    //     SODIENTHOAI_KH: "",
    //     CCCD_KH: "",
    //     SONHANKHAU_KH: "",
    //     NGAYSINH_KH: "",
    //     NGHENGHIEP_KH: "",
    //     MAHUYEN_KH: 0,
    //     MAXA_KH: 0,
    //     BAOHONG_KH: false,
    //     THOIGIANLAPDAT_KH: "",
    //     THOIGIANNGUNG_KH: "",
    //     FILENAME_KH: "",
    //     NGAYTAO_KH: format(new Date(), 'yyyy-MM-dd'),
    //     NGUOITAO_KH: 0,
    //     GHICHU_KH: "",
    // })
    const [loading, setLoading] = useState(false);
    const [infoCustomer, setInfocustomer] = React.useState({
        ID_KH: 0,
        ID_NV: 0,
        ID_DVHC: 0,
        TEN_KH: "",
        DIACHI_KH: "",
        SODIENTHOAI_KH: "",
        CCCD_KH: "",
        SONHANKHAU_KH: 0,
        NGAYSINH_KH: "",
        NGHENGHIEP_KH: "",
        MAHUYEN_KH: 0,
        MAXA_KH: 0,
        MAAP_KH: 0,
        BAOHONG_KH: 0,
        THOIGIANLAPDAT_KH: null,
        THOIGIANNGUNG_KH: null,
        FILENAME_KH: null,
        NGAYTAO_KH: "",
        NGUOITAO_KH: 0,
        GHICHU_KH: null,
        TRANGTHAI_KH: 0,
        TEN_DVHC: "",
        CAP_DVHC: 0,
        ID_CHA_DVHC: 0,
        IS_DELETED: null,
        TEN_HUYEN: "",
        TEN_XA: ""
    })



    const CallAPIByIdCustomer = async (id) => {
        await Axios.get('getKH_ByID_LIX/' + id).then(res => {
            setInfocustomer(res.data)
        }).catch(err => console.log(err))
    }

    React.useEffect(() => {
        if (props.idkhachhang) {
            CallAPIByIdCustomer(props.idkhachhang)
        }
    }, [props.idkhachhang])


    console.log(infoCustomer)

    const getXaPhuongById = async (id) => {
        const response = await Axios.get('getAllXaPhuong/' + id);
        if (response.status === 200) {
            setXaphuong(response.data.xaphuong)
            console.log(xaphuong)
        }
    }

    const getAPById = async (id) => {
        const response = await Axios.get('getAllApById/' + id);
        if (response.status === 200) {
            setAp(response.data.ap)
            // setInfocustomer(rev => ({
            //     ...rev, ['MAAP_KH']: ''
            // }))
            console.log(ap)
        }
    }
    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);

    //     if (isValid(date)) {
    //       return format(date, 'dd/MM/yyyy');
    //     } else {
    //       return "Ngày không hợp lệ";
    //     }
    //   };

    React.useEffect(() => {
        if (infoCustomer.MAHUYEN_KH) {
            getXaPhuongById(infoCustomer.MAHUYEN_KH)
        }
        if (infoCustomer.MAXA_KH) {
            getAPById(infoCustomer.MAXA_KH)
        }
    }, [infoCustomer.MAHUYEN_KH, infoCustomer.MAXA_KH])



    const onChangeInputDistrict = async (e) => {
        setInfocustomer(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
        const response = await Axios.get('getAllXaPhuong/' + e.target.value);
        if (response.status === 200) {
            setXaphuong(response.data.xaphuong)
            setInfocustomer(rev => ({
                ...rev, ['MAXA_KH']: ''
            }))
            console.log(xaphuong)
        }

    }
    const onChangeInputWard = async (e) => {
        setInfocustomer(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
        const response = await Axios.get('getAllAp/' + e.target.value);
        if (response.status === 200) {
            setAp(response.data.ap)
            setInfocustomer(rev => ({
                ...rev, ['MAAP_KH']: ''
            }))
            console.log(ap)
        }
    }
    const onChangeInputAp = (e) => {
        setInfocustomer(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }
    const onChangeInput = (e) => {
        setInfocustomer(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }
    const onChangeInputDOB = (e) => {
        console.log(e)
        setInfocustomer(rev => ({
            ...rev, ['NGAYSINH_KH']: format(e, 'yyyy-MM-dd')
        }))
    }

    console.log(infoCustomer)

    const handleUpdateCustomer = async () => {
        const objectSend = {
            ID_KH: props.idkhachhang,
            TEN_KH: infoCustomer.TEN_KH,
            DIACHI_KH: infoCustomer.DIACHI_KH,
            SODIENTHOAI_KH: infoCustomer.SODIENTHOAI_KH,
            CCCD_KH: infoCustomer.CCCD_KH,
            SONHANKHAU_KH: infoCustomer.SONHANKHAU_KH,
            NGAYSINH_KH: infoCustomer.NGAYSINH_KH,
            NGHENGHIEP_KH: infoCustomer.NGHENGHIEP_KH,
            MAHUYEN_KH: infoCustomer.MAHUYEN_KH,
            MAXA_KH: infoCustomer.MAXA_KH,
            MAAP_KH: infoCustomer.MAAP_KH,
            BAOHONG_KH: infoCustomer.BAOHONG_KH,
            NGAYTAO_KH: infoCustomer.NGAYTAO_KH
        }
        setLoading(true)
        await Axios.put('updatecustomer/', objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    props.callApi()
                    props.handleClose()
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
                    setLoading(false)
                } else {
                    // Lỗi khác, ví dụ: lỗi kết nối
                    notyf.error('Có lỗi xảy ra, vui lòng thử lại sau.');
                    setLoading(false)
                }
            });
    }



    // const onChangeInputap = (e) => {
    //     setAp(e.target.value);
    // }

    console.log(infoCustomer.NGAYSINH_KH)


    return (
        <Dialog
            TransitionComponent={Transition}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={fullScreen}
            maxWidth='xs'
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#0099ff', color: 'white', marginBottom: 2 }}>
                Cập nhật khách hàng
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography variant="h6">Họ và tên chủ hộ (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={infoCustomer.TEN_KH} name={'TEN_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <Typography sx={{ marginTop: 2 }} variant="h6">Số điện thoại (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={infoCustomer.SODIENTHOAI_KH} name={'SODIENTHOAI_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <Typography sx={{ marginTop: 2 }} variant="h6">CCCD (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={infoCustomer.CCCD_KH} name={'CCCD_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <Typography sx={{ marginTop: 2 }} variant="h6">Quận huyện (*)</Typography>
                    <FormControl sx={{ marginTop: 1 }}>
                        <Select
                            value={infoCustomer.MAHUYEN_KH}
                            name={'MAHUYEN_KH'}
                            onChange={(e) => { onChangeInputDistrict(e) }}
                        >
                            <MenuItem value="">Chọn quận huyện</MenuItem>
                            {props.district && props.district.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Typography sx={{ marginTop: 2 }} variant="h6">Xã phường (*)</Typography>
                    <FormControl sx={{ marginTop: 1 }}>
                        <Select
                            disabled={infoCustomer.MAHUYEN_KH === 0}
                            value={infoCustomer.MAXA_KH}
                            name={'MAXA_KH'}
                            onChange={(e) => { onChangeInputWard(e) }}
                        >
                            <MenuItem value="">Chọn xã phường</MenuItem>
                            {xaphuong && xaphuong.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>



                    <Typography sx={{ marginTop: 2 }} variant="h6">Ấp/ Khu vực (*)</Typography>
                    <FormControl sx={{ marginTop: 1 }}>
                        <Select
                            disabled={infoCustomer.MAXA_KH === 0}
                            value={infoCustomer.MAAP_KH}
                            name={'MAAP_KH'}
                            onChange={(e) => { onChangeInputAp(e) }}
                        >
                            <MenuItem value="">Chọn Ấp / Khu vực</MenuItem>
                            {ap && ap.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.id} value={ele.id}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>



                    <Typography sx={{ marginTop: 2 }} variant="h6">Địa chỉ (*)</Typography>
                    <TextField multiline sx={{ marginTop: 1 }} value={infoCustomer.DIACHI_KH} name={'DIACHI_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <Typography sx={{ marginTop: 2 }} variant="h6">Số nhân khẩu</Typography>
                    <TextField sx={{ marginTop: 1 }} value={infoCustomer.SONHANKHAU_KH} name={'SONHANKHAU_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <Typography sx={{ marginTop: 2 }} variant="h6">Ngày sinh</Typography>
                    {/* <TextField
                        InputLabelProps={{
                            shrink: true,
                        }} type={'date'} sx={{ marginTop: 1 }} value={infoCustomer.NGAYSINH_KH} name={'NGAYSINH_KH'} onChange={(e) => { onChangeInput(e) }} /> */}
                    <FormControl sx={{ width: 360, marginRight: 2, marginTop: 1 }} size="small">
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                            localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                            <DatePicker
                                inputProps={{ size: 'small' }}
                                value={infoCustomer && new Date(infoCustomer.NGAYSINH_KH)}
                                name={'NGAYSINH_KH'}
                                onChange={(e) => { onChangeInputDOB(e) }}
                                // onChange={(date) => setFromDate(date)}
                                slotProps={{ textField: { size: 'small' } }}
                                format="dd/MM/yyyy" />
                        </LocalizationProvider>
                    </FormControl>
                    <Typography sx={{ marginTop: 2 }} variant="h6">Nghề nghiệp</Typography>
                    <TextField sx={{ marginTop: 1 }} value={infoCustomer.NGHENGHIEP_KH} name={'NGHENGHIEP_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <Typography sx={{ marginTop: 2 }} variant="h6">Đã biết số báo hỏng</Typography>
                    <FormControl sx={{ marginTop: 1 }} >
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={'BAOHONG_KH'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <FormControlLabel
                                value={'false'}
                                control={<Radio />}
                                label="Chưa biết"
                                checked={infoCustomer.BAOHONG_KH === 0 || infoCustomer.BAOHONG_KH === 'false'} // Kiểm tra nếu giá trị là 'false' thì check
                            />
                            <FormControlLabel
                                value={'true'}
                                control={<Radio />}
                                label="Đã biết"
                                checked={infoCustomer.BAOHONG_KH === 1 || infoCustomer.BAOHONG_KH === 'true'} // Kiểm tra nếu giá trị là 'true' thì check
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {/* {form.map(element => {
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
                            <TextField label={'Ngày kết thúc đặt cọc'} type="date" value={'2023-12-09'} sx={{ marginTop: 2 }} />

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
            <Button onClick={addForm}>Thêm dịch vụ</Button> */}
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    size="small"
                    color="primary"
                    // onClick={handleClick}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleUpdateCustomer}
                    autoFocus
                >
                    <span>Cập nhật</span>
                </LoadingButton>
                {/* <Button size={'small'} onClick={handleAddCustomer} color={'primary'} variant='contained' autoFocus>
                    Thêm khách hàng
                </Button> */}
                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default EditCustomer