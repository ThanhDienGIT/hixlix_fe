import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select } from '../../../node_modules/@mui/material/index';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import instance from '../../axios/instance';
// import { format } from 'date-fns';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function QuickBO(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    const [service, setService] = useState({
        ID_DV: 0,
        NHACUNGCAP_CTPKS: 0,
        DIEM_BO: 0
    })


    const [idTypeService, setIdTypeService] = useState(1)
    const [serviceList, setServiceList] = useState([])
    const [serviceListSecond, setServiceListSecond] = useState([])


    const [loading, setLoading] = useState(false);

    const onChangeservice = (e) => {
        console.log(e)
        const { value } = e.target;

        // setService(prevService => ({
        //     ...prevService,
        //     [name]: value
        // }));
        setServiceListSecond(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(service)
        console.log(serviceListSecond)
    };

    const onChangeservicePoint
        = (e) => {
            const { name, value } = e.target;

            setService(prevService => ({
                ...prevService,
                [name]: value
            }));
        };

    const onChangeNCC
        = (e) => {
            const { name, value } = e.target;

            setService(prevService => ({
                ...prevService,
                [name]: value
            }));
        };


    const reloadDataBack = () => {
        setService({
            ID_DV: 0,
            NHACUNGCAP_CTPKS: 0,
            DIEM_BO: 0
        })
        setServiceListSecond([])
        // setIdTypeService(0)
    }

    const onChangeTypeOfservice = async (e) => {
        reloadDataBack()
        setIdTypeService(e.target.value);
        await instance.get('getAllSVById/' + e.target.value)
            .then((res) => {
                setServiceList(res.data)
            })
            .catch(err => console.log(err))

    };


    const handleBOUpdate = async () => {
        if (serviceListSecond.length === 0) {
            notyf.error("Vui lòng chọn ít nhất một dịch vụ để đánh giá BO")
        }
        else if (idTypeService === 0) {
            notyf.error("Vui lòng chọn loại dịch vụ")
        }
        else if (service.NHACUNGCAP_CTPKS === 0) {
            notyf.error("Vui lòng chọn nhà cung cấp cho dịch vụ muốn đánh giá BO")
        }
        else {
            const objectSend = {
                TEN_DV: serviceListSecond,
                BO: service.DIEM_BO,
                ID_KH: props.idCustomer,
                NHACUNGCAP_CTPKS: service.NHACUNGCAP_CTPKS
            }
            setLoading(true)
            await instance.post('update-add-bo', objectSend)
                .then(res => {
                    notyf.success(res.data)
                    props.callAPI()
                    props.reloadApi()
                    reloadDataBack()
                    setLoading(false)
                })
                .catch(err => {
                    notyf.error(err.response.data.message)
                    console.log(err)
                    setLoading(false)
                })
        }

    }



    const CallAPIByidquality = async (id) => {
        await instance.get('getQualityByID/' + id).then(res => {
            setQuality(res.data)
        }).catch(err => console.log(err))
    }

    React.useEffect(() => {
        if (idTypeService !== 0) {
            instance.get('getAllSVById/' + idTypeService)
                .then((res) => {
                    setServiceList(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [idTypeService])


    React.useEffect(() => {
        CallAPIByidquality(props.idquality)
    }, [props.idquality]);

    console.log(props.provider)
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
                Thêm nhanh phiếu BO
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <FormControl fullwidth sx={{ marginTop: 1 }}>
                        <InputLabel>Loại dịch vụ</InputLabel>
                        <Select
                            value={idTypeService}
                            label='Loại dịch vụ'
                            name={'ID_LDV'}
                            onChange={(e) => { onChangeTypeOfservice(e) }}
                        >
                            <MenuItem value={0}>Chọn loại dịch vụ</MenuItem>
                            {props.typeService && props.typeService.map(ele => {
                                return (
                                    <MenuItem key={ele.ID_LDV} value={ele.ID_LDV}>{ele.TEN_LDV}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>


                    <FormControl fullwidth sx={{ marginTop: 2 }}>
                        <InputLabel>Dịch vụ</InputLabel>
                        <Select
                            disabled={idTypeService === 0}
                            value={serviceListSecond}
                            multiple
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => {
                                if (Array.isArray(selected) && selected.length > 0) {
                                    return selected.join(', ');
                                } else {
                                    return 'Chọn dịch vụ';
                                }
                            }}
                            label='Dịch vụ'
                            name={'ID_DV'}
                            onChange={(e) => { onChangeservice(e) }}
                        >
                            {/* <MenuItem value={0}>Chọn dịch vụ</MenuItem> */}
                            {serviceList && serviceList.map(ele => {
                                return (
                                    <MenuItem key={ele.ID_DV} value={ele.TEN_DV}>
                                        <Checkbox checked={serviceListSecond.indexOf(ele.TEN_DV) > -1} />
                                        <ListItemText primary={ele.TEN_DV} />
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <InputLabel>Nhà cung cấp</InputLabel>
                        <Select
                            value={service.NHACUNGCAP_CTPKS}
                            name="NHACUNGCAP_CTPKS"
                            onChange={(e) => { onChangeNCC(e) }}
                            label='Nhà cung cấp'
                            disabled={serviceListSecond.length > 0 ? false : true}
                        // {...(service.NHACUNGCAP_CTPKS === 0 ? { error: isError } : {})}
                        >
                            <MenuItem value={0}>Chọn nhà cung cấp</MenuItem>
                            {props.provider && props.provider.filter(sp => sp.ID_NCC !== 1)
                                .map(ele => {
                                    return (
                                        <MenuItem key={ele.ID_NCC} value={Number(ele.ID_NCC)}>{ele.TEN_NCC}</MenuItem>
                                    )
                                })}

                        </Select>
                        {/* <FormHelperText sx={{ color: 'red' }}>{isError && service.NHACUNGCAP_CTPKS === 0 && 'Vui lòng chọn nhà cung cấp dịch vụ'}</FormHelperText> */}
                    </FormControl>


                    <FormControl fullwidth sx={{ marginTop: 2 }}>
                        <InputLabel>Đánh giá BO </InputLabel>
                        <Select
                            value={service.DIEM_BO}
                            name="DIEM_BO"
                            onChange={(e) => { onChangeservicePoint(e) }}
                            disabled={service.ID_DV !== 0}
                        >
                            {props.servicePointList && props.servicePointList.map(ele => {
                                return (
                                    <MenuItem key={ele} value={ele}>{ele}</MenuItem>
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
                    onClick={handleBOUpdate}
                    autoFocus
                >
                    <span>Cập nhật</span>
                </LoadingButton>

                <Button size={'small'} onClick={props.handleClose} variant='outlined' color="error">Quay lại</Button>

            </DialogActions>
        </Dialog>
    )
}
export default QuickBO