FROM apps-vcp-nexus.asml.com:18443/white-rabbit-react-ci-base:no-internet

WORKDIR /app

COPY ./application ./

RUN npm_config_tarball=/node-gyp-needs/node-v11.15.0-headers.tar.gz \
    yarn install --frozen-lockfile --network-timeout 1000000