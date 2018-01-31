import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

class Box extends React.Component {
  //box has own select box function
  //arrow function to refer to right this
  selectBox = () => this.props.selectBox(this.props.row, this.props.col); //can't pass inside render
  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox} //not props since own selectBox function
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14; //passed in from parent
    var rowsArr = [];
    var boxClass = '';
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + '_' + j; //creates id for each box

        boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off'; //check specific spot in grid if T/F
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    } //this is often done with map
    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

class Buttons extends React.Component {
  //use bootstrap with react
  constructor(props) {
    super(props);
    console.log('Props after super', this.props);
  }

  handleSelect = evt => {
    this.props.gridSize(evt);
  };

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1">20x10</MenuItem>
            <MenuItem eventKey="2">50x30</MenuItem>
            <MenuItem eventKey="3">70x50</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)) //every grid cell set to false
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col]; //find square clicked and set to opposite
    this.setState({
      gridFull: gridCopy
    });
  };

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          //1/4 chance
          gridCopy[i][j] = true;
        }
      }
    }

    this.setState({
      gridFull: gridCopy
    });
  };

  playButton = () => {
    clearInterval(this.intervalId); //clearInterval stops time
    this.intervalId = setInterval(this.play, this.speed); //JS timing event
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  fast = () => {
    this.speed = 100;
    this.playButton(); //clear interval, set with new speed
  };

  slow = () => {
    this.speed = 1000; //Set to 1000 for slow
    this.playButton();
  };

  clear = () => {
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false)); //refactor this
    this.setState({
      gridFull: grid,
      generation: 0
    });
  };

  gridSize = size => {
    //we pass in the event key
    switch (size) {
      case '1':
        this.cols = 20;
        this.rows = 10;
        break;
      case '2':
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  };

  play = () => {
    //main function for play logic
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull); //copy, were going to set state using code

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;

        if (i > 0) if (g[i - 1][j]) count++; //N
        if (i < this.rows - 1) if (g[i + 1][j]) count++; //S
        if (j < this.cols - 1) if (g[i][j + 1]) count++; //E
        if (j > 0) if (g[i][j - 1]) count++; //W

        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++; //NW
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++; //SW
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++; //NE
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++; //SE

        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
  };

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div>
        <h1> Game of Life </h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <Buttons
          playButton={this.playButton} //Pass props to buttons
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <h4> Generations: {this.state.generation}</h4>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr)); //have to deep clone since array is nested
}

ReactDOM.render(<Game />, document.getElementById('root'));
