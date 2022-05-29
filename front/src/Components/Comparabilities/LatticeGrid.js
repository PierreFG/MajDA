import React, { Component } from 'react';

class LatticeGrid extends Component {
    render() {
        function GridConstructor(props) {
            console.log(props.grid_data)
            return(
                <p></p>
            );
        }

        return(
            <GridConstructor grid_data={this.props.comp_data}/>
        );
    }
}

export default LatticeGrid;