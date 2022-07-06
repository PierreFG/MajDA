import Alert from 'react-bootstrap/Alert';

import LoadingOverlay from 'react-loading-overlay';
import { MdOutlineViewArray } from 'react-icons/md';

import { useDmlQueryMutation } from '../../app/services/api';

import ResultTable from './ResultTable';

const QueryResult = () => {
    const [dmlQuery, {data, isLoading, isSuccess, isError, error}] = useDmlQueryMutation({ fixedCacheKey: "queryResult" });

    return (
        <div>
            <h5><MdOutlineViewArray /> RESULT</h5>
            <LoadingOverlay
                active={isLoading}
                spinner
            >
                <div style={{minHeight: '200px'}}>
                    { 
                        isSuccess && data!=null ? 
                            <ResultTable data={data}/>
                        : 
                        isError ?
                            <Alert key='danger' variant='danger'>
                                Une erreur a eu lieu, votre requête est-elle correcte ?<br/>
                                <i>{error.data.message}</i>
                            </Alert>
                        :
                        <p>Pas de résultat pour le moment.</p> 
                    }
                </div>
            </LoadingOverlay>
        </div>
    )
}

export default QueryResult;