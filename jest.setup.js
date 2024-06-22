// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch' // <-- yarn add whatwg-fetch

require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/helpers/getEnvironments', () => ({
  // eslint-disable-next-line no-undef
  getEnvironments: () => ({ ...process.env })
}))
