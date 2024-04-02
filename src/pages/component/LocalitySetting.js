import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, MenuItem, Select, OutlinedInput, Checkbox, ListItemText } from '../../../node_modules/@mui/material/index';
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


function LocalitySetting(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    const [unit, setUnit] = useState({
        TEN_DONVI: "",
        DONVICHA: null,
        QUANHUYEN: 0,
        XAPHUONG: 0,
        AP_KV: 0,
        DIACHI: '',
        SDT_DONVI: ''
    })
    const [loading, setLoading] = useState(false);
    const [quanhuyen, setQuanhuyen] = useState([]);
    const [xaphuong, setXaphuong] = useState([]);
    const [huyen, setHuyen] = useState(0)

    const [listDiaBan, setlistDiaBan] = useState([])


    // const onChangeInput = (e) => {
    //     setUnit(rev => ({
    //         ...rev, [e.target.name]: e.target.value
    //     }))
    // }

    console.log(xaphuong)
    console.log(huyen)

    const handleAdd = async () => {
        const objectSend = {
            DONVI_ID: props.idUnit,
            HUYEN: listDiaBan,
        }
        setLoading(true)
        await Axios.post('addLocalityManagement/' + props.idUnit, objectSend)
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

    const getAllQuanHuyen = async () => {
        const response = await Axios.get('getallquanhuyen');

        if (response.status === 200) {
            console.log(response.status)
            setQuanhuyen(response.data.dvhc)

        }
    }

    const onchangeHuyen = async (e) => {
        // setHuyen(e.target.value)
        // const response = await Axios.get('getAllXaPhuong/' + e.target.value);
        // if (response.status === 200) {
        //     setXaphuong(response.data.xaphuong)
        //     setXa(0)
        //     setAp(0)
        // }
        const { value } = e.target;

        setlistDiaBan(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    // const onchangeXa = async (e) => {
    //     setXa(e.target.value)
    //     const response = await Axios.get('getAllAp/' + e.target.value);
    //     if (response.status === 200) {
    //         setApKV(response.data.ap)
    //         setAp(0)
    //     }
    // }

    const CallAPIByidUnit = async (id) => {
        await Axios.get('getAllUnitByID/' + id).then(res => {
            console.log(res.data)
            setUnit(res.data.result)
            setlistDiaBan(res.data.diaban)
        }).catch(err => console.log(err))
    }


    console.log(unit)


    React.useEffect(() => {
        if (Number(props.idUnit) !== 0) {
            CallAPIByidUnit(props.idUnit)
            getAllQuanHuyen()
            setUnit({
                TEN_DONVI: "",
                DONVICHA: 0
            })
            setXaphuong(0)
            setHuyen(0)
        }

    }, [props.idUnit]);
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
                Cấu hình địa bàn quản lý của đơn vị
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography variant="h6">Đơn vị:</Typography>
                    <Typography variant="h5">{unit.TEN_DONVI}</Typography>

                    <FormControl sx={{ marginTop: 3 }} size="small">
                        <InputLabel id="demo-select-small-label">Địa bàn quản lý</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Địa bàn quản lý"
                            name='MAHUYEN_KH'
                            multiple
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => {
                                if (Array.isArray(selected) && selected.length > 0) {
                                    return selected.join(', ');
                                } else {
                                    return 'Chọn địa bàn';
                                }
                            }}
                            value={listDiaBan}
                            onChange={(e) => onchangeHuyen(e)}
                        >
                            {quanhuyen && quanhuyen.filter(x => x.parent_code !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.code} value={ele.name}>
                                        <Checkbox checked={listDiaBan.indexOf(ele.name) > -1} />
                                        <ListItemText primary={ele.name} />
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
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
                    onClick={handleAdd}
                    autoFocus
                >
                    <span>Lưu</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default LocalitySetting