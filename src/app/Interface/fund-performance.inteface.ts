export interface FundPerformance {
    nonBaseCash: any[]
    PositionLong: number
    PositionShort: number
    PositionCashLong: number
    PositionCashShort: number
    YTD: number
    QTD: number
    MTD: number
    Daily: number
    MTDPercent: number
    DailyPercent: number
    YesterdayNAV: number
    CurrentNAV: number
    PositionLongExposure: number
    PositionShortExposure: number
    PositionNetExposure: number
    PositionGrossExposure: number
    Message: any
    FundName: string
    FundID: number
    numberOfPositions: number
    numberOfLongs: number
    numberOfShorts: number
    numberOfTransactions: number
    valueOfBaseCash: number
    valueOfBorrowing: number
  }