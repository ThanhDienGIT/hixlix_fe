import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select } from '../../../node_modules/@mui/material/index';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../axios/instance';
// import { format } from 'date-fns';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';

// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function AssignmentCustomer(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    // const [xaphuong, setXaphuong] = useState([])
    const [selectedNV, setSelectedNV] = useState('')
    // const [ap, setAp] = useState([])
    // const [form, setForm] = useState([
    //     { form: 1 }
    // ])
    const [loading, setLoading] = useState(false);

    // const onChangeInputDistrict = async (e) => {
    //     setCustomer(rev => ({
    //         ...rev, [e.target.name]: e.target.value
    //     }))
    //     const response = await Axios.get('getAllXaPhuong/' + e.target.value);
    //     if (response.status === 200) {
    //         setXaphuong(response.data.xaphuong)
    //         console.log(xaphuong)
    //     }

    // }
    // const onChangeInputWard = async (e) => {
    //     setCustomer(rev => ({
    //         ...rev, [e.target.name]: e.target.value
    //     }))
    //     const response = await Axios.get('getAllAp/' + e.target.value);
    //     if (response.status === 200) {
    //         setAp(response.data.ap)
    //         console.log(ap)
    //     }
    // }
    console.log(props.phancong)
    const handleAddCustomer = async () => {
        if (props.phancong.length !== 0) {
            const objectSend = {
                DSKH: props.phancong,
                ID_NV: selectedNV
            }
            setLoading(true)
            await Axios.post('asigncustomer', objectSend)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setLoading(false)
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
                        setLoading(false)
                    } else {
                        // Lỗi khác, ví dụ: lỗi kết nối
                        notyf.error('Có lỗi xảy ra, vui lòng thử lại sau.');
                        setLoading(false)
                    }
                });
        }
        else
        {
            notyf.error('Chọn ít nhất một khách hàng để phân công!');
        }
    }


    // const addForm = () => {
    //     setForm(rev => [...rev, { form: form.length + 1 }])
    // }

    React.useEffect(() => {
    }, []);
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={fullScreen}
            maxWidth='xs'
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#0099ff', color: 'white' }}>
                Phân công chăm sóc khách hàng
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    {/* <TextField label="Họ và tên chủ hộ (*)" sx={{ marginTop: 1 }} value={customer.TEN_KH} name={'TEN_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <TextField label="Số điện thoại (*)" sx={{ marginTop: 2 }} value={customer.SODIENTHOAI_KH} name={'SODIENTHOAI_KH'} onChange={(e) => { onChangeInput(e) }} />
                    <TextField label="CCCD (*)" sx={{ marginTop: 2 }} value={customer.CCCD_KH} name={'CCCD_KH'} onChange={(e) => { onChangeInput(e) }} /> */}
                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel >Nhân viên chăm sóc (*)</InputLabel>
                        <Select
                            label='Nhân viên chăm sóc'
                            value={selectedNV}
                            name={'ID_NV'}
                            onChange={(e) => { setSelectedNV(e.target.value) }}
                        >
                            <MenuItem value={0}>---Chọn nhân viên---</MenuItem>
                            {props.nv && props.nv.filter(x => x.TEN_NV !== null && (x.CHUCVU_NV !== 0 && x.CHUCVU_NV !== 2)).map(ele => {
                                return (
                                    <MenuItem key={ele.ID_NV} value={ele.ID_NV}>{ele.TEN_NV}</MenuItem>
                                )
                            })}
                            {/* {props.district && props.district.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                )
                            })} */}
                        </Select>
                    </FormControl>
                    {/* <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel>Xã phường (*)</InputLabel>
                        <Select
                            label='Xã phường'
                            value={customer.MAXA_KH}
                            name={'MAXA_KH'}
                            onChange={(e) => { onChangeInputWard(e) }}
                        >
                            <MenuItem value={0}>Chọn xã phường</MenuItem>
                            {xaphuong && xaphuong.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel>Ấp (*)</InputLabel>
                        <Select
                            label='Ấp'
                            value={customer.MAAP_KH}
                            name={'MAAP_KH'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <MenuItem value={0}>Chọn ấp</MenuItem>
                            {ap && ap.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
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
                    </FormControl> */}
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
                    // startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleAddCustomer}
                    autoFocus
                >
                    <span>Phân công</span>
                </LoadingButton>
                {/* <Button size={'small'} onClick={handleAddCustomer} color={'primary'} variant='contained' autoFocus>
                    Thêm khách hàng
                </Button> */}
                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default AssignmentCustomer