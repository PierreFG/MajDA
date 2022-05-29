import './Comparabilities.css';

import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import LatticeGrid from './LatticeGrid'

class Comparabilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: {},
            avalaible_filters: [],
            selected_filter: '',
            attrs_comp: {},
            filtered_comps: {}
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
                ['All attributes','_*']
                // ['Current query','_Q']
            ]
            
            for(const table in this.state.tables) {
                avalaible_filters.push([`Table ${table}`,`_t:${table}`])
            }

            this.setState({
                avalaible_filters: avalaible_filters,
                selected_filter: avalaible_filters[0][1]
            });
        });
    }

    handleCompFilterChange(event) {
        this.setState({
            selected_filter: event.target.value
        }, () => {
            let target_value = this.state.selected_filter
            if(target_value === '_*') {
                this.setState(state => {
                    return {
                        filtered_comps: {...state.attrs_comp}
                    }
                });
            } else if (target_value.substr(0,3) === '_t:') {
                this.setState(state => {
                    return {
                        filtered_comps: {...state.attrs_comp}
                    }
                });
            } else {
                console.log('error')
            }
        })

    }
    

    render() {
        function CompFilterSelect(props) {
            var optionList = null;
            if(props.avalaible_filters.length===0) {
                optionList = <option value="1">Loading...</option>
            } else {
                optionList = props.avalaible_filters.map((option) =>  
                    <option key={option[1]} value={option[1]}>{option[0]}</option>
                ); 
            } 
            
            return (
                <Form.Select id="comp-filter-select" value={props.selected_value} onChange={props.onChangeCallback}>
                    {optionList}
                </Form.Select>
            );
        }

        return(
            <div>
                <h5>COMPARBILITIES</h5>
                Show <CompFilterSelect avalaible_filters={this.state.avalaible_filters} selected_value={this.state.selected_filter} onChangeCallback={this.handleCompFilterChange}/>
                <LatticeGrid comp_data={this.state.filtered_comps}/>
            </div>
        )
    }
}

export default Comparabilities;