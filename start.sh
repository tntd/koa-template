#!/bin/bash

USER_HOME=/home/admin
APP_HOME="${USER_HOME}/${APPNAME}"

echo "ENV"
echo ${ENV}

if [ "${APP_RUN_MODE}" = "fg" ]; then
    # 激活node环境(必须写)
    source /home/admin/.nvm/nvm.sh
    # 容器的启动
    pm2-runtime start pm2.json --only "${APPNAME}-${ENV}"
else
    # 原虚拟机启动方式
    pm2 start $APP_HOME/pm2.json

fi
