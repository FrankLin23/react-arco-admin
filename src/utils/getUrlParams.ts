import qs from "query-string";
import { isSSR } from "@/utils/is";

export type ParamsType = Record<string, any>;

export default function getUrlParams(): ParamsType {
  const params = qs.parseUrl(!isSSR ? window.location.href : "").query;
  const returnParams: ParamsType = {};
  Object.keys(params).forEach((p) => {
    if (params[p] === "true") {
      returnParams[p] = true;
    } else {
      returnParams[p] = false;
    }
  });
  return returnParams;
}
