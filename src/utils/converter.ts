import { RawTemperature } from '../graphql/types/temperature'

type ConvertTemperature = Pick<RawTemperature, 'from' | 'to'> & {
  temperatures: RawTemperature[]
  value: number
}

export const getFields = (
  temperatures: RawTemperature[],
  from: string,
  to: string
) => {
  return temperatures.find(
    temperature => temperature.from === from && temperature.to === to
  )
}

export const convertTemperature = ({
  from,
  to,
  temperatures,
  value,
}: ConvertTemperature) => {
  let convertedTemperature = 0
  let temperature: RawTemperature

  const convertTemperature = (
    temperatureValue: number,
    temperature: RawTemperature
  ) =>
    (temperatureValue + temperature.offset) * temperature.multiplier +
    temperature.offset_add

  switch (`${from}-${to}`) {
    case 'F-C':
      temperature = getFields(temperatures, from, to)
      convertedTemperature = convertTemperature(value, temperature)
      break

    case 'C-F':
      temperature = getFields(temperatures, from, to)
      convertedTemperature = convertTemperature(value, temperature)
      break

    case 'C-K':
      temperature = getFields(temperatures, from, to)
      convertedTemperature = convertTemperature(value, temperature)
      break

    case 'F-K':
      temperature = getFields(temperatures, from, to)
      convertedTemperature = convertTemperature(value, temperature)

      break
    case 'K-C':
      temperature = getFields(temperatures, from, to)
      convertedTemperature = convertTemperature(value, temperature)
      break

    case 'K-F':
      temperature = getFields(temperatures, from, to)
      convertedTemperature = convertTemperature(value, temperature)
      break

    default:
      convertedTemperature = value
      break
  }

  return convertedTemperature
}

export const getUniqueTemperature = (
  temperatures: RawTemperature[],
  key: 'from' | 'to'
) => {
  const keys = temperatures.map(temperature => {
    return temperature[key]
  })

  return [...new Set(keys)]
}
