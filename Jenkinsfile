pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/GowthamM49/student-management-system.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                echo "Build completed"
            }
        }

        stage('Deploy') {
            steps {
                echo "Deployment successful"
            }
        }

        stage('Deploy to S3') {
            steps {
                bat '"C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" s3 sync frontend s3://student-website-new --delete --region eu-north-1'
            }
        }
    }
}
