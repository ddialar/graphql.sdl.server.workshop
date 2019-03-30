const SERVER_ENV = {
    'production': { 
        API_GQL: {
            URL: process.env.GQL_SERVER_URL,
            PORT: process.env.GQL_SERVER_PORT
        },
        API_REST: {
            URL: process.env.REST_SERVER_URL,
            PORT: process.env.REST_SERVER_PORT
        }
    },
    'development': { 
        API_GQL: {
            URL: 'http://localhost',
            PORT: 4500
        },
        API_REST: {
            URL: 'http://localhost',
            PORT: 3000
        }
    },
    'test': { 
        API_GQL: {
            URL: 'http://localhost',
            PORT: 4500
        },
        API_REST: {
            URL: 'http://localhost',
            PORT: 3000
        }
    }
};

export default SERVER_ENV;