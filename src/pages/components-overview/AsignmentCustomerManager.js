import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import LixDialog from 'pages/component/LixDialog'
import AddCustomer from 'pages/component/AddCustomer'
import EditCustomer from 'pages/component/EditCustomer'
// import DeleteIcon from '@mui/icons-material/Delete';
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DiaLogError from 'pages/component/DiaLogError'
// import AddIcon from '@mui/icons-material/Add';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import instance from '../../axios/instance'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DetailCustomer from 'pages/component/DetailCustomer'
import SearchIcon from '@mui/icons-material/Search';
// import SaveIcon from '@mui/icons-material/Save';
// import EditNoteIcon from '@mui/icons-material/EditNote';
import { TokenContext } from '../../globalVar/TokenProvider'
// import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Autocomplete from '@mui/material/Autocomplete';
import AssignmentCustomer from 'pages/component/AssignmentCustomer'
import Checkbox from '@mui/material/Checkbox';




function AssignmentCustomerManager() {
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
    const [statusSurvey, setStatusSurvey] = useState('');
    // const [qualityService, setQualityService] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [alloption, setAlloption] = useState([]);
    const [quanhuyen, setQuanhuyen] = useState([]);
    const [xaphuong, setXaphuong] = useState([]);
    const [apKV, setApKV] = useState([]);
    const [dialogPhanCong, setDialogPhanCong] = useState(false);
    const [huyen, setHuyen] = useState('')
    const [xa, setXa] = useState('')
    const [ap, setAp] = useState('')
    const [selectedRows, setSelectedRows] = useState([]);
    const [nv, setNv] = useState([])
    const [asignment, setAsignment] = useState('')
    const callAPIServiceList = () => {
        instance.get('dichvu')
            .then(res => setDefaultService(res.data))
            .catch(err => console.log(err))
    }

    // const openDialogError = (id) => {
    //     setDialogError(true)
    //     setIDKhachHang(id)
    // }

    const closeDialogError = () => {
        setDialogError(false)
        setIDKhachHang(0)
    }

    // const openDialogDetail = (id) => {
    //     setDialogDetail(true)
    //     setIDKhachHang(id)
    // }

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

    // const openDialogCustomer = () => {
    //     setDialogCustomer(true);
    // }

    const openDialogPhanCong = () => {
        setDialogPhanCong(true)
    }

    const closeDialogPhanCong = () => {
        setDialogPhanCong(false)
    }

    const closeDialogCustomer = () => {
        setDialogCustomer(false);
    };

    // const openDialog = (id) => {
    //     setDiaLog(true);
    //     setIdKhaoSat(id);
    // }

    // const openDialogEditKH = (id) => {
    //     setdialogEdit(true)
    //     setIDKhachHang(id)
    // }

    const closeDialog = () => {
        setDiaLog(false);
        setIdKhaoSat(0);
    }

    const handleCheckboxChange = (id_kh) => {
        if (selectedRows.includes(id_kh)) {
            // Bỏ chọn: Xóa id_kh khỏi mảng
            const updatedRows = selectedRows.filter((row) => row !== id_kh);
            setSelectedRows(updatedRows);
        } else {
            // Chọn: Thêm id_kh vào mảng
            const updatedRows = [...selectedRows, id_kh];
            setSelectedRows(updatedRows);
        }
    };


    console.log(selectedRows)


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

    const getNV = () => {
        instance.get(`getNV`).then(res => {
            setNv(res.data.dsnv)
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
        getNV()
    }, [page, rowPage]);

    const onchangeHuyen = async (e) => {
        setHuyen(e.target.value)
        const response = await instance.get('getAllXaPhuong/' + e.target.value);
        if (response.status === 200) {
            setXaphuong(response.data.xaphuong)
        }
    }

    const onchangeXa = async (e) => {
        setXa(e.target.value)
        const response = await instance.get('getAllAp/' + e.target.value);
        if (response.status === 200) {
            setApKV(response.data.ap)
        }
    }


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

    let isOpen = false; // Khai báo biến để điều khiển việc mở hoặc đóng trình gợi ý

    const handleAutocompleteChange = (event, value) => {
        setSearchInput(value); // Cập nhật giá trị của trường TextField khi người dùng chọn một gợi ý
        isOpen = false; // Đóng trình gợi ý khi có giá trị được chọn
    };


    const handleSelectAll = () => {
        const allIds = data.map((ele) => ele.ID_KH);
        if (selectedRows.length === allIds.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(allIds);
        }
    };




    const handleSearch = async () => {
        // Thực hiện tìm kiếm dựa trên các giá trị
        console.log("Trạng thái khảo sát:", statusSurvey);
        // console.log("Chất lượng dịch vụ:", qualityService);
        console.log("Tìm kiếm:", searchInput);
        const objectSend = {
            MAHUYEN_KH: huyen,
            MAXA_KH: xa,
            MAAP_KH: ap,
            status_survey: statusSurvey,
            PHANCONG: asignment,
            keywords: searchInput
        }
        await instance.post('searchinasignment', objectSend)
            .then((res) => {
                console.log(res)
                setData(res.data.dskh)
            })
    }

    // const exportDataToExcel = async () => {
    //     await instance.post('export-excel', { export_data: data }, { responseType: 'blob' })
    //         .then(response => {
    //             const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });

    //             // Tạo một URL cho blob
    //             const url = window.URL.createObjectURL(blob);

    //             // Tạo một thẻ a để tải tệp Excel
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', 'Khach_hang_data.xlsx'); // Đặt tên tệp Excel
    //             document.body.appendChild(link);
    //             link.click();
    //         })
    //         .catch(error => {
    //             console.error('Lỗi khi tải tệp Excel:', error);
    //         });
    // };




    return (
        <ComponentSkeleton>
            <MainCard title="PHÂN CÔNG KHẢO SÁT">
                <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
                    <Box display={'flex'} flexWrap={'wrap'}>
                        <FormControl sx={{ width: 150, marginRight: 2, marginTop: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Quận/ huyện</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Quận/ huyện"
                                name='MAHUYEN_KH'
                                value={huyen}
                                onChange={(e) => onchangeHuyen(e)}
                            >
                                <MenuItem value={0}>
                                    Tất cả
                                </MenuItem>
                                {quanhuyen && quanhuyen.filter(x => x.parent_code !== null).map(ele => {
                                    return (
                                        <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 150, marginRight: 2, marginTop: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Xã/ Phường</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Xã/ Phường"
                                name="MAXA_KH"
                                disabled={huyen === ''}
                                value={xa}
                                onChange={(e) => onchangeXa(e)}
                            >
                                <MenuItem value={0}>
                                    Tất cả
                                </MenuItem>
                                {xaphuong && xaphuong.filter(x => x.parent_code !== null).map(ele => {
                                    return (
                                        <MenuItem key={ele.code} value={ele.code}>{ele.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 150, marginRight: 2, marginTop: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Ấp/ Khu vực</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Ấp/ Khu vực"
                                name="MAAP_KH"
                                disabled={xa === ''}
                                value={ap}
                                onChange={(e) => setAp(e.target.value)}
                            >
                                <MenuItem value={0}>
                                    Tất cả
                                </MenuItem>
                                {apKV && apKV.filter(x => x.parent_code !== null).map(ele => {
                                    return (
                                        <MenuItem key={ele.id} value={ele.id}>{ele.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>






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
                        <FormControl sx={{ width: 220, marginRight: 2, marginTop: 1 }} size="small">
                            <InputLabel id="demo-select-small-label">Trạng thái phân công</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Trạng thái khảo sát"
                                value={asignment}
                                onChange={(e) => setAsignment(e.target.value)}
                            >
                                <MenuItem value={5}>
                                    Tất cả
                                </MenuItem>
                                <MenuItem value={0}>Chưa phân công</MenuItem>
                                <MenuItem value={1}>Đã phân công</MenuItem>
                            </Select>
                        </FormControl>

                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            open={isOpen || (searchInput && searchInput.length > 0)} // Kiểm tra giá trị isOpen và searchInput để quyết định mở hoặc đóng trình gợi ý
                            options={alloption.map((option) => option.TEN_KH)}
                            value={searchInput}
                            onChange={(event, value) => {
                                handleAutocompleteChange(event, value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Tìm kiếm...'
                                    size="small"
                                    sx={{ marginRight: 2, marginTop: 0.8, width: 220 }}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onInputChange={(e, value) => {
                                        setSearchInput(value);
                                        isOpen = value.length > 0; // Mở hoặc đóng trình gợi ý dựa trên giá trị nhập vào
                                    }}
                                />
                            )}
                        />
                        <Button onClick={handleSearch} sx={{ marginRight: 2, marginTop: 1 }} size={'small'} variant={'outlined'} startIcon={<SearchIcon />}>Tìm kiếm</Button>
                    </Box>
                    <Box display={'flex'} marginTop={1} sx={screenWidth > 720 ? "" : { width: '100%' }} >
                        {/* <Button size="small" sx={{ display: 'flex', marginRight: 1 }} variant="contained" onClick={openDialogCustomer}>
                            <AddIcon />
                            <Typography >Khách hàng</Typography>
                        </Button> */}
                        <Button disabled={!selectedRows || selectedRows.length <= 0} size="small" sx={{ display: 'flex', marginRight: 1 }} variant="outlined" color={'success'} onClick={openDialogPhanCong}>
                            <AssignmentIndRoundedIcon />
                            <Typography >Phân công</Typography>
                        </Button>
                        {/* <Button size="small" sx={{ display: 'flex' }} color={'success'} variant="contained" onClick={exportDataToExcel}>
                            <SaveIcon />
                            <Typography >Xuất excel</Typography>
                        </Button> */}

                    </Box>

                </Box>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead sx={{ backgroundColor: '#0099ff' }} >
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}> <Checkbox
                                    checked={selectedRows.length === data.length}
                                    onChange={handleSelectAll}
                                    color="success"
                                /></TableCell>
                                <TableCell sx={{ color: 'white' }}> Tên khách hàng </TableCell>
                                {/* <TableCell sx={{ color: 'white' }}> Tên khách hàng </TableCell> */}
                                <TableCell sx={{ color: 'white' }}> Số điện thoại </TableCell>
                                <TableCell sx={{ color: 'white' }}> CCCD </TableCell>
                                <TableCell sx={{ color: 'white' }}> Nghề nghiệp </TableCell>
                                <TableCell sx={{ color: 'white' }}> Số nhân khẩu </TableCell>
                                <TableCell sx={{ color: 'white' }}> Quận/ Huyện </TableCell>
                                <TableCell sx={{ color: 'white' }}> Xã/ Phường </TableCell>
                                <TableCell sx={{ color: 'white' }}> Ấp/ Khu vực </TableCell>
                                <TableCell sx={{ color: 'white' }}> Địa chỉ </TableCell>
                                <TableCell sx={{ color: 'white' }}> Trạng thái khảo sát</TableCell>
                                <TableCell sx={{ color: 'white' }}> Trạng thái phân công</TableCell>
                                <TableCell sx={{ color: 'white' }}> Nhân viên phụ trách</TableCell>
                                {/* <TableCell sx={{ color: 'white' }}> Thao tác </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((ele, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedRows.includes(ele.ID_KH)} // Kiểm tra nếu id_kh đã được chọn
                                                onChange={() => handleCheckboxChange(ele.ID_KH)} // Sử dụng hàm xử lý khi checkbox thay đổi
                                                color="success" />
                                        </TableCell>
                                        <TableCell>
                                            {ele.TEN_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.SODIENTHOAI_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.CCCD_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.NGHENGHIEP_KH === '' ? '---' : ele.NGHENGHIEP_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.SONHANKHAU_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.TEN_HUYEN}
                                        </TableCell>
                                        <TableCell>
                                            {ele.TEN_XA}
                                        </TableCell>
                                        <TableCell>
                                            {ele.TEN_AP}
                                        </TableCell>
                                        <TableCell>
                                            {ele.DIACHI_KH}
                                        </TableCell>
                                        <TableCell>
                                            {ele.TRANGTHAI_KH === 0 ? <Typography color="secondary" variant="h6">
                                                Chưa khảo sát
                                            </Typography> : <Typography sx={{
                                                color: 'success.main'
                                            }} variant="h6">
                                                Đã khảo sát
                                            </Typography>}
                                        </TableCell>
                                        <TableCell>
                                            {ele.ID_NV === null ? <Typography color="secondary" variant="h6">
                                                Chưa phân công
                                            </Typography> : <Typography sx={{
                                                color: 'success.main'
                                            }} variant="h6">
                                                Đã phân công
                                            </Typography>}
                                        </TableCell>
                                        <TableCell>
                                            {ele.TEN_NV}
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
            <AssignmentCustomer
                open={dialogPhanCong}
                handleClose={closeDialogPhanCong}
                phancong={selectedRows}
                nv={nv}
                callApi={CallAPI}
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
export default AssignmentCustomerManager


