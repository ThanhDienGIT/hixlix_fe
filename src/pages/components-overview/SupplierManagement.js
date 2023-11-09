import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, FormControl, IconButton, TextField, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DialogDeleteSupplier from 'pages/component/DialogDeleteSupplier'
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
import AddSupplier from 'pages/component/AddSupplier'
import EditSupplier from 'pages/component/EditSupplier'


function SupplierManagement() {

    const { token } = useContext(TokenContext);
    token
    const [data, setData] = useState([])
    const [dialogSupplier, setDialogSupplier] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogEdit, setdialogEdit] = useState(false)
    const [idsupplier, setIdsupplier] = useState(0)
    const [searchInput, setSearchInput] = useState('');
    const [alloption, setAlloption] = useState([]);
    const [searchStatus, setSearchStatus] = useState(0)

    

    const closeDialogError = () => {
        setDialogError(false)
        setIdsupplier(0)
    }

    const closeDialogEdit = () => {
        setdialogEdit(false)
        setIdsupplier(0)
    }



    const closeDialogSuccess = () => {
        setDialogSuccess(false);
        setIDKhachHang(0)
    }



    const closeDialogSupplier = () => {
        setDialogSupplier(false);
    };

    const openDialogSupplier = () => {
        setDialogSupplier(true)
    }





    const [maxPage, setMaxPage] = useState(0);
    const listPage = [5, 10, 15, 25, 50];
    const [rowPage, setRowPage] = useState(5);
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
        await instance.get(`get_danhsachnhacungcap/${rowPage}?page=${page}`).then(res => {
            setMaxPage(res.data.last_page)
            setData(res.data.data)
            setAlloption(res.data.data)
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
        await instance.post(`search-suppliler/${rowPage}?page=${page}`, objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dsspl.data)
                setMaxPage(res.data.dsspl.last_page)
                setAlloption(res.data.dsspl.data)
                setSearchStatus(1)
                setLoading(false)
            })
    }




    const openDialogError = (id) => {
        setDialogError(true)
        setIdsupplier(id)
    }

    const openDialogEditKH = (id) => {
        setdialogEdit(true)
        setIdsupplier(id)
    }









    return (
        <ComponentSkeleton>
            <MainCard title="DANH MỤC NHÀ CUNG CẤP">
                <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                    <Box display="flex" alignItems="center">
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
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
                                </> : <><SearchIcon/><Typography >Tìm kiếm</Typography></>}
                            </Button>
                        </AnimateButton>
                        <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'primary'} variant="contained" onClick={openDialogSupplier}>
                            <AddIcon/><Typography >Thêm</Typography>
                        </Button>



                    </Box>


                </Box>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead sx={{ backgroundColor: '#0099ff' }} >
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}> Tên nhà cung cấp </TableCell>
                                <TableCell sx={{ color: 'white' }}> Ghi chú </TableCell>
                                <TableCell sx={{ color: 'white' }}> Thao tác </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((ele, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {ele.TEN_NCC}
                                        </TableCell>
                                        <TableCell>
                                            {ele.GHICHU_NCC}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Cập nhật nhà cung cấp">
                                                <IconButton>
                                                    <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.ID_NCC) }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa nhà cung cấp">
                                                <IconButton>
                                                    <DeleteIcon color='error' onClick={() => { openDialogError(ele.ID_NCC) }} />
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
            </MainCard>
            <AddSupplier
                open={dialogSupplier}
                handleClose={closeDialogSupplier}
                callApi={CallAPI}
            />
            <EditSupplier
                open={dialogEdit}
                handleClose={closeDialogEdit}
                callApi={CallAPI}
                idsupplier={idsupplier}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DialogDeleteSupplier
                open={dialogError}
                handleClose={closeDialogError}
                idsupplier={idsupplier}
                callApi={CallAPI}
                content={"Xác nhận xóa danh mục nhà cung cấp này?"}
            />

        </ComponentSkeleton>
    )
}
export default SupplierManagement



