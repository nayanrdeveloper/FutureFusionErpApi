export interface MongoError extends Error {
  status?: number;
  code?: number;
  keyValue?: { [key: string]: any };
}

export const isMongoError = (error: any): error is MongoError => {
  return error.code !== undefined && error.keyValue !== undefined;
};
