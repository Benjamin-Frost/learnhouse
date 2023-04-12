import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { denyAccessToUser } from "../react/middlewares/views";

export const RequestBody = (method: string, data: any) => {
  let HeadersConfig = new Headers({ "Content-Type": "application/json" });
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
};

export const RequestBodyForm = (method: string, data: any) => {
  let HeadersConfig = new Headers({});
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
    body: data,
  };
  return options;
};

export const swrFetcher = async (url: string, body: any, router?: AppRouterInstance) => {
  // Create the request options
  let HeadersConfig = new Headers({ "Content-Type": "application/json" });
  let options: any = {
    method: "GET",
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
  };

  // If there is a body, add it to the request options
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    // Fetch the data
    const request = await fetch(url, options);
    let res = errorHandling(request);

    // Return the data
    return res;
  } catch (error: any) {
    if (router) {
      denyAccessToUser(error, router);
    }
    throw error;
  }
};

export const errorHandling = (res: any) => {
  if (!res.ok) {
    const error: any = new Error(`Error ${res.status}: ${res.statusText}`, {});
    error.status = res.status;
    throw error;
  }
  return res.json();
};