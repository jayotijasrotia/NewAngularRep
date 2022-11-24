export interface Funds {
    FundGroupID: number;
    FundGroupName: string;
    RefreshInterval: number;
}

export interface DataForDialog{
    fundlist : Funds[];
    activeFundId: number;
    activeFundName:string;
    activeMode:string;
    }



