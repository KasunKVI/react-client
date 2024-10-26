import React, { useEffect } from 'react';

const LINE_LOGIN_URL = 'https://access.line.me/oauth2/v2.1/authorize';
const CLIENT_ID = '2006488418';
const REDIRECT_URI = 'http://localhost:8080/api/v1/auth/line/callback'; // Change to your backend or redirect URI
const STATE = 'plain request'; // Generate a random state string for security

const LineQRCodeLogin = () => {
    const handleLineLogin = () => {
        window.location.href = `${LINE_LOGIN_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=profile%20openid%20email`;
    };

    // Function to extract query parameters from URL
    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            code: params.get('code'),
            state: params.get('state'),
            error: params.get('error')
        };
    };

    // Use useEffect to check if we have a code (after redirection)
    useEffect(() => {
        const { code, state, error } = getQueryParams();
        if (code) {
            console.log('Authorization Code:', code);
            // Optionally, send this code to the backend to exchange it for an access token
        }
        if (error) {
            console.log('Error:', error);
        }
    }, []);

    return (
        <div style={styles.container}>
            <button onClick={handleLineLogin} style={styles.button}>
                Log in with LINE
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        // Add any additional button styles here
    },
};

export default LineQRCodeLogin;
