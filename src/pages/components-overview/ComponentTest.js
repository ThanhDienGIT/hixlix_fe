import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import LixDialog from 'pages/component/LixDialog'
import AddCustomer from 'pages/component/AddCustomer'
import EditCustomer from 'pages/component/EditCustomer'
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
import { TokenContext } from '../../globalVar/TokenProvider'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Autocomplete from '@mui/material/Autocomplete';

function ComponentTest() {
    const { token } = useContext(TokenContext);
    token
    const [data, setData] = useState([])
    const [dialog, setDiaLog] = useState(false)
    const [idKhaoSat, setIdKhaoSat] = useState(0)
    const [dialogCustomer, setDialogCustomer] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogDetail, setDialogDetail] = useState(false)
    const [dialogEdit, setdialogEdit] = useState(false)
    const [idKhachHang, setIDKhachHang] = useState(0)
    const [defaultService, setDefaultService] = useState([])
    const [provider, setProvider] = useState([])
    const [wards, setWards] = useState([])
    const servicePointList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const callAPIServiceList = () => {
        instance.get('dichvu')
            .then(res => setDefaultService(res.data))
            .catch(err => console.log(err))
    }

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

    const closeDialogEdit = () => {
        setdialogEdit(false)
        setIDKhachHang(0)
    }

    const closeDialogSuccess = () => {
        setDialogSuccess(false);
        setIDKhachHang(0)
    }

    const openDialogCustomer = () => {
        setDialogCustomer(true);
    }

    const closeDialogCustomer = () => {
        setDialogCustomer(false);
    };

    const openDialog = (id) => {
        setDiaLog(true);
        setIdKhaoSat(id);
    }

    const openDialogEditKH = (id) => {
        setdialogEdit(true)
        setIDKhachHang(id)
    }

    const closeDialog = () => {
        setDiaLog(false);
        setIdKhaoSat(0);
    }

    const [maxPage, setMaxPage] = useState(0);
    const listPage = [5, 10, 15, 25, 50];
    const [rowPage, setRowPage] = useState(5);
    const [page, setPage] = useState(1);
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
            setAlloption(res.data.data)
        }).catch(err => console.log(err))
    }
    const getAllQuanHuyen = async () => {
        const response = await instance.get('getallquanhuyen');

        if (response.status === 200) {
            console.log(response.status)
            setQuanhuyen(response.data.dvhc)

        }
        // else
        // {
        //     console.log(response)
        // }
    }

    useEffect(() => {
        CallAPI()
    }, [page, rowPage]);


    useEffect(() => {
        getAllQuanHuyen()
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
                ID_DVHC: 1,
                TEN_DVHC: 'Vị thanh',
                ID_CHA_DVHC: null,
            },
            {
                ID_DVHC: 2,
                TEN_DVHC: 'Phường 7',
                ID_CHA_DVHC: 1,
            },
            {
                ID_DVHC: 3,
                TEN_DVHC: 'Phường 5',
                ID_CHA_DVHC: 1,
            },
        ])
    }, []);


    const screenWidth = window.innerWidth




    const handleSearch = async () => {
        // Thực hiện tìm kiếm dựa trên các giá trị
        console.log("Trạng thái khảo sát:", statusSurvey);
        console.log("Chất lượng dịch vụ:", qualityService);
        console.log("Tìm kiếm:", searchInput);
        const objectSend = {
            status_survey: statusSurvey,
            quality_survey: qualityService,
            keywords: searchInput
        }
        await instance.post('searchcustomer', objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dskh)
            })
    }

    const exportDataToExcel = async () => {
        await instance.post('export-excel', { export_data: data })
          .then(response => {
            console.log(response)
            // Đoạn mã để xử lý tệp Excel trả về, ví dụ: mở tệp Excel trong cửa sổ mới
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'TTNL.xlsx'); // Đặt tên tệp Excel
            document.body.appendChild(link);
            link.click();
          })
          .catch(error => {
            console.error('Lỗi khi tải tệp Excel:', error);
          });
    };



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
                                value={statusSurvey}
                                onChange={(e) => setStatusSurvey(e.target.value)}
                            >
                                <MenuItem value={5}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={0}>Khách hàng chưa khảo sát</MenuItem>
                                <MenuItem value={1}>Khách hàng đã khảo sát</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 220, marginRight: 2, marginTop: 1.5 }} size="small">
                            <InputLabel id="demo-select-small-label">Chất lượng dịch vụ</InputLabel>
                            <Select
                                disabled={statusSurvey === 0}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Chất lượng dịch vụ"
                                value={statusSurvey === 0 ? '' : qualityService}
                                onChange={(e) => setQualityService(e.target.value)}
                            >
                                <MenuItem value={5}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={0}>Chất lượng tốt</MenuItem>
                                <MenuItem value={1}>Chất lượng kém</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <TextField label='Tìm kiếm...' size="small"
                            sx={{ marginRight: 2, marginTop: 1.5, width: 220 }}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} /> */}
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={alloption.map((option) => option.TEN_KH)}
                            renderInput={(params) => <TextField {...params} label='Tìm kiếm...' size="small"
                            sx={{ marginRight: 2, marginTop: 1.5, width: 220 }}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onInputChange={(e, value) => setSearchInput(value)}
                            />}
                        />
                        <Button onClick={handleSearch} sx={{ marginRight: 2, marginTop: 1 }} size={'small'} variant={'outlined'} startIcon={<SearchIcon />}>Tìm kiếm</Button>
                    </Box>
                    <Box display={'flex'} marginTop={1} justifyContent={'space-between'} sx={screenWidth >= 720 ? "" : {width:'100%'}}>
                        <Button size="small" sx={{ display: 'flex' }} variant="contained" onClick={openDialogCustomer}>
                            <AddIcon />
                            <Typography >Khách hàng</Typography>
                        </Button>
                        <Button size="small" sx={{ display: 'flex', marginLeft: 1 }} color={'success'} variant="contained" onClick={exportDataToExcel}>
                            <SaveIcon />
                            <Typography >Xuất excel</Typography>
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
                                            {ele.TRANGTHAI_KH === 0 ? "Chưa khảo sát" : "Đã khảo sát"}
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
                                                <Tooltip title="Cập nhật Khách hàng">
                                                    <IconButton>
                                                        <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.ID_KH) }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa khách hàng">
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
                idCustomer={idKhaoSat}
            />
            <AddCustomer
                open={dialogCustomer}
                handleClose={closeDialogCustomer}
                district={quanhuyen}
                wards={wards}
                callApi={CallAPI}
            />
            <EditCustomer
                open={dialogEdit}
                handleClose={closeDialogEdit}
                district={quanhuyen}
                wards={wards}
                callApi={CallAPI}
                idkhachhang={idKhachHang}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DiaLogError
                open={dialogError}
                handleClose={closeDialogError}
                idkhachhang={idKhachHang}
                callApi={CallAPI}
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