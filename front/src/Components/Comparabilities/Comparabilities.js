import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import './Comparabilities.css';

import LatticeGrid from './LatticeGrid'

class Comparabilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: {},
            filters: {},
            attrs_comp: {},
            filtered_comps: []
        };
        this.handleCompFilterChange = this.handleCompFilterChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            tables: {
                't1': ['attr1', 'attr2'],
                't2': ['attr3']
            },
            attrs_comp: {
                'attr1': {
                    lattice: {
                        'a': ['b', 'c', 'd'],
                        'b': ['e'],
                        'c': ['e', 'f'],
                        'd': ['f'],
                        'e': ['g'],
                        'f': ['g'],
                    },
                    realities: {
                        'r1': 'b',
                        'r2': 'c'
                    }
                },
                'attr2': {
                    lattice: {
                        'a': ['b', 'c'],
                        'b': ['d'],
                        'c': ['d'],
                    },
                    realities: {
                        'r1': 'b'
                    }
                },
                'attr3': {
                    lattice: {
                        'a': ['b']
                    },
                    realities: {
                        'r1': 'a'
                    }
                },
            }
        }, () => {
            var avalaible_filters = [
                ['All attributes','_*'],
                ['Current query','_Q']
            ]
            
            for(const table in this.state.tables) {
                console.log(table);
                avalaible_filters.push([`Table ${table}`,`_t:${table}`])
            }

            this.setState({
                filters: {
                    avalaible_filters: avalaible_filters,
                    selected_filter: avalaible_filters[0][1]
                }
            });
        });
    }

    handleCompFilterChange(event) {
        
    }
    

    render() {
        function CompFilterSelect(props) {
            var optionList = null;
            if(props.options.avalaible_filters.length===0) {
                optionList = <option value="1">Loading...</option>
            } else {
                optionList = props.options.avalaible_filters.map((option) =>  
                    <option key={option[1]} value={option[1]}>{option[0]}</option>
                ); 
            } 
            
            return (
                // <Form.Select id="comp-filter-select" onChange={this.handleCompFilterChange}>
                <Form.Select id="comp-filter-select"  onChange={props.onChangeCallback}>
                    {optionList}
                </Form.Select>
            );
        }

        return(
            <div>
                <h5>COMPARBILITIES</h5>
                Show <CompFilterSelect options={this.state.filters} onChangeCallback={this.handleCompFilterChange}/>
                {/* <div id="lattice_viz">{}</div> */}
                {/* <LatticeGrid /> */}
                {/* <div id='LatticeGrid'></div> */}
                <LatticeGrid />
            </div>
        )
    }
}

export default Comparabilities;