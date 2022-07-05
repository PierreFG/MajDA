import { useEffect } from 'react';

import LoadingOverlay from 'react-loading-overlay';
import { MdOutlineViewArray } from 'react-icons/md';

import { useDmlQueryMutation } from '../../app/services/api';

const QueryResult = () => {
    const [dmlQuery, {data, isLoading, isSuccess, isError}] = useDmlQueryMutation({ fixedCacheKey: "queryResult" });

    useEffect(() => {       
        console.log(data);
    }, [data]);

    return (
        <div>
            <h5><MdOutlineViewArray /> RESULT</h5>
            <LoadingOverlay
                active={isLoading}
                spinner
            >
                { isSuccess? 
                    <>succes</>
                    : 
                    <p>echec</p> 
                }
            </LoadingOverlay>
        </div>
    )
}

export default QueryResult;