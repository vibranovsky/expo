import axios from 'axios'
class Requests {
  getUrl = (path: string) => {
    return `https://futures-api.poloniex.com/api/v2/${path}`
  }

  async getStocks () {
    const result = await axios.get(this.getUrl('tickers'))
    return result.data.data
  }
}

export default new Requests()
