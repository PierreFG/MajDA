
import {Alglib} from 'https://cdn.jsdelivr.net/gh/Pterodactylus/Alglib.js@master/Alglib-v1.1.0.js'

function compute_nodes_placement(canvas_props, lattice, lattice_analysis, _callback) {
    let variable = Array(2*lattice_analysis.nodes.length).fill(200);
    let nodes = {}
    for(let i = 0; i < lattice_analysis.nodes.length; i++){
        nodes[lattice_analysis.nodes[i]]={
            index: i*2,
            cx: canvas_props.width/2, cy: canvas_props.height/2,
            textx: 0, texty: 0
        }
    }
    console.log(nodes)

    var score = function(x){
        console.log(x);
		return x.reduce((partialSum, a) => partialSum + a, 0);
	}
     
    let solver = new Alglib()
	solver.add_function(score)
    
    var greater_than = function(x, index, number) { return number-x[index]; }
    var lower_than = function(x, index, number) { return x[index]-number; }
    var equal_to = function(x, index, number) { return x[index]-number; }
    for(const node in nodes) {
        if(node !== lattice_analysis.top_element && node !== lattice_analysis.bottom_element) {
            solver.add_less_than_or_equal_to_constraint((x) => {return greater_than(x, nodes[node].index, 0)});
            solver.add_less_than_or_equal_to_constraint((x) => {return greater_than(x, nodes[node].index+1, 0)});
            solver.add_less_than_or_equal_to_constraint((x) => {return lower_than(x, nodes[node].index, canvas_props.width)});
            solver.add_less_than_or_equal_to_constraint((x) => {return lower_than(x, nodes[node].index+1, canvas_props.height)});
        }
    }
    solver.add_equality_constraint((x) => {return equal_to(x, nodes[lattice_analysis.top_element].index, canvas_props.width/2)});
    solver.add_equality_constraint((x) => {return equal_to(x, nodes[lattice_analysis.top_element].index+1, 0)});
    solver.add_equality_constraint((x) => {return equal_to(x, nodes[lattice_analysis.bottom_element].index, canvas_props.width/2)});
    solver.add_equality_constraint((x) => {return equal_to(x, nodes[lattice_analysis.bottom_element].index+1, canvas_props.height)});
	
	solver.promise.then(function(result) { 
		var x_guess = variable;
		solver.solve("min", x_guess, Array(2*lattice_analysis.nodes.length).fill(1), 10);
		solver.remove();
        for(const node in nodes) {
            nodes[node].cx = canvas_props.margin+solver.results[nodes[node].index]
            nodes[node].cy = canvas_props.margin+solver.results[nodes[node].index+1]
        }
        _callback(nodes);
	})
}