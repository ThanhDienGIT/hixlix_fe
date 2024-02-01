import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Stack, Box, Button, FormControl, IconButton, TextField, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
// import DialogDeleteSupplier from 'pages/component/DialogDeleteSupplier'
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
// import AddSupplier from 'pages/component/AddSupplier'
// import EditSupplier from 'pages/component/EditSupplier'
// import AddQuality from 'pages/component/AddQuality'
// import EditQuality from 'pages/component/EditQuality'
// import DialogDeleteQuality from 'pages/component/DialogDeleteQuality'
import AddServiceQuality from 'pages/component/AddServiceQuality'
import EditServiceQuality from 'pages/component/EditServiceQuality'
import DialogDeleteServiceQuality from 'pages/component/DialogDeleteServiceQuality'


function ServiceQualityManagement() {

    const { token } = useContext(TokenContext);
    token
    const [data, setData] = useState([])
    const [dialogQuality, setDialogQuality] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogEdit, setdialogEdit] = useState(false)
    const [idquality, setIdquality] = useState(0)
    const [searchInput, setSearchInput] = useState('');
    const [alloption, setAlloption] = useState([]);
    const [searchStatus, setSearchStatus] = useState(0)
    const [loadingInitial, setLoadingInitial] = useState(false)
    const [startIndex, setStartIndex] = useState(1);




    const closeDialogError = () => {
        setDialogError(false)
        setIdquality(0)
    }

    const closeDialogEdit = () => {
        setdialogEdit(false)
        setIdquality(0)
    }



    const closeDialogSuccess = () => {
        setDialogSuccess(false);
        setIDKhachHang(0)
    }



    const closeDialogSupplier = () => {
        setDialogQuality(false);
    };

    const openDialogQuality = () => {
        setDialogQuality(true)
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
    const CallAPIPage = async () => {
        setLoadingInitial(true)
        await instance.get(`get_danhsachchatluongpv/${rowPage}?page=${page}`).then(res => {
            setMaxPage(res.data.last_page)
            setData(res.data.data)
            setAlloption(res.data.data)
            setLoadingInitial(false)
            const newStartIndex = (page - 1) * rowPage + 1;
            setStartIndex(newStartIndex);
        }).catch(err => console.log(err))
    }

    const CallAPI = async () => {

            setLoadingInitial(true)
            await instance.get(`get_danhsachchatluongpv/${rowPage}?page=${page}`).then(res => {
                setMaxPage(res.data.last_page)
                setData(res.data.data)
                setAlloption(res.data.data)
                setLoadingInitial(false)
                const newStartIndex = (page - 1) * rowPage + 1;
                setStartIndex(newStartIndex);
            }).catch(err => console.log(err))
        

    }

    const CallAPIProps = async () => {
        if (searchStatus > 0) {
            handleSearch()
        }
        else {
           
            await instance.get(`get_danhsachchatluongpv/${rowPage}?page=${page}`).then(res => {
                setMaxPage(res.data.last_page)
                setData(res.data.data)
                setAlloption(res.data.data)
                const newStartIndex = (page - 1) * rowPage + 1;
                setStartIndex(newStartIndex);
            }).catch(err => console.log(err))
        }

    }


    useEffect(() => {
        if (searchStatus === 0) {
            CallAPIPage()
        } else {
            handleSearch()
        }
    }, [page, rowPage]);


    useEffect(() => {
        CallAPI()
        setSearchInput('')
    }, []);


    const screenWidth = window.innerWidth
    // let isOpen = false; // Khai báo biến để điều khiển việc mở hoặc đóng trình gợi ý

    const handleAutocompleteChange = (event, value) => {
        setSearchInput(value); // Cập nhật giá trị của trường TextField khi người dùng chọn một gợi ý
    };

    const handleSearch = async () => {
        setLoading(true)
        const objectSend = {
            keywords: searchInput
        }
        await instance.post(`search-service-quality/${rowPage}?page=${page}`, objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dssvqlt.data)
                setMaxPage(res.data.dssvqlt.last_page)
                setAlloption(res.data.dssvqlt.data)
                setSearchStatus(1)
                setLoading(false)
                const newStartIndex = (page - 1) * rowPage + 1;
                setStartIndex(newStartIndex);
            })
    }




    const openDialogError = (id) => {
        setDialogError(true)
        setIdquality(id)
    }

    const openDialogEditKH = (id) => {
        setdialogEdit(true)
        setIdquality(id)
    }









    return (
        <ComponentSkeleton>
            <MainCard title="DANH MỤC CHẤT LƯỢNG PHỤC VỤ">
                {loadingInitial ?
                    <Stack alignItems="center">
                        <CircularProgress
                            thickness={6}
                            loading={loadingInitial} />
                        <Typography sx={{ mt: 1 }}>Đang nạp dữ liệu...</Typography>
                    </Stack> :
                    <>
                        <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                            <Box display="flex" alignItems="center">
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={alloption.map((option) => option.TEN_CHATLUONGPV)}
                                    onChange={(event, value) => {
                                        handleAutocompleteChange(event, value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Tìm kiếm...'
                                            size="small"
                                            sx={{ marginRight: 1, marginTop: 0.8, width: 310 }}
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
                                {/* <Autocomplete
                            id="free-solo-demo"
                            multiple
                            filterSelectedOptions
                            renderTags={() => null} // don't render tag in the TextField
                            value={searchInput}
                            options={alloption.map((option) => option.TEN_NCC)}
                            onChange={(event, value) => {
                                handleAutocompleteChange(event, value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Tìm kiếm...'
                                    size="small"
                                    sx={{ marginRight: 1, marginTop: 0.8, width: 310 }}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onInputChange={(e, value) => {
                                        setSearchInput(value);
                                        isOpen = value.length > 0;
                                    }}
                                />
                            )}
                        /> */}


                            </Box>

                            <Box display={'flex'} marginTop={1} sx={screenWidth > 720 ? "" : { width: '100%' }} >
                                <AnimateButton>
                                    <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'info'} variant="outlined" onClick={handleSearch}>
                                        {loading ? <>
                                            <CircularProgress size="1rem" color="inherit" sx={{ mr: 0.5 }} /><Typography >Tìm kiếm</Typography>
                                        </> : <><SearchIcon /><Typography >Tìm kiếm</Typography></>}
                                    </Button>
                                </AnimateButton>
                                <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'primary'} variant="contained" onClick={openDialogQuality}>
                                    <AddIcon /><Typography >Thêm</Typography>
                                </Button>



                            </Box>


                        </Box>
                        <TableContainer component={Paper}>
                            <Table size='small'>
                                <TableHead sx={{ backgroundColor: '#0099ff' }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}> STT </TableCell>
                                        <TableCell sx={{ color: 'white' }}> Tên chất lượng phục vụ</TableCell>
                                        <TableCell sx={{ color: 'white' }}> Từ (Khoảng điểm) </TableCell>
                                        <TableCell sx={{ color: 'white' }}> Đến (Khoảng điểm) </TableCell>
                                        {/* <TableCell sx={{ color: 'white' }}> Trạng thái </TableCell> */}
                                        <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((ele, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {startIndex + index}
                                                </TableCell>
                                                <TableCell>
                                                    {ele.TEN_CHATLUONGPV}
                                                </TableCell>
                                                <TableCell>
                                                    {ele.DIEMTU}
                                                </TableCell>
                                                <TableCell>
                                                    {ele.DENDIEM}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Cập nhật chất lượng phục vụ">
                                                        <IconButton>
                                                            <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.ID_CHATLUONGPV) }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Xóa chất lượng phục vụ">
                                                        <IconButton>
                                                            <DeleteIcon color='error' onClick={() => { openDialogError(ele.ID_CHATLUONGPV) }} />
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
                    </>}

            </MainCard>
            <AddServiceQuality
                open={dialogQuality}
                handleClose={closeDialogSupplier}
                callApi={CallAPIProps}
            />
            <EditServiceQuality
                open={dialogEdit}
                handleClose={closeDialogEdit}
                callApi={CallAPIProps}
                idquality={idquality}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DialogDeleteServiceQuality
                open={dialogError}
                handleClose={closeDialogError}
                idquality={idquality}
                callApi={CallAPIProps}
                content={"Xác nhận xóa chất lượng phục vụ này?"}
            />

        </ComponentSkeleton>
    )
}
export default ServiceQualityManagement



