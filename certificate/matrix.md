# Matrix

This is the base yaml of a CertificateSigningRequest (CSR)

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser
spec:
  request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ3lqQ0NBYklDQVFBd2dZUXhDekFKQmdOVkJBWVRBbWwwTVE0d0RBWURWUVFJREFWcGRHRnNlVEVMTUFrRwpBMVVFQnd3Q2RtVXhEekFOQmdOVkJBb01CbXR5WVhSbGJ6RVBNQTBHQTFVRUN3d0dhM0poZEdWdk1ROHdEUVlEClZRUUREQVpyY21GMFpXOHhKVEFqQmdrcWhraUc5dzBCQ1FFV0ZtMWhkWEp2TG5OaGJHRkFhMmx5WVhSbFkyZ3UKYVhRd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUURHM3JVcjBCYTRGMXBDTkxZbgpMa3JkT0JicnZsOUhobFk2OU9DTWQrYjhtYytOdjN6U2lFYml0RjJuSXZZK09KTHlmTDhCMlB1TGxaQnY0Ky92ClB6UGFoQUZjS3hqVmV5RTBhTjVJV1lrbGtlaDhmdHoyOXpqVWtudEdrdmRJVWt2RXljMmdQT0Mrc1p6TjZxTjEKWVVlWGNMdGNabnI1aTVqVzl2ak5SSnB5bEJabnpzNTJmY0dkZHIvcms5S3RTVHNCdHNDcEcxcEdCdzNQT3UwMApieFFxRWx1UlpxTEw3ZHFtQVBKTUtLZnp3UXhISlJyWjN6dnEzdHJXNFNUSnhRd3lMVU1VZnNxVUJpMUJMT3dOCi9JeWNjVjVsMGlsOTA1Q3JRQ0RCb0twTnFvUmd5RGF3U0VRWkhONTVVZTM1ak9Xb2dwMUtlQ01PZnVZbWU2VVgKdTRzNUFnTUJBQUdnQURBTkJna3Foa2lHOXcwQkFRc0ZBQU9DQVFFQWRlMG9ZSjhPSnNrQWVZdkZTaXpRMVNuVwp6VnEwL25NU3VFYWV6Y2JROTRwM0s2WXZNamZlVmRoSjRTNjZ6cC83TXd3Yzg4dmFSeFFxTXBJdCtyTG9WcG03ClNBNU1EMFZaWitiNFNVOXhUcW1rai9HR3Q1MUhZVEkyS3B4ZDRvY0l3TjkvaTJidENKY1h5a09rZ3YrWi9VOTgKN1kzeHRLMUt5NzNtZndXZ2pveTBJZEN1eUpHclpDcnVSZFNDSk5Pemo1TnJmU1B6TzRrU0RFbFlpUzdKclVvSQpWVDhTR3NMb0grRmVraWNFR1hVc3pNQVdYOExFWHR1L1hPSlhTay84Y3d0bisxcUJTQ3lNTTkyaVFyV21MbW1hCnpUdGs4Z1h0ZDF1YVpUZzlLVHpaMFoxVkNWYnJwVEJacCtDVlNYWVBTY0Raei92ZE5xWndDbWdISWRJR2RBPT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUgUkVRVUVTVC0tLS0tCg==
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400 # one day
  usages:
    - client auth
```

| k8s version \ Provider | AWS                                                                             | Azure   | Google  | OpenShift | Docker Desktop | Kind    |
| ---------------------- | ------------------------------------------------------------------------------- | ------- | ------- | --------- | -------------- | ------- |
| 1.21                   | spec.signerName: beta.eks.amazonaws.com/app-serving<br><s>expirationSeconds</s> |         |         | -         |                |
| 1.22                   | spec.signerName: beta.eks.amazonaws.com/app-serving                             |         |         | -         |                |
| 1.23                   | spec.signerName: beta.eks.amazonaws.com/app-serving                             |         | &check; | -         |                |
| 1.24                   | spec.signerName: beta.eks.amazonaws.com/app-serving                             | &check; |         | -         |                |
| 1.25                   |                                                                                 | &check; |         | &check;   | &check;        | &check; |
| 4.9                    | -                                                                               | -       | -       | &check;   | -              |
| 4.12                   | -                                                                               | -       | -       | &check;   | -              |

# Commands to manage CSR

## Kubernetes

```bash
kubectl create csr myuser --from-file=myuser.csr
kubectl get csr
kubectl certificate approve myuser
```

## OpenShift

```bash
oc create csr myuser --from-file=myuser.csr
oc get csr
oc adm certificate approve myuser
```
