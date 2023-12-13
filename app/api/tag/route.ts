import { prisma } from "@/app/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const response = await prisma.tag.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json({
            message: 'List tag',
            data: response
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error
        }, {status: 500})
    }
}

export const POST = async () => {
    try {
        const data = [
            { name: "javascript" },
            { name: "python" },
            { name: "java" },
            { name: "c-sharp" },
            { name: "php" },
            { name: "html" },
            { name: "css" },
            { name: "react" },
            { name: "angular" },
            { name: "vue" },
            { name: "nodejs" },
            { name: "expressjs" },
            { name: "django" },
            { name: "flask" },
            { name: "spring" },
            { name: "database" },
            { name: "mysql" },
            { name: "postgresql" },
            { name: "mongodb" },
            { name: "sql-server" },
            { name: "git" },
            { name: "github" },
            { name: "gitlab" },
            { name: "docker" },
            { name: "kubernetes" },
            { name: "aws" },
            { name: "azure" },
            { name: "google-cloud" },
            { name: "rest-api" },
            { name: "graphql" },
            { name: "testing" },
            { name: "unit-testing" },
            { name: "integration-testing" },
            { name: "continuous-integration" },
            { name: "continuous-deployment" },
            { name: "agile" },
            { name: "scrum" },
            { name: "kanban" },
            { name: "design-patterns" },
            { name: "algorithm" },
            { name: "data-structures" },
            { name: "machine-learning" },
            { name: "artificial-intelligence" },
            { name: "cybersecurity" },
            { name: "mobile-app-development" },
            { name: "web-development" },
            { name: "frontend" },
            { name: "backend" },
            { name: "full-stack" },
            { name: "devops" },
            { name: "cloud-computing" },
            { name: "blockchain" },
            { name: "iot" },
            { name: "game-development" },
            { name: "ui-ux" },
            { name: "career-advice" },
            { name: "interview-preparation" },
            { name: "software-architecture" },
            { name: "microservices" },
            { name: "serverless" },
            { name: "scalability" },
            { name: "performance" },
            { name: "monitoring" },
            { name: "logging" },
            { name: "profiling" },
            { name: "debugging" },
            { name: "security" },
            { name: "automation" },
            { name: "containerization" },
            { name: "orchestration" },
            { name: "collaboration" },
            { name: "project-management" },
            { name: "version-control" },
            { name: "documentation" },
            { name: "code-review" },
            { name: "agile-tools" },
            { name: "testing-frameworks" },
            { name: "test-automation-frameworks" },
            { name: "javascript-frameworks" },
            { name: "frontend-frameworks" },
            { name: "backend-frameworks" },
            { name: "web-frameworks" },
            { name: "mobile-frameworks" },
            { name: "cross-platform-frameworks" },
            { name: "game-development-frameworks" },
            { name: "cloud-computing-platforms" },
            { name: "cloud-infrastructure-as-code" },
            { name: "cloud-orchestration" },
            { name: "cloud-security-platforms" },
            { name: "cloud-analytics-platforms" },
            { name: "cloud-machine-learning-platforms" },
            { name: "cloud-iot-platforms" },
            { name: "cloud-communication-platforms" },
            { name: "cloud-storage-platforms" },
            { name: "cloud-database-platforms" },
            { name: "cloud-development-platforms" },
            { name: "cloud-serverless-platforms" },
            { name: "cloud-functions-platforms" },
            { name: "cloud-container-platforms" },
            { name: "cloud-paas-platforms" },
            { name: "cloud-iaas-platforms" },
            { name: "cloud-saas-platforms" },
            { name: "cloud-monitoring-platforms" },
            { name: "cloud-devops-platforms" },
            { name: "cloud-cicd-platforms" },
            { name: "cloud-continuous-integration-platforms" },
            { name: "cloud-continuous-deployment-platforms" },
            { name: "cloud-logging-platforms" },
            { name: "cloud-distributed-systems-platforms" },
            { name: "cloud-microservices-platforms" },
            { name: "cloud-event-driven-architecture-platforms" },
            { name: "cloud-serverless-architecture-platforms" },
            { name: "cloud-multicloud-platforms" },
            { name: "cloud-hybrid-cloud-platforms" },
            { name: "cloud-private-cloud-platforms" },
            { name: "cloud-public-cloud-platforms" },
            { name: "cloud-edge-computing-platforms" },
            { name: "cloud-fog-computing-platforms" },
            { name: "cloud-iot-platforms" },
            { name: "cloud-5g-platforms" },
            { name: "cloud-blockchain-platforms" },
            { name: "cloud-quantum-computing-platforms" }
        ]

        await Promise.all(
            data.map(async (tag) => {
              await prisma.tag.create({
                data: tag,
              })
            })
        )

        return NextResponse.json({
            message: 'Success add tag'
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {status: 500})
    }
}