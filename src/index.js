import diffCatch from './diffCatch/diffCatch'

export default function (value) {
  return (defaultValue) => diffCatch(value, defaultValue)
}
