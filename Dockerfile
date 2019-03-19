FROM registry-internal.cn-hangzhou.aliyuncs.com/midea-iot/jdk-1.8.0_92:latest
ARG mvnRegistryHostPort=http://10.168.220.229:12345
ENV mvnRegistryHostPort=${mvnRegistryHostPort}
ARG appName
ENV appName=${appName}
ARG BRANCH_NAME
ENV BRANCH_NAME=${BRANCH_NAME}
ARG BUILD_NUMBER
ENV BUILD_NUMBER=${BUILD_NUMBER}
ARG packagetype=jar
ENV packagetype=${packagetype}
ENV dataPath=/app

WORKDIR ${dataPath}/${appName}/conf
ADD ${mvnRegistryHostPort}/conf/${appName}/${appName}.yml ${appName}.yml
ADD ${mvnRegistryHostPort}/conf/${appName}/logback.xml logback.xml

WORKDIR ${dataPath}/${appName}/bin
ADD ${mvnRegistryHostPort}/${appName}/${appName}-${BRANCH_NAME}-${BUILD_NUMBER}.${packagetype} ${appName}-${BRANCH_NAME}-${BUILD_NUMBER}.${packagetype} 
RUN ln -sf ${appName}-${BRANCH_NAME}-${BUILD_NUMBER}.${packagetype} ${appName}.${packagetype}
ADD entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh
CMD ${dataPath}/${appName}/bin/entrypoint.sh "-xml256m" ${appName}