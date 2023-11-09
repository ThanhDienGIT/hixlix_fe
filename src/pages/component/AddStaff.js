import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box, FormControl, MenuItem, Select, TextField, IconButton,
    InputAdornment
} from '../../../node_modules/@mui/material/index';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Axios from '../../axios/instance';
// import { format } from 'date-fns';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function AddStaff(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [user, setUser] = useState({
        TEN_NV: '',
        SDT_NV: '',
        DIACHI_NV: '',
        EMAIL_NV: '',
        CHUCVU_NV: 0,
        TAIKHOAN_NV: '',
        MATKHAU_NV: '',
        TRANGTHAI_NV: 0
    })
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };



    const onChangeInput = (e) => {
        setUser(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const handleAddUser = async () => {
        const objectSend = {
            TEN_NV: user.TEN_NV,
            SDT_NV: user.SDT_NV,
            DIACHI_NV: user.DIACHI_NV,
            EMAIL_NV: user.EMAIL_NV,
            CHUCVU_NV: user.CHUCVU_NV,
            TAIKHOAN_NV: user.TAIKHOAN_NV,
            MATKHAU_NV: user.MATKHAU_NV,
            TRANGTHAI_NV: user.TRANGTHAI_NV
        }
        setLoading(true)
        await Axios.post('addUser', objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    setUser({
                        TEN_NV: '',
                        SDT_NV: '',
                        DIACHI_NV: '',
                        EMAIL_NV: '',
                        CHUCVU_NV: 0,
                        TAIKHOAN_NV: '',
                        MATKHAU_NV: '',
                        TRANGTHAI_NV: 0
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
                Thêm người dùng
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography variant="h6">Tên người dùng (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={user.TEN_NV} name={'TEN_NV'} onChange={(e) => { onChangeInput(e) }} />
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">SĐT (*)</Typography>
                        <TextField multiline sx={{ marginTop: 1 }} value={user.SDT_NV} name={'SDT_NV'} onChange={(e) => { onChangeInput(e) }} />
                    </FormControl>
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Địa chỉ (*)</Typography>
                        <TextField multiline rows={5} sx={{ marginTop: 1 }} value={user.DIACHI_NV} name={'DIACHI_NV'} onChange={(e) => { onChangeInput(e) }} />
                    </FormControl>
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Email (*) </Typography>
                        <TextField multiline sx={{ marginTop: 1 }} value={user.EMAIL_NV} name={'EMAIL_NV'} onChange={(e) => { onChangeInput(e) }} />
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Tên tài khoản (*) </Typography>
                        <TextField multiline sx={{ marginTop: 1 }} value={user.TAIKHOAN_NV} name={'TAIKHOAN_NV'} onChange={(e) => { onChangeInput(e) }} />
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Mật khẩu (*) </Typography>
                        <TextField type="password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </IconButton>
                                </InputAdornment>}
                            variant="outlined" sx={{ marginTop: 1 }} value={user.MATKHAU_NV} name={'MATKHAU_NV'} onChange={(e) => { onChangeInput(e) }} />
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Chức vụ (*) </Typography>
                        <Select
                            value={user.CHUCVU_NV}
                            name={'CHUCVU_NV'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <MenuItem value="">Chọn chức vụ</MenuItem>
                            <MenuItem value={0}>Admin</MenuItem>
                            <MenuItem value={1}>Nhân viên</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Trạng thái tài khoản (*) </Typography>
                        <Select
                            value={user.TRANGTHAI_NV}
                            name={'TRANGTHAI_NV'}
                            onChange={(e) => { onChangeInput(e) }}
                        >
                            <MenuItem value="">Chọn trạng thái</MenuItem>
                            <MenuItem value={0}>Ngưng hoạt động</MenuItem>
                            <MenuItem value={1}>Đang hoạt động</MenuItem>
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
                    onClick={handleAddUser}
                    autoFocus
                >
                    <span>Thêm</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default AddStaff