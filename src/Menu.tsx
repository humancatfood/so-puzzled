type MenuProps = {
  toggleHelp?: (on: boolean) => void
}

export default function Menu({ toggleHelp }: MenuProps) {
  return (
    <header className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-brand">So Puzzled!</div>
        <label className="navbar-text pull-right" htmlFor="help">
          <input
            id="help"
            type="checkbox"
            // While the game logic is not initialised yet, this button stays disabled.
            disabled={!toggleHelp}
            // Callback function that calls the game logic's toggleHelp method.
            // Kinda wish I had written this in ES6 now and could use arrow functions.
            onChange={e => toggleHelp && toggleHelp(!!e.target.checked)}
          />
          &nbsp; Need Help?
        </label>
      </div>
    </header>
  )
}
