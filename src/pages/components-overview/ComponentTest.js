import React, { useEffect, useState } from 'react'
import ComponentSkeleton from './ComponentSkeleton'
import MainCard from 'components/MainCard'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '../../../node_modules/@mui/material/index'
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
            tenchuho: 'Nguyễn Văn A',
            diachi: ' Khu vực 1 phường 7 TP Vị Thanh Hậu giang',
            sonhankhau: 1,
            nguoihopdong: 'Nguyễn Văn A',
            trangthai: 'Đã khảo sát'
        },
        {
            stt: 2,
            tenchuho: 'Nguyễn Văn B',
            diachi: ' Khu vực 2 phường 5 TP Vị Thanh Hậu giang',
            sonhankhau: 1,
            nguoihopdong: 'Nguyễn Văn B',
            trangthai: 'Chưa khảo sát'
        },
        {
            stt: 3,
            tenchuho: 'Nguyễn Thị C',
            diachi: ' Khu vực 3 phường 4 TP Vị Thanh Hậu giang',
            sonhankhau: 1,
            nguoihopdong: 'Nguyễn Văn C',
            trangthai: 'Đang khắc phục'
        },])
    }, [])

    return (
        <ComponentSkeleton>
            <MainCard title="LIX">
                <Button sx={{ marginBottom: 1 }} variable="outlined" onClick={openDialogCustomer}>Thêm khách hàng</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{backgroundColor:'#0099ff'}}>
                            <TableRow>
                                <TableCell sx={{color:'white'}}> STT </TableCell>
                                <TableCell sx={{color:'white'}}> Tên chủ hộ </TableCell>
                                <TableCell sx={{color:'white'}}> Địa chỉ </TableCell>
                                <TableCell sx={{color:'white'}}> Số nhân khẩu </TableCell>
                                <TableCell sx={{color:'white'}}> Người hợp đồng </TableCell>
                                <TableCell sx={{color:'white'}}> Trạng thái </TableCell>
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
                                            {ele.sonhankhau}
                                        </TableCell>
                                        <TableCell>
                                            {ele.nguoihopdong}
                                        </TableCell>
                                        <TableCell>
                                            {ele.trangthai}
                                        </TableCell>
                                        <TableCell>
                                            {ele.trangthai === 'Chưa khảo sát' ? <Button onClick={() => { openDialog(ele.stt) }}>LIX</Button> : ""}
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