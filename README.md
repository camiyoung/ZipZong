# 🏋🏻 **집에서 운동중- WebRTC 기반 운동 플랫폼**

![image](https://user-images.githubusercontent.com/60002973/189929103-dbbe80ae-2cf0-4362-88d8-8365498a8f99.png)

![운동화면](./exec/view_imgs/exercise.gif)

- WebRTC를 이용한 비디오 채팅 서비스 
- 머신러닝을 활용하여 수행중인 운동 자세를 인식하고 동작을 카운트합니다.
- 진행한 운동 정보를 저장하여 연속 일수를 측정합니다.
- 보상 조건을 만족하는 연속 일수를 달성하면 특별한 아이콘이 보상으로 제공됩니다.

[모든 기능 소개 보기](https://github.com/camiyoung/ZipZong/blob/main/exec/%EA%B8%B0%EB%8A%A5%EB%AA%85%EC%84%B8%EC%84%9C.md)


## 📀 시연 영상 
[<img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=YouTube&logoColor=white">](https://www.youtube.com/watch?v=60iz58dWdfY)




## 📅 **프로젝트 진행 기간**

2022.07.12(화) ~ 2022.08.19(금)- SSAFY 7기 2학기 공통프로젝트

최우수 프로젝트 수상 🏆


## 아키텍처 
![image](https://user-images.githubusercontent.com/60002973/189943944-0edccc16-80ee-40cf-b081-e44c7f103ea9.png)


## 기술 스택 
<img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind Css-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">


<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">


## 🏗️ 프로젝트 파일 구조


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




## **✔ 프로젝트 산출물**
- [화면 소개](./exec/화면소개.md)
- [시연시나리오](./exec/시연시나리오_집에서운동중.pdf)
- [ERD](./exec/ERD_집에서운동중.PNG)
- [와이어프레임](./exec/와이어프레임.md)
- [기능 설명 및 명세서](./exec/기능명세서.md)



## 👥  Team 
### FrontEnd

-  👩🏻‍💻 안지영 - WebRTC

- 👩🏻‍💻 채송지 - Design

-  👨🏻‍💻 박종민 - API

### BackEnd

-  👩🏻‍💻 신슬기 - 팀장

-  👨🏻‍💻 황승주 - DevOps

-  👨🏻‍💻 김준우 - API
