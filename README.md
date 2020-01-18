# Passport demo

## 정리

### Strategy

로그인 방식을 지정한다. `passport.use()` 아래 정의하고, `passport.authenticate('strategy')` 미들웨어에서 어떤 Strategy를 사용할지 결정된다. `LocalStrategy`, `JWTStrategy`를 확인했다.

### serializeUser

`passport.authenticate()`는 내부적으로 `req.login` 함수를 사용하는데 이때 `req.login(user, callback)`에서 넘겨지는 `user`가 `serializeUser`으로 넘어가게 된다. `passport.serializeUser((user, done) => {})`을 정의하면 되는데, 여기서는 done 부분에 세션에 저장될 데이터를 넘겨줘야 한다. `done(null, user)` 형태로 호출하면 된다.

### deserializeUser

모든 요청 중에 세션 아이디를 쿠키 값으로 갖고 있는 경우에 호출되는 것 같다. 세션을 찾아서 `serializeUser`에서 올려둔 정보를 가져온다. 이 때 보통 id값만 올려두는데 `deserilizeUser` 함수 내부에서 유저를 찾는 로직을 넣어서 완전한 유저를 `done(null, user)`로 넣어주면 `req.user`에 넣어준다. 그 뒤로는 `serializeUser`가 동작하는 게 아니라 계속 `deserializeUser`만 동작함

### passport.authenticate

호출하면 미들웨어를 반환한다. 어떤 Strategy를 사용할지 결정하기만 하면 됨. 내부적으로 `req.login` 함수를 사용하고 있다.

## 아직 궁금한 점

만약 쿠키 아이디를 지우면 메모리, DB에 있는 세션은 그냥 메모리를 잡아먹고 있는 상태로 있는 건가? 새로 로그인하면 새로운 세션을 만들어 내는 건가 아니면 그 전 세션이 있으면 지우고 새로 만드는 건가
