const ADMINISTRATION_PREFIX = '/admin';
const AUTH_PREFIX = '/admin/auth';

export const GlobalConstant = {
  API_PREFIX: '/api/v1',
  ADMINISTRATION_PREFIX,

  API_END_POINTS: {
    ADMINISTRATION: {
      GET_AUDIT_LOGS: `${ADMINISTRATION_PREFIX}/audit-logs`,
      GET_AUDIT_LOGS_EXPORT: `${ADMINISTRATION_PREFIX}/audit-logs/export`,
      GET_ADMIN_PROFILE: `${ADMINISTRATION_PREFIX}/profile`,
      GET_ADMIN: `${ADMINISTRATION_PREFIX}`,
      GET_ADMIN_PROFILE_IMAGE_URL: `${ADMINISTRATION_PREFIX}/profile/image-url`,
      GET_ADMIN_ARCHIVED: `${ADMINISTRATION_PREFIX}/archived`,
      GET_ADMIN_LIMIT_REQUESTS: `${ADMINISTRATION_PREFIX}/limit-requests`,
    },
    AUTH: {
      LOGIN: `${AUTH_PREFIX}/login`,
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
