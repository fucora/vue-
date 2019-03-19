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
    		sh 'ssh mcloud@${packageSerHost} "[[ ! -d "/app/output/iotdevweb-002" ]] && mkdir -pv /app/output/iotdevweb-002 || exit 0"'
    		sh 'scp ${iotdevwebpath} mcloud@${packageSerHost}:/app/output/iotdevweb-002/iotdevweb-002-${BRANCH_NAME}-${GIT_COMMIT}.zip'
    	}
    }
    }
    stage('Deploy dev') {
    	   environment {    		
    			packageName = "iotdevweb-002-${BRANCH_NAME}-${GIT_COMMIT}.zip"     		 		
    		}
    		agent {
    			label "master"
    		}
    		steps {
    			sh '/app/scripts/deploy-iotdevweb-002-dev.sh'
    		}
     }
    stage('Deploy sit') {
    	options {
        		timeout(time: 30, unit: 'MINUTES') 
      		}
      		input {
          	message "Deploy or Not?"
          	submitter "liangyb,lipingliang,dengyx2"
          	ok "Deploy it!"
          }
    	   environment {    		
    			packageName = "iotdevweb-002-${BRANCH_NAME}-${GIT_COMMIT}.zip"     		 		
    		}
    		agent {
    			label "master"
    		}
    		steps {
    			sh '/app/scripts/deploy-iotdevweb-002.sh'
    		}
     }    
  }
  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
}