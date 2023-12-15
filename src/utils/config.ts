import dotenv from 'dotenv';
dotenv.config();

interface Required {
	key: string;
	defaultValue?: any;
}

const required = ({ key, defaultValue = undefined }: Required) => {
	const value = process.env[key] || defaultValue;

	if (!value) {
		throw new Error(`${key} is undefined`);
	}

	return value;
};

const config = {
	host: {
		port: parseInt(required({ key: 'HOST_PORT', defaultValue: 8000 }))
	},
	db: {
		host: required({ key: 'DB_HOST' }),
		user: required({ key: 'DB_USER' }),
		database: required({ key: 'DB_DATABASE' }),
		password: required({ key: 'DB_PASSWORD' })
	}
};

export default config;
