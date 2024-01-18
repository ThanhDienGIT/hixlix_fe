import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index';
import instance from '../../axios/instance';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import { format, isValid } from 'date-fns';
import LixEdit from './LixEdit';
import DetailLix from './DetailLix';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function DetailCustomer(props) {

    const [infoCustomer, setInfoCustomer] = React.useState()
    const [surveycustomer, setSurveycustomer] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [openDiaLog, setOpenDialog] = React.useState(false)
    const [idPKS, setIdPKS] = React.useState(0)
    const [idDV, setIdDV] = React.useState(0)
    const [idctpks, setIdctpks] = React.useState(0)
    const servicePointList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [openDiaLogDetail, setOpenDialogDetail] = React.useState(false)

    const openDiaLogEdit = (idpks, iddv, idctpks) => {
        setOpenDialog(true)
        setIdPKS(idpks)
        setIdDV(iddv)
        setIdctpks(idctpks)
    }
    console.log(openDiaLogDetail)

    const openDiaLogDetailLix = (idpks, iddv) => {
        setOpenDialogDetail(true)
        setIdPKS(idpks)
        setIdDV(iddv)
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

    

    const closeDialogDetailLix = () => {
        setOpenDialogDetail(false)
    }

    const CallAPIByIdCustomer = async (id) => {
        await instance.get('getKHByID/' + id).then(res => {
            setInfoCustomer(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    const CallAPIGetSurveyOfCustomer = async (id) => {
        setLoading(true)
        await instance.get('getsurveybyKH/' + id).then(res => {
            setSurveycustomer(res.data)
            console.log(res.data)
            setLoading(false)
        }).catch(err => console.log(err))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        if (isValid(date)) {
            return format(date, 'dd/MM/yyyy');
        } else {
            return "Chưa có";
        }
    };


    React.useEffect(() => {
        if (props.idkhachhang) {
            CallAPIByIdCustomer(props.idkhachhang)
            CallAPIGetSurveyOfCustomer(props.idkhachhang)
        }
    }, [props.idkhachhang])


    console.log(infoCustomer)
    console.log(surveycustomer)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (

        <>
            <Dialog
                fullScreen={fullScreen}
                TransitionComponent={Transition}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth={1200}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Chi tiết khách hàng"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant='h5' >THÔNG TIN KHÁCH HÀNG KHẢO SÁT</Typography>
                    <Card sx={{ padding: 1 }}>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Typography><b>Họ và tên khách hàng:</b> <br /> {infoCustomer && infoCustomer.TEN_KH ? infoCustomer.TEN_KH : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><b>Số điện thoại:</b> <br /> {infoCustomer && infoCustomer.SODIENTHOAI_KH ? infoCustomer.SODIENTHOAI_KH : 'Chưa có'} </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><b>Ngày sinh:</b> <br />{infoCustomer && formatDate(infoCustomer.NGAYSINH_KH) ? formatDate(infoCustomer.SODIENTHOAI_KH) : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b> CCCD:</b> <br /> {infoCustomer && infoCustomer.CCCD_KH ? infoCustomer.CCCD_KH : 'Chưa có'} </Typography>
                            </Grid>
                            {/* <Grid item xs={6}>
                            <Typography><b>Account BRCĐ:</b> <br />{'nguyenvanc123'}</Typography>
                        </Grid> */}
                            <Grid item xs={6}>
                                <Typography><b>Nghề nghiệp:</b> <br />{infoCustomer && infoCustomer.NGHENGHIEP_KH ? infoCustomer.NGHENGHIEP_KH : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b>Quận/ Huyện:</b> <br />{infoCustomer && infoCustomer.TEN_HUYEN}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b>Xã/ Phường:</b> <br />{infoCustomer && infoCustomer.TEN_XA}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b>Ấp/ Khu vực:</b> <br />{infoCustomer && infoCustomer.TEN_AP}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b> Địa chỉ cụ thể:</b> <br /> {infoCustomer && infoCustomer.DIACHI_KH ? infoCustomer.DIACHI_KH : 'Chưa có'} </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><b>Số nhân khẩu:</b> <br /> {infoCustomer && infoCustomer.SONHANKHAU_KH ? infoCustomer.SONHANKHAU_KH : 'Chưa có'} </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Điện thoại báo hỏng:</b> <br />{infoCustomer && infoCustomer.BAOHONG_KH === 0 ? "Chưa biết" : "Đã biết"}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                    <Box component={Paper} padding={1} marginTop={1}>
                        <Typography variant='h5' >DANH SÁCH DỊCH VỤ KHẢO SÁT</Typography>
                        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                            <Table size={'small'}>
                                <TableHead sx={{ backgroundColor: '#1890ff' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}> Tên dịch vụ </TableCell>
                                        <TableCell sx={{ color: 'white' }}> Nhà cung cấp </TableCell>
                                        <TableCell sx={{ color: 'white' }}> Ngày bắt đầu đặt cọc </TableCell>
                                        <TableCell sx={{ color: 'white' }}> Ngày kết thúc đặt cọc </TableCell>
                                        {/* <TableCell sx={{ color: 'white' }}> Trạng thái </TableCell> */}
                                        <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loading ? (<TableRow>
                                            <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                                                <CircularProgress loading={loading} />
                                            </TableCell>
                                        </TableRow>) : (
                                            
                                            surveycustomer.length > 0 ? surveycustomer.map((survey) => {
                                                return (
                                                    <TableRow key={survey.ID_CTPKS}>
                                                        <TableCell> {survey.TEN_DV} </TableCell>
                                                        <TableCell>
                                                            {survey.TEN_NCC !== null ? survey.TEN_NCC : '---'}
                                                        </TableCell>
                                                        <TableCell> {formatDate(survey.NGAYBATDAUDONGCOC_CTPKS) !== '01/01/1970' ? formatDate(survey.NGAYBATDAUDONGCOC_CTPKS) : '---'}</TableCell>
                                                        <TableCell> {formatDate(survey.NGAYKETTHUCDONGCOC_CTPKS)  !== '01/01/1970' ? formatDate(survey.NGAYKETTHUCDONGCOC_CTPKS) : '---'}</TableCell>
                                                        {/* <TableCell> {surveycustomer.length > 0 ? "Đã khảo sát" : "Chưa khảo sát"}</TableCell> */}
                                                        <TableCell>
                                                            <Tooltip title="Xem chi tiết khảo sát">
                                                                <IconButton>
                                                                    <RemoveRedEyeIcon color={'primary'} onClick={() => { openDiaLogDetailLix(survey.ID_PKS, survey.ID_DV) }}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Cập nhật khảo sát">
                                                                <IconButton>
                                                                    <EditIcon color={'warning'} onClick={() => { openDiaLogEdit(survey.ID_PKS, survey.ID_DV, survey.ID_CTPKS) }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                            {/* <Tooltip>
                                                            <IconButton>
                                                                <DeleteIcon color={'error'} />
                                                            </IconButton>
                                                        </Tooltip> */}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }) : 
                                            <TableRow>
                                                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                                                    <Typography variant="h3">Khách hàng chưa khảo sát dịch vụ</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} variant={'outlined'} autoFocus>
                        Quay lại
                    </Button>
                </DialogActions>
            </Dialog>
            <LixEdit
                open={openDiaLog}
                handleClose={closeDialog}
                id={idPKS}
                idctpks={idctpks}
                serviceList={props.serviceList}
                wards={props.wards}
                servicePointList={servicePointList}
                provider={props.provider}
                idCustomer={props.idkhachhang}
                iddv={idDV}
                reloadService={CallAPIGetSurveyOfCustomer}
            />
            <DetailLix
                open={openDiaLogDetail}
                handleClose={closeDialogDetailLix}
                id={idPKS}
                serviceList={props.serviceList}
                wards={props.wards}
                servicePointList={servicePointList}
                provider={props.provider}
                idCustomer={props.idkhachhang}
                iddv={idDV}
            />
        </>
    )
}

export default DetailCustomer