import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Stack, Box, Button, FormControl, IconButton, TextField, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import AddService from 'pages/component/AddService.js'
import EditService from 'pages/component/EditService'
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DialogDeleteServive from 'pages/component/DialogDeleteService'
import AddIcon from '@mui/icons-material/Add';
import instance from '../../axios/instance'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
// import SaveIcon from '@mui/icons-material/Save';
import { TokenContext } from '../../globalVar/TokenProvider'
// import Autocomplete from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import AnimateButton from 'components/@extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


function ServiceManagement() {

    const { token } = useContext(TokenContext);
    token
    const [data, setData] = useState([])
    const [dialogService, setDialogService] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogEdit, setdialogEdit] = useState(false)
    const [idservice, setIdservice] = useState(0)
    const [defaultService, setDefaultService] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [alloption, setAlloption] = useState([]);
    const [service, setService] = useState(0);
    const [searchStatus, setSearchStatus] = useState(0)
    const [loadingInitial, setLoadingInitial] = useState(false)

    const callAPIServiceList = () => {
        instance.get('dichvu')
            .then(res => setDefaultService(res.data))
            .catch(err => console.log(err))
    }


    const closeDialogError = () => {
        setDialogError(false)
        setIdservice(0)
    }

    const closeDialogEdit = () => {
        setdialogEdit(false)
        setIdservice(0)
    }



    const closeDialogSuccess = () => {
        setDialogSuccess(false);
        setIDKhachHang(0)
    }



    const closeDialogService = () => {
        setDialogService(false);
    };

    const openDialogService = () => {
        setDialogService(true)
    }





    const [maxPage, setMaxPage] = useState(0);
    const listPage = [5, 10, 15, 25, 50];
    const [rowPage, setRowPage] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
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

    const CallAPI = async () => {
        setLoadingInitial(true)
        await instance.get(`get_danhsachdichvu/${rowPage}?page=${page}`).then(res => {
            setMaxPage(res.data.last_page)
            setData(res.data.data)
            setAlloption(res.data.data)
            setLoadingInitial(false)
        }).catch(err => console.log(err))
    }
    const CallAPIGetServiceType = async () => {
        await instance.get(`getServiceType`).then(res => {
            setDefaultService(res.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (searchStatus === 0) {
            CallAPI()
        } else {
            handleSearch()
        }
    }, [page, rowPage]);


    useEffect(() => {
        callAPIServiceList()
        CallAPIGetServiceType()
    }, []);


    const screenWidth = window.innerWidth
    // let isOpen = false; // Khai báo biến để điều khiển việc mở hoặc đóng trình gợi ý

    const handleAutocompleteChange = (event, value) => {
        setSearchInput(value); // Cập nhật giá trị của trường TextField khi người dùng chọn một gợi ý
    };

    const handleSearch = async () => {
        setLoading(true)
        const objectSend = {
            LOAI_DV: service,
            keywords: searchInput
        }
        await instance.post(`search-dv/${rowPage}?page=${page}`, objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dsdv.data)
                setMaxPage(res.data.dsdv.last_page)
                setAlloption(res.data.dsdv.data)
                setSearchStatus(1)
                setLoading(false)
            })
    }




    const openDialogError = (id) => {
        setDialogError(true)
        setIdservice(id)
    }

    const openDialogEditKH = (id) => {
        setdialogEdit(true)
        setIdservice(id)
    }







    return (
        <ComponentSkeleton>
            <MainCard title="DANH MỤC DỊCH VỤ">
                {
                    loadingInitial ?
                        <Stack alignItems="center">
                            <CircularProgress
                                thickness={6}
                                loading={loadingInitial} />
                            <Typography sx={{ mt: 1 }}>Đang nạp dữ liệu...</Typography>
                        </Stack>
                        :
                        <>
                            <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                                <Box display="flex" alignItems="center">

                                    <FormControl sx={{ marginRight: 1, marginTop: 1, width: 150 }} size="small">
                                        <InputLabel id="demo-select-small-label">Loại dịch vụ</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            label="Loại dịch vụ"
                                            name='ID_LDV'
                                            value={service}
                                            onChange={(e) => setService(e.target.value)}
                                        >
                                            <MenuItem value={0}>
                                                Tất cả
                                            </MenuItem>
                                            {defaultService && defaultService.filter(x => x.ID_LDV !== null).map(ele => {
                                                return (
                                                    <MenuItem key={ele.ID_LDV} value={ele.ID_LDV}>{ele.TEN_LDV}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>

                                    <Autocomplete
                                        freeSolo
                                        id="free-solo-2-demo"
                                        disableClearable
                                        options={alloption.map((option) => option.TEN_DV)}
                                        onChange={(event, value) => {
                                            handleAutocompleteChange(event, value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label='Tìm kiếm...'
                                                size="small"
                                                sx={{ marginRight: 1, marginTop: 0.8, width: 150 }}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                onInputChange={(e, value) => {
                                                    setSearchInput(value);
                                                }}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: 'search',
                                                }}
                                            />
                                        )}
                                    />


                                </Box>

                                <Box display={'flex'} marginTop={1} sx={screenWidth > 720 ? "" : { width: '100%' }} >
                                    <AnimateButton>
                                        <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'info'} variant="outlined" onClick={handleSearch}>
                                            {loading ? <>
                                                <CircularProgress size="1rem" color="inherit" sx={{ mr: 0.5 }} /><Typography >Tìm kiếm</Typography>
                                            </> : <><SearchIcon /><Typography >Tìm kiếm</Typography></>}
                                        </Button>
                                    </AnimateButton>
                                    <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'primary'} variant="contained" onClick={openDialogService}>
                                        <AddIcon /><Typography >Dịch vụ</Typography>
                                    </Button>



                                </Box>


                            </Box>
                            <TableContainer component={Paper}>
                                <Table size='small'>
                                    <TableHead sx={{ backgroundColor: '#0099ff' }} >
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}> Tên dịch vụ </TableCell>
                                            <TableCell sx={{ color: 'white' }}> Loại dịch vụ </TableCell>
                                            <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((ele, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {ele.TEN_DV}
                                                    </TableCell>
                                                    <TableCell>
                                                        {ele.TEN_LDV}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Cập nhật dịch vụ">
                                                            <IconButton>
                                                                <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.ID_DV) }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Xóa dịch vụ">
                                                            <IconButton>
                                                                <DeleteIcon color='error' onClick={() => { openDialogError(ele.ID_DV) }} />
                                                            </IconButton>
                                                        </Tooltip>
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
                        </>
                }

            </MainCard>
            <AddService
                open={dialogService}
                handleClose={closeDialogService}
                callApi={CallAPI}
                servicetype={defaultService}
            />
            <EditService
                open={dialogEdit}
                handleClose={closeDialogEdit}
                callApi={CallAPI}
                idservice={idservice}
                servicetype={defaultService}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DialogDeleteServive
                open={dialogError}
                handleClose={closeDialogError}
                idservice={idservice}
                callApi={CallAPI}
                content={"Xác nhận xóa danh mục dịch vụ này?"}
            />

        </ComponentSkeleton>
    )
}
export default ServiceManagement



