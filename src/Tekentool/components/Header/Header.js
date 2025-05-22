import React from 'react'

import './Header.scss'

const Header = ({onLegendClick}) => (
  <header className="Header">
    <h1 className="Header_Title">TEKENTOOL</h1>
    <div>
      <button className="Header_Btn" onClick={onLegendClick} data-bind="js-legend-toggle">
        Legenda
      </button>

    </div>
  </header>
)

export default Header
