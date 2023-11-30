import React, { useContext, useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Stack, Box, Button, FormControl, IconButton, TextField, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index'
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
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import { TokenContext } from '../../globalVar/TokenProvider'
// import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import viLocale from 'date-fns/locale/vi';
import { viVN } from '@mui/x-date-pickers/locales';
import { format, isValid } from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
// import AnimateButton from 'components/@extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
// import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';


function StatisticalBO() {

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
//  const [statusSurvey, setStatusSurvey] = useState('');
//  const [serveSurvey, setServeSurvey] = useState(5);
  const [qualityService, setQualityService] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [alloption, setAlloption] = useState([]);
  const [quanhuyen, setQuanhuyen] = useState([]);
//   const [xaphuong, setXaphuong] = useState([]);
//   const [apKV, setApKV] = useState([]);
//  const [huyen, setHuyen] = useState(0)
//   const [xa, setXa] = useState(0)
//   const [ap, setAp] = useState(0)
//   const [supplier, setSupplier] = useState(0);
//   const [service, setService] = useState(0);
  const [fromDate, setFromDate] = useState(formattedToday);
  const [toDate, setToDate] = useState(formattedToday);
  const [disabled, setDisabled] = useState(false);
  const [searchStatus, setSearchStatus] = useState(0)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [display, setDisplay] = useState(0)
  const [loadingInitial, setLoadingInitial] = useState(false)
  const [startIndex, setStartIndex] = useState(1);

  const callAPIServiceList = () => {
    instance.get('dichvu')
      .then(res => setDefaultService(res.data))
      .catch(err => console.log(err))
  }



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



  const closeDialogDetail = () => {
    setDialogDetail(false)
    setIDKhachHang(0)
  }



  const closeDialogEdit = () => {
    setdialogEdit(false)
    setIDKhachHang(0)
  }

  const closeDialogSuccess = () => {
    setDialogSuccess(false);
    setIDKhachHang(0)
  }



  const closeDialogCustomer = () => {
    setDialogCustomer(false);
  };



  const closeDialog = () => {
    setDiaLog(false);
    setIdKhaoSat(0);
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
  const CallAPIPage = () => {
    instance.get(`get_danhsachbaocaophieu/${rowPage}?page=${page}`).then(res => {
      setMaxPage(res.data.last_page)
      setData(res.data.data)
      setAlloption(res.data.data)
      const newStartIndex = (page - 1) * rowPage + 1;
      setStartIndex(newStartIndex);
    }).catch(err => console.log(err))
  }

  const CallAPI = () => {
    setLoadingInitial(true)
    instance.get(`get_danhsachbaocaophieu/${rowPage}?page=${page}`).then(res => {
      setMaxPage(res.data.last_page)
      setData(res.data.data)
      setAlloption(res.data.data)
      setLoadingInitial(false)
      const newStartIndex = (page - 1) * rowPage + 1;
      setStartIndex(newStartIndex);
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
    if (searchStatus === 0) {
      CallAPIPage()
    } else {
      handleSearch()
    }
  }, [page, rowPage]);

//   const onchangeHuyen = async (e) => {
//     setHuyen(e.target.value)
//     const response = await instance.get('getAllXaPhuong/' + e.target.value);
//     if (response.status === 200) {
//       setXaphuong(response.data.xaphuong)
//       setXa(0)
//       setAp(0)
//     }
//   }

//   const onchangeXa = async (e) => {
//     setXa(e.target.value)
//     const response = await instance.get('getAllAp/' + e.target.value);
//     if (response.status === 200) {
//       setApKV(response.data.ap)
//       setAp(0)
//     }
//   }

  const getDSNhaCungCap = async () => {
    const response = await instance.get('get_danhsachnhacungcapapi');

    if (response.status === 200) {
      setProvider(response.data)
    }
  }



  useEffect(() => {
    CallAPI()
    getAllQuanHuyen()
    callAPIServiceList()
    getDSNhaCungCap()
    // setProvider([
    //   {
    //     ID_NHACUNGCAP: 1,
    //     TEN_NHACUNGCAP: "Viettel",
    //   },
    //   {
    //     ID_NHACUNGCAP: 2,
    //     TEN_NHACUNGCAP: "VNPT",
    //   },
    //   {
    //     ID_NHACUNGCAP: 3,
    //     TEN_NHACUNGCAP: "FPT",
    //   },
    // ])
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

  const handleAutocompleteChange = (event, value) => {
    setSearchInput(value); // Cập nhật giá trị của trường TextField khi người dùng chọn một gợi ý
  };

  const onchangeFromDate = (date) => {
    setFromDate(format(date, 'yyyy-MM-dd'))
  }


  const onchangeToDate = (date) => {
    setToDate(format(date, 'yyyy-MM-dd'))
  }

  const handleSearch = async () => {
     setLoadingSearch(true)
    // const objectSend = {
    //   quality_survey: qualityService,
    //   CHATLUONG_PV: serveSurvey,
    //   keywords: searchInput,
    //   MAHUYEN_KH: huyen,
    //   MAXA_KH: xa,
    //   MAAP_KH: ap,
    //   NHACUNGCAP: supplier,
    //   DICHVU: service,
    //   TUNGAY: fromDate,
    //   DENNGAY: toDate
    // }
    // await instance.post(`filter-report/${rowPage}?page=${page}`, objectSend)
    //   .then((res) => {
    //     console.log(res)
    //     setData(res.data.dstk.data)
    //     setMaxPage(res.data.dstk.last_page)
    //     setAlloption(res.data.dstk.data)
    //     setSearchStatus(1)
         setSearchStatus()
         setLoadingSearch(false)
    //     const newStartIndex = (page - 1) * rowPage + 1;
    //     setStartIndex(newStartIndex);
    //   })
  }

  const exportDataToExcel = async () => {
    setLoading(true)
    setDisabled(true)
    await instance.post('export-excel', { export_data: data }, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });

        // Tạo một URL cho blob
        const url = window.URL.createObjectURL(blob);

        // Tạo một thẻ a để tải tệp Excel
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'danh_sach_phieu_khao_sat.xlsx'); // Đặt tên tệp Excel
        document.body.appendChild(link);
        link.click();
        setLoading(false)
        setDisabled(false)
      })
      .catch(error => {
        setLoading(false)
        setDisabled(false)
        console.error('Lỗi khi tải tệp Excel:', error);
      });
  };

  const onChangeSelectOption = (e) => {
    setDisplay(Number(e.target.value))
  }

  // const resetFillterCondition = () => {
  //   setQualityService(5)
  //   setServeSurvey(5)
  //   setSearchInput('')
  //   setHuyen(0)
  //   setXa(0)
  //   setAp(0)
  //   setSupplier(0)
  //   setService(0)
  //   setFromDate(formattedToday)
  //   setToDate(formattedToday)
  //   CallAPI()
  // }

  useEffect(() => {
    if (display === 0) {
      CallAPI()
    }
    else {
      handleSearch()
    }
  }, [display])


  return (
    <ComponentSkeleton>
      <MainCard title="THỐNG KÊ & BÁO CÁO (BO)">
        {loadingInitial ?
          <Stack alignItems="center">
            <CircularProgress
              thickness={6}
              loading={loadingInitial} />
            <Typography sx={{ mt: 1 }}>Đang nạp dữ liệu...</Typography>
          </Stack>
          :
          <>
            <Box display={'flex'} sx={{ alignItems: 'flex-start', marginBottom: 1, flexWrap: "wrap",flexDirection:'column' }} >

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Tùy chọn</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => onChangeSelectOption(e)}
                >
                  <FormControlLabel checked={display === 0} value={0} control={<Radio />} label="Tất cả" />
                  <FormControlLabel checked={display === 1} value={1} control={<Radio />} label="Bộ lọc" />
                </RadioGroup>
              </FormControl>

              <Divider />
              <Box display={'flex'} flexWrap={'wrap'}>

                {/* <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Quận/ huyện</InputLabel>
                  <Select
                    disabled={display === 0}
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

                <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Xã/ Phường</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Xã/ Phường"
                    name="MAXA_KH"
                    disabled={huyen === 0 || display === 0}
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

                <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Ấp/ Khu vực</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Ấp/ Khu vực"
                    name="MAAP_KH"
                    disabled={xa === 0 || display === 0}
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
                </FormControl> */}





                <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Chất lượng dịch vụ</InputLabel>
                  <Select
                    disabled={display === 0}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Chất lượng dịch vụ"
                    value={qualityService}
                    onChange={(e) => setQualityService(e.target.value)}
                  >
                    <MenuItem value={5}>
                      Tất cả
                    </MenuItem>
                    <MenuItem value={0}>Chất lượng tốt</MenuItem>
                    <MenuItem value={1}>Chất lượng kém</MenuItem>
                  </Select>
                </FormControl>

                {/* <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Chất lượng phục vụ</InputLabel>
                  <Select
                    disabled={display === 0}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Chất lượng phục vụ"
                    value={serveSurvey}
                    onChange={(e) => setServeSurvey(e.target.value)}
                  >
                    <MenuItem value={5}>
                      Tất cả
                    </MenuItem>
                    <MenuItem value={0}>Chất lượng tốt</MenuItem>
                    <MenuItem value={1}>Chất lượng kém</MenuItem>
                  </Select>
                </FormControl> */}


                {/* <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Nhà cung cấp</InputLabel>
                  <Select
                    disabled={display === 0}
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
                    {provider && provider.filter(x => x.TEN_NCC !== null).map(ele => {
                      return (
                        <MenuItem key={ele.ID_NCC} value={ele.ID_NCC}>{ele.TEN_NCC}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl> */}

                {/* <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <InputLabel id="demo-select-small-label">Dịch vụ</InputLabel>
                  <Select
                    disabled={display === 0}
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
                </FormControl> */}

                <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                    localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <DatePicker
                      disabled={display === 0}
                      inputProps={{ size: 'small' }}
                      label='Từ ngày'
                      value={fromDate && new Date(fromDate)}
                      onChange={(date) => onchangeFromDate(date)}
                      slotProps={{ textField: { size: 'small' } }}
                      format="dd/MM/yyyy" />
                  </LocalizationProvider>
                </FormControl>

                <FormControl sx={{ width: 150, marginRight: 1, marginTop: 2 }} size="small">
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}
                    localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <DatePicker
                      disabled={display === 0}
                      inputProps={{ size: 'small' }}
                      label='Đến ngày'
                      value={toDate && new Date(toDate)}
                      onChange={(date) => onchangeToDate(date)}
                      slotProps={{ textField: { size: 'small' } }}
                      format="dd/MM/yyyy" />
                  </LocalizationProvider>
                </FormControl>

                <Autocomplete
                  disabled={display === 0}
                  freeSolo
                  value={searchInput}
                  id="free-solo-2-demo"
                  disableClearable
                  options={alloption.filter((option, index, self) =>
                    index === self.findIndex((t) => (
                      t.ID_KH === option.ID_KH
                    ))
                  ).map((option) => option.TEN_KH)}
                  onChange={(event, value) => {
                    handleAutocompleteChange(event, value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Tìm kiếm...'
                      size="small"
                      sx={{ marginRight: 1, marginTop: 1.8, width: 150 }}
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

                <Box display={'flex'} marginTop={2} flexWrap='wrap' sx={screenWidth > 720 ? "" : { width: '100%' }} >
                  <Button disabled={display === 0} sx={{ display: 'flex', mr: 1, width: 150 }} color={'primary'} variant="contained" onClick={handleSearch}>
                    {loadingSearch ? <>
                      <CircularProgress size="1rem" color="inherit" sx={{ mr: 0.5 }} /><Typography >Tìm kiếm</Typography>
                    </> : <><SearchIcon /><Typography >Tìm kiếm</Typography></>}
                  </Button>


                  <Button disabled={disabled} sx={{ display: 'flex', width: 150 }} color={'success'} variant="outlined" onClick={exportDataToExcel}>
                    {loading ? <>
                      <CircularProgress size="1rem" color="inherit" sx={{ mr: 0.5 }} /><Typography >Xuất excel</Typography>
                    </> : <><SaveIcon /><Typography >Xuất excel</Typography></>}
                  </Button>

                  {/* <Button disabled={display === 0} sx={screenWidth > 720 ? { display: 'flex', width: 150, ml: 1 } : { display: 'flex', width: 150, mt: 1 }}
      color={'warning'} variant="outlined" onClick={resetFillterCondition}>
      {loading ? <>
        <CircularProgress size="1rem" color="inherit" sx={{ mr: 0.5 }} /><Typography >Reset</Typography>
      </> : <><RestartAltRoundedIcon /><Typography >Reset</Typography></>}
    </Button> */}

                </Box>
              </Box>
            
            </Box>
            <TableContainer component={Paper}>
              <Table size='small'>
                <TableHead sx={{ backgroundColor: '#0099ff' }} >
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>STT </TableCell>
                    {/* <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Tỉnh </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Quận/ Huyện </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Xã/ Phường </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Ấp/ Khu vực </TableCell> */}
                    <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Tên khách hàng </TableCell>
                    {/* <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Địa chỉ </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Số điện thoại </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Số nhân khẩu </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> CCCD </TableCell> */}
                    <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Người đứng tên hợp đồng </TableCell>
                    <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Địa chỉ </TableCell>
                    {/* <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> SĐT người đứng tên HĐ </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Account </TableCell> */}
                    <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Nhà cung cấp </TableCell>
                    <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Dịch vụ </TableCell>

                    {/* <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Mức cước </TableCell>
      <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Hình thức cước BRCĐ </TableCell> */}
                    <TableCell sx={{ color: 'white' }}> Tháng bắt đầu đặt cọc </TableCell>
                    <TableCell sx={{ color: 'white' }}> Tháng kết thúc đặt cọc </TableCell>
                    {/* <TableCell sx={{ color: 'white' }}> Thời gian lắp đặt </TableCell>
      <TableCell sx={{ color: 'white' }}> Thời gian ngưng </TableCell> */}
                    <TableCell sx={{ color: 'white' }}> Chất lượng dịch vụ </TableCell>
                    <TableCell sx={{ color: 'white' }}> Chất lượng phục vụ </TableCell>
                    <TableCell sx={{ color: 'white' }}> Ngày khảo sát </TableCell>
                    {/* <TableCell sx={{ color: 'white' }}> Thời gian lắp đặt </TableCell>
      <TableCell sx={{ color: 'white' }}> Thời gian ngưng </TableCell> */}
                    <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}> Nhân viên khảo sát </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((ele, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {startIndex + index}
                        </TableCell>
                        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
            Hậu Giang
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.TEN_HUYEN}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.TEN_XA}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.TEN_AP}
          </TableCell> */}
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {ele.TEN_KH}
                        </TableCell>
                        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.DIACHI_KH}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.SODIENTHOAI_KH}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.SONHANKHAU_KH}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.CCCD_KH}
          </TableCell> */}
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {ele.TENKHACHHANGDAIDIEN_CTPKS}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {ele.DIACHI_KH}
                        </TableCell>
                        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.SODIENTHOAIKHACHHANGDAIDIEN_CTPKS}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.ACCOUNTKHACHHANG_CTPKS}
          </TableCell> */}
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {ele.TEN_NCC}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {ele.TEN_DV}
                        </TableCell>


                        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.MUCCUOC_CTPKS.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </TableCell> */}

                        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
            {ele.HINHTHUCDONG_CTPKS}
          </TableCell> */}
                        <TableCell>
                          {formatDate(ele.NGAYBATDAUDONGCOC_CTPKS)}
                        </TableCell>
                        <TableCell>
                          {formatDate(ele.NGAYKETTHUCDONGCOC_CTPKS)}
                        </TableCell>
                        {/* <TableCell>
            {formatDate(ele.THOIGIANLAPDAT_CTPKS)}
          </TableCell>
          <TableCell>
            {formatDate(ele.THOIGIANNGUNG_CTPKS)}
          </TableCell> */}
                        <TableCell align='center'>
                          {ele.CAMNHANDICHVU_CTPKS}
                        </TableCell>
                        <TableCell align='center'>
                          {ele.CANNHANPHUCVU_CTPKS}
                        </TableCell>
                        <TableCell>
                          {formatDate(ele.NGAYTAO_CTPKS)}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
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
          </>}

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
export default StatisticalBO



