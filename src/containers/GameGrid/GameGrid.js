// Third Party Imports
import React, { Component } from 'react'
import classes from './GameGrid.module.css'

// Local Imports
import ShapeFactory from '../../components/Blocks/ShapesFactory'

class GameGrid extends Component {
    render() {

        return (
            <div className={classes.GameGrid}>
                <ShapeFactory shape='Square' />
            </div>
        )
    }
}

export default GameGrid