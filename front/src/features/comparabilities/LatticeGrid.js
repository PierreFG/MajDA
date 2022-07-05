import './LatticeGrid.css';

import React, { Component } from 'react';

import Lattice from './Lattice'

class LatticeGrid extends Component {
    render() {
        var latticeGrid = <p>Loading...</p>;
        if(Object.keys(this.props.comp_data).length > 0) {
            latticeGrid = []
            for(let attr in this.props.comp_data) {
                latticeGrid.push(
                    <div key={attr} className='lattice-card'>
                        <div style={{height: '80%', width: '100%'}}>
                            <Lattice name={attr} data={this.props.comp_data[attr]}/>
                        </div>
                        <div className='lattice-card-meta'>
                            <h5>{attr}</h5>
                        </div>
                    </div>
                )
            }
        }

        return(
            <div className='lattice-grid-container'>{latticeGrid}</div>
        );
    }
}

export default LatticeGrid;