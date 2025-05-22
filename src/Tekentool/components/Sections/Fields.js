import React from 'react'

import './Controls.scss'
import './Section.scss'

const Fields = ({
  setField,
  fieldTypes,
  fieldSelected,
  iconType,
}) => (

  <section id="field-container" className="Section">
    <h2 className="Section-heading">Field type</h2>
    <div className="Section_Inner-grid">

      {fieldTypes.map(item => (
        <button
          key={item.variation}
          onClick={setField}
          data-variation={item.variation}
          className={`Button Button--Field${fieldSelected === item.variation ? ' Button--active' : ''}`}
          data-field={item.text}
        >
          <span className="Section_Field-Btns">{item.text}</span>
          <div dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }} />

        </button>
      ))}

    </div>

  </section>
)

export default Fields
