import React, { useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import LixDialog from 'pages/component/LixDialog'
import AddCustomer from 'pages/component/AddCustomer'
import DeleteIcon from '@mui/icons-material/Delete';
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DiaLogError from 'pages/component/DiaLogError'
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import instance from '../../axios/instance'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DetailCustomer from 'pages/component/DetailCustomer'
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';

function ComponentTest() {

    const [data, setData] = useState([])
    const [dialog, setDiaLog] = useState(false)
    const [idKhaoSat, setIdKhaoSat] = useState(0)
    const [dialogCustomer, setDialogCustomer] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogDetail, setDialogDetail] = useState(false)
    const [idKhachHang, setIDKhachHang] = useState(0)
    const [defaultService, setDefaultService] = useState([])
    const [provider, setProvider] = useState([])
    const [wards,setWards] = useState([])
    const servicePointList = [0,1,2,3,4,5,6,7,8,9,10]
    const callAPIServiceList = () => {
        instance.get('dichvu')
            .then(res => setDefaultService(res.data))
            .catch(err => console.log(err))
    }

    console.log(defaultService)
    const openDialogError = (id) => {
        setDialogError(true)
        setIDKhachHang(id)
    }

    const closeDialogError = () => {
        setDialogError(false)
        setIDKhachHang(0)
    }

    const openDialogDetail = (id) => {
        setDialogDetail(true)
        setIDKhachHang(id)
    }

    const closeDialogDetail = () => {
        setDialogDetail(false)
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

    const [maxPage, setMaxPage] = useState(0)
    const listPage = [5, 10, 15, 25, 50]
    const [rowPage, setRowPage] = useState(5)
    const [page, setPage] = useState(1)
    const nextPage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    }

    const revertPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const changeRowPage = (ele) => {
        setRowPage(ele.target.value)
    }

    const CallAPI = () => {
        instance.get(`get_danhsachkhachhang/${rowPage}?page=${page}`).then(res => {
            setMaxPage(res.data.last_page)
            setData(res.data.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        CallAPI()
    }, [page, rowPage])


    useEffect(() => {
        callAPIServiceList()
        setProvider([
            {
                ID_NHACUNGCAP: 1,
                TEN_NHACUNGCAP: "Viettel",
            },
            {
                ID_NHACUNGCAP: 2,
                TEN_NHACUNGCAP: "VNPT",
            },
            {
                ID_NHACUNGCAP: 3,
                TEN_NHACUNGCAP: "FPT",
            },
        ])
        setWards([
            {
             ID_DVHC:1,
             TEN_DVHC:'Vị thanh',
             ID_CHA_DVHC: null,
            },
            {
             ID_DVHC:2,
             TEN_DVHC:'Phường 7',
             ID_CHA_DVHC: 1,
            },
            {
             ID_DVHC:3,
             TEN_DVHC:'Phường 5',
             ID_CHA_DVHC: 1,
            },
         ])
    }, [])

 

    return (
        <ComponentSkeleton>
            <MainCard title="DANH SÁCH KHÁCH HÀNG">
                <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                    <Box display={'flex'} flexWrap={'wrap'}>

                        <FormControl sx={{ width: 220, marginRight: 2, marginTop: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Trạng thái khảo sát</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Trạng thái khảo sát"
                                value={0}
                            >
                                <MenuItem value={0}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={10}>Khách hàng đã khảo sát</MenuItem>
                                <MenuItem value={20}>Khách hàng chưa khảo sát</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 220, marginRight: 2, marginTop: 1.5 }} size="small">
                            <InputLabel id="demo-select-small-label">Chất lượng dịch vụ</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Chất lượng dịch vụ"
                                value={0}
                            >
                                <MenuItem value={0}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={10}>Dịch vụ có vấn đề chất lượng</MenuItem>
                                <MenuItem value={20}>Dịch vụ có khả năng phát triển thuê bao</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label='Tìm kiếm...' size="small" sx={{ marginRight: 2, marginTop: 1.5, width: 220 }} />
                        <Button sx={{ marginRight: 2, marginTop: 1 }} size={'small'} variant={'outlined'} startIcon={<SearchIcon />}>Tìm kiếm</Button>
                    </Box>
                    <Box display={'flex'} marginTop={1}>
                        <Button size="small" sx={{ display: 'flex' }} color={'success'} variant="contained" onClick={openDialogCustomer}>
                            <SaveIcon />
                            <Typography >Xuất excel</Typography>
                        </Button>
                        <Button size="small" sx={{ display: 'flex', marginLeft: 1 }} variant="contained" onClick={openDialogCustomer}>
                            <AddIcon />
                            <Typography >Khách hàng</Typography>
                        </Button>
                    </Box>

                </Box>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead sx={{ backgroundColor: '#0099ff' }} >
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}> Tên khách hàng </TableCell>
                                <TableCell sx={{ color: 'white' }}> Số điện thoại </TableCell>
                                <TableCell sx={{ color: 'white' }}> Trạng thái </TableCell>
                                <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((ele, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {ele.TEN_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.SODIENTHOAI_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.TRANGTHAI_KH === 1 ? "Chưa khảo sát" : "Đã khảo sát"}
                                        </TableCell>
                                        <TableCell>
                                            {ele.trangthai !== '' ? <>
                                                <Tooltip title="Chi tiết khách hàng">
                                                    <IconButton onClick={() => { openDialogDetail(ele.ID_KH) }}>
                                                        <RemoveRedEyeIcon color={'primary'} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cập nhật phiếu LIX">
                                                    <IconButton>
                                                        <EditNoteIcon color='warning' onClick={() => { openDialog(ele.ID_KH) }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa khảo sát">
                                                    <IconButton>
                                                        <DeleteIcon color='error' onClick={() => { openDialogError(ele.ID_KH) }} />
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

                        </TableBody>
                    </Table>
                    <Box display="flex" alignItems={'center'} justifyContent={'flex-end'} marginRight={2} padding={2}>
                        <FormControl sx={{ width: 80 }}>
                            <InputLabel id="demo-simple-select-label">Số dòng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label={'Số dòng'}
                                value={rowPage}
                                onChange={(e) => { changeRowPage(e) }}
                            >
                                {listPage.length > 0 && listPage.map(ele => (
                                    <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Tooltip title={'Chuyển về trang trước'} sx={{ marginRight: 1 }}>
                            <IconButton onClick={revertPage}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography>{page * rowPage - rowPage + 1 + " - " + page * rowPage}</Typography>
                        <Tooltip title={'Chuyển tới trang sau'} sx={{ marginLeft: 1 }}>
                            <IconButton onClick={nextPage}>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography>{'Tổng trang: ' + maxPage}</Typography>
                    </Box>
                </TableContainer>
            </MainCard>
            <LixDialog
                open={dialog}
                handleClose={closeDialog}
                id={idKhaoSat}
                serviceList={defaultService}
                provider={provider}
                wards={wards}
                servicePointList={servicePointList}
            />
            <AddCustomer
                open={dialogCustomer}
                handleClose={closeDialogCustomer}
                wards={wards}
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
            <DetailCustomer
                open={dialogDetail}
                handleClose={closeDialogDetail}
                idkhachhang={idKhachHang}
            />

        </ComponentSkeleton>
    )
}

export default ComponentTest