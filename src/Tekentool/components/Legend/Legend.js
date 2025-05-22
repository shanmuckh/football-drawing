import React from 'react'

import './Legend.scss'

const Legend = ({
  isVisible,
  onLegendClick,
  itemTypes,
  iconType,
  goalTypes,
  coneTypes,
  shirtTypes,
}) => (
  <section id="js-legend" className={`Legend${isVisible ? ' is-visible' : ''}`}>
    <div className="Legend_Header">
      <h2 className="Section-heading">Legenda</h2>

      <button onClick={onLegendClick} className="Legend_Close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1223, -135)" fill="#253780">
              <polygon points="1234 135 1235 136 1230 141 1235 146 1234 147 1229 142 1224 147 1223 146 1228 141 1223 136 1224 135 1229 140"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>

    <ul className="Legend_List">
      {shirtTypes.map(item => (
        <li
          key={item.variation}
          className="Legend_List-item"
          data-variation={item.variation}
          data-width={item.width}
          data-height={item.height}
          data-src={item[iconType]}
        >
          <div dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }} />
          <span className="Legend_Caption">{item.variation}</span>

        </li>

      ))}
      {itemTypes.map(item => (
        <li
          key={item.variation}
          className="Legend_List-item"
          data-variation={item.variation}
          data-width={item.width}
          data-height={item.height}
          data-src={item[iconType]}
        >
          <div dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }} />
          <span className="Legend_Caption">{item.variation}</span>

        </li>
      ))}
      {goalTypes.map(item => (
        <li
          key={item.variation}
          className="Legend_List-item"
          data-variation={item.variation}
          data-width={item.width}
          data-height={item.height}
          data-src={item[iconType]}
        >
          <div dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }} />
          <span className="Legend_Caption">{item.variation}</span>

        </li>
      ))}
      {coneTypes.map(item => (
        <li
          key={item.variation}
          className="Legend_List-item"
          data-variation={item.variation}
          data-width={item.width}
          data-height={item.height}
          data-src={item[iconType]}
        >
          <div dangerouslySetInnerHTML={{ __html: item[`svg-${iconType}`] }} />
          <span className="Legend_Caption">{item.variation}</span>

        </li>
      ))}
    </ul>

  </section>
)

export default Legend
