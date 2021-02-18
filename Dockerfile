FROM registry.tongdun.me/library/centos7.2-node.js8-libreoffice:1.0
ENV APPNAME=${APPNAME}
# 工作目录/home/admin/应用目录，不要改
WORKDIR /home/admin/$APPNAME
# 按此处参考的顺序放入需要的文件
COPY . ./
# admin目录权限 - 必须要写
RUN chown -R admin:admin /home/admin/$APPNAME
# 运行启动脚本
CMD ["/bin/bash", "-c" ,"sh /home/admin/$APPNAME/start.sh" ]
