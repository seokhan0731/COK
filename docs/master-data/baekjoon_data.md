# 백준 범위

## 개요

* **날짜:** 2026.05.28
* **작성자:** 김석환

---

## 백준 티어별 점수 부여

**MVP 모델 개발이기에, 백준으로만 제한**

| 티어           | 점수  |
|--------------|-----|
| Bronze V     | 20  |
| Bronze IV    | 22  |
| Bronze III   | 24  |
| Bronze II    | 26  |
| Bronze I     | 28  |
| Silver V     | 35  |
| Silver IV    | 38  |
| Silver III   | 41  |
| Silver II    | 44  |
| Silver I     | 47  |
| Gold V       | 55  |
| Gold IV      | 60  |
| Gold III     | 65  |
| Gold II      | 70  |
| Gold I       | 75  |
| Platinum V   | 80  |
| Platinum IV  | 84  |
| Platinum III | 88  |
| Platinum II  | 92  |
| Platinum I   | 96  |
| Diamond 이상   | 100 |

## 백준 점수 티어별 점수 설정 기준

**1. Diamond, Ruby 티어**  
타겟층이 대학생, 주니어 개발자이며, 대부분이 Silver~Gold에 몰려있기 떄문에, 30단계라는 사실을 통해 정규화하기보단,  
Diamond와 Ruby를 하나의 묶음으로 만들었다.

**Diamond 이상을 100점으로 두어, 별도의 정규화 과정을 생략 가능**

**2. 티어별 점수폭 차등**
티어별 점수폭을 일정치 않고, 구간별 난이도 차이를 반영하며 설계하였다. 특히 Gold부터는 알고리즘 난이도와 요구되는 문제 해결 능력이 증가하기에
상승폭을 확대하였다. 다만 Platinum 이상 구간은 이미 상위권 알고리즘 역량을 보유한 사용자 집단이며,
실제 코딩 테스트 시장에서도 충분한 문제 해결 역량을 갖춘 것으로 평가하는 경우가 많아 세부 티어 간 차이를 완만하게 반영하였다.