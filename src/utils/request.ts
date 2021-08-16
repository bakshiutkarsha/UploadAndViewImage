const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };
const BASE_URL = 'api/posts' 

type Method = 'POST' | 'GET';

interface HttpResponse<T> extends Response {
    parsedBody?: T;
  }

export async function handlePostRequest<T> (method: Method, url: string, body: any): Promise<HttpResponse<T>>  {
     const response: HttpResponse<T> = await fetch(`${BASE_URL}/${url}`, {
        method: method,
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body),
    });
    response.parsedBody = await response.json();
    return response;
}