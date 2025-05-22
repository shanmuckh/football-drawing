import React from 'react'

import './Aside.scss'

const Aside = ({ children, showAside, handleShowAside }) => (
  <aside
    className={`Aside${showAside ? ' Aside--visible' : ''}`}
    onClick={() => { handleShowAside(false) }}
    // onTouchEnd={() => { handleShowAside(false) }}
  >
    <div className="Aside_Inner">

      {children}

    </div>

  </aside>
)

export default Aside
