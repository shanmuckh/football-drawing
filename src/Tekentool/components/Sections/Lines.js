import React from 'react'

import './Controls.scss'
import './Section.scss'

const Lines = ({ setLineType, lineSelected }) => (

  <section id="line-control-container" className="Section Line-control-container">
    <h2 className="Section-heading">Draw lines</h2>
    <div className="Section_Line-Btns">
      <button onClick={setLineType} data-variation="line-dotted" className={`Button Button--alt${lineSelected === 'line-dotted' ? ' Button--active' : ''}`}>
        <span className="u-visuallyhidden">Draw with dotted line</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 10 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-230, -659)" fill="#333333">
              <g transform="translate(165, 95)">
                <g transform="translate(40, 511)">
                  <g transform="translate(0, 35)">
                    <path fill="currentColor" d="M31 26L31 28 29 28 29 26 25 26 30 18 35 26 31 26ZM29 31L31 31 31 35 29 35 29 31ZM29 38L31 38 31 42 29 42 29 38Z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button onClick={setLineType} data-variation="line-solid" className={`Button Button--alt${lineSelected === 'line-solid' ? ' Button--active' : ''}`}>
        <span className="u-visuallyhidden">Draw with solid line</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 10 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-390, -659)" fill="#333333">
              <g transform="translate(165, 95)">
                <g transform="translate(40, 511)">
                  <g transform="translate(160, 35)">
                    <polygon fill="currentColor" points="31 26 31 42 29 42 29 26 25 26 30 18 35 26" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button onClick={setLineType} data-variation="line-squiggley" className={`Button Button--alt${lineSelected === 'line-squiggley' ? ' Button--active' : ''}`}>
        <span className="u-visuallyhidden">Draw with squiggley line</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 10 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-310, -659)" fill="#333333">
              <g transform="translate(165, 95)">
                <g transform="translate(40, 511)">
                  <g transform="translate(40, 11)">
                    <path fill="currentColor" d="M71 50L71 51.5C71 51.9 71.2 52.1 72.1 52.7 73.4 53.6 74 54.2 74 55.5 74 56.9 73.2 57.5 70.4 58.9 68.7 59.8 68 60.3 68 60.5 68 61.4 68.8 62.5 70.6 63.7L71 64 71 66 69 66 69 65C67 63.6 66 62.1 66 60.5 66 59.1 66.8 58.5 69.6 57.1 71.3 56.2 72 55.7 72 55.5 72 55.1 71.8 54.9 70.9 54.3 69.6 53.4 69 52.8 69 51.5L69 50 65 50 70 42 75 50 71 50Z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button onClick={setLineType} data-variation="line-shot" className={`Button Button--alt${lineSelected === 'line-shot' ? ' Button--active' : ''}`}>
        <span className="u-visuallyhidden">Draw with zig-zagged line</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 10 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-470, -659)" fill="#333333">
              <g transform="translate(165, 95)">
                <g transform="translate(40, 511)">
                  <g transform="translate(240, 35)">
                    <polygon fill="currentColor" points="25.7 32 31.3 32 29.3 26 25 26 30 18 35 26 31.3 26 34 34 28.3 34 31 42 29 42" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>

  </section>

)

export default Lines
