import {brandTableMap} from "@/types/types";

export function getTable<
    TBrand extends keyof typeof brandTableMap,
    TTable extends keyof typeof brandTableMap[TBrand]
>(
    brand: TBrand,
    tableType: TTable
): typeof brandTableMap[TBrand][TTable] {
    return brandTableMap[brand][tableType];
}