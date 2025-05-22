// This file is like a global store
// You don't modify the private variables
// Instead you set and get them, thusly:
// SET: store.lineType = 'dotted'
// GET: store.lineType

const store = {

  store: {
    fieldType: '', // eg: field02
    lineType: '', // eg: "line-shot". Must match what's in the DOM attribute [data-variation]
    iconType: 'defaultIcon', // or 'alternateIcon'
    selection: {}, // currently active object
    collection: [], // collection of everything on the canvas
  },

  update(type) {
    // eslint-disable-next-line
    // console.log('Store update:', type, this.store)
  },

  get lineType() {
    return this.store.lineType
  },
  set lineType(lineType) {
    this.store.lineType = lineType
    this.update('lineType')
  },
  get selection() {
    return this.store.selection
  },
  set selection(selection) {
    this.store.selection = selection
    this.update('selection')
  },
  get collection() {
    return this.store.collection
  },

  set addItem(item) {
    this.store.collection.push(item)
    this.update('addItem')
  },
  set removeItem(item) {
    // remove the specific item from the store based on the id
    // we create the id's ourselves whenever we create an object on the canvas
    this.store.collection.splice(this.store.collection.findIndex(i => i.id === item.id), 1)
    this.update('removeItem')
  },
  get iconType() {
    return this.store.iconType
  },
  set iconType(iconType) {
    this.store.iconType = iconType
    this.update('iconType')
  },
  get fieldType() {
    return this.store.fieldType
  },
  set fieldType(fieldType) {
    this.store.fieldType = fieldType
    this.update('fieldType')
  },
  clearCanvas() {
    // reset to initial state
    this.store = {
      fieldType: '',
      lineType: '',
      iconType: 'defaultIcon',
      selection: {},
      collection: [],
    }
    this.update('clearCanvas')
  },
}

store.update('init')

export default store
