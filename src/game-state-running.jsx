import React, {useCallback, useEffect, useRef, useState} from'react';
import GameGrid from'./grid.jsx';
import GameLogic from'./logic.js';



// The game state where the actual fun happens.
export default function GameStateRunning({img}) {

  const [logic, setLogic] = useState(null)
  const [showGrid, setShowGrid] = useState(false)

  const imgRef = useRef()
  const stageRef = useRef()

  useEffect(() => {
    // the component did mount, but the image might not have loaded completely yet, therefore
    // we attach this onLoad function.
    imgRef.current.onload = (function () {
      // The image has loaded (yay!). Now we set a short timeout of 2s so the player
      // has some time to memorize the image ..
      setTimeout (function () {
        // .. then we tell the component to show the grid (this will trigger a re-render)
        setShowGrid(true);
      }, 2000);
    });
  }, [])



  // Sets up the game logic (duh). This is called after the game-grid component has fully rendered.
  const setupGameLogic = useCallback(grid => {

    // Create a new instance of GameLogic, passing it the components it
    // requires (via their refs), ..
    var logic = new GameLogic(grid, stageRef.current, imgRef.current);

    // .. make it start, ..
    logic.start();

    // .. listen to when it finishes, ..
    logic.setCallback(logic.events.FINISHED, function () {
      window.alert('You did it!! (reload the window to play again)');
    });

    // .. and finally put it on the state (this causes a re-render with the need-help-button activated)
    setLogic(logic);

  }, [])


  // renders the "menu", ie the title-bar with the toggle-button to show the image
  function renderMenu() {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-brand">
            So Puzzled!
          </div>
          <label className="navbar-text pull-right" htmlFor="help">
            <input
              id="help"
              type="checkbox"
              // While the game logic is not initialised yet, this button stays disabled.
              disabled={!logic}
              // Callback function that calls the game logic's toggleHelp method.
              // Kinda wish I had written this in ES6 now and could use arrow functions.
              onChange={e => logic.toggleHelp(!!e.target.checked)}
            />
            &nbsp;
            Need Help?

          </label>
        </div>
      </nav>
    );

  }


  // This renders the image below the grid
  function renderBaseImg() {
    return (
      <img
        alt="Kitty"
        src={img}
        className="base-img"
        ref={imgRef}
      />
    );
  }


  // This renders the GameGrid component
  function renderGrid() {
    if (showGrid) {
      // The GameGrid component requires
      // - the image that we want to puzzle,
      // - the desired size for the puzzle-pieces, and
      // - this.setupGameLogic, as a callback method for when the grid is ready
      //
      // TODO: pass this callback somehow more elegantly or use Flux.
      // TODO: expose the pieceSizeRatio to a menu or something so players can use it to set the difficulty level
      return (
        <GameGrid
          imgSrc={img}
          $img={imgRef.current}
          pieceSizeRatio={4}
          onLoad={setupGameLogic}
        />
      );
    } else {
      return null;
    }
  }


  // renderStage renders a fixed-positioned <div> that spans the whole screen and serves as
  // a boundary for the scrambled puzzle-pieces and a reference to the visible area.
  // Not strictly necessary but on pages with a lot of moving parts I like to have an abstract
  // element like this to keep track of the viewport for me.
  function renderStage() {
    return (
      <div ref={stageRef} className="container stage" />
    );
  }

  // The main render function. The more interesting bits are rendered in smaller functions
  return (
    <div>

      {renderMenu()}
      <div className="game-wrapper">
        {renderStage()}
        <div className="grid-wrapper">
          {renderBaseImg()}
          {renderGrid()}
        </div>
      </div>

    </div>
  );

};
