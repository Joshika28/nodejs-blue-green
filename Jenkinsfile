pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t joshika28/nodejs-blue-green:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                    bat 'docker push joshika28/nodejs-blue-green:latest'
                }
            }
        }

        stage('Deploy Blue and Green') {
    steps {
        bat '''
        docker rm --force blue 2>NUL
        docker rm --force green 2>NUL

        docker run -d -p 3001:3000 --name blue joshika28/nodejs-blue-green:1.0
        docker run -d -p 3002:3000 --name green joshika28/nodejs-blue-green:2.0
        '''
    }
}

        stage('Test Deployment') {
            steps {
                bat '''
                curl http://localhost:3001/status
                curl http://localhost:3002/status
                '''
            }
        }
stage('Switch Traffic to Green') {
    steps {
        bat '''
        docker exec blue-green-proxy nginx -s reload
        '''
    }
}
    }
}