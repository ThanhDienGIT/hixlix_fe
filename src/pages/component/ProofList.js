import React
,
{
    useEffect,
    useState
}
    from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box,
    TextField
} from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
    IconButton,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Paper,
    Typography
} from '../../../node_modules/@mui/material/index'
import AddIcon from '@mui/icons-material/Add';
import ProofUploadDialog from './ProofUploadDialog';
// import ArticleIcon from '@mui/icons-material/Article';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import instance from '../../axios/instance';
import ConfirmDialog from './ConfirmDialog';
import { Notyf } from 'notyf';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import { format } from 'date-fns';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});

function ProofList(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [openProof, setOpenProof] = useState(false)
    const [proofList, setProofList] = useState([])
    const [openConfirm, setOpenConfirm] = useState(false)
    const [ID, setID] = useState(0)
    const [edit, setEdit] = useState(false)
    const [mota, setMota] = useState({});

    const handleOpenProofDialog = () => {
        setOpenProof(true)
    }

    const handleCloseProof = () => {
        setOpenProof(false)
    }

    const handleCloseDialog = () => {
        setOpenConfirm(false)
    }

    const get_proof_list = async () => {
        const response = await instance.get('/get_proof_list/' + props.idCustomer)
        console.log(response)
        if (response.data.status === 'success') {
            setProofList(response.data.data)
        }
    }


    useEffect(() => {
        if (props.open === true) {
            get_proof_list()
        }

    }, [props.open])

    const handleOpenDialog = (id) => {
        setOpenConfirm(true)
        setID(id)
    }


    const deleteProof = async (id) => {
        const response = await instance.post('/delete_proof/' + id)

        if (response.data.status === 'success') {
            notyf.success(response.data.message);
            get_proof_list()
        }
    }

    const handleDownload = async (fileName) => {
        try {
            // Gọi API để tải file
            const response = await instance.get(`/download-image/${fileName}`, {
                responseType: 'blob', // Đảm bảo response là dạng blob (binary data)
            });

            // Tạo một URL tạm thời cho file
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Tạo một thẻ a ẩn và kích hoạt sự kiện click trên nó để tải file về
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Giải phóng URL tạm thời
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
            // Xử lý lỗi nếu có
        }
    }

    const handleEdit = (id) => {
        setEdit({ ...edit, [id]: true });
        setMota({ ...mota, [id]: proofList.find(item => item.idfileminhchung === id).Mota });
    }

    const handleSave = async (id) => {
        const objectSend = { mota: mota[id] };
        const response = await instance.post('/edit-proof/' + id, objectSend);

        if (response.data.status === 'success') {
            setEdit({ ...edit, [id]: false });
            get_proof_list()
            notyf.success(response.data.message);
        }
        else {
            setEdit({ ...edit, [id]: false });
            notyf.error(response.data.message);
        }
    }

    const handleChangeMota = (id, value) => {
        setMota({ ...mota, [id]: value });
    };


    return (

        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#0099ff', color: 'white', width: '900' }}>
                    Danh sách minh chứng
                </DialogTitle>
                <DialogContent>
                    <Box display={'flex'} flexDirection={'column'} padding={1}>
                        <Box sx={{ width: '200px', mt: 1 }}>
                            <Button
                                variant="contained"
                                component="label"
                                onClick={handleOpenProofDialog}
                            >
                                <AddIcon /> Thêm

                            </Button>
                        </Box>
                        <TableContainer component={Paper} sx={{ mt: 1 }}>
                            <Table size='small'>
                                <TableHead sx={{ backgroundColor: '#f0f0f0' }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'black', width: 50 }}>STT </TableCell>
                                        <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Tên file</TableCell>
                                        <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Hình ảnh </TableCell>
                                        <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', flexGrow: 1 }}> Mô tả </TableCell>
                                        <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Ngày upload </TableCell>
                                        <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Thao tác </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {proofList && proofList.length > 0 ? proofList.map((ele, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {1 + index}
                                                </TableCell>
                                                <TableCell sx={{ whiteSpace: 'nowrap', color: 'blue' }}>
                                                    {ele.tenfile.length > 20 ? ele.tenfile.substring(0, 19) + '...' : ele.tenfile}
                                                </TableCell>
                                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                    {/* {ele.fileType === 'Image' ?  */}
                                                    <img alt='' src={ele.url} id='uploadImg' height={70} width={70} />
                                                    {/* : ''}
                                                    {ele.fileType === 'Document' ?
                                                        <>
                                                            <img style={{ display: 'none' }} alt='' id='uploadImg' height={70} width={70} />
                                                            <ArticleIcon sx={{ color: '#4463c6' }} />
                                                        </>

                                                        : ''}
                                                    {ele.fileType === 'Excel' ?
                                                        <>
                                                            <img style={{ display: 'none' }} alt='' id='uploadImg' height={70} width={70} />
                                                            <LibraryBooksIcon sx={{ color: '#31be7d' }} />
                                                        </>

                                                        : ''} */}
                                                </TableCell>
                                                <TableCell>
                                                    {edit[ele.idfileminhchung] ? (
                                                        <TextField
                                                            multiline
                                                            rows={5}
                                                            fullWidth
                                                            value={mota[ele.idfileminhchung]}
                                                            onChange={(e) => handleChangeMota(ele.idfileminhchung, e.target.value)}
                                                        />
                                                    ) : (
                                                        ele.Mota
                                                    )}

                                                </TableCell>
                                                <TableCell>
                                                    {ele.dateCreated ? format(new Date(ele.dateCreated), 'dd/MM/yyyy HH:mm:ss') : '---'}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Tải xuống">
                                                        <IconButton
                                                        >
                                                            <GetAppRoundedIcon color='primary' onClick={() => handleDownload(ele.tenfile)} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {edit[ele.idfileminhchung] ? (
                                                        <Tooltip title="Lưu">
                                                            <IconButton onClick={() => handleSave(ele.idfileminhchung)}>
                                                                <SaveRoundedIcon color='success' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip title="Cập nhật">
                                                            <IconButton onClick={() => handleEdit(ele.idfileminhchung)}>
                                                                <EditRoundedIcon color='warning' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}


                                                    <Tooltip title="Xóa">
                                                        <IconButton>
                                                            <DeleteOutlineRoundedIcon color='error' onClick={() => handleOpenDialog(ele.idfileminhchung)} />
                                                        </IconButton>
                                                    </Tooltip>

                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) :
                                        <TableRow>
                                            <img style={{ display: 'none' }} alt='' id='uploadImg' height={50} width={50} />
                                            <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                                                <Typography variant="h6">Chưa có file minh chứng</Typography>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>


                        {/* {fileError && fileError !== '' ? <span style={{ color: 'red', marginTop: 2 }}>{fileError}</span> : ''} */}
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'} color={'error'} onClick={
                        () => {
                            props.handleClose()
                        }

                    }>Đóng</Button>
                </DialogActions>
            </Dialog>
            <ProofUploadDialog open={openProof} handleClose={handleCloseProof} callApi={get_proof_list} idCustomer={props.idCustomer} isLixDialog={0}/>
            <ConfirmDialog title={'Thông báo'}
                content={'Bạn sẽ không thể hoàn tác, file minh chứng sẽ bị xóa. Bạn chắc chứ?'}
                open={openConfirm}
                handleClose={handleCloseDialog}
                deleteProof={() => deleteProof(ID)}
            />
        </>


    )
}

export default ProofList