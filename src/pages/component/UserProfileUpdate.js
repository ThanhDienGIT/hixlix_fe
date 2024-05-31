import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box, FormControl,
    // MenuItem, Select, 
    TextField,
    //  IconButton,
    // InputAdornment
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
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function UserProfileUpdate(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [user, setUser] = useState({
        TEN_NV: '',
        SDT_NV: '',
        DIACHI_NV: '',
        EMAIL_NV: '',
        // CHUCVU_NV: 0,
        // DONVI_ID: 0,
        // TAIKHOAN_NV: '',
        // MATKHAU_NV: '',
        // TRANGTHAI_NV: 0
    })
    const [loading, setLoading] = useState(false);


    const onChangeInput = (e) => {
        setUser(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const handleUpdateUser = async () => {
        const objectSend = {
            TEN_NV: user.TEN_NV,
            SDT_NV: user.SDT_NV,
            DIACHI_NV: user.DIACHI_NV,
            EMAIL_NV: user.EMAIL_NV,
            // CHUCVU_NV: user.CHUCVU_NV,
            // DONVI_ID: user.DONVI_ID,
            // TAIKHOAN_NV: user.TAIKHOAN_NV,
            // MATKHAU_NV: user.MATKHAU_NV,
            // TRANGTHAI_NV: user.TRANGTHAI_NV
        }
        setLoading(true)
        await Axios.post('update-user-profile/', objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    setUser({
                        TEN_NV: '',
                        SDT_NV: '',
                        DIACHI_NV: '',
                        EMAIL_NV: '',
                        // CHUCVU_NV: 0,
                        // TAIKHOAN_NV: '',
                        // MATKHAU_NV: '',
                        // TRANGTHAI_NV: 0
                    })
                    props.CallAPI()
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


    const CallAPI = async () => {
        await Axios.get('get-user-profile/').then(res => {
            if (res.data.status === 'success') {
                setUser(res.data.data)
            }

        }).catch(err => console.log(err))
    }

    React.useEffect(() => {
        CallAPI()
        console.log(props.EditState)
    }, [props.open]);
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
                <Typography variant='h4'>
                    {props.title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6"><b>Họ và tên:</b></Typography>
                        {props.EditState === 1 ?
                            <TextField sx={{ marginTop: 1 }} value={user.TEN_NV} name={'TEN_NV'} onChange={(e) => { onChangeInput(e) }} />
                            :
                            <Typography variant="h6">{user.TEN_NV}</Typography>
                        }
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6"><b>SĐT:</b></Typography>
                        {props.EditState === 1 ?
                            <TextField multiline sx={{ marginTop: 1 }} value={user.SDT_NV} name={'SDT_NV'} onChange={(e) => { onChangeInput(e) }} />
                            :
                            <Typography variant="h6">{user.SDT_NV}</Typography>
                        }
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6"><b>Địa chỉ:</b></Typography>
                        {props.EditState === 1 ?
                            <TextField multiline rows={5} sx={{ marginTop: 1 }} value={user.DIACHI_NV} name={'DIACHI_NV'} onChange={(e) => { onChangeInput(e) }} />
                            :
                            <Typography variant="h6">{user.DIACHI_NV}</Typography>
                        }

                    </FormControl>
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6"><b>Email:</b></Typography>
                        {props.EditState === 1 ?
                            <TextField multiline sx={{ marginTop: 1 }} value={user.EMAIL_NV} name={'EMAIL_NV'} onChange={(e) => { onChangeInput(e) }} />
                            :
                            <Typography variant="h6">{user.EMAIL_NV}</Typography>
                        }

                    </FormControl>
                </Box>

            </DialogContent>
            <DialogActions>
                {
                    props.EditState !== 0 ?
                        <LoadingButton
                            size="small"
                            color="primary"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={handleUpdateUser}
                            autoFocus
                        >
                            <span>Cập nhật</span>
                        </LoadingButton>
                        : ''
                }


                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default UserProfileUpdate