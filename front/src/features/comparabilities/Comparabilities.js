import './Comparabilities.css';

import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import LatticeGrid from './LatticeGrid'

import { ImEqualizer }from 'react-icons/im';

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

            this.setState(state => {
                return {
                    avalaible_filters: avalaible_filters,
                    selected_filter: '_*',
                    filtered_comps: {...state.attrs_comp}
                }
            });
        });
    }

    handleCompFilterChange(event) {
        let target_value = event.target.value
        if(target_value === '_*') {
            this.setState(state => {
                return {
                    selected_filter: target_value,
                    filtered_comps: {...state.attrs_comp}
                }
            });
        } else if (target_value.substr(0,3) === '_t:') {
            let splitted_target_value = target_value.split(':');
            if(splitted_target_value.length >= 2) {
                let table = splitted_target_value[1];
                const filtered_comps = Object.keys(this.state.attrs_comp)
                    .filter((key) => this.state.tables[table].includes(key))
                    .reduce((obj, key) => {
                        return Object.assign(obj, {
                            [key]: this.state.attrs_comp[key]
                        });
                    }, {});
                this.setState({
                    selected_filter: target_value,
                    filtered_comps: {...filtered_comps}
                });
            }
        } else {
            console.log('error')
        }
    }
    

    render() {
        var optionList = <option value="1">Loading...</option>;
        if(this.state.avalaible_filters.length>0) {
            optionList = this.state.avalaible_filters.map(option =>  
                <option key={option[1]} value={option[1]}>{option[0]}</option>
            ); 
        }

        return(
            <div>
                <h5><ImEqualizer /> COMPARABILITIES</h5>
                <Form.Select 
                    id="comp-filter-select" 
                    value={this.state.selected_filter} 
                    onChange={this.handleCompFilterChange}
                    style= {{ marginBottom: '5px'}}
                >
                    {optionList}
                </Form.Select>
                <LatticeGrid comp_data={this.state.filtered_comps}/>
            </div>
        )
    }
}

export default Comparabilities;