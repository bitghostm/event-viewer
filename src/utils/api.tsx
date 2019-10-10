import qs from 'query-string';
import jsonp from 'jsonp';

const baseUrl = 'https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge';

export const makeRequest = (relativeUrl: string, query = {}) => {
  const queryString = qs.stringify({
    api: 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2',
    ...query,
  });
  return `${baseUrl}${relativeUrl}?${queryString}`;
};

export function request(relativeUrl: string, query = {}, cb: (err: any, data: any) => void) {
  jsonp(makeRequest(relativeUrl, query), cb);
}