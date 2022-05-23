export interface Asset {
    assetName: string;
    assetSymbol: string;
    quantity: number;
    assetPercentage: number;
    assetPrice: number;
    assetImage: string;
}

export interface Portfolio {
    id?: number;
    name: string;
    author: string | number;
    composition: any[];
}
