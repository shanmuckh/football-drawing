import React from 'react'

import './Controls.scss'
import './Section.scss'

const Extras = ({
  onCheckboxChange,
  iconType,
  exportPNG,
  clearCanvas,
  serialize,
  importJSON,
  destroy,
}) => (
  <section className="Section">
    <h2 className="Section-heading">Extras</h2>
    {/* <div className="btn-wrapper">
      <input
        className="Checkbox"
        type="checkbox"
        onChange={onCheckboxChange}
        name="toggle-icon-types"
        checked={iconType === 'alternateIcon'}
        id="js-checkbox"
      />
      <label htmlFor="js-checkbox" className="Label">Use symbols</label>
    </div> */}

    <button onClick={serialize} className="Button">Serialize to JSON <span role="img" aria-label="">📤</span></button>
    <p>Serialize to JSON will serialize the canvas to JSON so it can be saved in a db. In this demo it logs the output to the console.</p>
    <button onClick={importJSON} className="Button">Import from JSON <span role="img" aria-label="">📥</span></button>
    <p>Import from JSON prompts for a JSON string to load into the Canvas.</p>
    <button onClick={exportPNG} className="Button">Export to png</button>
    <button onClick={clearCanvas} className="Button">Clear canvas</button>
    <button onClick={destroy} className="Button">Destroy</button>
    <p>Destroy removes and garbage collects the entire application. Intention is that this will be used in a dashboard with potentially multiple instances.</p>
  </section>
)

export default Extras
