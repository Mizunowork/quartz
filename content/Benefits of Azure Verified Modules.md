- modules have an owner within microsoft
- you can raise a support ticket on the modules
- modules are aligned with a unified IaC strategy that's formed within Microsoft
- Aligned with Well Architected Framework

- Currently supports Bicep & Terraform, but may support other tooling in the future as well (Crossplane? Pulumi?)]
	- Advantage: IaC setup is multi-lingual by default
	- Uses the same paramater interfaces (see following point)

- Some Azure resources have different implementations of configuration. Such as Customer Managed Keys. The Azure Verified Modules create an interface over this that is the same across all modules, so you can use the same parameters and don't have to worry about the different implementations on the ARM side
	- [Interfaces | Azure Verified Modules](https://azure.github.io/Azure-Verified-Modules/specs/shared/interfaces/)


Our opinionated way within the company should be to align with the WAF. AVM does this out of the box. **Azure Verified Modules = Well Architected Framework in Code. **

# Security

For the security pillar, the AVM use the Microsoft Cloud Security Benchmark (MCSB) and Microsoft Defender for Cloud (MDFC) to align input parameter/variables.



![[Pasted image 20240402111716.png]]


## Links:



202404031930