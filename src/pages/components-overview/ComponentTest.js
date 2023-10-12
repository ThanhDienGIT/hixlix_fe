import React, { useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import LixDialog from 'pages/component/LixDialog'
import AddCustomer from 'pages/component/AddCustomer'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DiaLogError from 'pages/component/DiaLogError'
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
function ComponentTest() {

    const [data, setData] = useState([])
    const [dialog, setDiaLog] = useState(false)
    const [idKhaoSat, setIdKhaoSat] = useState(0)
    const [dialogCustomer, setDialogCustomer] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [idKhachHang, setIDKhachHang] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openDialogError = (id) => {
        setDialogError(true)
        setIDKhachHang(id)
    }

    const closeDialogError = () => {
        setDialogError(false)
        setIDKhachHang(0)
    }

    // const openDialogSuccess = (id) => {
    //     setDialogSuccess(true)
    //     setIDKhachHang(id)
    // }

    const closeDialogSuccess = () => {
        setDialogSuccess(false)
        setIDKhachHang(0)
    }

    const openDialogCustomer = () => {
        setDialogCustomer(true)
    }

    const closeDialogCustomer = () => {
        setDialogCustomer(false)
    }

    const openDialog = (id) => {
        setDiaLog(true)
        setIdKhaoSat(id)
    }

    const closeDialog = () => {
        setDiaLog(false)
        setIdKhaoSat(0)
    }

    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    useEffect(() => {
        setData([{
            stt: 1,
            tenchuho: 'Nguyễn Văn A',
            diachi: ' KV 1 P7 TP Vị Thanh',
            sonhankhau: '0966631453',
            nguoihopdong: 'Nguyễn Văn A',
            trangthai: 'Chưa khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: '0969333912',
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Đã khảo sát'
        },
        ])
    }, [])
    console.log(data)

    return (
        <ComponentSkeleton>
            <MainCard title="DANH SÁCH KHÁCH HÀNG">
                <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                    <TextField label='Tìm kiếm...' size="small" />
                    <Button size="small" sx={{ display: 'flex', marginTop: 1 }} variant="contained" onClick={openDialogCustomer}>
                        <AddIcon />
                        <Typography sx={{ marginLeft: 1 }}>Khách hàng</Typography>
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#0099ff' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}> Tên khách hàng </TableCell>
                                <TableCell sx={{ color: 'white' }}> Địa chỉ </TableCell>
                                <TableCell sx={{ color: 'white' }}> Trạng thái </TableCell>
                                <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(ele => {
                                return (
                                    <TableRow key={ele.stt}>
                                        <TableCell>
                                            {ele.tenchuho}
                                        </TableCell>

                                        <TableCell>
                                            {ele.diachi}
                                        </TableCell>
                                        <TableCell>
                                            {ele.trangthai}
                                        </TableCell>
                                        <TableCell>
                                            {ele.trangthai !== '' ? <>
                                                <Tooltip title="Chi tiết khách hàng">
                                                    <IconButton>
                                                        <RemoveRedEyeIcon color={'primary'} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cập nhật phiếu LIX">
                                                    <IconButton>
                                                        <EditIcon color='warning' onClick={() => { openDialog(ele.stt) }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa khảo sát">
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => { openDialogError(ele.stt) }} />
                                                    </IconButton>
                                                </Tooltip>
                                                {/* <Button sx={{width:20,margin:1}} variant='contained' color='warning'>Sửa</Button>  */}
                                                {/* <Button sx={{ width: 20, margin: 1 }} variant='contained' color='error' onClick={() => { openDialog(ele.stt) }}>Xoá</Button> */}
                                            </>
                                                : ""}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />

                </TableContainer>
            </MainCard>
            <LixDialog
                open={dialog}
                handleClose={closeDialog}
                id={idKhaoSat}
            />
            <AddCustomer
                open={dialogCustomer}
                handleClose={closeDialogCustomer}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DiaLogError
                open={dialogError}
                handleClose={closeDialogError}
                idKhachHang={idKhachHang}
                content={"Xác nhận xóa khách hàng này ?"}
            />

        </ComponentSkeleton>
    )
}

export default ComponentTest