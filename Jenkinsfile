pipeline {
  agent any
  stages {
    stage('Build abroad-web-openresty') {
    	agent {
    		label "iotdevweb"
    	}
      steps {
      	  sh 'cp -af /root/node_modules .'
          sh 'npm --registry https://registry.npm.taobao.org install'
          sh 'cp -af node_modules /root/'
          sh 'npm run build && cd dist; zip -q -r dist.zip *'
      }
    }
    stage('copy target to master') {	
      agent {
    		label "ubuntu"
    	}
      steps {
          sh 'docker cp iotdevweb:${workspace}/dist/dist.zip /app/output/abroad-web-openresty/abroad-web-openresty-${BRANCH_NAME}-${GIT_COMMIT}.zip'
      	  sh 'cd /app/k8s/dockerfile/abroad-web-openresty; cp -f /app/output/abroad-web-openresty/abroad-web-openresty-${BRANCH_NAME}-${GIT_COMMIT}.zip abroad-web-openresty.zip && docker build -t registry.us-west-1.aliyuncs.com/oversea-midea-iot/abroad-web-openresty:${GIT_COMMIT} .'	
      }
    }
    stage('Push image') {
        	agent {        		
        		label 'ubuntu'
        	}
        	environment {
        		registryUser = 'jackey13265593109@163.com'
                registryPass = credentials('aliyunMediaIotRegistryPass')
            }
        	steps {      		
        		sh "docker login -u $registryUser -p $registryPass registry.us-west-1.aliyuncs.com && docker push registry.us-west-1.aliyuncs.com/oversea-midea-iot/abroad-web-openresty:${GIT_COMMIT}"
        	}
        }
    stage('Deploy') {
        	agent {        		
        		label 'ubuntu'
        	}
        	steps {      		
        		sh "kubectl set image deployment/abroad-web-openresty-d abroad-web-openresty=registry.us-west-1.aliyuncs.com/oversea-midea-iot/abroad-web-openresty:${GIT_COMMIT}"
        		sh "sleep 60"
        		sh "kubectl get pods"
        	}
        }  
}

  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
}