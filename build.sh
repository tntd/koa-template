#!/bin/bash
# 激活node环境（必须写）
source ~/.nvm/nvm.sh
# 默认使用node8.2.1, 预装了高版本的8.11可以直接切换
nvm use 8.11
npm config set registry http://registry.npm.tongdun.cn/
# 设置内部仓库
# yarn install
npm install
# 编译代码（非必须，根据实际项目是否需要编译而定）
# npm run release
mkdir -p target
tar czf target/$APPNAME-dist.tar.gz src node_modules package.json Dockerfile pm2.json start.sh stop.sh


