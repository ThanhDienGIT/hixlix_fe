import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow, Tooltip, Paper, Typography
} from '../../../node_modules/@mui/material/index'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import Compressor from 'compressorjs';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import instance from '../../axios/instance';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';



// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});

function ProofUploadDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [fileArray, setFileArray] = useState([])
    const [fileError, setFileError] = useState('')
    const [uploadError, setUploadError] = useState('')
    const [loading, setLoading] = useState(false)



    // const getInfoCustomer = (id) => {
    //     instance.get('getKH_ByID_LIX/' + id).then(res => setCustomer(res.data)).catch(err => console.log(err))
    // }

    const handleNoteChange = (index, event) => {
        const newFileArray = [...fileArray];
        newFileArray[index].note = event.target.value;
        setFileArray(newFileArray);
    };


    useEffect(() => {
        return () => {
            // Revoke all object URLs when component unmounts
            fileArray.forEach(file => window.URL.revokeObjectURL(file.fileImg));
        };
    }, [fileArray]);


    const handleFileUpload = (e) => {
        setFileError('');
        if (!e.target.files) {
            return;
        }

        const files = Array.from(e.target.files);
        const newFileArray = [];

        files.forEach(file => {
            const fileType = file.type;
            // const fileURL = window.URL.createObjectURL(file);

            if (fileType.startsWith('image/')) {
                // newFileArray.push({ fileName: file.name, fileImg: fileURL, fileType: 'Image', file: file, note: '' });

                const image = new Image();
                image.src = window.URL.createObjectURL(file);

                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = 800;
                    const maxHeight = 600;
                    let width = image.width;
                    let height = image.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(image, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const compressedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });

                        const compressedFileURL = window.URL.createObjectURL(compressedFile);
                        // Thêm ảnh đã nén vào mảng mới chỉ khi đã nén xong
                        const newFile = {
                            fileName: file.name,
                            fileImg: compressedFileURL,
                            fileType: 'Image',
                            file: compressedFile,
                            note: ''
                        };

                        newFileArray.push(newFile);

                        // Kiểm tra nếu có ảnh mới, thì cập nhật fileArray
                        if (newFileArray.length === files.length) {
                            setFileArray(prevFileArray => [...prevFileArray, ...newFileArray]);
                        }
                    }, 'image/jpeg', 0.8); // Chất lượng nén ảnh là 0.6

                };
            }
            // else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            //     fileType === 'application/msword') {
            //     newFileArray.push({ fileName: file.name, fileImg: fileURL, fileType: 'Document', file: file, note: '' });
            //     if (newFileArray.length > 0) {
            //         setFileArray((prevFileArray) => [...prevFileArray, ...newFileArray]);
            //     }
            // } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            //     fileType === 'application/vnd.ms-excel') {
            //     newFileArray.push({ fileName: file.name, fileImg: fileURL, fileType: 'Excel', file: file, note: '' });
            //     if (newFileArray.length > 0) {
            //         setFileArray((prevFileArray) => [...prevFileArray, ...newFileArray]);
            //     }
            // } 
            else {
                setFileError('Không hỗ trợ file có dạng khác file ảnh');
            }
        });


    };


    const handleDeleteFile = (idx) => {
        const newFileArray = [...fileArray];
        // Revoke the object URL to free up memory
        window.URL.revokeObjectURL(newFileArray[idx].fileImg);
        // Remove the file at the specified index
        newFileArray.splice(idx, 1);
        setFileArray(newFileArray);


        // Reset the file input value if all files are deleted
        if (newFileArray.length === 0) {
            const fileInput = document.querySelector('.account-file-input');
            if (fileInput) {
                fileInput.value = '';
            }
        }
    }

    const uploadProof = () => {
        try {
            setUploadError('')
            var Data = new FormData();

            fileArray.map((x) => {
                Data.append('files[]', x.file)
                Data.append('ID_KH', props.idCustomer)
                Data.append('note[]', x.note)
            })

            setLoading(true)

            instance.post('/add_proof', Data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
                if (res.data.status === 'success') {
                    props.callApi()
                    notyf.success(res.data.message)
                    setLoading(false)
                    props.handleClose()
                }
            }).catch(err => {
                setLoading(false)
                notyf.error('Đã có lỗi xảy ra: ' + err)
            });

            // if (response.status === 200) {
            //     notyf.success("Upload file minh chứng thành công")
            // } else {
            //     notyf.error("Upload file minh chứng thất bại, vui lòng kiểm tra lại")
            // }
        } catch (error) {
            setLoading(false)
            notyf.error('Đã có lỗi xảy ra: ' + error)
        }
    }

    console.log(uploadError)


    return (
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
                Upload minh chứng
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>

                    <TableContainer component={Paper} sx={{ mt: 1 }}>
                        <Table size='small'>
                            <TableHead sx={{ backgroundColor: '#f0f0f0' }} >
                                <TableRow>
                                    <TableCell sx={{ color: 'black', width: 50 }}>STT </TableCell>
                                    <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Tên file</TableCell>
                                    <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Hình ảnh </TableCell>
                                    <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', flexGrow: 1 }}> Mô tả </TableCell>
                                    <TableCell sx={{ color: 'black', whiteSpace: 'nowrap', width: 150 }}> Thao tác </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {fileArray && fileArray.length > 0 ? fileArray.map((ele, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {1 + index}
                                            </TableCell>
                                            <TableCell sx={{ whiteSpace: 'nowrap', color: 'blue' }}>
                                                {ele.fileName.length > 20 ? ele.fileName.substring(0, 19) + '...' : ele.fileName}
                                            </TableCell>
                                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                {ele.fileType === 'Image' ? <img alt='' src={ele.fileImg} id='uploadImg' height={70} width={70} /> : ''}
                                                {ele.fileType === 'Document' ?
                                                    <>
                                                        <img style={{ display: 'none' }} alt='' id='uploadImg' height={50} width={50} />
                                                        <ArticleIcon sx={{ color: '#4463c6' }} />
                                                    </>

                                                    : ''}
                                                {ele.fileType === 'Excel' ?
                                                    <>
                                                        <img style={{ display: 'none' }} alt='' id='uploadImg' height={50} width={50} />
                                                        <LibraryBooksIcon sx={{ color: '#31be7d' }} />
                                                    </>

                                                    : ''}
                                            </TableCell>
                                            <TableCell>
                                                <TextField multiline rows={5} fullWidth value={ele.note}
                                                    onChange={(e) => handleNoteChange(index, e)} />
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title="Xóa">
                                                    <IconButton>
                                                        <RemoveCircleOutlineRoundedIcon color='error' onClick={() => handleDeleteFile(index)} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) :
                                    <TableRow>
                                        <img style={{ display: 'none' }} alt='' id='uploadImg' height={50} width={50} />
                                        <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                                            <Typography variant="h6">Không có file đang được chọn</Typography>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ width: '150px', mt: 1 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            <FileUploadRoundedIcon /> Upload
                            <input
                                id="upload"
                                className="account-file-input"
                                type="file"
                                hidden
                                onChange={handleFileUpload}
                                multiple
                            />
                        </Button>
                    </Box>
                    {fileError && fileError !== '' ? <span style={{ color: 'red', marginTop: 2 }}>{fileError}</span> : ''}
                </Box>

            </DialogContent>
            <DialogActions>
                <LoadingButton
                    disabled={fileArray.length === 0 || loading}
                    color="primary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={uploadProof}
                    autoFocus
                >
                    <span>Lưu minh chứng</span>
                </LoadingButton>

                <Button variant={'outlined'} color={'error'} onClick={
                    () => {
                        props.handleClose()
                    }

                }>Huỷ</Button>
            </DialogActions>
        </Dialog>



    )
}

export default ProofUploadDialog