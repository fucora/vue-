pipeline {
  agent any
  stages {
    stage('Build abroad-web-openresty') {
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
    }
    stage('copy target to master') {	
      agent {
    		label "ubuntu"
    	}
      steps {
          sh 'echo ${WORKSPACE}'
      }
    }  
}

  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
}