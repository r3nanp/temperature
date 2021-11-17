import Head from 'next/head'
import { useState, useEffect, FormEvent, useCallback } from 'react'
import { GetStaticProps } from 'next'

import { initializeApollo } from 'utils/apollo'
import { QUERY_TEMPERATURES } from 'graphql/queries/home'
import { QueryTemperature, RawTemperature } from 'graphql/types/temperature'
import { convertTemperature, getUniqueTemperature } from 'utils/converter'
import { Select } from 'components/Select'

type HomeProps = {
  temperatures: RawTemperature[]
}

export default function Home({ temperatures }: HomeProps) {
  const [answer, setAnswer] = useState('')
  const [from, setFrom] = useState('C')
  const [to, setTo] = useState('F')
  const [temperature, setTemperature] = useState(1)
  const [options, setOptions] = useState<RawTemperature[] | string[]>([])

  useEffect(() => {
    return setOptions(getUniqueTemperature(temperatures, 'from'))
  }, [temperatures])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      setAnswer(
        `${convertTemperature({
          temperatures,
          from,
          to,
          value: temperature,
        })} ${to}`
      )
    },
    [from, temperature, temperatures, to]
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Temperature Converter</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex items-center">
          <h1 className="text-6xl font-bold mx-4">Temperature</h1>
          <p className="text-6xl font-bold text-blue-600">Converter</p>
        </div>
        <form className="space-y-4 text-gray-700" onSubmit={handleSubmit}>
          <div className="flex flex-wrap"></div>
          <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
            <div className="container">
              <label className="block mb-1">From</label>
              <Select
                value={from}
                onChange={event => {
                  setFrom(event.target.value)
                }}
              >
                {options.map((temperature, index) => (
                  <option value={temperature.from} key={index}>
                    {temperature}
                  </option>
                ))}
              </Select>
            </div>

            <div className="container">
              <label className="block mb-1">To</label>
              <Select value={to} onChange={event => setTo(event.target.value)}>
                {options.map((temperature, index) => (
                  <option value={temperature.to} key={index}>
                    {temperature}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
            <div className="container">
              <label className="block mb-1">Value</label>
              <input
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="number"
                value={temperature}
                onChange={e => {
                  setTemperature(Number(e.target.value))
                }}
              />
            </div>
            <div className="container">
              <button
                className="w-full h-10 px-3 my-7 cursor-pointer text-base border bg-gray-200 rounded-lg focus:shadow-outline hover:bg-blue-600 hover:text-white"
                type="submit"
              >
                <p>Convert</p>
              </button>
            </div>
          </div>
        </form>
        <div>Result is: {answer}</div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { temperatures },
  } = await apolloClient.query<QueryTemperature>({
    query: QUERY_TEMPERATURES,
  })

  return {
    props: {
      temperatures,
    },
  }
}
