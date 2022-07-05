import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import LoadingOverlay from 'react-loading-overlay';
import toast from 'react-hot-toast';

import { useDmlQueryMutation } from '../../app/services/api';

const DDLQuery = () => {
    const [queryContent, setQueryContent] = useState('');
    const [dmlQuery, {data, isLoading, isSuccess, isError}] = useDmlQueryMutation({ fixedCacheKey: "queryResult" });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(queryContent);
        dmlQuery(queryContent.trim());
    } 

    useEffect(() => {       
        if (isSuccess)
            toast.success('Requête effectuée avec succès.');
            console.log(data);
        if (isError)
            toast.error('Oups ! Une erreur a eu lieu lors de l\'exécution de la requête...');

    }, [isSuccess, isError]);

    return (
        <LoadingOverlay
            active={isLoading}
            spinner
        >
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    as="textarea" 
                    className="query-textarea"
                    placeholder="CREATE TABLE..."
                    value={queryContent}
                    onChange={e => setQueryContent(e.target.value)}
                    isInvalid={isError}
                    isValid={isSuccess}
                />
                <Button variant="primary" type="submit" id="ddl-submit-button" className='submit-button' disabled={isLoading}>
                    Submit
                </Button>
            </Form>
        </LoadingOverlay>
    )
}

export default DDLQuery;