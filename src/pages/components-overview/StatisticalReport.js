import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, FormControl, IconButton, TextField, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
import LixDialog from 'pages/component/LixDialog'
import AddCustomer from 'pages/component/AddCustomer'
import EditCustomer from 'pages/component/EditCustomer'
import DiaLogSuccess from 'pages/component/DiaLogSuccess'
import DiaLogError from 'pages/component/DiaLogError'
// import AddIcon from '@mui/icons-material/Add';
import instance from '../../axios/instance'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DetailCustomer from 'pages/component/DetailCustomer'
// import SearchIcon from '@mui/icons-material/Search';
// import SaveIcon from '@mui/icons-material/Save';
import { TokenContext } from '../../globalVar/TokenProvider'
// import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import viLocale from 'date-fns/locale/vi';
import { viVN } from '@mui/x-date-pickers/locales';
import { format, isValid } from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import AnimateButton from 'components/@extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';


function StatisticalReport() {

  const today = new Date();
  const formattedToday = format(today, 'yyyy/MM/dd');

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
  const [qualityService, setQualityService] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [alloption, setAlloption] = useState([]);
  const [quanhuyen, setQuanhuyen] = useState([]);
  const [xaphuong, setXaphuong] = useState([]);
  const [apKV, setApKV] = useState([]);
  const [huyen, setHuyen] = useState('')
  const [xa, setXa] = useState('')
  const [ap, setAp] = useState('')
  const [supplier, setSupplier] = useState([]);
  const [service, setService] = useState([]);
  const [fromDate, setFromDate] = useState(formattedToday);
  const [toDate, setToDate] = useState(formattedToday);

  const callAPIServiceList = () => {
    instance.get('dichvu')
      .then(res => setDefaultService(res.data))
      .catch(err => console.log(err))
  }

  // const openDialogError = (id) => {
  //   setDialogError(true)
  //   setIDKhachHang(id)
  // }

  const closeDialogError = () => {
    setDialogError(false)
    setIDKhachHang(0)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isValid(date)) {
      return format(date, 'dd/MM/yyyy');
    } else {
      return "Ngày không hợp lệ";
    }
  };

  // const openDialogDetail = (id) => {
  //   setDialogDetail(true)
  //   setIDKhachHang(id)
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
  //   setDialogCustomer(true);
  // }

  const closeDialogCustomer = () => {
    setDialogCustomer(false);
  };

  // const openDialog = (id) => {
  //   setDiaLog(true);
  //   setIdKhaoSat(id);
  // }

  // const openDialogEditKH = (id) => {
  //   setdialogEdit(true)
  //   setIDKhachHang(id)
  // }

  const closeDialog = () => {
    setDiaLog(false);
    setIdKhaoSat(0);
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

  const CallAPI = () => {
    instance.get(`get_danhsachbaocaophieu/${rowPage}?page=${page}`).then(res => {
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
    setStatusSurvey('')
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

  const onchangeFromDate = (date) => {
    setFromDate(format(date, 'yyyy-MM-dd'))
  }


  const onchangeToDate = (date) => {
    setToDate(format(date, 'yyyy-MM-dd'))
  }




  const handleSearch = async () => {

    const objectSend = {
      quality_survey: qualityService,
      keywords: searchInput,
      MAHUYEN_KH: huyen,
      MAXA_KH: xa,
      MAAP_KH: ap,
      NHACUNGCAP: supplier,
      DICHVU: service,
      TUNGAY: fromDate,
      DENNGAY: toDate
    }
    await instance.post('filter-report', objectSend)
      .then((res) => {
        console.log(res)
        setData(res.data.dstk)
      })
  }

  const exportDataToExcel = async () => {
    setLoading(true)
    await instance.post('export-excel', { export_data: data }, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });

        // Tạo một URL cho blob
        const url = window.URL.createObjectURL(blob);

        // Tạo một thẻ a để tải tệp Excel
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Khach_hang_data.xlsx'); // Đặt tên tệp Excel
        document.body.appendChild(link);
        link.click();
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.error('Lỗi khi tải tệp Excel:', error);
      });
  };

  // const viTexts = {
  //   today: 'Hôm nay',
  //   date: 'Ngày',
  //   month: 'Tháng',
  //   year: 'Năm',
  //   monthAndYear: 'Tháng và Năm',
  //   noOptions: 'Không có lựa chọn',
  // };





  return (
    <ComponentSkeleton>
      <MainCard title="THỐNG KÊ & BÁO CÁO">
        <Box display={'flex'} sx={{ alignItems: 'center', marginBottom: 1, flexWrap: "wrap" }} justifyContent={'space-between'}>
          {/* <Box display={'flex'} marginTop={1} sx={screenWidth > 720 ? "" : { width: '100%' }} >
            <Button size="small" sx={{ display: 'flex', mr: 1 }} color={'primary'} variant="contained" onClick={handleSearch}>
                            <SearchIcon />
                            <Typography >Lọc</Typography>
                        </Button>
            <Button size="small" sx={{ display: 'flex' }} color={'success'} variant="contained" onClick={exportDataToExcel}>
                            <SaveIcon />
                            <Typography >Xuất excel</Typography>
                        </Button>

          </Box> */}
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
                sx={{ marginRight: 1, marginTop: 0.8, width: 160 }}
                onChange={(e) => setSearchInput(e.target.value)}
                onInputChange={(e, value) => {
                  setSearchInput(value);
                  isOpen = value.length > 0; // Mở hoặc đóng trình gợi ý dựa trên giá trị nhập vào
                }}
              />
            )}
          />
          <Box display={'flex'} flexWrap={'wrap'}>
            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
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

            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
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

            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
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





            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
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
            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
              <InputLabel id="demo-select-small-label">Nhà cung cấp</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Chất lượng dịch vụ"
                name="NHACUNGCAP_CTPKS"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <MenuItem value={0}>
                  Tất cả
                </MenuItem>
                {provider && provider.filter(x => x.TEN_NHACUNGCAP !== null).map(ele => {
                  return (
                    <MenuItem key={ele.ID_NHACUNGCAP} value={ele.ID_NHACUNGCAP}>{ele.TEN_NHACUNGCAP}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
              <InputLabel id="demo-select-small-label">Dịch vụ</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Dịch vụ"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <MenuItem value={0}>
                  Tất cả
                </MenuItem>
                {defaultService && defaultService.filter(x => x.TEN_DV !== null).map(ele => {
                  return (
                    <MenuItem key={ele.ID_DV} value={ele.ID_DV}>{ele.TEN_DV}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ width: 160, marginRight: 1, marginTop: 1 }} size="small">
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                <DatePicker
                  inputProps={{ size: 'small' }}
                  label='Từ ngày'
                  value={fromDate && new Date(fromDate)}
                  onChange={(date) => onchangeFromDate(date)}
                  slotProps={{ textField: { size: 'small' } }}
                  format="dd/MM/yyyy" />
              </LocalizationProvider>
            </FormControl>

            <FormControl sx={{ width: 160, marginRight: 0, marginTop: 1 }} size="small">
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                <DatePicker
                  inputProps={{ size: 'small' }}
                  label='Đến ngày'
                  value={toDate && new Date(toDate)}
                  onChange={(date) => onchangeToDate(date)}
                  slotProps={{ textField: { size: 'small' } }}
                  format="dd/MM/yyyy" />
              </LocalizationProvider>
            </FormControl>




          </Box>

          <Box display={'flex'} marginTop={1} sx={screenWidth > 720 ? "" : { width: '100%' }} >
            {/* <Button size="small" sx={{ display: 'flex', marginRight: 1 }} variant="contained" onClick={openDialogCustomer}>
              <AddIcon />
              <Typography >Khách hàng</Typography>
            </Button> */}
            <Button size="small" sx={{ display: 'flex', mr: 1 }} color={'primary'} variant="contained" onClick={handleSearch}>
              <Typography >Lọc</Typography>
            </Button>
            <AnimateButton>
              <Button size="small" sx={{ display: 'flex' }} color={'success'} variant="contained" onClick={exportDataToExcel}>
                {loading ? <>
                  <CircularProgress size="1rem" color="inherit" sx={{mr: 0.5}} /><Typography >Xuất excel</Typography>
                </> : <Typography >Xuất excel</Typography>}
              </Button>
            </AnimateButton>


          </Box>


        </Box>
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead sx={{ backgroundColor: '#0099ff' }} >
              <TableRow>
                <TableCell sx={{ color: 'white' }}> Tỉnh </TableCell>
                <TableCell sx={{ color: 'white' }}> Quận/ Huyện </TableCell>
                <TableCell sx={{ color: 'white' }}> Xã/ Phường </TableCell>
                <TableCell sx={{ color: 'white' }}> Ấp/ Khu vực </TableCell>
                <TableCell sx={{ color: 'white' }}> Tên khách hàng </TableCell>
                <TableCell sx={{ color: 'white' }}> Địa chỉ </TableCell>
                <TableCell sx={{ color: 'white' }}> Số điện thoại </TableCell>
                <TableCell sx={{ color: 'white' }}> Số nhân khẩu </TableCell>
                <TableCell sx={{ color: 'white' }}> CCCD </TableCell>
                <TableCell sx={{ color: 'white' }}> Người đứng tên hợp đồng </TableCell>
                <TableCell sx={{ color: 'white' }}> SĐT người đứng tên HĐ </TableCell>
                <TableCell sx={{ color: 'white' }}> Account </TableCell>
                <TableCell sx={{ color: 'white' }}> Nhà cung cấp </TableCell>
                <TableCell sx={{ color: 'white' }}> Dịch vụ </TableCell>
                <TableCell sx={{ color: 'white' }}> Mức cước </TableCell>
                <TableCell sx={{ color: 'white' }}> Hình thức cước BRCĐ </TableCell>
                <TableCell sx={{ color: 'white' }}> Tháng bắt đầu đặt cọc </TableCell>
                <TableCell sx={{ color: 'white' }}> Tháng kết thúc đặt cọc </TableCell>
                {/* <TableCell sx={{ color: 'white' }}> Thời gian lắp đặt </TableCell>
                <TableCell sx={{ color: 'white' }}> Thời gian ngưng </TableCell> */}
                <TableCell sx={{ color: 'white' }}> Nhân viên thu cước </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((ele, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      Hậu Giang
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
                      {ele.TEN_KH}
                    </TableCell>
                    <TableCell>
                      {ele.DIACHI_KH}
                    </TableCell>
                    <TableCell>
                      {ele.SODIENTHOAI_KH}
                    </TableCell>
                    <TableCell>
                      {ele.SONHANKHAU_KH}
                    </TableCell>
                    <TableCell>
                      {ele.CCCD_KH}
                    </TableCell>
                    <TableCell>
                      {ele.TENKHACHHANGDAIDIEN_CTPKS}
                    </TableCell>
                    <TableCell>
                      {ele.SODIENTHOAIKHACHHANGDAIDIEN_CTPKS}
                    </TableCell>
                    <TableCell>
                      {ele.ACCOUNTKHACHHANG_CTPKS}
                    </TableCell>
                    <TableCell>
                      {ele.NHACUNGCAP_CTPKS == 1 ? 'Viettel' : ''}
                      {ele.NHACUNGCAP_CTPKS == 2 ? 'VinaPhone' : ''}
                      {ele.NHACUNGCAP_CTPKS == 3 ? 'FPT' : ''}
                    </TableCell>
                    <TableCell>
                      {ele.TEN_DV}
                    </TableCell>
                    <TableCell>
                      {ele.MUCCUOC_CTPKS.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </TableCell>

                    <TableCell>
                      {ele.HINHTHUCDONG_CTPKS}
                    </TableCell>
                    <TableCell>
                      {formatDate(ele.NGAYBATDAUDONGCOC_CTPKS)}
                    </TableCell>
                    <TableCell>
                      {formatDate(ele.NGAYKETTHUCDONGCOC_CTPKS)}
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
export default StatisticalReport


