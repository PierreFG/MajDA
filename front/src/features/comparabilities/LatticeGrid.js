import './LatticeGrid.css';

import Lattice from './Lattice'

const LatticeGrid = ({
    lattices
}) => {
    if(Object.keys(lattices).length > 0) {
        var latticeGrid = []
        for(let attr in lattices) {
            latticeGrid.push(
                <div key={attr} className='lattice-card'>
                    <div style={{height: '80%', width: '100%'}}>
                        <Lattice name={attr} data={lattices[attr]}/>
                    </div>
                    <div className='lattice-card-meta'>
                        <h5>{attr}</h5>
                    </div>
                </div>
            )
        }
        return <div className='lattice-grid-container'>{latticeGrid}</div>
    } else {
        return <div className='lattice-grid-container'>Loading...</div>
    }
}

export default LatticeGrid;