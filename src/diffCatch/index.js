// export function diffCatch (value, defaultValue) {
//   if (value === undefined || value === null) return defaultValue
//   const [upType, backType] = [typeof value, typeof defaultValue]
//   if (backType === 'object') {
//     // 复杂类型
//     if (upType !== 'object') {
//       if (process.env.NODE_ENV !== 'production') {
//         console.warn('类型不服合!', value, '实际=', upType, '预期=', backType)
//       }
//       return defaultValue
//     }
//     const type1 = Object.prototype.toString.call(defaultValue)
//     const type2 = Object.prototype.toString.call(value)
//     if (type1 === type2) {
//       if (type2 === '[object Object]') {
//         return Object.entries(defaultValue).reduce(function (init, arr) {
//           init[arr[0]] = diffCatch(init[arr[0]], arr[1])
//           return init
//         }, { ...value })
//       }
//       return value
//     }
//     // errorTip(value, type2, type1)
//     return defaultValue
//   }
//   if (backType === upType) {
//     return value
//   }
//   if (backType === 'number' && upType === 'string') {
//     // errorTip(value, upType, backType)
//     return (value && parseFloat(value)) || defaultValue
//   }
//   if (process.env.NODE_ENV !== 'production') {
//     console.warn('类型不服合!', value, '实际=', upType, '预期=', backType)
//   }
//   return defaultValue
// }
// 12312312312
function eq (value1, value2) {
  const [type, backType] = [typeof value1, typeof value2]
  if (backType !== 'object') {
    // 默认非引用类型
    if (type === backType) {
      // 基础类型不相等
      return true
    }
    // 基础类型不相等
    return false
  }
  if (type !== 'object') {
    // 类型不相等
    return false
  }
  const type1 = Object.prototype.toString.call(value1)
  const type2 = Object.prototype.toString.call(value2)
  if (type1 === type2) {
    if (type2 === '[object Object]') {
      return true
    }
    return true
  }
  return false
}

export function diffCatch (value, defaultValue) {
  if (value === undefined || value === null) return defaultValue

  let compound = { ...value }
  let path = [
    {
      key: [], // 访问路径
      def: {
        a: {},
        b: {}
      }, // 默认值
      val: null // 比对值
    }
  ]
  // value 深拷贝对象
  while (true) {
    if (path === null) break
    const copyPath = [...path]
    path = null
    copyPath.forEach(function (obj1) {
      Object.keys(obj1.def).forEach(function (key) {
        const [type, backType] = [typeof obj1.val[key], typeof obj1.def[key]]
        if (backType !== 'object') {
          // 默认非引用类型
          if (type !== backType) {
            // 基础类型不相等
            obj1.val[key] = obj1.def[key]
            return
          }
          return
        }
        if (type !== 'object') {
          // 基础类型不相等
          obj1.val[key] = obj1.def[key]
          return
        }
        const type1 = Object.prototype.toString.call(obj1.val[key])
        const type2 = Object.prototype.toString.call(obj1.def[key])
        if (type1 !== type2) {
          // 类型不相等
          obj1.val[key] = obj1.def[key]
          return
        }
        if (type2 === '[object Object]') {
          path.push({
            key: [...obj1.key, key],
            def: obj1.def[key],
            val: { ...obj1.val[key] }
          })
        }
      })
    })
  }
}

export default diffCatch

const sasd = diffCatch({}, {
  a: 1,
  b: {}
})
console.log(sasd.a)
