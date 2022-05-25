import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import './Comparabilities.css';
import * as d3 from "d3";
// import * as cola from "webcola";
// import WebCola from 'react-cola';

// https://stackoverflow.com/questions/28540912/how-to-render-a-general-lattice-with-d3js


class Comparabilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lattices: [
                {
                    nodes: [
                            { id: 0, name: 'ne' },
                            { id: 1, name: 'u' },
                            { id: 2, name: 'approx' },
                            { id: 3, name: 'eq' },
                           ],
                    links: [
                            { "source": 0, "target": 1},
                            { "source": 0, "target": 2},
                            { "source": 2, "target": 3},
                            { "source": 1, "target": 3},
                           ]
                }
            ],
        };
    }

    componentDidMount(){
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        
        // Delete any potential previous SVG
        d3.select("svg").remove();

        // Init SVG for current lattice
        var svg = d3.select("#lattice_viz").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // var data = this.state.lattices[0];

        var graph = {
            'diff': ['u', 'sim'],
            'u': ['eq'],
            'sim': ['eq'],
        };

        // Finds bottom element of the lattice
        let node_set = new Set();
        let pointed_node_set = new Set();
        for (const [k, value] of Object.entries(graph)) {
            node_set.add(k);
            value.forEach(el=>{
                node_set.add(el);
                pointed_node_set.add(el);
            })
        }
        console.log(node_set)
        console.log(pointed_node_set)
        let bottom_element = null;
        for(const node of node_set) {
            if(!pointed_node_set.has(node)){
                bottom_element=node;
            }
        }        
        
        var nodes_groups = [
            ['diff'],
            ['u', 'sim'],
            ['eq'],
        ];
        
        // Compute nodes placement from node_groups
        let nodes = {}
        let v_spacing=1/(nodes_groups.length+1);
        let curr_v = v_spacing;
        for (const node_group of nodes_groups) {
            let h_spacing = 1/(node_group.length+1)
            let curr_h = h_spacing;
            for(const node of node_group) {
                nodes[node] = {
                    cx: width*curr_h, 
                    cy: height*curr_v,
                    textx: width*(curr_h+h_spacing*(curr_h-0.5)),
                    texty: height*(curr_v+v_spacing*(curr_v-0.5))
                }
                curr_h+=h_spacing;
            }
            curr_v+=v_spacing;
        }

        // Draws links
        for (const [key, value] of Object.entries(graph)) {
            for(const link of value){
                svg.append("line")
                    .attr("x1", nodes[key].cx)
                    .attr("y1", nodes[key].cy)
                    .attr("x2", nodes[link].cx)
                    .attr("y2", nodes[link].cy)
            }
        }
        svg.selectAll("line")
            .style("stroke", "black")
            .style("stroke-width", 3)

        // Draws nodes
        for (const [key, value] of Object.entries(nodes)) {
            svg.append("circle")
                .attr("cx", value.cx)
                .attr("cy", value.cy)
            svg.append("text")
                .attr("x", value.textx)
                .attr("y", value.texty)
                .attr("text-anchor", 'middle')
                .text(key)
        }
        svg.selectAll("circle")
            .attr("r", 5)
            .style("fill", "black")
            .style("stroke", "white")
            .style("stroke-width", 3)

        console.log("coucou")
    }

    render() {
        return(
            <div>
                <h5>COMPARBILITIES</h5>
                Show <Form.Select id="comp-filter-select">
                    <option value="1">All attributes</option>
                    <option value="2">Relation Cémafroid</option>
                    <option value="3">Current Query</option>
                </Form.Select>
                <div id="lattice_viz"></div>
            </div>
        )
    }
}

export default Comparabilities;