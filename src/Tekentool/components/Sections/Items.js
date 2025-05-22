import React from 'react'

import './Controls.scss'
import './Section.scss'

const Items = ({
  shirtTypes,
  goalTypes,
  itemTypes,
  coneTypes,
  useSymbols,
  iconType,
  isDragging,
}) => (

  <section id="draggable-container" className="Section">
    <h2 className="Section-heading">Drag &amp; drop items on the pitch</h2>

    <div className="Section_inner">
      <div className="Section_Asset-row">

        {shirtTypes.map(item => (
          <div
            key={item.variation}
            className="Draggable-item-wrap Asset--shirt"
            // className={`Draggable-item-wrap Asset--shirt${isDragging ? ' Controls_Img--base' : ''}`}
            draggable="true"
            data-variation={item.variation}
            data-color={item.color}
            data-width={item.width}
            data-height={item.height}
            data-default-icon={item.defaultIcon}
            data-alternate-icon={item.alternateIcon}
            data-src={item[iconType]}
            dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }}
          />
        ))}

      </div>
      <div className="Section_Asset-row">

        {goalTypes.map((item, i) => (
          <div
            key={item.variation}
            className={`Draggable-item-wrap Asset--goal-0${i + 1}`}
            draggable="true"
            data-variation={item.variation}
            data-width={item.width}
            data-height={item.height}
            data-src={item[iconType]}
            dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }}
          />
        ))}

      </div>
      <div className="Section_Asset-row">
        {itemTypes.map(item => (
          <div
            key={item.variation}
            className={`Draggable-item-wrap Asset--${item.variation}`}
            draggable="true"
            data-variation={item.variation}
            data-width={item.width}
            data-height={item.height}
            data-src={item[iconType]}
            dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }}
          />
        ))}

        {coneTypes.map(item => (
          <div
            key={item.variation}
            className="Draggable-item-wrap Asset--cone"
            draggable="true"
            data-variation={item.variation}
            data-color={item.color}
            data-width={item.width}
            data-height={item.height}
            data-src={item[iconType]}
            dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }}
          />
        ))}

      </div>
    </div>

  </section>

)

export default Items
