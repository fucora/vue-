import recordCheckApi from './recordCheck';
import logQueryApi from './logQuery';
import dataStatisticsApi from './dataStatistics';
const API = {
    ...recordCheckApi,
    ...logQueryApi,
    ...dataStatisticsApi
};
export default API;
