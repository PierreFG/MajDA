import '@inovua/reactdatagrid-community/index.css';

import ReactDataGrid from "@inovua/reactdatagrid-community";

const gridStyle = { minHeight: 400 };
const rowNumberColName = "___PRIVATE_MAJDA"

const ResultTable = (
    data
) => {
    const columns = [];
    const dataSource = [];

    console.log(data.data);

    columns.push({
        name: rowNumberColName,
        header: ""
    });

    for (var m in data.data){
        // console.lo
        const column = data.data[m];
        const columnName = column[0];
        columns.push({
            name: columnName,
            header: columnName
        });
    }

    const n_rows = data.data[Object.keys(data.data)[0]][2].length;
    for(let i=0; i<n_rows; i++){
        dataSource.push({});
        dataSource[i][rowNumberColName]=i;
    }
    // let i = 0;
    for (var m in data.data){
        // console.lo
        const column = data.data[m];
        const columnName = column[0];
        console.log(column)
        for(let i=0; i<n_rows; i++)
            dataSource[i][columnName]=column[2][i];
    }

    return (
        <ReactDataGrid
            idProperty={rowNumberColName}
            columns={columns}
            dataSource={dataSource}
            pagination
            style={gridStyle}
            defaultLimit={10}
        />
    )
}

export default ResultTable;