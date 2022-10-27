@Library('vhi-shared-pipeline-library') _


def nexusRepositoryUrl = "https://nexus.vhihealthcare.net/repository/npm-private"
def repoName //derived from git checkout
def branchName = "master"

pipeline {
    agent { label 'npm_nexus' }
   
	
    	
    options {
      skipDefaultCheckout(true)   
    }
    
    stages {
	    stage('cleanup'){
		    steps{
			    script{
				    cleanWs()
			    }
		    }
	    }
	
	

			  stage('Checkout') {
				steps {
				  checkout scm
				  script {
            gitCommitShort = sh (script: '''git rev-parse --short HEAD''', returnStdout: true ).trim()
            env.GIT_COMMIT_SHORT=gitCommitShort
            gitURL = sh (script: '''git config --get remote.origin.url''', returnStdout: true ).trim() //returns git@github.vhihealthcare.net:web-engineering/ui_react_fact-find-poc.git
            repoName = (gitURL.split("/")[1]).split(".git")[0] 
            //branchName = sh (script: '''git rev-parse --abbrev-ref HEAD''', returnStdout: true ).trim()  
				  }
				}   
		}

    // Build stage is run before Unit Test as it does and NPM INSTALL which is needed for Running unit tests.
    stage('Build Dev') {
      steps {
        script {         
           npmBuild()
        }
      }
    }

    stage('Unit Tests') {
      steps {
        script {
          sh """
	  # 
	  # Take back up of package.json as install of react, react-scripts. html-react-parser will cause updates
	  # to dependency section in package.json. This may cause an issue in calling application as node_modules
	  # will be build into this ui_react_common-component dependency in node_modules in calling application.
	  # After tests are run we replace package.json with back up version so extra dependencies are not included.
	  # 
	  cp package.json package-bkup.json
	  npm install --save react@17.0.2 react-dom@17.0.2 react-scripts html-react-parser@1.4.10
	  npm run test:ci
	  rm -rf package.json
	  cp package-bkup.json package.json
 	  rm -rf package-bkup.json
          """
        }
      }   
    }
					
//     stage('Static Code Analysis') {
//       steps {
//         script {
//           SonarQube()
//         }
//       }   
//     }

     stage('BlackDuck - Scan') {
       steps {
         script {
           BlackDuckDetect(repoName, branchName)
         }
       }  
       post {
         failure { 
 		      script { emailNotification('BlackDuck',"${env.emailRecipients}") }
         }
       }
     }

    stage('CxSAST - Scan') {
      steps {
        step([
          $class                      : 'CxScanBuilder',
			    comment                     : "${branchName}",
          credentialsId               : '',
          excludeFolders              : 'node_modules',
          exclusionsSetting           : 'job',
          failBuildOnNewResults       : true,
          failBuildOnNewSeverity      : 'MEDIUM',
          filterPattern               : '''!**/_cvs/**/*, !**/.svn/**/*,   !**/.hg/**/*,   !**/.git/**/*,  !**/.bzr/**/*, !**/bin/**/*,
                          !**/obj/**/*,  !**/backup/**/*, !**/.idea/**/*, !**/*.DS_Store, !**/*.ipr,     !**/*.iws,
                          !**/*.bak,     !**/*.tmp,       !**/*.aac,      !**/*.aif,      !**/*.iff,     !**/*.m3u, !**/*.mid, !**/*.mp3,
                          !**/*.mpa,     !**/*.ra,        !**/*.wav,      !**/*.wma,      !**/*.3g2,     !**/*.3gp, !**/*.asf, !**/*.asx,
                          !**/*.avi,     !**/*.flv,       !**/*.mov,      !**/*.mp4,      !**/*.mpg,     !**/*.rm,  !**/*.swf, !**/*.vob,
                          !**/*.wmv,     !**/*.bmp,       !**/*.gif,      !**/*.jpg,      !**/*.png,     !**/*.psd, !**/*.tif, !**/*.swf,
                          !**/*.jar,     !**/*.zip,       !**/*.rar,      !**/*.exe,      !**/*.dll,     !**/*.pdb, !**/*.7z,  !**/*.gz,
                          !**/*.tar.gz,  !**/*.tar,       !**/*.gz,       !**/*.ahtm,     !**/*.ahtml,   !**/*.fhtml, !**/*.hdm,
                          !**/*.hdml,    !**/*.hsql,      !**/*.ht,       !**/*.hta,      !**/*.htc,     !**/*.htd, !**/*.war, !**/*.ear,
                          !**/*.htmls,   !**/*.ihtml,     !**/*.mht,      !**/*.mhtm,     !**/*.mhtml,   !**/*.ssi, !**/*.stm,
                          !**/*.stml,    !**/*.ttml,      !**/*.txn,      !**/*.xhtm,     !**/*.xhtml,   !**/*.class, !**/*.iml, !**/node_modules/**/*, !Checkmarx/Reports/*.*''',
          fullScanCycle               : 10,
          fullScansScheduled          : true,
          groupId                     : '058d2383-b42a-42e7-b6d4-7ee8c50f24bd',
          incremental                 : true,
          password                    : '{AQAAABAAAAAQU4kC77B1eUi7HIl1BPKOwAbJaXnWo3hfceaiSWTPPxM=}',
          preset                      : '100004',
			    projectName                 : "${repoName}",
          sastEnabled                 : true,
          serverUrl                   : 'http://vmsys667.vhihealthcare.net/',
          sourceEncoding              : '5',
          username                    : '',
          vulnerabilityThresholdResult: 'FAILURE'])
      }
    }

	stage('Publish') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'nexus-npm-publish', passwordVariable: 'npmtoken', usernameVariable: 'willnotbeused')]) {
			sh """
			npm config set _auth $npmtoken
			npm run publish
			"""
		  cleanWs()
          	}
        }
      }
    }  
 } 
}
