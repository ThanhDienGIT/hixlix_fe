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
import AnimateButton from 'components/@extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddUnit from 'pages/component/AddUnit'
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditUnit from 'pages/component/EditUnit'
import DialogDeleteUnit from 'pages/component/DialogDeleteUnit'

function UnitManagement() {

    const { token } = useContext(TokenContext);
    token
    const [data, setData] = useState([])
    const [dialogQuality, setDialogQuality] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogEdit, setdialogEdit] = useState(false)
    const [idUnit, setidUnit] = useState(0)
    const [searchInput, setSearchInput] = useState('');
    const [searchStatus, setSearchStatus] = useState(0)
    const [loadingInitial, setLoadingInitial] = useState(false)
    const [childUnit, setChildUnit] = useState([])
    const [listChild, setListChild] = useState([])
    const [childResult, setchildResult] = useState([])
    const [parentResult, setparentResult] = useState([])
    // const [startIndex, setStartIndex] = useState(1);
    // const [open, setOpen] = useState(false)

    const [openRows, setOpenRows] = useState({});

    const toggleRow = (index) => {
        setOpenRows({ ...openRows, [index]: !openRows[index] });
    };





    const closeDialogError = () => {
        setDialogError(false)
        setidUnit(0)
    }

    const closeDialogEdit = () => {
        setdialogEdit(false)
        setidUnit(0)
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
    const [maxPageSecond, setMaxPageSecond] = useState(0);
    const listPage = [5, 10, 15, 25, 50];
    const [rowPage, setRowPage] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const nextPage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    }

    const nextPageFunc = () => {
        if (page < maxPageSecond) {
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
        await instance.get(`getAllUnit/${rowPage}?page=${page}`).then(res => {
            setMaxPage(res.data.last_page)
            setData(res.data.data)
            setLoadingInitial(false)
            // const newStartIndex = (page - 1) * rowPage + 1;
            // setStartIndex(newStartIndex);
        }).catch(err => console.log(err))
    }

    const CallAPI = async () => {

        setLoadingInitial(true)
        await instance.get(`getAllUnit/${rowPage}?page=${page}`).then(res => {
            setMaxPage(res.data.last_page)
            setData(res.data.data)
            setLoadingInitial(false)
            // const newStartIndex = (page - 1) * rowPage + 1;
            // setStartIndex(newStartIndex);
        }).catch(err => console.log(err))


    }

    const getAllChildUnit = async () => {
        await instance.get('getAllChildUnit')
            .then((res) => {
                setChildUnit(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getListUnit = async () => {
        await instance.get('getListUnit')
            .then((res) => {
                setListChild(res.data)
                console.log(listChild)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log(childUnit)

    const CallAPIProps = async () => {
        if (searchStatus > 0) {
            handleSearch()
        }
        else {

            await instance.get(`getAllUnit/${rowPage}?page=${page}`).then(res => {
                setMaxPage(res.data.last_page)
                setData(res.data.data)

                // const newStartIndex = (page - 1) * rowPage + 1;
                // setStartIndex(newStartIndex);
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
        getAllChildUnit()
        getListUnit()
    }, []);


    const screenWidth = window.innerWidth
    // let isOpen = false; // Khai báo biến để điều khiển việc mở hoặc đóng trình gợi ý

    const handleAutocompleteChange = (e) => {
        setSearchInput(e.target.value); // Cập nhật giá trị của trường TextField khi người dùng chọn một gợi ý
    };

    const handleSearch = async () => {
        setLoading(true)
        const objectSend = {
            keywords: searchInput
        }
        await instance.post(`search-unit/${rowPage}?page=${page}`, objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dssvqlt.data)
                setChildUnit(res.data.child)

                setchildResult(res.data.childResult)
                setparentResult(res.data.parentResult.data)

                setMaxPage(res.data.dssvqlt.last_page)
                setMaxPageSecond(res.data.parentResult.last_page)
                setSearchStatus(1)
                setLoading(false)
                // const newStartIndex = (page - 1) * rowPage + 1;
                // setStartIndex(newStartIndex);
            })
    }




    const openDialogError = (id) => {
        setDialogError(true)
        setidUnit(id)
    }

    const openDialogEditKH = (id) => {
        setdialogEdit(true)
        setidUnit(id)
    }



    console.log(childUnit)
    console.log(childResult)
    console.log(parentResult)





    return (
        <ComponentSkeleton>
            <MainCard title="DANH MỤC ĐƠN VỊ">
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
                                <TextField
                                    placeholder='Tìm kiếm...'
                                    onChange={(e) => handleAutocompleteChange(e)}
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
                                <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'primary'} variant="contained" onClick={openDialogQuality}>
                                    <AddIcon /><Typography >Thêm</Typography>
                                </Button>
                            </Box>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table size='small'>
                                <TableHead sx={{ backgroundColor: '#0099ff' }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}>  </TableCell>
                                        <TableCell sx={{ color: 'white' }}> Tên đơn vị</TableCell>
                                        <TableCell sx={{ color: 'white' }}> SĐT đơn vị</TableCell>
                                        <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? data.map((ele, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => toggleRow(index)}
                                                    >
                                                        {openRows[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {ele.TEN_DONVI}
                                                </TableCell>
                                                <TableCell>
                                                    {ele.SDT_DONVI}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Cập nhật đơn vị">
                                                        <IconButton>
                                                            <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.DONVI_ID) }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Xóa đơn vị">
                                                        <IconButton>
                                                            <DeleteIcon color='error' onClick={() => { openDialogError(ele.DONVI_ID) }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="h5" gutterBottom component="div">
                                                                Các đơn vị trực thuộc:
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableBody>
                                                                    <TableRow
                                                                        sx={{ backgroundColor: '#f0f0f0' }}
                                                                    >
                                                                        <TableCell>Tên đơn vị</TableCell>
                                                                        <TableCell>SĐT đơn vị</TableCell>
                                                                        <TableCell>Thao tác</TableCell>
                                                                    </TableRow>
                                                                    {childUnit ? childUnit.filter(child => Number(child.DONVICHA) === Number(ele.DONVI_ID)).map((child) => (
                                                                        <TableRow key={child.DONVI_ID}>
                                                                            <TableCell component="th" scope="row">
                                                                                {child.TEN_DONVI}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {child.SDT_DONVI}
                                                                            </TableCell>
                                                                            <TableCell colSpan={2}>
                                                                                <Tooltip title="Cập nhật đơn vị">
                                                                                    <IconButton>
                                                                                        <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(child.DONVI_ID) }} />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                                <Tooltip title="Xóa đơn vị">
                                                                                    <IconButton>
                                                                                        <DeleteIcon color='error' onClick={() => { openDialogError(child.DONVI_ID) }} />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )) : 'Không có đơn vị trực thuộc'}

                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    )) : ''}


                                    {parentResult ? parentResult.map((ele, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => toggleRow(index)}
                                                    >
                                                        {openRows[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {ele.TEN_DONVI}
                                                </TableCell>
                                                <TableCell>
                                                    {ele.SDT_DONVI}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Cập nhật đơn vị">
                                                        <IconButton>
                                                            <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.DONVI_ID) }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Xóa đơn vị">
                                                        <IconButton>
                                                            <DeleteIcon color='error' onClick={() => { openDialogError(ele.DONVI_ID) }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="h5" gutterBottom component="div">
                                                                Các đơn vị trực thuộc:
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableBody>
                                                                    <TableRow
                                                                        sx={{ backgroundColor: '#f0f0f0' }}
                                                                    >
                                                                        <TableCell>Tên đơn vị</TableCell>
                                                                        <TableCell>SĐT đơn vị</TableCell>
                                                                        <TableCell>Thao tác</TableCell>
                                                                    </TableRow>
                                                                    {childResult ? childResult.filter(child => Number(child.DONVICHA) === Number(ele.DONVI_ID)).map((child) => (
                                                                        <TableRow key={child.DONVI_ID}>
                                                                            <TableCell component="th" scope="row">
                                                                                {child.TEN_DONVI}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {child.SDT_DONVI}
                                                                            </TableCell>
                                                                            <TableCell colSpan={2}>
                                                                                <Tooltip title="Cập nhật đơn vị">
                                                                                    <IconButton>
                                                                                        <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(child.DONVI_ID) }} />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                                <Tooltip title="Xóa đơn vị">
                                                                                    <IconButton>
                                                                                        <DeleteIcon color='error' onClick={() => { openDialogError(child.DONVI_ID) }} />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )) : 'Không có đơn vị trực thuộc'}

                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    )) : ''}


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
                                    <IconButton onClick={nextPage || nextPageFunc}>
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </Tooltip>
                                <Typography>{'Tổng trang: ' + maxPage}</Typography>
                            </Box>
                        </TableContainer>
                    </>}

            </MainCard>
            <AddUnit
                open={dialogQuality}
                handleClose={closeDialogSupplier}
                callApi={CallAPIProps}
                childUnit={listChild}
                callApiChild={getAllChildUnit}
                callApiListUnit={getListUnit}
            />
            <EditUnit
                open={dialogEdit}
                handleClose={closeDialogEdit}
                callApi={CallAPIProps}
                idUnit={idUnit}
                childUnit={listChild}
                callApiChild={getAllChildUnit}
                callApiListUnit={getListUnit}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DialogDeleteUnit
                open={dialogError}
                handleClose={closeDialogError}
                idUnit={idUnit}
                callApi={CallAPIProps}
                callApiChild={getAllChildUnit}
                callApiListUnit={getListUnit}
                content={"Xác nhận xóa đơn vị này?"}
            />

        </ComponentSkeleton>
    )
}
export default UnitManagement



