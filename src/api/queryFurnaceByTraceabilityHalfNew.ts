import { request } from "@/utils";
interface IQueryFurnaceByTraceabilityHalf {
  traceabilityHalf: string;
}

/**
 * 通过追溯单号半品查炉批号
 * @param params
 * @returns
 */
export const queryFurnaceByTraceabilityHalf = async (
  params: IQueryFurnaceByTraceabilityHalf
) => {
  try {
    const res = await request.get(
      "trasferCardManager/queryFurnaceByTraceabilityHalf",
      {
        params,
      }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
