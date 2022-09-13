# 🏋🏻 **집에서 운동중- WebRTC 기반 운동 플랫폼**

![image](https://user-images.githubusercontent.com/60002973/189929103-dbbe80ae-2cf0-4362-88d8-8365498a8f99.png)

---

## 📖 주제

운동 의지가 약한 사람들을 위해 그룹을 통해 다양한 참여 유도 정책을 제공하는 프로젝트  

---

## 📅 **프로젝트 진행 기간**

2022.07.12(화) ~ 2022.08.19(금) [****38****일간 진행] - SSAFY 7기 2학기 공통프로젝트

---

## 🤔 프로젝트에서 다루는 문제

많은 사람들이 하루를 습관처럼 보내고 있으며 이러한 습관을 바꾸기는 어렵습니다. 아무리 강한 의지로 무언가를 계획하고 실천하더라도 그것이 습관이 되기 전에 그만두는 경우가 많습니다.

**작심삼일 증후군**

실제로 새해 결심을 일주일 채 넘기지 못하는 경우는 27.4%입니다. 또한 새해 결심을 연말까지 1년 동안 지킨 비율은 고작 8%에 불과합니다. 많은 사람들이 새해에 운동을 해야겠다고 결심을 많이 합니다. 한국인의 기대 수명은 평균 83.5세이며 아프지 않고 건강한 상태로 지내는 기간은 이보다 짧은 66.3세입니다. 즉, 17년 동안 우리는 건강의 위험 속에서 지내야 하며 운동의 중요성은 점점 더 높아지고 있습니다.

**사용자에게 작심삼일을 극복하기 위한 흥미와 의지를 부여하고자 합니다.**

---

## 💡 문제를 해결하기 위한 솔루션과 목표

미국의 의사 맥스웰 몰츠가 주장한 21일의 법칙과 영국의 심리학자 필리파 랠리와 그의 팀이 진행한 연구에서 발견한 66일 습관의 법칙을 토대로 사용자에게 **21일과 66일 동안 꾸준하게 참여할 수 있는 보상과 흥미를 제공**합니다.

**21일의 법칙**
우리의 뇌가 **새로운 행동에 익숙해지는 데 걸리는 최소한의 시간이 21일**이라는 법칙

**66일의 법칙일정 절차에 따라 66일만 꾸준히 행동하면 원하는 행동을 습관**으로 만들 수 있다는 법칙

---

## 🤔 어떤 보상과 흥미를 통해 문제를 해결할 수 있을까요?

### 🤲 **친구들과 함께하는 운동**

- 친목을 통한 참여 유도
- 초대 링크를 통해 친구를 운동 그룹에 초대할 수 있습니다.

### 🏅**3일, 21일, 66일 기반으로 보상 제공**

- 3일을 연속으로 출석한 경우, 초보자 아이콘을 제공합니다.
- 21일을 연속으로 출석한 경우, 그룹 스트릭이 깨지는 것을 방지하는 쉴드를 제공합니다.
- 66일을 연속으로 출석한 경우, 명예의 전당에 이름이 올라갑니다.

### 🏆**랭킹**

- TIME RANKING - 운동 총 시간(그룹원 모두 참여)을 기준으로 상위 그룹 1개, 하위 그룹 1개를 보여줍니다.
- CONTINUE RANKING - 스트릭을 기준으로 상위 그룹 1개, 하위 그룹 1개를 보여줍니다.

### ✅**그룹 스트릭(1일 1 운동)**

- **그룹원 전원이 운동에 참여해야 획득할 수 있는 그룹 스트릭 정책**을 통해 그룹원들끼리 운동에 참여할 수 있도록 유도합니다.
- 운동에 참여하지 않는 경우, **미 참여자는 “작심삼일” 칭호를 획득**합니다.

### 🏋️**그룹별 운동 진행**

- 그룹마다 운동 루틴을 지정할 수 있습니다.
- 자세 인식을 통해 정확한 자세로 운동에 참여할 수 있도록 유도합니다.
- 게임 종료 후, 목표 대비 개인 달성률, 팀의 평균 달성률을 제공해 협업을 이끌어냅니다.

---

## ⌨️ ** 사용 기술**

**Backend**

- IntelliJ IDE 2022.1.3(Ultimate Edition) 11.0.15 + 10-b2043.56 amd64
- Java 11
- SpringBoot 2.7.1
- MySQL 8.0.30-1.el8
- JPA
- JVM 11.0.16+8-post-Ubuntu-Oubuntu120.04
- Spring Security
- Docker 20.10.17
- Redis 7.0.4

**Frontend**

- Visual Studio Code IDE 1.70.1
- React 18.2.0
- React-Redux 8.0.2
- Tailwind CSS
- FlowBite
- Teachable Machine 2.0

**Tech**

- Teachable Machine 2.0
- Openvidu 2.22.0

**CI/CD**

- AWS EC2 Ubuntu 20.04 LTS
- Jenkins 2.346.2
- NGINX 1.23.1
- SSL 인증서

---

## 🏗️ **프로젝트 파일 구조**
### Front

```markdown
frontend
├── node_modules
├── public
└── src
├── api
├── assets
├── components
│   ├── Line.jsx
│   ├── button
│   ├── calendar
│   ├── card
│   ├── icon
│   ├── input
│   ├── modal
│   ├── nameSquare
│   ├── navbar
│   ├── spinner
│   └── timer
├── features
│   ├── group
│   ├── login
│   ├── myPage
│   ├── rank
│   ├── room
│   │   ├── openVidu
│   │   ├── teachableMachine
│   │   └── workout
│   └── routine
├── pages
└── utils
```

### **Back**

```markdown
backend
├── main
│   ├── java
│   │   └── jibjoong
│   │   └── jibjoong
│   │   ├── aop
│   │   │   └── annotation
│   │   ├── api
│   │   │   ├── controller
│   │   │   ├── dto
│   │   │   │   ├── common
│   │   │   │   ├── exercise
│   │   │   │   ├── icon
│   │   │   │   ├── information
│   │   │   │   ├── nickname
│   │   │   │   ├── ranking
│   │   │   │   ├── room
│   │   │   │   ├── routine
│   │   │   │   └── team
│   │   │   └── service
│   │   ├── config
│   │   │   ├── auth
│   │   │   ├── jwt
│   │   │   └── redis
│   │   ├── db
│   │   │   ├── domain
│   │   │   └── repository
│   │   │   ├── exercise
│   │   │   ├── history
│   │   │   ├── memberteam
│   │   │   ├── room
│   │   │   └── routine
│   │   ├── enums
│   │   ├── exception
│   │   │   └── advice
│   │   └── interceptor
│   └── resources
└── test
```



---

## **✔ 프로젝트 산출물**
- [화면 소개](./exec/화면소개.md)
- [시연시나리오](./exec/시연시나리오_집에서운동중.pdf)
- [ERD](./exec/ERD_집에서운동중.PNG)
- [와이어프레임](./exec/와이어프레임.md)
- [기능 명세서](./exec/기능명세서.md)

---

## 👥 ** Team **
### FrontEnd

-  👩🏻‍💻 안지영 - WebRTC

- 👩🏻‍💻 채송지 - Design

-  👨🏻‍💻 박종민 - API

### BackEnd

-  👩🏻‍💻 신슬기 - 팀장

-  👨🏻‍💻 황승주 - DevOps

-  👨🏻‍💻 김준우 - API
