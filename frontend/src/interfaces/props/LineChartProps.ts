export default interface LineChartProps {
  coinHistory: {
    data: {
      history: {
        price: string,
        timestamp: number,
      }[]
    }
  },
  currentPrice: string,
  coinName: string

}