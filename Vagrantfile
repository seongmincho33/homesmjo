# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # 1. 기본 이미지 (Box): Ubuntu 22.04 LTS
  config.vm.box = "ubuntu/jammy64"

  # 2. 시스템 리소스 설정 (VirtualBox)
  config.vm.provider "virtualbox" do |vb|
    # VM 이름 설정 (선택사항)
    vb.name = "homesmjo-server-v2"
    # 메모리: 4096MB (4GB)
    vb.memory = "4096"
    # CPU: 2코어
    vb.cpus = 2
  end

  # 3. 네트워크 설정
  # 포트 포워딩
  config.vm.network "forwarded_port", guest: 80, host: 80      # Nginx
  config.vm.network "forwarded_port", guest: 8080, host: 8080  # Spring Boot
  config.vm.network "forwarded_port", guest: 5432, host: 5432  # PostgreSQL
  config.vm.network "forwarded_port", guest: 9090, host: 9090  # Jenkins

  # Private Network (고정 IP)
  config.vm.network "private_network", ip: "192.168.33.10"

  # 4. 폴더 공유
  # 4. 폴더 공유
  # 호스트의 cicd 폴더만 공유 (소스코드는 Jenkins가 Git에서 받음)
  config.vm.synced_folder "./cicd", "/home/vagrant/project/cicd"
  # 기본 /vagrant 공유 끄기 (선택사항, 깔끔하게 하기 위해)
  config.vm.synced_folder ".", "/vagrant", disabled: true

  # 5. 프로비저닝 (Shell Script)
  config.vm.provision "shell", inline: <<-SHELL
    # Docker Compose를 위한 빈 폴더 생성 (경로 에러 방지)
    mkdir -p /home/vagrant/project/frontend
    mkdir -p /home/vagrant/project/backend
    mkdir -p /home/vagrant/project/postgres_data
    chown -R vagrant:vagrant /home/vagrant/project

    # 패키지 목록 업데이트 및 필수 패키지 설치
    apt-get update
    apt-get install -y ca-certificates curl gnupg lsb-release tree

    # Docker GPG 키 추가
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    # Docker Repository 설정
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Docker Engine 및 Docker Compose Plugin 설치
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    apt-get install -y openjdk-17-jdk

    # vagrant 사용자를 docker 그룹에 추가 (sudo 없이 docker 실행 가능하도록)
    usermod -aG docker vagrant

    # docker-compose 명령어를 docker compose로 연결 (호환성)
    if [ ! -f /usr/local/bin/docker-compose ]; then
      ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose
    fi

    # 설치 확인 출력
    echo "Docker version:"
    docker --version
    echo "Docker Compose version:"
    docker compose version

    # 프로젝트 실행 (cicd 폴더에서)
    # cd /home/vagrant/project/cicd
    # docker compose up -d
  SHELL
end
