## OpenVidu Edition
OpenVidu를 간편하게 배포할 수 있는 3가지가 있습니다.

3가지 Edition이 존재하며 각 Edition마다 기능, 요금이 다릅니다.

CE 버전은 무료 PRO, ENTERPRISE 버전은 유료입니다.

오른쪽으로 갈수록 가능은 더 많이 제공합니다.

무료 버전인 CE버전으로 배포할 계획입니다.

## 배포 법

배포하는 법은 크게 2가지로 나뉩니다.

AWS Cloud Formation을 통한 배포, on premises 환경을 통한 배포

#### on premises란?

자체적으로 보유한 전산실 서버에 직접 배포하는 형태

Linux 환경이나 AWS EC2 환경에 배포하면 됩니다.

## on premises에 OpenVidu CE 배포하기
Docker 기본 지식은 필수는 아니지만 권장됩니다.

제품으로 배포된 OpenVidu는 Docker Container 집합으로 구성되며 Docker Compose에 의해 관리됩니다.

아래의 서비스들을 설치합니다.

- OpenVidu 서버 : OpenVidu 플랫폼의 두뇌로 시그널링 담당

- Kurento Media Server : OpenVidu 플랫폼의 핵심으로 미디어 부분 담당

- Coturn : 특정 특수 네트워크에서 브라우저와 미디어 통신을 허용하는 데 사용되는 서버(Turn 서버의 역할)

- Redis : Coturn 서버 사용자를 관리하는 DB

- Nginx : SSL 인증서를 구성하고 Openvidu 서버와 애플리케이션이 https 443 포트 통신하도록 함.

- Videoconference Application : OpenVidu Call 애플리케이션 또는 기타 애플리케이션 / 비활성화 가능

## 배포에 필요한 조건들
- 2개의 CPU 8GB 이상의 RAM 

 

- Docker가 설치됨

 

- Docker Compose가 설치됨(최소 1.24 버전)

 

-  도메인 이름

WebRTC를 사용하기 때문에 HTTPS를 사용해야 합니다.

도메인 이름이 없는 경우 자동 생성된 SSL 인증서가 사용되며 사이트에 들어갈 때 사용자에게 보기 흉한 경고가 표시됩니다.

SSL 인증서는 Let's Encrypt를 사용하여 생성할 수 있습니다.

 

- 서버의 포트 구성

22 TCP : SSH를 사용하여 관리자 OpenVidu에 연결

80 TCP : SSL 인증서를 생성하기 위해 Let's Encrypt를 선택하는 경우 사용됨

443 TCP : OpenVidu 서버 및 애플리케이션은 기본적으로 https 포트로 통신

3478 TCP + UDP : STUN/TURN 서버에서 클라이언트 IP를 확인하는 데 사용

40000- 57000 TCP + UPD : Kurento Media Server에서 미디어 연결을 설정하는 데 사용합니다.

57001 - 65535 TCP + UDP : 중계된 미디어 연결을 설정하기 위해 TURN 서버에서 사용됩니다.

 

외부 공격을 피하기 위해서 이외의 다른 포트들은 닫는 것이 좋습니다.

## 배포하기

배포하기 위해서 루트 권한이 필요합니다.

```
sudo su
 ```

OpenVidu를 설치하는데 권장되는 폴더는 /opt입니다.
```
cd /opt
 ```

다음 명령을 실행하여 설치 스크립트를 다운로드하고 실행합니다.
```
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```
필요한 모든 파일이 openvidu 폴더에 다운되고 기본 지침과 함께 이 메시지가 표시됩니다.
```
Openvidu Platform successfully installed.
=======================================

1. Go to openvidu folder:
$ cd openvidu

2. Configure DOMAIN_OR_PUBLIC_IP and OPENVIDU_SECRET in .env file:
$ nano .env

3. Start OpenVidu
$ ./openvidu start

For more information, check:
https://docs.openvidu.io/en/stable/deployment/ce/on-premises/
```

## 설정하기
OpenVidu 플랫폼 설정은 환경변수와 함께 .evn파일에 지정됩니다.

- DOMAIN_OR_PUBLIC_IP와 OPENVIDU_SECRET을 무조건 설정해줘야 합니다.
 
- 도메인이름이 유요한 경우 CERTIFICATE_TYPE을 변경할 수 있습니다. 이 속성을 letsencrypt로 설정하면 유효한 인증서가 자동으로 생성됩니다.

.evn 파일은 다음과 같이 구성되어 있습니다.
```
# OpenVidu 설정파일
# ----------------------
# Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/

# NOTE: This file doesn't need to quote assignment values, like most shells do.
# All values are stored as-is, even if they contain spaces, so don't quote them.

# 도메인 이름. 만약 도메인이 없다면 public IP주소로 설정
# 예를들어 198.51.100.1 또는 openvidu.example.com
DOMAIN_OR_PUBLIC_IP=

# OpenVidu 서버에 연결하고 사용자가 OpenVidu 대시보드에 액세스하는 데 사용되는 OpenVidu Secret
OPENVIDU_SECRET=

# Certificate type:
# - selfsigned:  자체 서명한 인증서 권장되지 않음
# - owncert:     인터넷 서비스 회사에서 구입한 인증서 ./owncert 파일에 넣어주세요
# - letsencrypt: letsencrypt를 사용하여 새 인증서를 생성합니다.밑에서 이메일 설정해줘야 함
CERTIFICATE_TYPE=selfsigned

# CERTIFICATE_TYPE = letsencrypt인 경우 알림을 위한 유효한 이메일 입력
LETSENCRYPT_EMAIL=user@example.com
...
 ```

## 실행하기
OpenVidu 플랫폼 시작하기
```
./openvidu start
```
서비스에 대한 모든 도커 이미지가 다운로드되고 실행됩니다.
```
Creating openvidu-docker-compose_coturn_1          ... done
Creating openvidu-docker-compose_app_1             ... done
Creating openvidu-docker-compose_kms_1             ... done
Creating openvidu-docker-compose_nginx_1           ... done
Creating openvidu-docker-compose_redis_1           ... done
Creating openvidu-docker-compose_openvidu-server_1 ... done
이후에 openvidu-server 서비스 로그가 표시됩니다.

----------------------------------------------------

   OpenVidu Platform is ready!
   ---------------------------

   * OpenVidu Server: https://DOMAIN_OR_PUBLIC_IP/

   * OpenVidu Dashboard: https://DOMAIN_OR_PUBLIC_IP/dashboard/

----------------------------------------------------
```
Ctrl + C를 눌러 쉘로 돌아가면 OpenVidu가 백그라운드에서 실행됩니다.

## 배포 후 서비스를 이용하는 방법
OpenVidu REST API 공식문서를 활용하여 호출할 수 있습니다.
