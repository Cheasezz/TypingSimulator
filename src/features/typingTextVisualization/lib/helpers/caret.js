const caret = 'classForCaret'
export function addCaret(classObj, classObjIdx, lastTypedCharIdx) {
  let index = classObjIdx.value[lastTypedCharIdx.value]
  classObj.value[index][caret] = false
  index = classObjIdx.value[lastTypedCharIdx.value + 1]
  if (!index) return
  classObj.value[index][caret] = true
}
export function removeCaret(classObj, classObjIdx, lastTypedCharIdx) {
  let index = classObjIdx.value[lastTypedCharIdx.value + 1]
  classObj.value[index][caret] = true
  index = classObjIdx.value[lastTypedCharIdx.value + 2]
  classObj.value[index][caret] = false
}
