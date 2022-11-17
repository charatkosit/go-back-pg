#!/bin/bash
#prepare  data
tagname=`cat /var/lib/jenkins/workspace/go-front-sit/package.json |grep "version" |cut -d'"' -f 4`
release=`echo $tagname |cut -d ' ' -f 1`


sapUrl='http://192.168.20.17:8880/apigoplus/EnqPartlist/'
sapApiToken='z@hz3sNY#0ohB9SspeE9@fLDQ%r65x$k8LxL28VH72FfvRWgCn'
stage='SIT' 
timestamp=$(date)

#replace data


sed -i -e "s|%sapUrl%|${sapUrl}|g" /var/lib/jenkins/workspace/go-back-prod/src/environments/environment.prod.ts
sed -i -e "s|%sapApiToken%|${sapApiToken}|g" /var/lib/jenkins/workspace/go-back-prod/src/environments/environment.prod.ts
sed -i -e "s|%stage%|${stage}|g" /var/lib/jenkins/workspace/go-back-prod/src/environments/environment.prod.ts
sed -i -e "s|%timestamp%|${timestamp}|g" /var/lib/jenkins/workspace/go-back-prod/src/environments/environment.prod.ts
sed -i -e "s|%release%|${release}|g" /var/lib/jenkins/workspace/go-back-prod/src/environments/environment.prod.ts
#debug
cat /var/lib/jenkins/workspace/go-back-prod/src/environments/environment.prod.ts