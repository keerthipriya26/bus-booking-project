pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'kee26'
        BACKEND_IMAGE  = "${DOCKERHUB_USERNAME}/bus-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/bus-frontend"
        IMAGE_TAG      = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '--- Pulling code from GitHub ---'
                checkout scm
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo '--- Building Django backend image ---'
                dir('travels_django') {
                    sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ."
                    sh "docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest"
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo '--- Building React frontend image ---'
                dir('travels_react') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ."
                    sh "docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                echo '--- Pushing images to DockerHub ---'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                    sh "docker push ${BACKEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                echo '--- Deploying containers on EC2 ---'
                sh """
                    docker stop bus-backend || true
                    docker stop bus-frontend || true
                    docker rm bus-backend || true
                    docker rm bus-frontend || true

                    docker network create bus-network || true

                    docker run -d \\
                        --name bus-backend \\
                        --network bus-network \\
                        -p 8000:8000 \\
                        -v bus-db:/app \\
                        ${BACKEND_IMAGE}:latest

                    sleep 5

                    docker exec bus-backend python manage.py migrate

                    docker run -d \\
                        --name bus-frontend \\
                        --network bus-network \\
                        -p 80:80 \\
                        ${FRONTEND_IMAGE}:latest

                    echo 'Deployment complete!'
                    docker ps
                """
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline SUCCESS - App is live!'
        }
        failure {
            echo '❌ Pipeline FAILED - Check the logs above'
        }
    }
}
