FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg lsb-release && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Switch back to jenkins user? 
# NOTE: For DooD with mapped socket, running as root is often the easiest way to avoid permission issues 
# with the host's /var/run/docker.sock which is owned by root (or docker group).
# If we want to run as jenkins user, we need to dynamically assign the group ID of the socket to the jenkins user.
# For this home server setup, keeping it as root inside the container is acceptable and simpler.
# If strict security is needed, we would add a script to match the group ID.

# For now, we stay as root to ensure access to /var/run/docker.sock
