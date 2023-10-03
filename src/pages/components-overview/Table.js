// material-ui
import { styled } from '@mui/material/styles';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import instance from '../../axios/instance';

// styles
const IFrameWrapper = styled('iframe')(() => ({
    height: 'calc(100vh - 210px)',
    border: 'none'
}));

// ============================|| ANT ICONS ||============================ //


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
                <IFrameWrapper title="hello" width="100%" src="https://ant.design/components/icon/" />
            </MainCard>
        </ComponentSkeleton>
    )
};

export default Table;
