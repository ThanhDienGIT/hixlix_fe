import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, TextField, MenuItem, Select } from '../../../node_modules/@mui/material/index';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../axios/instance';
// import { format } from 'date-fns';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';


// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function AddUnit(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    const [unit, setUnit] = useState({
        TEN_DONVI: "",
        DONVICHA: null,
        DIACHI: '',
        SDT_DONVI: ''
    })
    const [loading, setLoading] = useState(false);
    const [quanhuyen, setQuanhuyen] = useState([]);
    const [xaphuong, setXaphuong] = useState([]);
    const [apKV, setApKV] = useState([]);
    const [huyen, setHuyen] = useState(0)
    const [xa, setXa] = useState(0)
    const [ap, setAp] = useState(0)


    const onChangeInput = (e) => {
        setUnit(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const handleAddUnit = async () => {
        const objectSend = {
            TEN_DONVI: unit.TEN_DONVI,
            DONVICHA: unit.DONVICHA,
            QUANHUYEN: huyen,
            XAPHUONG: xa,
            AP_KV: ap,
            SDT_DONVI: unit.SDT_DONVI,
            DIACHI: unit.DIACHI
        }
        setLoading(true)
        await Axios.post('addUnit', objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    setUnit({
                        TEN_DONVI: "",
                        DONVICHA: null,
                        DIACHI: '',
                        SDT_DONVI: ''
                    })
                    props.callApi()
                    props.callApiChild()
                    props.callApiListUnit()
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

    const getAllQuanHuyen = async () => {
        const response = await Axios.get('getallquanhuyen');

        if (response.status === 200) {
            console.log(response.status)
            setQuanhuyen(response.data.dvhc)

        }
    }

    const onchangeHuyen = async (e) => {
        setHuyen(e.target.value)
        const response = await Axios.get('getAllXaPhuong/' + e.target.value);
        if (response.status === 200) {
            setXaphuong(response.data.xaphuong)
            setXa(0)
            setAp(0)
        }
    }

    const onchangeXa = async (e) => {
        setXa(e.target.value)
        const response = await Axios.get('getAllAp/' + e.target.value);
        if (response.status === 200) {
            setApKV(response.data.ap)
            setAp(0)
        }
    }


    // const addForm = () => {
    //     setForm(rev => [...rev, { form: form.length + 1 }])
    // }

    React.useEffect(() => {
        getAllQuanHuyen()
        setUnit({
            TEN_DONVI: "",
            DONVICHA: 0
        })
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
                Thêm đơn vị
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography variant="h6">Tên đơn vị (*)</Typography>
                    <TextField value={unit.TEN_DONVI} name={'TEN_DONVI'} onChange={(e) => { onChangeInput(e) }} />

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Đơn vị cha (nếu có) </Typography>
                        <Select
                            value={unit.DONVICHA}
                            name={'DONVICHA'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <MenuItem value={0}>
                                Không chọn 
                            </MenuItem>
                            {props.childUnit && props.childUnit.map(ele => {
                                return (
                                    <MenuItem key={ele.DONVI_ID} value={ele.DONVI_ID}>{ele.TEN_DONVI}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>


                    <FormControl sx={{ marginTop: 3 }} size="small">
                        <InputLabel id="demo-select-small-label">Quận/ huyện</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Quận/ huyện"
                            name='MAHUYEN_KH'
                            value={huyen}
                            onChange={(e) => onchangeHuyen(e)}
                        >
                            <MenuItem value={0}>
                                Tất cả
                            </MenuItem>
                            {quanhuyen && quanhuyen.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ marginTop: 3 }} size="small">
                        <InputLabel id="demo-select-small-label">Xã/ Phường</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Xã/ Phường"
                            name="MAXA_KH"
                            disabled={huyen === 0}
                            value={xa}
                            onChange={(e) => onchangeXa(e)}
                        >
                            <MenuItem value={0}>
                                Tất cả
                            </MenuItem>
                            {xaphuong && xaphuong.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ marginTop: 3 }} size="small">
                        <InputLabel id="demo-select-small-label">Ấp/ Khu vực</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Ấp/ Khu vực"
                            name="MAAP_KH"
                            disabled={xa === 0}
                            value={ap}
                            onChange={(e) => setAp(e.target.value)}
                        >
                            <MenuItem value={0}>
                                Tất cả
                            </MenuItem>
                            {apKV && apKV.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.id} value={ele.id}>{ele.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>


                    <Typography sx={{ marginTop: 2 }} variant="h6">SĐT đơn vị</Typography>
                    <TextField value={unit.SDT_DONVI} name={'SDT_DONVI'} onChange={(e) => { onChangeInput(e) }} />


                    <Typography sx={{ marginTop: 2 }} variant="h6">Địa chỉ</Typography>
                    <TextField multiline rows={5} value={unit.DIACHI} name={'DIACHI'} onChange={(e) => { onChangeInput(e) }} />


                </Box>

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
                    onClick={handleAddUnit}
                    autoFocus
                >
                    <span>Thêm</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default AddUnit