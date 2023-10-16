import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, Card, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index';
import instance from '../../axios/instance';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function DetailCustomer(props) {

    const [infoCustomer, setInfoCustomer] = React.useState()

    const CallAPIByIdCustomer = (id) => {
        instance.get('getKHByID/' + id).then(res => {
            setInfoCustomer(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    React.useEffect(() => {
        if (props.idkhachhang) {
            CallAPIByIdCustomer(props.idkhachhang)
        }
    }, [props.idkhachhang])
    console.log(infoCustomer)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Dialog
            fullScreen={fullScreen}
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
                            <Typography><b>Họ và tên khách hàng:</b> <br /> {infoCustomer && infoCustomer.TEN_KH}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>Số điện thoại:</b> <br /> {infoCustomer && infoCustomer.SODIENTHOAI_KH} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>Ngày sinh:</b> <br />{infoCustomer && infoCustomer.NGAYSINH_KH}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography><b> CCCD:</b> <br /> {infoCustomer && infoCustomer.CCCD_KH} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>Account BRCĐ:</b> <br />{'anguyenvan123'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>Nghề nghiệp:</b> <br />{infoCustomer && infoCustomer.NGHENGHIEP_KH}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography><b>Xã phường:</b> <br />{'Phường 7'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>Quận huyện:</b> <br />{'Thành phố Vị Thanh'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b> Địa chỉ cụ thể:</b> <br /> {infoCustomer && infoCustomer.DIACHI_KH} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><b>Số nhân khẩu:</b> <br /> {infoCustomer && infoCustomer.SONHANKHAU_KH} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography ><b>Điện thoại báo hỏng:</b> <br />{'Đã biết'}</Typography>
                        </Grid>
                    </Grid>
                </Card>
                <Box component={Paper} padding={1} marginTop={1}>
                    <Typography variant='h5' >DANH SÁCH DỊCH VỤ KHẢO SÁT</Typography>
                    <FormControl sx={{ width: 300, marginTop: 1 }} size="small">
                        <InputLabel id="demo-select-small-label">Tìm kiếm theo chất lượng dịch vụ</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Tìm kiếm theo chất lượng dịch vụ"
                        >
                           
                            <MenuItem value={10}>Dịch vụ có vấn đề chất lượng</MenuItem>
                            <MenuItem value={20}>Dịch vụ có khả năng phát triển thuê bao</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                        <Table size={'small'}>
                            <TableHead sx={{ backgroundColor: '#1890ff' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}> Tên dịch vụ </TableCell>
                                    <TableCell sx={{ color: 'white' }}> Nhà cung cấp </TableCell>
                                    <TableCell sx={{ color: 'white' }}> Ngày bắt đầu đặt cọc </TableCell>
                                    <TableCell sx={{ color: 'white' }}> Ngày kết thúc đặt cọc </TableCell>
                                    <TableCell sx={{ color: 'white' }}> Trạng thái </TableCell>
                                    <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell> FTTH </TableCell>
                                    <TableCell> VNPT </TableCell>
                                    <TableCell> 09/10/2023</TableCell>
                                    <TableCell> 01/01/2024</TableCell>
                                    <TableCell> Đã khảo sát</TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết khảo sát">
                                            <IconButton>
                                                <RemoveRedEyeIcon color={'primary'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip>
                                            <IconButton>
                                                <EditIcon color={'warning'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip>
                                            <IconButton>
                                                <DeleteIcon color={'error'} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Di động TS/TT </TableCell>
                                    <TableCell> VNPT </TableCell>
                                    <TableCell> 09/10/2023</TableCell>
                                    <TableCell> 01/01/2024</TableCell>
                                    <TableCell> Đã khảo sát</TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết khảo sát">
                                            <IconButton>
                                                <RemoveRedEyeIcon color={'primary'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip>
                                            <IconButton>
                                                <EditIcon color={'warning'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip>
                                            <IconButton>
                                                <DeleteIcon color={'error'} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> MyTv </TableCell>
                                    <TableCell> VNPT </TableCell>
                                    <TableCell> 09/10/2023</TableCell>
                                    <TableCell> 01/01/2024</TableCell>
                                    <TableCell> Đã khảo sát</TableCell>
                                    <TableCell>
                                        <Tooltip title="Xem chi tiết khảo sát">
                                            <IconButton>
                                                <RemoveRedEyeIcon color={'primary'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip>
                                            <IconButton>
                                                <EditIcon color={'warning'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip>
                                            <IconButton>
                                                <DeleteIcon color={'error'} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
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
    )
}

export default DetailCustomer