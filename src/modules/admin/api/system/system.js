import systemManagementApi from './systemManagement';
import configurationManagementApi from './configurationManagement';
import auditsManagementApi from './auditsManagement';
import licenseManagementApi from './licenseManagement';
const API = {
  ...systemManagementApi,
  ...configurationManagementApi,
  ...auditsManagementApi,
  ...licenseManagementApi
};

export default API;