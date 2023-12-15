import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import config from '@/utils/config.js';
import db from '@/db/database.js';
import postRouter from '@/router/post.js';

const app = express();

// body를 파싱하기 위해 사용해야함
// 이전에는 body-parser라는 외부 모듈을 사용해야하지만 4.16 이후 버전부터 내장되어있음
app.use(express.json());

// express.json()은 form으로 제출되는 body를 읽을 수 없다.
// 그래서 express.urlencoded를 함께 사용해야한다.
// extended는 필수 값인데, true로 주면 qs 외부 모듈을, false로 주면 Nodejs 내장 querystring 모듈을 사용하며 출력 형태가 다르다.
app.use(express.urlencoded({ extended: true }));

// cors 설정을 쉽게해주는 라이브러리
// 옵션을 줄 수 있다.
app.use(cors());

// body와 마찬가지로 cookie 또한 기본적으로 undefined이기 때문에 cookie를 읽기 위해 사용한다.
app.use(cookieParser());

// 요청의 정보를 log로 남길때 유용하다.
app.use(morgan('combined'));

// 보안에 유용한 라이브러리
app.use(helmet());

// express.static은 정적파일(.html, 이미지 등)을 사용자에게 전달할때 사용한다.
const options = {};
app.use(express.static('folder', options));

app.use('/post', postRouter);

db.getConnection().then(() => console.log('db connected'));

app.listen(config.host.port, () =>
	console.log('server listening on port: 8000')
);
