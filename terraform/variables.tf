# Variables para Terraform
variable "aws_region" {
  description = "AWS Region para deploy"
  type        = string
  default     = "us-east-1"
}

variable "docker_image" {
  description = "URL da imagem Docker do Strapi"
  type        = string
  default     = "seu-usuario/devops-unisatc-a3:latest"
}

variable "strapi_cpu" {
  description = "CPU para o container Strapi (em unidades)"
  type        = string
  default     = "512"
}

variable "strapi_memory" {
  description = "Memória para o container Strapi (em MB)"
  type        = string
  default     = "1024"
}

variable "desired_count" {
  description = "Número de instâncias do serviço"
  type        = number
  default     = 1
}

variable "app_name" {
  description = "Nome da aplicação"
  type        = string
  default     = "strapi"
}

variable "environment" {
  description = "Ambiente (dev, staging, production)"
  type        = string
  default     = "production"
}
