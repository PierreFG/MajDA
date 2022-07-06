import '@inovua/reactdatagrid-community/index.css';

import ReactDataGrid from "@inovua/reactdatagrid-community";

const gridStyle = { minHeight: 400 };
const rowNumberColName = "___PRIVATE_MAJDA"

const ResultTable = (
    data
) => {
    const columns = [];
    const dataSource = [];
    const nRows = data.data['nRows'];

    columns.push({
        name: rowNumberColName,
        header: ""
    });
    console.log()
    const columns_tab = Object.keys(data.data.result[0]);
    columns.concat(columns_tab);

    columns_tab.forEach((colName) => {
        columns.push({
            name: colName,
            header: colName
        });
    });

    for(let i=0; i<nRows; i++)
        dataSource.push({[rowNumberColName]: i, ...data.data.result[i]});

    return (
        <>
            <i>{nRows} tuples trouvés en {data.data['execTimeMs']}ms.</i>
            <ReactDataGrid
                idProperty={rowNumberColName}
                columns={columns}
                dataSource={dataSource}
                pagination
                style={gridStyle}
                defaultLimit={10}
            />
        </>
        
    )
}

export default ResultTable;