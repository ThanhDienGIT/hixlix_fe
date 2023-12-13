import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '../../../node_modules/@mui/material/index';
import instance from '../../axios/instance';
import { format, isValid } from 'date-fns';


import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function DetailLix(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [detail, setDetail] = React.useState([])


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        if (isValid(date)) {
            return format(date, 'dd/MM/yyyy');
        } else {
            return "Chưa có";
        }
    };


    const getDetailLix = async () => {
        const objectSend = {
            ID_KH: props.idCustomer,
            ID_DV: props.iddv,
            ID_PKS: props.id
        }
        await instance.post('getDetailLix', objectSend)
            .then((res) => {
                setDetail(res.data)
                console.log(detail)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    React.useEffect(() => {
            getDetailLix()
    }, [props.open])




    console.log(props.iddv)
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
                </DialogTitle>
                <DialogContent>
                    <Typography variant='h5' >THÔNG TIN CHI TIẾT KHẢO SÁT</Typography>
                    <Card sx={{ padding: 1 }}>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Typography><b>Họ và tên chủ hộ:</b> <br /> {detail.TEN_KH}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><b>Số điện thoại:</b> <br /> {detail.SODIENTHOAI_KH ? detail.SODIENTHOAI_KH : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><b>Ngày sinh:</b>  <br />{detail.NGAYSINH_KH && formatDate(detail.NGAYSINH_KH) ? formatDate(detail.NGAYSINH_KH) : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b> CCCD:</b>  <br /> {detail.CCCD_KH ? detail.CCCD_KH : 'Chưa có'}</Typography>
                            </Grid>
                            {/* <Grid item xs={6}>
                            <Typography><b>Account BRCĐ:</b> <br />{'nguyenvanc123'}</Typography>
                        </Grid> */}
                            <Grid item xs={6}>
                                <Typography><b>Nghề nghiệp:</b>  <br /> {detail.NGHENGHIEP_KH ? detail.NGHENGHIEP_KH : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b>Quận/ Huyện:</b>  <br /> {detail.TEN_HUYEN ? detail.TEN_HUYEN : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b>Xã/ Phường:</b> <br /> {detail.TEN_XA ? detail.TEN_XA : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b>Ấp/ Khu vực:</b>  <br /> {detail.TEN_AP ? detail.TEN_AP : 'Chưa có'}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography><b> Địa chỉ cụ thể:</b>  <br />  {detail.DIACHI_KH ? detail.DIACHI_KH : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><b>Số nhân khẩu:</b>  <br />  {detail.SONHANKHAU_KH ? detail.SONHANKHAU_KH : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Người đứng tên hợp đồng:</b> <br /> {detail.TENKHACHHANGDAIDIEN_CTPKS ? detail.TENKHACHHANGDAIDIEN_CTPKS : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>SDT người đứng tên hợp đồng:</b> <br /> {detail.SODIENTHOAIKHACHHANGDAIDIEN_CTPKS ? detail.SODIENTHOAIKHACHHANGDAIDIEN_CTPKS : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Account BRCĐ:</b> <br /> {detail.ACCOUNTKHACHHANG_CTPKS ? detail.ACCOUNTKHACHHANG_CTPKS : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Nhà cung cấp:</b> <br /> {detail.TEN_NCC ? detail.TEN_NCC : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Dịch vụ:</b> <br /> {detail.TEN_DV ? detail.TEN_DV : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Mức cước:</b> <br /> {detail.MUCCUOC_CTPKS && detail.MUCCUOC_CTPKS.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography sx={Number(detail.CAMNHANDICHVU_CTPKS) < 5 ? {color:'red'} : ""} ><b>Điểm chất lượng dịch vụ:</b> <br /> {detail.CAMNHANDICHVU_CTPKS ? detail.CAMNHANDICHVU_CTPKS + ' điểm' : 'Chưa có'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={Number(detail.CANNHANPHUCVU_CTPKS) < 5 ? {color:'red'} : ""}><b>Điểm chất lượng phục vụ:</b> <br /> {detail.CANNHANPHUCVU_CTPKS ? detail.CANNHANPHUCVU_CTPKS + ' điểm' : 'Chưa có'}</Typography>
                            </Grid>



                            <Grid item xs={6}>
                                <Typography ><b>Hình thức cước BRCĐ:</b> <br /> {detail.HINHTHUCDONG_CTPKS}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Tháng bắt đầu đặt cọc:</b> <br /> {detail.NGAYBATDAUDONGCOC_CTPKS && formatDate(detail.NGAYBATDAUDONGCOC_CTPKS)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Tháng kết thúc đặt cọc:</b> <br /> {detail.NGAYKETTHUCDONGCOC_CTPKS && formatDate(detail.NGAYKETTHUCDONGCOC_CTPKS)}</Typography>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <Typography ><b>Thời gian lắp đặt:</b> <br /> {detail.THOIGIANLAPDAT_CTPKS && formatDate(detail.THOIGIANLAPDAT_CTPKS)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography ><b>Thời gian ngưng:</b> <br /> {detail.THOIGIANNGUNG_CTPKS && formatDate(detail.THOIGIANNGUNG_CTPKS)}</Typography>
                            </Grid> */}
                            <Grid item xs={6}>
                                <Typography ><b>Nhân viên khảo sát:</b> <br /> {detail.TEN_NV}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'} onClick={
                    () => {
                        props.handleClose()
                        setDetail([])
                    }

                }>
                        Quay lại
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DetailLix