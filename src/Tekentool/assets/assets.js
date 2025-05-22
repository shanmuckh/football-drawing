// This file is where all assets are imported and configured, including each assets' alternate icons

// Default Icons
import shirt from '../assets/default/shirt.svg'
import ball from '../assets/default/ball.svg'
import witchesHat from '../assets/default/witches-hat.svg'
import cone from '../assets/default/cone.svg'

// Alternate Icons
import triangle from '../assets/alternate/triangle.svg'
import square from '../assets/alternate/square.svg'
import circle from '../assets/alternate/circle.svg'

// Goals
import goal01 from '../assets/goals/goal01.svg'
import goal02 from '../assets/goals/goal02.svg'
import goal03 from '../assets/goals/goal03.svg'

// fields
import field01 from '../assets/fields/field01.svg'
import field02 from '../assets/fields/field02.svg'
// import field03 from '../assets/fields/field03.svg'
// import field04 from '../assets/fields/field04.svg'
// import field05 from '../assets/fields/field05.svg'
// import field06 from '../assets/fields/field06.svg'

export const shirtTypes = [
  {
    'variation': 'shirt-attack',
    'defaultIcon': shirt,
    'alternateIcon': triangle,
    'color': '#F36C21',
    'width': 42,
    'height': 52,
  },
  {
    'variation': 'shirt-defend',
    'defaultIcon': shirt,
    'alternateIcon': square,
    'color': '#4255CC',
    'width': 42,
    'height': 52,
  },
  {
    'variation': 'shirt-trainer',
    'defaultIcon': shirt,
    'alternateIcon': square,
    'color': '#333333',
    'width': 42,
    'height': 52,
  },
]

export const goalTypes = [
  {
    'variation': 'goal-01',
    'defaultIcon': goal01,
    'alternateIcon': square,
    'width': 92,
    'height': 36,
  },

  {
    'variation': 'goal-02',
    'defaultIcon': goal02,
    'alternateIcon': square,
    'width': 85,
    'height': 24,
  },
  {
    'variation': 'goal-03',
    'defaultIcon': goal03,
    'alternateIcon': square,
    'width': 48,
    'height': 24,
  },
]

export const itemTypes = [
  {
    'variation': 'ball',
    'defaultIcon': ball,
    'alternateIcon': circle,
    'width': 30,
    'height': 30,
  },
  {
    'variation': 'witches-hat',
    'defaultIcon': witchesHat,
    'alternateIcon': square,
    'width': 32,
    'height': 25,
  },
]

export const coneTypes = [
  {
    'variation': 'cone-white',
    'color': '#EEEEEE',
    'defaultIcon': cone,
    'alternateIcon': square,
    'width': 32,
    'height': 25,
  },
  {
    'variation': 'cone-yellow',
    'color': '#ECCB17',
    'defaultIcon': cone,
    'alternateIcon': square,
    'width': 32,
    'height': 25,
  },
  {
    'variation': 'cone-orange',
    'color': '#F56200',
    'defaultIcon': cone,
    'alternateIcon': circle,
    'width': 32,
    'height': 25,
  },
  {
    'variation': 'cone-purple',
    'color': '#DE4EA3',
    'defaultIcon': cone,
    'alternateIcon': square,
    'width': 32,
    'height': 25,
  },
]

export const fieldTypes = [
  {
    'variation': 'field-01',
    'defaultIcon': field01,
    'alternateIcon': field01,
    'width': 20,
    'height': 20,
    'text': '30/35 x 20/25',
  },
  {
    'variation': 'field-02',
    'defaultIcon': field02,
    'alternateIcon': field02,
    'width': 20,
    'height': 20,
    'text': '40/35 x 20/25',
  },
  {
    'variation': 'field-03',
    'defaultIcon': field01,
    'alternateIcon': field01,
    'width': 20,
    'height': 20,
    'text': '50/35 x 20/25',
  },
  // {
  //   'variation': 'field-04',
  //   'defaultIcon': field04,
  //   'alternateIcon': field04,
  //   'width': 20,
  //   'height': 20,
  //   'text': '60/35 x 20/25',
  // },
  // {
  //   'variation': 'field-05',
  //   'defaultIcon': field05,
  //   'alternateIcon': field05,
  //   'width': 20,
  //   'height': 20,
  //   'text': '70/35 x 20/25',
  // },
  // {
  //   'variation': 'field-06',
  //   'defaultIcon': field06,
  //   'alternateIcon': field06,
  //   'width': 20,
  //   'height': 20,
  //   'text': '880/35 x 20/25',
  // },
]
