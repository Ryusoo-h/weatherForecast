# 스터디
## API연습 : 기상정보 받아오기

참고 자료

[오픈API 상세 : 기상청_단기예보 ((구)_동네예보) 조회서비스](https://www.data.go.kr/data/15084084/openapi.do)

[오픈API 상세 : 기상청_중기예보 조회서비스](https://www.data.go.kr/data/15059468/openapi.do)

[대기환경정보 참고](https://cleanair.seoul.go.kr/information/info11#emergency-response)

---

## 개념
- SOP
    - Same-origin policy, 동일 출처 정책
- CORS
    - Cross-Origin Resource Sharing, 교차 출처 리소스 공유
    - 하지만 서버-서버 간에는 CORS가 없다!
    - 공공 API는 서버끼리 되도록 열어두는 경우가 많다..
    - .'. 프록시 서버를 만들어서 공공 API로 요청을 보내고 받아서 → 클라이언트로 보내줌
- 프록시 서버
    - 종류1(온전한 프록시 서버): 요청하고 요청한것을 가공없이 그대로 준다
    - 종류2 : 요청한것을 가공하여 주는 것 (엄격한 기준에 의하면 이 경우 프록시 서버가 아니라고 할 수도 있다)

참고 : [SOP와 CORS](https://velog.io/@jesop/SOP%EC%99%80-CORS)
