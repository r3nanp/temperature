export type Temperature = {
  id: string
  from: string
  to: string
  multiplier: number
  offset: number
  offset_add: number
  created_at: Date
  updated_at: Date
}

export type QueryTemperature = {
  temperatures: Temperature[]
}

export type RawTemperature = Omit<
  Temperature,
  'id' | 'created_at' | 'updated_at'
>
