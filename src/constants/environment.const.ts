export const ENVIRONMENT = process.env as Environment;

interface Environment extends NodeJS.ProcessEnv {
  REACT_APP_SWAGGER_FILE: string;
  REACT_APP_EMPLOYEE_API_ENDPOINT: string;
  REACT_APP_FORM_MODE: 'hook' | 'formik';
  REACT_APP_API_MODE: 'fake' | 'real';
}
