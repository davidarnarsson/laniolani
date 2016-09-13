import { formatMoney } from 'accounting'

export const format = (amt) => formatMoney(amt, { symbol: 'kr.', format: '%v %s', decimal: ',', thousand: '.', precision: 0 })