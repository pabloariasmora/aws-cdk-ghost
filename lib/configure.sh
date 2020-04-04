#!/bin/bash

# NVM is not intended to be for all users as per https://github.com/nvm-sh/nvm/issues/1533
# AWS suggest the installation:
# https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
# Hack based on https://gist.github.com/abhilash1in/638d928036c4a89421339f3ec2384129

yum -y update
cat > /tmp/subscript.sh << EOF
# START EC2-USER USERSPACE
echo "Setting up NodeJS Environment"
CURRENT_PATH=/home/ec2-user
cd "${CURRENT_PATH}"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
echo 'export NVM_DIR="${CURRENT_PATH}/.nvm"' >> ${CURRENT_PATH}/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ${CURRENT_PATH}/.bashrc
# Dot source the files to ensure that variables are available within the current shell
. ${CURRENT_PATH}.nvm/nvm.sh
. ${CURRENT_PATH}.profile
. ${CURRENT_PATH}.bashrc
# Install NVM, NPM, Node.JS & Grunt
CURRENT_PATH=$(pwd)
echo "NVM installed in ${CURRENT_PATH}"
nvm install node
nvm install 12.10.0
nvm use 12.10.0
node -e "console.log('Running Node.js ' + process.version)"

echo "Installing Ghost-cli"
npm install ghost-cli -g

GHOST_PATH=${CURRENT_PATH}/ghost
mkdir -p "${GHOST_PATH}"
echo "Installing Ghost"
ghost install local
ghost config --ip 0.0.0.0 --no-prompt
ghost restart
ghost ls
EOF

chown ec2-user:ec2-user /tmp/subscript.sh && chmod a+x /tmp/subscript.sh
sleep 1; su - ec2-user -c "/tmp/subscript.sh"