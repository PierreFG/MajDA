import { useEffect } from 'react';

import * as d3 from "d3";

// eslint-disable-next-line
function analyse_lattice(lattice) {
    let node_set = new Set();
    let pointed_node_set = new Set();
    for (const [k, value] of Object.entries(lattice)) {
        node_set.add(k);
        value.forEach(el=>{
            node_set.add(el);
            pointed_node_set.add(el);
        })
    }
    let bottom_element = null;
    for(const node of node_set) {
        if(!pointed_node_set.has(node)){
            bottom_element=node;
        }
    }   
    let top_element = null;   
    for(const node of pointed_node_set) {
        if(!node_set.has(node)){
            top_element=node;
        }
    } 
    return {
        nodes: Array.from(node_set),
        top_element: top_element,
        bottom_element: bottom_element
    };
}

// eslint-disable-next-line
function make_groups(lattice, root){
    let Q = [];
    Q.push(root);

    let explored = new Set();
    explored.add(root);

    let levels_dict = {};
    levels_dict[root] = 0;
    let max_depth = 0;
    while(Q.length>0) {
        let v = Q.shift();
        if(v in lattice) {
          for(const w of lattice[v]) {
              if(!explored.has(w)) {
				Q.push(w);
				explored.add(w);
				levels_dict[w] = levels_dict[v]+1;
				if(levels_dict[v]+1>max_depth) {
					max_depth=levels_dict[v]+1;
				}
              }
          }
        }
    }

    let levels = [];
    for(let i=0; i<max_depth+1; i++) {
    	levels.push([]);
    }
    for(let v in levels_dict) {
    	levels[levels_dict[v]].push(v);
    }
    return levels.reverse();
}

// eslint-disable-next-line
function draw_lattice(divId, lattice) {
    let margin = 0;
    let canvas_props = {
        margin: margin,
        width: 180 - 2*margin,
        height: 180 - 2*margin
    }
    
    // Delete any potential previous SVG
    d3.select(`#${divId}`).select("svg").remove();
    console.log(lattice)

    // Init SVG for current lattice
    var svg = d3.select(`#${divId}`).append("svg")
        .attr("width", canvas_props.width + 2*canvas_props.margin)
        .attr("height", canvas_props.height + 2*canvas_props.margin)
    .append("g")
        .attr("transform", "translate(" + canvas_props.margin + "," + canvas_props.margin + ")");

    let lattice_analysis = analyse_lattice(lattice);
    let nodes_groups = make_groups(lattice, lattice_analysis.bottom_element);

    // Compute nodes placement from node_groups
    let nodes = {}
    let v_spacing=1/(nodes_groups.length+1);
    let curr_v = v_spacing;
    for (const node_group of nodes_groups) {
        let h_spacing = 1/(node_group.length+1)
        let curr_h = h_spacing;
        for(const node of node_group) {
            nodes[node] = {
                cx: canvas_props.width*curr_h, 
                cy: canvas_props.height*curr_v,
                textx: canvas_props.width*(curr_h+1.1*h_spacing*(curr_h-0.5)),
                texty: canvas_props.height*(curr_v+1.5*v_spacing*(curr_v-0.45))
            }
            curr_h+=h_spacing;
        }
        curr_v+=v_spacing;
    }

    // Draws links
    for (const [key, value] of Object.entries(lattice)) {
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
            .append('title')
            .text(`comp fonction`);
        svg.append("text")
            .attr("x", value.textx)
            .attr("y", value.texty)
            .attr("text-anchor", 'middle')
            .text(key)
    }
    svg.selectAll("circle")
        .attr("r", 5)
        .style("fill", "black")
        .style("stroke", "rgb(225, 225, 225)")
        .style("stroke-width", 3)
}

const Lattice = ({
    name,
    data
}) => {

    useEffect(() => {
        return draw_lattice(name, data);
    });
    

    return(
        <div id={name}></div>
    );
}

export default Lattice;