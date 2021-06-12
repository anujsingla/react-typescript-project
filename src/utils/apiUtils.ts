import { filter, map, random } from "lodash";
import { IResource } from "../models/apiUtils";

export interface IDeleteResourcePayload {
  id: number;
}

export interface IResourcPayload {
  resource: Partial<IResource>;
}

export interface IResourcPayload {
  resource: Partial<IResource>;
}

const mockResourceData = new Array(7).fill(0).map((v, i) => ({
  id: i,
  title: `Post ${i}`,
}));

let data = mockResourceData;

export const fetchResources = async (): Promise<IResource[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data ?? [];
};

export const deleteResource = async ({
  id,
}: IDeleteResourcePayload): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  data = filter(data, (d) => d.id !== id);
};

export const editResource = async ({
  resource,
}: IResourcPayload): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  data = map(data, (m) => {
    if (m.id === resource.id) {
      return {
        ...m,
        ...resource,
      };
    } else {
      return m;
    }
  });
};

export const addNewResource = async ({
  resource,
}: IResourcPayload): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  data.push({
    id: random(100, 200),
    title: resource.title || "",
  });
};
