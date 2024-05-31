import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Box, TextField, FormControl, Grid } from '../../../node_modules/@mui/material/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import instance from '../../axios/instance'
import { Notyf } from 'notyf';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { strengthColor, strengthIndicator } from 'utils/password-strength';


// Create an instance of Notyf
const notyf = new Notyf({
    duration: 3500,
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true
});


function ChangePassDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [pass, setpass] = React.useState('')
    const [confirmPass, setConfirmPass] = React.useState('')
    const [errors, setErrors] = React.useState({ pass: '', confirmPass: '' });
    const [loading, setLoading] = React.useState(false)
    const [level, setLevel] = React.useState();



    const cancel = () => {
        props.handleClose()
        setErrors({ pass: '', confirmPass: '' })
        setpass('')
        setConfirmPass('')
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        if (name === 'New_pass') {
            setpass(value);

            const temp = strengthIndicator(value);
            setLevel(strengthColor(temp));

            if (value.length < 6) {
                newErrors.pass = 'Mật khẩu phải có ít nhất 6 ký tự.';
            } else if (value === 'Vnpt@123') {
                newErrors.pass = 'Mật khẩu không đảm bảo ATTT';
            } else {
                newErrors.pass = '';
            }

            if (confirmPass && value !== confirmPass) {
                newErrors.confirmPass = 'Mật khẩu xác nhận không khớp.';
            } else {
                newErrors.confirmPass = '';
            }
        } else {
            setConfirmPass(value);

            if (value !== pass) {
                newErrors.confirmPass = 'Mật khẩu xác nhận không khớp.';
            } else {
                newErrors.confirmPass = '';
            }
        }

        setErrors(newErrors);
    };


    const handleChangePass = async () => {
        const object = {
            mat_khau: pass
        }

        if (!errors.pass && !errors.confirmPass) {
            setLoading(true)
            const response = await instance.post('/change-pass', object)

            if (response.data.status === 'success') {
                setLoading(false)
                notyf.success(response.data.message)
                cancel()
            }
            else {
                setLoading(false)
                notyf.error(response.data.message)
            }
        } else {
            setLoading(false)
            console.log('Form is invalid, do not submit');
        }
    }


    return (
        <Dialog open={props.open}
            fullScreen={fullScreen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='xs'
            fullWidth={true}
        >
            <DialogTitle sx={{ backgroundColor: '#0099ff', color: 'white' }}>
                <Typography sx={{ maxWidth: 250 }} variant='h4'>
                    {props.title}
                </Typography>

            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} padding={1}>
                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Mật khẩu mới:</Typography>
                        <TextField
                            type="password"
                            name="New_pass"
                            value={pass}
                            onChange={onChangeInput}
                            error={!!errors.pass}
                            helperText={errors.pass}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Xác nhận mật khẩu:</Typography>
                        <TextField
                            type="password"
                            name="Confirm_pass"
                            value={confirmPass}
                            onChange={onChangeInput}
                            error={!!errors.confirmPass}
                            helperText={errors.confirmPass}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>




                </Box>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    disabled={errors.pass || errors.confirmPass || pass === '' || confirmPass === ''}
                    color="primary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleChangePass}
                    autoFocus
                >
                    <span>Cập nhật</span>
                </LoadingButton>
                <Button variant={'outlined'} color={'error'} onClick={cancel}>Hủy bỏ</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChangePassDialog