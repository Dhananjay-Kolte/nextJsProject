import { GET_INSPECTION, PATCH_INSPECTION, POST_INSPECTION } from "../endpint";

const token = process.env.NEXT_PUBLIC_BACKEND_TOKEN;

export const headerContentWithAuthorization = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}

const customHeaders = () => {
  let copiedHeaderContentWithAuthorization = {
    ...headerContentWithAuthorization
  }
  copiedHeaderContentWithAuthorization['Authorization'] = `Bearer ${token}`
  return copiedHeaderContentWithAuthorization
}

const customerServices = {
  // Post Inspection API
  postInspection: async (payload:any) => 
     fetch(POST_INSPECTION.endpoint, {
      method: POST_INSPECTION.method,
      headers: customHeaders(),
      body: JSON.stringify({ data: payload }),
    })
      .then(resp => {
        return resp.json()
      })
      .catch(err => console.log(err)),

  getInspection: async () => 
    fetch(GET_INSPECTION.endpoint, {
      method: GET_INSPECTION.method,
      headers: customHeaders()
    }),

  patchInspection: async (id:any,payload:any) => 
    fetch(`${PATCH_INSPECTION.endpoint}/${id}`,{
      method: PATCH_INSPECTION.method,
      headers: customHeaders(),
      body: JSON.stringify({ data: payload }),
    }).then(resp => {console.log('respresp:', resp);
    }).catch(err => console.log(err)),

  getInspectionById: async (id: string) => {
    return fetch(`${GET_INSPECTION.endpoint}/${id}`, {
      method: GET_INSPECTION.method,
      headers: customHeaders()
    });
  }
}

export default customerServices;
