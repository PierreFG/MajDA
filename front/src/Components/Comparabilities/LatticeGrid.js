import React, { Component } from 'react';

class LatticeGrid extends Component {
    render() {
        var latticeGrid = <p>Loading...</p>;
        if(Object.keys(this.props.comp_data).length > 0) {
            latticeGrid = []
            for(let attr in this.props.comp_data) {
                latticeGrid.push(<p key={attr}>{attr}</p>)
            }
        }

        return(
            <div>{latticeGrid}</div>
        );
    }
}

export default LatticeGrid;