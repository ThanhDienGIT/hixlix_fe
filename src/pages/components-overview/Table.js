// material-ui


// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import instance from '../../axios/instance';
import { Box, Button, Card, CardActions, CardHeader, TextField } from '../../../node_modules/@mui/material/index';



const Table = () => {
    const callAPI = () => {
        instance.get('test').then(res => console.log(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        callAPI()
    }, [])
    return (
        <ComponentSkeleton>
            <MainCard title="Ant Icons">
                <Card>
                    <CardHeader>Hello</CardHeader>
                    <Box>
                        <TextField/>

                    </Box>
                    <CardActions>
                        <Button>Hello</Button>
                    </CardActions>
                </Card>
            </MainCard>
        </ComponentSkeleton>
    )
};

export default Table;
