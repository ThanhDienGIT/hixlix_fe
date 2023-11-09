import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, TextField } from '../../../node_modules/@mui/material/index';
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


function EditSupplier(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    const [supllier, setSupllier] = useState({
        TEN_NCC: "",
        GHICHU_NCC: ""
    })
    const [loading, setLoading] = useState(false);


    const onChangeInput = (e) => {
        setSupllier(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const handleEditSupplier = async () => {
        const objectSend = {
            TEN_NCC: supllier.TEN_NCC,
            GHICHU_NCC: supllier.GHICHU_NCC
        }
        setLoading(true)
        await Axios.post('updateSupplier/' + props.idsupplier, objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    setSupllier({
                        TEN_NCC: "",
                        GHICHU_NCC: ""
                    })
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



    const CallAPIByIdSupplier = async (id) => {
        await Axios.get('getSpByID/' + id).then(res => {
            setSupllier(res.data)
        }).catch(err => console.log(err))
    }


    React.useEffect(() => {
        CallAPIByIdSupplier(props.idsupplier)
    }, [props.idsupplier]);
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
                Cập nhật nhà cung cấp
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography variant="h6">Tên nhà cung cấp (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={supllier.TEN_NCC} name={'TEN_NCC'} onChange={(e) => { onChangeInput(e) }} />
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Ghi chú</Typography>
                        <TextField multiline rows={5} sx={{ marginTop: 1 }} value={supllier.GHICHU_NCC} name={'GHICHU_NCC'} onChange={(e) => { onChangeInput(e) }} />
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
                    onClick={handleEditSupplier}
                    autoFocus
                >
                    <span>Cập nhật</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}
export default EditSupplier