import Alert from 'react-bootstrap/Alert';

import LoadingOverlay from 'react-loading-overlay';
import { MdOutlineViewArray } from 'react-icons/md';

import { useDmlQueryMutation } from '../../app/services/api';

import ResultTable from './ResultTable';

const QueryResult = () => {
    const [dmlQuery, {data, isLoading, isSuccess, isError}] = useDmlQueryMutation({ fixedCacheKey: "queryResult" });

    return (
        <div>
            <h5><MdOutlineViewArray /> RESULT</h5>
            <LoadingOverlay
                active={isLoading}
                spinner
            >
                <div style={{minHeight: '200px'}}>
                    { isSuccess && data!=null ? 
                        <ResultTable data={data}/>
                        : 
                        <Alert key='danger' variant='danger'>
                            Une erreur a eu lieu, votre requête est-elle correcte ?
                        </Alert>
                    }
                </div>
            </LoadingOverlay>
        </div>
    )
}

export default QueryResult;