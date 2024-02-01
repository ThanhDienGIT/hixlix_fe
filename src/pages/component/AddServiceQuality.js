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


// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function AddServiceQuality(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    const [quality, setQuality] = useState({
        TEN_CHATLUONGPV: "",
        DIEMTU: 0,
        DENDIEM: 0
    })
    const [loading, setLoading] = useState(false);


    const onChangeInput = (e) => {
        setQuality(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const handleAddQuality = async () => {
        const objectSend = {
            TEN_CHATLUONGPV: quality.TEN_CHATLUONGPV,
            DIEMTU: quality.DIEMTU,
            DENDIEM: quality.DENDIEM
        }
        setLoading(true)
        await Axios.post('addServiceQuality', objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    setQuality({
                        TEN_CHATLUONGPV: "",
                        DIEMTU: 0,
                        DENDIEM: 0
                    })
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
                Thêm chất lượng phục vụ
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography variant="h6">Tên chất lượng phục vụ (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={quality.TEN_CHATLUONGPV} name={'TEN_CHATLUONGPV'} onChange={(e) => { onChangeInput(e) }} />
                
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Từ điểm (*) </Typography>
                        <Select
                            value={quality.DIEMTU}
                            name={'DIEMTU'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            {/* <MenuItem value="">Chọn điểm</MenuItem> */}
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Đến điểm (*) </Typography>
                        <Select
                            value={quality.DENDIEM}
                            name={'DENDIEM'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            {/* <MenuItem value="">Chọn điểm</MenuItem> */}
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
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
                    onClick={handleAddQuality}
                    autoFocus
                >
                    <span>Thêm</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default AddServiceQuality