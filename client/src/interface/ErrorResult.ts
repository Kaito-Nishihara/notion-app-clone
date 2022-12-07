type ErrorResult = {
  success: boolean;
  errors: ErrorItem[];
  error: string;
};

type ErrorItem = {
  param: string;
  msg: string;
};

export default ErrorResult;
