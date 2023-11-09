import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, FormControl, IconButton, TextField, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DialogDeleteStaff from 'pages/component/DialogDeleteStaff'
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
// project import
import Dot from 'components/@extended/Dot';
import AddStaff from 'pages/component/AddStaff'
import EditStaff from 'pages/component/EditStaff'
import jwt_decode from 'jwt-decode';


function UserManagement() {

    const { token } = useContext(TokenContext);
    token
    const [data, setData] = useState([])
    const [dialogstaff, setDialogstaff] = useState(false)
    const [dialogSuccess, setDialogSuccess] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [dialogEdit, setdialogEdit] = useState(false)
    const [idstaff, setIdstaff] = useState(0)
    const [searchInput, setSearchInput] = useState('');
    const [alloption, setAlloption] = useState([]);
    const [role, setRole] = useState(5);
    const [status, setStatus] = useState(5);
    const [searchStatus, setSearchStatus] = useState(0)
    // const [user, setUser] = useState({
    //     TEN_NV: '',
    //     SDT_NV: '',
    //     DIACHI_NV: '',
    //     EMAIL_NV: '',
    //     CHUCVU_NV: 0,
    //     TAIKHOAN_NV: '',
    //     MATKHAU_NV: '',
    //     TRANGTHAI_NV: 0
    // })

    const userString = localStorage.getItem('access_token');
    const user = jwt_decode(userString);



    const closeDialogError = () => {
        setDialogError(false)
        setIdstaff(0)
    }

    const closeDialogEdit = () => {
        setdialogEdit(false)
        setIdstaff(0)
    }



    const closeDialogSuccess = () => {
        setDialogSuccess(false);
        setIDKhachHang(0)
    }



    const closeDialogStaff = () => {
        setDialogstaff(false);
    };

    const openDialogStaff = () => {
        setDialogstaff(true)
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
        await instance.get(`get_danhsachnguoidung/${rowPage}?page=${page}`).then(res => {
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
    }, []);


    const screenWidth = window.innerWidth
    // let isOpen = false; // Khai báo biến để điều khiển việc mở hoặc đóng trình gợi ý

    const handleAutocompleteChange = (event, value) => {
        setSearchInput(value); // Cập nhật giá trị của trường TextField khi người dùng chọn một gợi ý

    };

    const handleSearch = async () => {
        setLoading(true)
        const objectSend = {
            keywords: searchInput,
            TRANGTHAI_NV: status,
            CHUCVU_NV: role
        }
        await instance.post(`search-user/${rowPage}?page=${page}`, objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dsuser.data)
                setMaxPage(res.data.dsuser.last_page)
                setAlloption(res.data.dsuser.data)
                setSearchStatus(1)
                setLoading(false)
            })
    }




    const openDialogError = (id) => {
        setDialogError(true)
        setIdstaff(id)
    }

    const openDialogEditKH = (id) => {
        setdialogEdit(true)
        setIdstaff(id)
    }

    console.log(data)
    console.log(user)







    return (
        <ComponentSkeleton>
            <MainCard title="DANH MỤC NGƯỜI DÙNG">
                <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                    <Box display={'flex'} flexWrap={'wrap'}>

                        {/* <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            open={isOpen || (searchInput && searchInput.length > 0)}
                            value={searchInput}
                            options={alloption.map((option) => option.TEN_NV)}
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
                                        isOpen = value.length > 0;
                                    }}
                                />
                            )}
                        /> */}

                        <FormControl sx={{ marginRight: 1, marginTop: 1, width: 150 }} size="small">
                            <InputLabel id="demo-select-small-label">Chức vụ</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Chức vụ"
                                name='CHUCVU_NV'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value={5}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={0}>
                                    Admin
                                </MenuItem>
                                <MenuItem value={1}>
                                    Nhân viên
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ marginRight: 1, marginTop: 1, width: 150 }} size="small">
                            <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Trạng thái"
                                name='TRANGTHAI_NV'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value={5}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={1}>
                                    Đang hoạt động
                                </MenuItem>
                                <MenuItem value={0}>
                                    Đã khóa
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={alloption.filter((option) => option.CHUCVU_NV !== 2).map((option) => option.TEN_NV)}
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

                    </Box>

                    <Box display={'flex'} marginTop={1} sx={screenWidth > 720 ? "" : { width: '100%' }} >
                        <AnimateButton>
                            <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'info'} variant="outlined" onClick={handleSearch}>
                                {loading ? <>
                                    <CircularProgress size="1rem" color="inherit" sx={{ mr: 0.5 }} /><Typography >Tìm kiếm</Typography>
                                </> : <><SearchIcon /><Typography >Tìm kiếm</Typography></>}
                            </Button>
                        </AnimateButton>
                        <Button size="small" sx={{ display: 'flex', mr: 1, width: 150 }} color={'primary'} variant="contained" onClick={openDialogStaff}>
                            <AddIcon /><Typography >Thêm</Typography>
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead sx={{ backgroundColor: '#0099ff' }} >
                            <TableRow>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Tên người dùng </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> SĐT </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Địa chỉ </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Email </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Tên tài khoản </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Chức vụ </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Trạng thái </TableCell>
                                <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Thao tác </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.filter((ele) => ele.ID_NV !== user.id_nv).map((ele, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            {ele.TEN_NV}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            {ele.SDT_NV}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            {ele.DIACHI_NV}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            {ele.EMAIL_NV}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            {ele.TAIKHOAN_NV}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            {ele.CHUCVU_NV === 0 ? 'Admin' : ''}
                                            {ele.CHUCVU_NV === 1 ? 'Nhân viên' : ''}
                                            {ele.CHUCVU_NV === 2 ? 'Super Admin' : ''}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {ele.TRANGTHAI_NV === 0 ? (
                                                    <>
                                                        <Dot color={"error"} />
                                                        <span style={{ marginLeft: 2 }}>Đã khóa</span>
                                                    </>
                                                ) : ''}

                                                {ele.TRANGTHAI_NV === 1 ? (
                                                    <>
                                                        <Dot color={"success"} />
                                                        <span style={{ marginLeft: 2 }}>Đang hoạt động</span>
                                                    </>
                                                ) : ''}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Cập nhật người dùng">
                                                <IconButton>
                                                    <DriveFileRenameOutlineIcon color='info' onClick={() => { openDialogEditKH(ele.ID_NV) }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa người dùng">
                                                <IconButton>
                                                    <DeleteIcon color='error' onClick={() => { openDialogError(ele.ID_NV) }} />
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
            <AddStaff
                open={dialogstaff}
                handleClose={closeDialogStaff}
                callApi={CallAPI}
            />
            <EditStaff
                open={dialogEdit}
                handleClose={closeDialogEdit}
                callApi={CallAPI}
                idstaff={idstaff}
            />
            <DiaLogSuccess
                open={dialogSuccess}
                handleClose={closeDialogSuccess} />
            <DialogDeleteStaff
                open={dialogError}
                handleClose={closeDialogError}
                idstaff={idstaff}
                callApi={CallAPI}
                content={"Xác nhận xóa tài khoản của người dùng này?"}
            />

        </ComponentSkeleton>
    )
}
export default UserManagement



