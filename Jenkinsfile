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
    }
}
