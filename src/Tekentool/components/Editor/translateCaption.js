// This is where we customise the text that appears in the Editor popup.
export default variation => {
  switch (variation) {
    // Shirts
    case 'shirt-attack':
      return 'Attacker'
    case 'shirt-defend':
      return 'Defender'
    case 'shirt-trainer':
      return 'Trainer / Coach'

    // Goals
    case 'goal-01':
      return 'Large goal'
    case 'goal-02':
      return 'Small goal'
    case 'goal-03':
      return 'Mini goal'

    // Lines
    case 'line-dotted':
      return 'Walk'
    case 'line-solid':
      return 'Pass'
    case 'line-squiggley':
      return 'Dribble'
    case 'line-shot':
      return 'Shot'

    // Cones
    case 'cone-white':
      return 'Cone (white)'
    case 'cone-yellow':
      return 'Cone (yellow)'
    case 'cone-orange':
      return 'Cone (orange)'
    case 'cone-purple':
      return 'Cone (purple)'

    // Items
    case 'ball':
      return 'Ball'
    case 'witches-hat':
      return 'Hat'

    default:
      return ''
  }
}
