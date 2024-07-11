const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  del: 'DELETE',
  patch: 'PATCH'
}

export const POST_INSPECTION = {
  endpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inspections`,
  method: METHODS.post,
  successStatusCode: 200
}

export const GET_INSPECTION = {
  endpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inspections`,
  method: METHODS.get,
  successStatusCode: 200
}

export const WEBHOOK = {
  endpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/integration`,
  method: METHODS.post,
  successStatusCode: 200
}

export const PATCH_INSPECTION = {
  endpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inspections`,
  method: METHODS.put,
  successStatusCode: 200
}
