# Boiler-Plate

## Server

- Node.js 와 Express.js 설치
- MongoDB 연동
- MongoDB Model & Schema 설정 (Mongoose)
- 회원가입 API 생성
- process.env.NODE_ENV 설정
- Bcrypt로 비밀번호 암호화
- 로그인 API 생성(jsonwebtoken)
- 인증(authentication) API 생성
- 로그아웃 API 생성

## Front

- CRA(Create-React-App)

  ```bash
  $ npx create-react-app .
  ```

-

<!--

```bash
$ git rm --cacheed
```

## SSH Key 생성

아래 파일을 찾아보고 `id_rsa`, `id_rsa.pub` 파일이 없다면 생성 하도록 하자.

```bash
# id_rsa  id_rsa.pub 파일 확인
$ ls -a ~/.ssh

# 없다면 아래 명령어를 통해서 얻는 public key를 통해서 Github과 연동한다.
$ ssh-keygen
```

---

## MongoDB

```bash
# MongoDB shell 실행
$ mongo

# use [Database], 사용하려는 Database 설정, 없으면 Database 생성
$ use exercise

# 현재 사용하고 있는 Database 확인
$ db  # exercise

# 현재 Database 리스트 확인
$ show dbs

# Database 제거, 현재 사용하고 있는 Database 제거
$ db.dropDatabase()

# Collection 생성 및 data 삽입
$ db.person.insert({ "name": "jkun", "age": 27 }) # person Collection 생성 및 data 삽입

# Collection 생성
$ db.createCollection()

# capped: true로 하면 용량 초과시 오래된 데이터를 덮어버림, size 입력 필수
# autoIndex: ObjectID에 indexing 적용
# size: Collection의 최대사이즈
# max: Collection의 추가할 수 있는 최대 갯수

$ db.createCollection('text', { capped: true, size: 2048000 })

# Collection 확인
$ show collections

# Collection 삭제, db.[CollectionName].drop()
$ db.test.drop()

# Collection 생성 및 삽입
$ db.createCollection("test")
$ db.test.insert([
  {"name": "Kim", "age": 28},
  {"name": "Lee", "age": 29},
  {"name": "Han", "age": 28}
])

# Document 조회, db.[colectionName].find(query, projection)
## query => 조회 조건, projection => 보이고 싶은 리스트, 원하는 필드만 출력
$ db.test.find()

# 비교연산자
## $eq => (=) 일치하는 값
## $qt => 큰 값
## $gte => 크거나 같은
## $lt => 작은 값
## $lte => 작거나 같은
## $ne => 일치하지 않는 값
## $in => 배열 안에 속하는 경우
## $nin => 배열안에 속하지 않는 경우

# AND($and), OR($or)

# Sort 정렬, 1은 오름차순 / -1은 내림차순
$ db.test.find().sort({'age': -1})

# Limit, 출력 개수 제한
$ db.test.find().limit(2)

# Skip, 데이터의 시작부분 지정
$ db.test.find().skip(1)  # 0번째 제외하고 1번째 부터 출력

# Document Update, db.[collectionName].update(조건, 데이터)
$ db.test.update({"name": "Han"}, { $set: {"age": 30}}) # name이 'Han'이라면 age를 30으로 Update

# Document Delete, db.[collectionName].remove(조건절)
$ db.test.remove({"name": "Lee"})
```

-->
