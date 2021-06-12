import { useQuery, UseQueryOptions } from "react-query";
import { ReactQueryConstant } from "../enums/ReactQueryConsts";
import { IResource } from "../models/apiUtils";
import { fetchResources } from "../utils/apiUtils";

export function useGetResource(options?: UseQueryOptions<IResource[], Error>) {
  return useQuery([ReactQueryConstant.RESOURCES], fetchResources, {
    ...options,
  });
}
