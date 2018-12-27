FROM node:8.9.1
LABEL author="Yayun.Chen"

RUN mkdir -p /app
COPY . /app
WORKDIR /app


#If the environment in China build please open the following comments
#如果在中国环境下构建请把下面注释打开
RUN npm config set registry https://registry.npm.taobao.org

RUN npm install
RUN npm run build

# 配置环境变量
 ENV HOST 0.0.0.0
 ENV PORT 9080
 
 # 容器对外暴露的端口号
 EXPOSE 9080

CMD ["npm", "start"]
