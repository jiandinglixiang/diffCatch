function errorTip (obj, upType, backType) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('类型不服合!', obj, '实际=', upType, '预期=', backType)
  }
}

function diffCatch (value, defaultValue) {
  if (value === undefined) return defaultValue
  const upType = typeof value
  const backType = typeof defaultValue
  if (backType === 'object') {
    // 复杂类型
    if (upType !== 'object') {
      errorTip(value, upType, backType)
      return defaultValue
    }
    const type1 = Object.prototype.toString.call(defaultValue)
    const type2 = Object.prototype.toString.call(value)
    if (type1 === type2) {
      if (type2 === '[object Object]') {
        return Object.entries(defaultValue).reduce(function (init, arr) {
          init[arr[0]] = diffCatch(init[arr[0]], arr[1])
          return init
        }, { ...value })
      }
      return value
    }
    // errorTip(value, type2, type1)
    return defaultValue
  }
  if (backType === upType) {
    return value
  }
  if (backType === 'number' && upType === 'string') {
    // errorTip(value, upType, backType)
    return (value && parseFloat(value)) || defaultValue
  }
  errorTip(value, upType, backType)
  return defaultValue
}

export default diffCatch
