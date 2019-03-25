pipeline {
  agent any
  parameters {
        string(name: 'nodeName', defaultValue: 'iotdevweb', description: 'build this project to which node')
        string(name: 'registryHost', defaultValue: 'registry-internal.cn-hangzhou.aliyuncs.com', description: 'the ali registry address')
		string(name: 'registryNamespace', defaultValue: 'midea-iot', description: 'the ali registry namespace')
		string(name: 'registryName', defaultValue: 'iotdeveloperweb', description: 'the ali registry name')
    }
  stages {
    stage('Build iotdevweb') {
    	environment {    		
    		packageSerHost = "10.168.220.229"
    		iotdevwebpath = "dist/dist.zip"      		 		
    	}
    	agent {
    		label "iotdevweb"
    	}
      steps {
      	  sh 'cp -af /root/node_modules .'
          sh 'npm --registry https://registry.npm.taobao.org install'
          sh 'cp -af node_modules /root/'
          sh 'npm run build && cd dist; zip -q -r dist.zip *'
      }
      post {
    	success {
    		sh 'ssh mcloud@${packageSerHost} "[[ ! -d "/app/output/developer-abroad-web" ]] && mkdir -pv /app/output/developer-abroad-web || exit 0"'
    		sh 'scp ${iotdevwebpath} mcloud@${packageSerHost}:/app/output/developer-abroad-web/developer-abroad-web-${BRANCH_NAME}-${GIT_COMMIT}.zip'
    	}
    }
    }

  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
}