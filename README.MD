# 대전 코로나 현황 캡쳐 자동화

firebase function 과 puppeteer 를 이용하여 구현  
Node.js 기반으로 웹 사이트를 캡쳐하는데 사용할때 응용하면 좋을 것 같은 예제  

## puppeteer 세팅 관련
- puppeteer 가 메모리와 시간을 많이 사용하기 때문에 타임아웃과 메모리를 별도로 지정하여 줌
- firebase function 에서 사용하려면 '--no-sandbox' 옵션을 추가해줘야함
- 전체 화면이 아니라 특정 Element 만 캡쳐할 수 있도록 처리 

## 결과물
![result](https://i.imgur.com/UdUd8C9.png)
목록이 길어 상위 10개만 출력하도록 height 값 설정. 전체를 캡쳐하고 싶을 경우에는 주석 코드 참고.

