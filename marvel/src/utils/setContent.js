import Spinner from '../components/Spinner/Spinner';
import Skeleton from '../components/skeleton/Skeleton';
import ErrorMessege from '../components/errorMessege/ErrorMessege';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'loading': 
            return <Spinner/>;
        case 'waiting': 
            return <Skeleton/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMessege/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;