#!/bin/bash

rm -Rf dist
yarn
yarn run dist

if ! [ -z "$1" ]; then
  docker build -t "guildtv/website:elections-dev-$1" .
  docker push "guildtv/website:elections-dev-$1"

  if ! [ -z "$KUBE_API" ]; then
    
    curl -O "https://storage.googleapis.com/kubernetes-release/release/$KUBE_VERSION/bin/linux/amd64/kubectl"
    chmod +x kubectl

    sed -i 's/-latest/-'$1'/g' "kube-dev.yaml"
    ./kubectl --server="$KUBE_API" --token="$KUBE_TOKEN" --insecure-skip-tls-verify=true  --namespace="$KUBE_NAMESPACE" apply -f kube-dev.yaml
    
  fi
fi
