const API_PREFIX = '/api';
const ADMINISTRATION_PREFIX = '/admin';
/** Auth under /api/v1; use '/admin/auth' instead if your backend has no api/v1 for auth */
const AUTH_PREFIX = `${API_PREFIX}/admin/auth`;

export const GlobalConstant = {
  API_PREFIX,
  ADMINISTRATION_PREFIX,

  API_END_POINTS: {
    ADMINISTRATION: {
      GET_AUDIT_LOGS: `${API_PREFIX}${ADMINISTRATION_PREFIX}/audit-logs`,
      GET_AUDIT_LOGS_EXPORT: `${API_PREFIX}${ADMINISTRATION_PREFIX}/audit-logs/export`,
      GET_ADMIN_PROFILE: `${API_PREFIX}${ADMINISTRATION_PREFIX}/profile`,
      GET_ADMIN: `${API_PREFIX}${ADMINISTRATION_PREFIX}`,
      GET_ADMIN_PROFILE_IMAGE_URL: `${API_PREFIX}${ADMINISTRATION_PREFIX}/profile/image-url`,
      GET_ADMIN_ARCHIVED: `${API_PREFIX}${ADMINISTRATION_PREFIX}/archived`,
      GET_ADMIN_LIMIT_REQUESTS: `${API_PREFIX}${ADMINISTRATION_PREFIX}/limit-requests`,
    },
    AUTH: {
      LOGIN: `${API_PREFIX}/UserApp/login`,
      CREATE_ACCOUNT: `${API_PREFIX}/UserApp/CreateNewUser`,
    },
  },
  REGULAR_EXPRESSIONS: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
    TIME: /^\d{2}:\d{2}:\d{2}$/,
    DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  },
};
