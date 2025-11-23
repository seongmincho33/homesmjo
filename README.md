# 🏡 SMJO Home Server Project

![Vagrant](https://img.shields.io/badge/Vagrant-22.04-blue?style=for-the-badge&logo=vagrant)
![Docker](https://img.shields.io/badge/Docker-24.0.5-blue?style=for-the-badge&logo=docker)
![Jenkins](https://img.shields.io/badge/Jenkins-LTS-red?style=for-the-badge&logo=jenkins)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)

> **"나와 여자친구가 함께 사용할 소중한 홈 서버"** 💑
>
> 집 컴퓨터(Windows/Mac) 안에 **Vagrant**로 리눅스 환경을 만들고, 그 안에서 **Docker**를 통해 웹 서비스와 배포 자동화(**Jenkins**) 시스템을 운영하는 프로젝트입니다.

---

## 📚 목차 (Table of Contents)
1. [🏗️ 프로젝트 아키텍처](#1-프로젝트-아키텍처)
2. [🛠️ 필수 준비물](#2-필수-준비물-prerequisites)
3. [🚀 설치 및 실행 가이드](#3-설치-및-실행-가이드-getting-started)
4. [⚙️ 젠킨스(Jenkins) 설정](#4-젠킨스jenkins-설정-상세-가이드)
5. [📂 폴더 구조](#5-폴더-구조-설명-directory-structure)
6. [❓ 트러블슈팅](#6-트러블슈팅-troubleshooting)

---

## 1. 프로젝트 아키텍처
우리는 **"Docker-outside-of-Docker (DooD)"** 전략을 사용하여 효율적인 CI/CD 환경을 구축했습니다.

| 구성 요소 | 설명 | 비고 |
| :--- | :--- | :--- |
| **Host OS** | Windows / Mac | 내 컴퓨터 (물리 서버) |
| **Guest OS** | Ubuntu 22.04 LTS | Vagrant로 생성된 가상 머신 |
| **Frontend** | React + Vite | Nginx 웹 서버로 배포 |
| **Backend** | Java Spring Boot | REST API 서버 |
| **Database** | PostgreSQL 15 | 데이터 저장소 |
| **CI/CD** | Jenkins | 자동 배포 파이프라인 |

---

## 2. 필수 준비물 (Prerequisites)
이 프로젝트를 시작하기 전에 아래 프로그램들이 설치되어 있어야 합니다.

- **[VirtualBox](https://www.virtualbox.org/wiki/Downloads)**: 가상 머신 실행기
- **[Vagrant](https://www.vagrantup.com/downloads)**: 가상 머신 관리자
- **[Git](https://git-scm.com/downloads)**: 소스 코드 관리 도구
- **권장 사양**: RAM 8GB 이상 (VM에 4GB 할당)

---

## 3. 설치 및 실행 가이드 (Getting Started)

### Step 1. 프로젝트 가져오기
터미널(Git Bash, PowerShell 등)을 열고 프로젝트를 다운로드합니다.
```bash
git clone <GITHUB_REPOSITORY_URL>
cd homesmjo
```

### Step 2. 서버 실행 (마법의 명령어 ✨)
프로젝트 폴더에서 아래 명령어를 입력하면, **가상 머신 생성부터 도커 실행까지 한 번에 완료**됩니다.
*(처음 실행 시 10~15분 정도 소요됩니다. 커피 한 잔 하고 오세요 ☕)*
```bash
vagrant up
```

### Step 3. 접속 테스트
설치가 완료되면 브라우저에서 아래 주소로 접속해 보세요.

| 서비스 | 주소 | 설명 |
| :--- | :--- | :--- |
| 🏠 **홈페이지** | [http://localhost](http://localhost) | Frontend (React) |
| 🛠️ **젠킨스** | [http://localhost:9090](http://localhost:9090) | 배포 관리 도구 |
| 📦 **백엔드 API** | [http://localhost:8080](http://localhost:8080) | Spring Boot |
| 🗄️ **데이터베이스** | `localhost:5432` | PostgreSQL |

---

## 4. 젠킨스(Jenkins) 설정 상세 가이드
자동 배포를 위해 젠킨스를 **딱 한 번** 설정해야 합니다.

<details>
<summary>👉 <b>설정 방법 펼쳐보기 (클릭)</b></summary>

### 1) 잠금 해제 (Unlock Jenkins)
1. [http://localhost:9090](http://localhost:9090) 접속.
2. 터미널(CMD/PowerShell)에서 아래 명령어로 비밀번호 확인:
   ```bash
   vagrant ssh -c "docker logs homesmjo-jenkins"
   ```
3. 출력된 비밀번호를 복사해서 웹 화면에 입력.
4. **"Install suggested plugins"** 클릭.
5. **Admin 계정 생성** (아이디/비번 까먹지 마세요!).

### 2) GitHub 연결 설정 (중요!) ⭐
비공개(Private) 저장소라면 젠킨스에게 **열쇠(Token)**를 줘야 합니다.

1. **GitHub Token 생성**:
   - GitHub 접속 -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token.
   - **Scope 체크**: `repo` (전체 체크).
   - 생성된 토큰(`ghp_...`) 복사.

2. **Jenkins에 등록**:
   - Jenkins 관리 -> Credentials -> System -> Global credentials -> Add Credentials.
   - **Kind**: Username with password.
   - **Username**: 내 GitHub ID.
   - **Password**: 아까 복사한 Token.
   - **ID**: `github-token` (**이 이름을 Jenkinsfile에서 사용합니다**).

### 3) 배포 파이프라인 생성
1. **New Item** 클릭 -> 이름 입력 (예: `Deploy-Home`) -> **Pipeline** 선택.
2. 맨 아래 **Pipeline** 섹션 설정:
   - **Definition**: `Pipeline script from SCM`.
   - **SCM**: `Git`.
   - **Repository URL**: 깃허브 주소 입력.
   - **Credentials**: 방금 만든 `github-token` 선택.
   - **Script Path**: `cicd/Jenkinsfile` (**주의: 경로 확인!**)
3. **Save** 후 **Build Now** 클릭!

</details>

---

## 5. 폴더 구조 설명 (Directory Structure)
이 프로젝트는 역할별로 깔끔하게 분리되어 있습니다.

```plaintext
smjo-home/
├── Vagrantfile          # 🏗️ 가상 머신(VM) 생성 명세서
├── backend/             # ☕ Spring Boot 소스 코드 & Dockerfile
├── frontend/            # ⚛️ React/Vite 소스 코드 & Dockerfile
└── cicd/                # 🚀 배포 및 운영 설정 폴더 (핵심!)
    ├── docker-compose.yml  # 컨테이너 조합 설정
    ├── nginx.conf          # 웹 서버(Gateway) 설정
    ├── Jenkinsfile         # 배포 파이프라인 스크립트
    └── jenkins/            # 젠킨스 커스텀 이미지 설정
```

---

## 6. 트러블슈팅 (Troubleshooting)

### Q. 컴퓨터를 껐다 켰어요. 서버를 다시 어떻게 켜나요?
터미널에서 프로젝트 폴더로 이동한 후:
```bash
vagrant up
```
만약 일시정지(suspend) 상태였다면 금방 켜지고, 껐던(halt) 상태라면 부팅됩니다.

### Q. 젠킨스 빌드가 빨간불(실패)이 떴어요!
1. 젠킨스 화면에서 빨간색 빌드 번호 클릭 -> **Console Output** 확인.
2. **permission denied** 에러라면? -> 도커 소켓 권한 문제입니다. `Vagrantfile`의 `usermod` 부분이 잘 실행됐는지 확인하세요.
3. **repository not found** 에러라면? -> GitHub Token 설정이 잘못된 것입니다.

### Q. 코드를 수정했는데 반영이 안 돼요.
젠킨스는 기본적으로 **"5분마다"** 깃허브를 확인합니다(SCM Polling). 조금만 기다려보세요.
그래도 안 되면 젠킨스에서 **Build Now**를 직접 눌러주세요.

### Q. Vagrantfile 설정을 바꿨는데 반영이 안 돼요.
설정 파일(`Vagrantfile`)이나 프로비저닝 스크립트를 수정한 경우, 아래 명령어로 재설정해야 합니다.
```bash
vagrant reload --provision
```

---

### 💡 Tip for Developers
**Docker 직접 제어하기:**
```bash
vagrant ssh              # VM 접속
cd ~/project/cicd        # 설정 폴더로 이동
docker compose ps        # 상태 확인
docker compose logs -f backend  # 백엔드 로그 실시간 확인
```

---
<div align="center">
  Created with ❤️ by <b>SMJO & Antigravity</b>
</div>