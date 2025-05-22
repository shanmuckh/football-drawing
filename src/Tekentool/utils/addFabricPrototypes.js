import { fabric } from 'fabric'
// import { objectActiveColor } from '../options'

// set some smart defaults
fabric.Object.prototype.originX = 'center'
fabric.Object.prototype.originY = 'center'
fabric.Object.NUM_FRACTION_DIGITS = 10
fabric.Object.prototype.borderScaleFactor = 0
fabric.Object.prototype.borderOpacityWhenMoving = 0
// fabric.Object.prototype.borderColor = objectActiveColor

// we need to add more functionality into fabric.
// this gives us the ability to search the canvas for an object with a given name
fabric.Canvas.prototype.getItemsByName = function (name) {
  let objectList = []
  const objects = this.getObjects()

  for (let i = 0, len = this.size(); i < len; i++) {
    if (objects[i].name && objects[i].name === name) {
      objectList.push(objects[i])
    }
  }

  return objectList
}

// adding more functionality into fabric
// this allows us to store custom keys in fabric objects
// should be basic fabric functionality, but fuck.
fabric.Object.prototype.toObject = (function (toObject) {
  return function (propertiesToInclude) {
    propertiesToInclude = (propertiesToInclude || []).concat(
      [
        'id',
        'type',
        'variation',
        // 'defaultIcon',
        // 'alternateIcon',
      ]
    )
    return toObject.apply(this, [propertiesToInclude])
  }
})(fabric.Object.prototype.toObject)

// fabric is a nightmare https://github.com/fabricjs/fabric.js/issues/4598
// this fixes a bug where the serialization import of complex svg files was failing. kinda a big issue.
fabric.Group.fromObject = function(object, callback) {
  if (typeof object.objects === 'string') {
    const pathUrl = object.objects // object.objects contain url of svg object
    object.sourcePath = pathUrl

    fabric.loadSVGFromURL(pathUrl, function (objects, options) {
      const path = fabric.util.groupSVGElements(objects, options)
      path.setOptions(object)
      callback && callback(path)
    })
  } else {
    fabric.util.enlivenObjects(object.objects, function(enlivenedObjects) {
      const options = fabric.util.object.clone(object, true)
      delete options.objects
      callback && callback(new fabric.Group(enlivenedObjects, options, true))
    })
  }
}
