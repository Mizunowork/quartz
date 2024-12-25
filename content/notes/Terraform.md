---
title: Terraform
date: 2024-12-23
tags:
  - cloud
  - data
  - IaC
---
# What is it
- Infrastructure as Code (IaC)
- Manage Infrastructure (usually on Cloud) with **configuration files** rather than through UI
- Advantages:
	- Versionable
	- Repeatable and Reusable (easy to create dev, test, Prod envs by using same files)
	- Consistent (You know where to find active instances and where to drop them)
- Declarative Language
- Steps:
	- **Scope**: Identify the Infrastructures (individual unit of services, e.g. Compute Instance, VPN, etc)
	- **Author**: Write the configuration
	- **Initialize**: Install the plugins needed by Terraform
	- **Plan**: Preview the Changes Terraform will make to match your configurations
	- **Apply**: Make the planned changes

# Build - The Blocks

- **terraform**: list the needed providers
	- backend: where to store the state file. Local by default.
- **provider**: initializes each provider
- **resource**: List all the resources.
	- Double entry name (uniqueness): resource name + personal identifier
	- You can then refer a resource into another resource (e.g. line 32 `network = google_compute_network.vpc_network.name`)

```tf
terraform {
  required_providers {
    google = {
	  source = "hashicorp/google"
	  version = "6.14.1"
	}
  }
  backend "gcs" {
    bucket = "anselboero-website-dev-tfstate"
  }
}

provider "google" {
  project = var.project
  region = var.region
  zone = var.zone
} 

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

resource "google_compute_instance" "my_vm_instance" {
  name = "terraform-instance"
  machine_type = "f1-micro"
  tags = ["web", "dev"]

  boot_disk {
    initialize_params {
      image = "cos-cloud/cos-stable"
	}
  }

  network_interface {
	network = google_compute_network.vpc_network.name
	access_config {
	}
  }
}
```

- Initialize the variables (any file .tf will be read by terraform):
	- Empty { } will ask you to insert a value during `terraform apply`
```tf
variable "project" { }
variable "region" {
  default = "us-central1"
}
variable "zone" {
  default = "us-central1-c"
}
```


# Main Commands
- `terraform init`:  when you initialize a new configuration
- `terraform apply`: create the infrastructure: will also apply changes in case you update the files.
  Two types of changes:
	  - **Non destructive**: the resource will just be updated (e.g. adding a tag to a VM)
	  - **Destructive**: The old resource will be destroyed first and a new one will be created (e.g. changing image to a VM)
- `terraform destroy`: Delete all the resources.

# Open Questions
- I think it's not possible to save every single resource as a Tf object: For Example, how can you deploy the first resources without having initialized a Google Build Trigger via UI?
- How to structure the project?
# Resources
- https://developer.hashicorp.com/terraform/tutorials/gcp-get-started (all the 7 Tutorials) (opened on 2024-12-23)
- [Google Cloud Documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs)