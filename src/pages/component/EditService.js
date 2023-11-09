import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, MenuItem, Select, TextField } from '../../../node_modules/@mui/material/index';
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


function AddCustomer(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [xaphuong, setXaphuong] = useState([])

    const [service, setService] = useState({
        TEN_DV: "",
        ID_LDV: 0
    })
    const [loading, setLoading] = useState(false);

    const onChangeSerive = async (e) => {
        setService(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
        const response = await Axios.get('getAllXaPhuong/' + e.target.value);
        if (response.status === 200) {
            setXaphuong(response.data.xaphuong)
            console.log(xaphuong)
        }

    }


    const onChangeInput = (e) => {
        setService(rev => ({
            ...rev, [e.target.name]: e.target.value
        }))
    }

    const handleUpdateService = async () => {
        const objectSend = {
            TEN_DV: service.TEN_DV,
            ID_LDV: service.ID_LDV
        }
        setLoading(true)
        await Axios.post('updateService/' + props.idservice, objectSend)
            .then((res) => {
                if (res.data.status === 'success') {
                    setLoading(false)
                    notyf.success(res.data.message)
                    setService({
                        TEN_DV: "",
                        ID_LDV: 0
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


    const CallAPIByIdService = async (id) => {
        await Axios.get('getSVByID/' + id).then(res => {
            setService(res.data)
        }).catch(err => console.log(err))
    }

    console.log(service)


    React.useEffect(() => {
        CallAPIByIdService(props.idservice)
    }, [props.idservice]);
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
                Cập nhật dịch vụ
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <Typography>Tên dịch vụ (*)</Typography>
                    <TextField sx={{ marginTop: 1 }} value={service.TEN_DV} name={'TEN_DV'} onChange={(e) => { onChangeInput(e) }} />
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography>Loại dịch vụ (*)</Typography>
                        <Select
                            value={Number(service.ID_LDV)}
                            name={'ID_LDV'}
                            onChange={(e) => { onChangeSerive(e) }}
                        >
                            <MenuItem value={0}>Chọn dịch vụ</MenuItem>
                            {props.servicetype && props.servicetype.filter(x => x.TEN_LDV !== null).map(ele => {
                                return (
                                    <MenuItem key={ele.ID_LDV} value={ele.ID_LDV}>{ele.TEN_LDV}</MenuItem>
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
                    onClick={handleUpdateService}
                    autoFocus
                >
                    <span>Cập nhật</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}

export default AddCustomer