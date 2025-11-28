# Outputs do Terraform
output "vpc_id" {
  description = "ID da VPC criada"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs das subnets públicas"
  value       = aws_subnet.public[*].id
}

output "security_group_id" {
  description = "ID do Security Group"
  value       = aws_security_group.strapi.id
}

output "ecs_cluster_id" {
  description = "ID do ECS Cluster"
  value       = aws_ecs_cluster.strapi.id
}

output "ecs_cluster_name" {
  description = "Nome do ECS Cluster"
  value       = aws_ecs_cluster.strapi.name
}

output "ecs_service_id" {
  description = "ID do ECS Service"
  value       = aws_ecs_service.strapi.id
}

output "ecs_service_name" {
  description = "Nome do ECS Service"
  value       = aws_ecs_service.strapi.name
}

output "task_definition_arn" {
  description = "ARN da Task Definition"
  value       = aws_ecs_task_definition.strapi.arn
}

output "cloudwatch_log_group" {
  description = "Nome do CloudWatch Log Group"
  value       = aws_cloudwatch_log_group.strapi.name
}

output "application_url" {
  description = "URL para acessar a aplicação (necessita de Load Balancer configurado)"
  value       = "Configure um ALB para obter uma URL pública"
}
