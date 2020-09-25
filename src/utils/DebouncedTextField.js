import * as React from "react"
import * as _ from "lodash"

export default function DebouncedTextField({ parentValue, setParentValue, inputParams, debounceTime = 250 }) {
  const [localValue, setLocalValue] = React.useState(parentValue || "")

  React.useEffect(() => {
    setLocalValue(parentValue)
  }, [parentValue])

  const handleChange = React.useCallback(
    _.debounce(s => {
      setParentValue(s)
    }, debounceTime),
    []
  )

  return (
    <input type='text'
    onChange={e => {
        setLocalValue(e.target.value)
        handleChange(e.target.value)
      }}
    value={localValue}
    {...inputParams}
  />
  )
}
