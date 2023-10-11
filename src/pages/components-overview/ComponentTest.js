// import React, { useEffect, useState } from 'react'
// import ComponentSkeleton from './ComponentSkeleton'
// import MainCard from 'components/MainCard'
// import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '../../../node_modules/@mui/material/index'
// import LixDialog from 'pages/component/LixDialog'
// import AddCustomer from 'pages/component/AddCustomer'
// function ComponentTest() {

//     const [data, setData] = useState([])
//     const [dialog, setDiaLog] = useState(false)
//     const [idKhaoSat, setIdKhaoSat] = useState(0)
//     const [dialogCustomer, setDialogCustomer] = useState(false)

//     const openDialogCustomer = () => {
//         setDialogCustomer(true)
//     }

//     const closeDialogCustomer = () => {
//         setDialogCustomer(false)
//     }

//     const openDialog = (id) => {
//         setDiaLog(true)
//         setIdKhaoSat(id)
//     }

//     const closeDialog = () => {
//         setDiaLog(false)
//         setIdKhaoSat(0)
//     }

//     useEffect(() => {
//         setData([{
//             stt: 1,
//             tenchuho: 'Nguyễn Văn A',
//             diachi: ' phường 7 TP Vị Thanh Hậu giang',
//             sonhankhau: 1,
//             nguoihopdong: 'Nguyễn Văn A',
//             trangthai: 'Đã khảo sát'
//         },
//         {
//             stt: 2,
//             tenchuho: 'Nguyễn Văn B',
//             diachi: ' phường 5 TP Vị Thanh Hậu giang',
//             sonhankhau: 1,
//             nguoihopdong: 'Nguyễn Văn B',
//             trangthai: 'Chưa khảo sát'
//         },
//         {
//             stt: 3,
//             tenchuho: 'Nguyễn Thị C',
//             diachi: ' phường 4 TP Vị Thanh Hậu giang',
//             sonhankhau: 1,
//             nguoihopdong: 'Nguyễn Văn C',
//             trangthai: 'Đang khắc phục'
//         },])
//     }, [])

//     return (
//         <ComponentSkeleton>
//             <MainCard title="DANH SÁCH KHÁCH HÀNG">
//                 <Box display={'flex'} sx={{alignItems:'center',marginBottom:1}} justifyContent={'space-between'}>
//                 <TextField label='Tìm kiếm...'/>
//                 <Button sx={{  marginLeft: 1 }} variant="outlined"  onClick={openDialogCustomer}>Thêm khách hàng</Button>
//                 </Box>
               
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead sx={{backgroundColor:'#0099ff'}}>
//                             <TableRow>
//                                 <TableCell sx={{color:'white'}}> STT </TableCell>
//                                 <TableCell sx={{color:'white'}}> Tên chủ hộ </TableCell>
//                                 <TableCell sx={{color:'white'}}> Địa chỉ </TableCell>
                    
                                
//                                 <TableCell sx={{color:'white'}}> Trạng thái </TableCell>
//                                 <TableCell sx={{color:'white'}}> Thao tác </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {data.length > 0 ? data.map(ele => {
//                                 return (
//                                     <TableRow key={ele.stt}>
//                                         <TableCell>
//                                             {ele.stt}
//                                         </TableCell>
//                                         <TableCell>
//                                             {ele.tenchuho}
//                                         </TableCell>
//                                         <TableCell>
//                                             {ele.diachi}
//                                         </TableCell>
                            
                            
//                                         <TableCell>
//                                             {ele.trangthai}
//                                         </TableCell>
//                                         <TableCell>
//                                             {ele.trangthai === 'Chưa khảo sát' ? <>
//                                              <Button sx={{width:20,margin:1}} variant='contained' color='warning' onClick={() => { openDialog(ele.stt) }}>Sửa</Button> 
//                                              <Button sx={{width:20,margin:1}} variant='contained' color='error' onClick={() => { openDialog(ele.stt) }}>Xoá</Button> 
//                                              <Button sx={{width:20,margin:1}} variant='contained' color='success' onClick={() => { openDialog(ele.stt) }}>Lix</Button> 
//                                              </>
//                                              : ""}
//                                         </TableCell>
//                                     </TableRow>
//                                 )
//                             }) : ""}

//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <LixDialog
//                     open={dialog}
//                     handleClose={closeDialog}
//                     id={idKhaoSat}
//                 />
//                 <AddCustomer
//                     open={dialogCustomer}
//                     handleClose={closeDialogCustomer}
//                 />
//             </MainCard>
//         </ComponentSkeleton>
//     )
// }

// export default ComponentTest



import React, { useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '../../../node_modules/@mui/material/index'
import LixDialog from 'pages/component/LixDialog'
import AddCustomer from 'pages/component/AddCustomer'

function ComponentTest() {

    const [data, setData] = useState([])
    const [dialog, setDiaLog] = useState(false)
    const [idKhaoSat, setIdKhaoSat] = useState(0)
    const [dialogCustomer, setDialogCustomer] = useState(false)

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

    useEffect(() => {
        setData([{
            stt: 1,
            tenchuho: 'LIX001',
            diachi: ' 10/10/2023',
            sonhankhau: 1,
            nguoihopdong: 'Nguyễn Văn A',
            trangthai: 'Nguyễn Văn A'
        },
        {
            stt: 2,
            tenchuho: 'LIX001',
            diachi: ' 09/10/2023',
            sonhankhau: 1,
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Nguyễn Văn A'
        },
        ])
    }, [])

    return (
        <ComponentSkeleton>
            <MainCard title="DANH SÁCH PHIẾU KHẢO SÁT">
                KH: NGUYỄN VĂN B
                <Box display={'flex'} sx={{alignItems:'center',marginBottom:1}} justifyContent={'space-between'}>
                <TextField label='Tìm kiếm...'/>
                <Button sx={{  marginLeft: 1 }} variant="contained"  onClick={openDialogCustomer}>Thêm</Button>
                </Box>
               
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{backgroundColor:'#0099ff'}}>
                            <TableRow>
                                <TableCell sx={{color:'white'}}> STT </TableCell>
                                <TableCell sx={{color:'white'}}> Mã phiếu khảo sát </TableCell>
                                <TableCell sx={{color:'white'}}> Ngày thu thập </TableCell>
                    
                                
                                <TableCell sx={{color:'white'}}> Người thu thập </TableCell>
                                <TableCell sx={{color:'white'}}> Thao tác </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? data.map(ele => {
                                return (
                                    <TableRow key={ele.stt}>
                                        <TableCell>
                                            {ele.stt}
                                        </TableCell>
                                        <TableCell>
                                            {ele.tenchuho}
                                        </TableCell>
                                        <TableCell>
                                            {ele.diachi}
                                        </TableCell>
                            
                            
                                        <TableCell>
                                            {ele.trangthai}
                                        </TableCell>
                                        <TableCell>
                                            {ele.trangthai !== '' ? <>
                                             <Button sx={{width:20,margin:1}} variant='contained' color='warning' onClick={() => { openDialog(ele.stt) }}>Sửa</Button> 
                                             <Button sx={{width:20,margin:1}} variant='contained' color='error' onClick={() => { openDialog(ele.stt) }}>Xoá</Button> 
                                              
                                             </>
                                             : ""}
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : ""}

                        </TableBody>
                    </Table>
                </TableContainer>
                <LixDialog
                    open={dialog}
                    handleClose={closeDialog}
                    id={idKhaoSat}
                />
                <AddCustomer
                    open={dialogCustomer}
                    handleClose={closeDialogCustomer}
                />
            </MainCard>
        </ComponentSkeleton>
    )
}

export default ComponentTest