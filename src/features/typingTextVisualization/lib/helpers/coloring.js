const green = 'text-teal-400'
const red = 'text-red-300'
export function removeColor(classObj, classObjIdx, lastTypedCharIdx) {
  const index = classObjIdx.value[lastTypedCharIdx.value + 1]

  classObj.value[index][green] = false
  classObj.value[index][red] = false
}
export function addColor(correctChar, classObj, classObjIdx, lastTypedCharIdx) {
  const index = classObjIdx.value[lastTypedCharIdx.value]
  if (!index) return

  if (!correctChar.value) {
    classObj.value[index][red] = true
  } else {
    classObj.value[index][green] = true
  }
}
