import { useMutation, UseMutationOptions } from "react-query";
import {
  deleteResource,
  IDeleteResourcePayload,
  IResourcPayload,
  editResource,
  addNewResource,
} from "../utils/apiUtils";

export function useDeleteResource(
  options?: UseMutationOptions<void, Error, IDeleteResourcePayload>
) {
  return useMutation(deleteResource, {
    ...options,
  });
}

export function useEditResource(
  options?: UseMutationOptions<void, Error, IResourcPayload>
) {
  return useMutation(editResource, {
    ...options,
  });
}

export function useAddNewResource(
  options?: UseMutationOptions<void, Error, IResourcPayload>
) {
  return useMutation(addNewResource, {
    ...options,
  });
}
