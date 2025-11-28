# Terraform README

## 📋 Pré-requisitos

- Terraform instalado: https://www.terraform.io/downloads
- Conta AWS configurada
- AWS CLI instalado e configurado
- Docker image já publicada no Docker Hub ou ECR

## 🚀 Como Usar

### 1. Configure suas credenciais AWS

```powershell
# Opção 1: Variáveis de ambiente
$env:AWS_ACCESS_KEY_ID="sua-access-key"
$env:AWS_SECRET_ACCESS_KEY="sua-secret-key"
$env:AWS_DEFAULT_REGION="us-east-1"

# Opção 2: AWS CLI
aws configure
```

### 2. Inicialize o Terraform

```powershell
cd terraform
terraform init
```

### 3. Atualize variáveis

Edite `variables.tf` ou crie um arquivo `terraform.tfvars`:

```hcl
docker_image = "seu-usuario/devops-unisatc-a3:latest"
aws_region   = "us-east-1"
app_name     = "strapi"
```

### 4. Planeje a infraestrutura

```powershell
terraform plan
```

### 5. Aplique a infraestrutura

```powershell
terraform apply
```

Digite `yes` quando solicitado.

### 6. Obtenha os outputs

```powershell
terraform output
```

### 7. Destrua a infraestrutura (quando necessário)

```powershell
terraform destroy
```

## 📊 O que será criado

- **VPC** com CIDR 10.0.0.0/16
- **2 Subnets públicas** em AZs diferentes
- **Internet Gateway**
- **Route Table**
- **Security Group** (porta 1337 aberta)
- **ECS Cluster**
- **ECS Task Definition** (Fargate)
- **ECS Service** (1 instância)
- **CloudWatch Log Group**
- **IAM Roles** para ECS

## 🔧 Configurações

### Alterar recursos do container

Edite `variables.tf`:

```hcl
strapi_cpu    = "1024"  # 1 vCPU
strapi_memory = "2048"  # 2 GB
```

### Alterar número de instâncias

```hcl
desired_count = 2  # 2 instâncias
```

### Usar imagem do ECR

```hcl
docker_image = "123456789012.dkr.ecr.us-east-1.amazonaws.com/strapi:latest"
```

## 📝 Estrutura dos Arquivos

```
terraform/
├── main.tf                          # Recursos principais
├── variables.tf                     # Variáveis de entrada
├── outputs.tf                       # Outputs
├── examples-other-providers.tf.disabled  # Exemplos alternativos
└── README.md                        # Este arquivo
```

## 🌐 Acessar a aplicação

Após o `terraform apply`, você precisa obter o IP público:

```powershell
# Liste as tasks do ECS
aws ecs list-tasks --cluster strapi-cluster

# Obtenha detalhes da task
aws ecs describe-tasks --cluster strapi-cluster --tasks <task-arn>

# O IP público estará em networkInterfaces
```

Acesse: `http://<IP-PÚBLICO>:1337/admin`

## 💰 Custos Estimados (AWS)

- **ECS Fargate**: ~$14/mês (0.5 vCPU, 1GB RAM)
- **Data Transfer**: Variável
- **CloudWatch Logs**: ~$0.50/mês

**Total estimado**: ~$15-20/mês

> **Dica**: Destrua a infraestrutura quando não estiver usando para economizar!

## 🐛 Troubleshooting

### Erro: "InvalidParameterException"
Verifique se a imagem Docker existe e está acessível.

### Task não inicia
Verifique os logs no CloudWatch:
```powershell
aws logs tail /ecs/strapi --follow
```

### Sem conectividade
Verifique o Security Group e se o subnet tem Internet Gateway.

## 📚 Recursos

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

## ✅ Checklist de Deploy

- [ ] AWS CLI configurado
- [ ] Terraform instalado
- [ ] Imagem Docker publicada
- [ ] `variables.tf` atualizado com sua imagem
- [ ] `terraform init` executado
- [ ] `terraform plan` revisado
- [ ] `terraform apply` executado com sucesso
- [ ] IP público obtido
- [ ] Aplicação acessível via navegador

---

**Boa sorte com o deploy! 🚀**
