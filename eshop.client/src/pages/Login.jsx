import { useState } from "react";

function Login() {

    //sign
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    //reg
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regPasswordAgain, setRegPasswordAgain] = useState('');
    const [regError, setRegError] = useState('');
    const [regSuccess, setRegSuccess] = useState('');
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showRegPasswordAgain, setShowRegPasswordAgain] = useState(false);

    //regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.\-/_]).{8,}$/;

    const isEmailValid = (email) => {
        return emailRegex.test(email);
    }

    const isPasswordValid = (password) => {
        return passwordRegex.test(password);
    }

    //spolecny styl
    const inputStyle = {
        width: '90%',
        padding: '12px',
        paddingRight: '45px',
        border: '1px solid #ccc',
        borderRadius: '25px',
        fontSize: '14px',
        outline: 'none'
    };

    //reg
    const handleRegistration = (e) => {
        e.preventDefault();
        setRegError('');
        setRegSuccess('');

        if (regFirstName === '' || regLastName === '' || regEmail === '' || regPassword === '' || regPasswordAgain === '') {
            setRegError('Please fill in all fields');
            return;
        }

        if (!isEmailValid(regEmail)) {
            setRegError('Please enter a valid email (e.g., name@domain.com)');
            return;
        }

        if (!isPasswordValid(regPassword)) {
            setRegError('Password must have: min. 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character');
            return;
        }

        if (regPassword !== regPasswordAgain) {
            setRegError('Passwords do not match');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some(user => user.email === regEmail);

        if (userExists) {
            setRegError('User with this email already exists');
            return;
        }

        const newUser = {
            firstName: regFirstName,
            lastName: regLastName,
            email: regEmail,
            password: regPassword
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        setRegSuccess('Registration successful! You can now log in.');
        setRegFirstName('');
        setRegLastName('');
        setRegEmail('');
        setRegPassword('');
        setRegPasswordAgain('');
    };

    //sign
    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');

        if (loginEmail === '' || loginPassword === '') {
            setLoginError('Please fill in all fields');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = storedUsers.find(u => u.email === loginEmail && u.password === loginPassword);

        if (user) {
            if (rememberMe) {
                localStorage.setItem('rememberedUser', loginEmail);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            alert(`Welcome ${user.firstName} ${user.lastName}! You have successfully logged in.`);
        } else {
            setLoginError('Invalid email or password');
        }
    };

    //page
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            padding: '40px 20px',
            maxWidth: '1000px',
            margin: '0 auto'
        }}>

            {/* Home > Login */}
            <div style={{
                marginBottom: '40px',
                fontSize: '14px',
                color: '#666'
            }}>
                <span style={{ cursor: 'pointer' }}>Home</span>
                <span style={{ margin: '0 8px' }}>&gt;</span>
                <span style={{ color: '#000' }}>Login</span>
            </div>

            {/* vertikalni cara */}
            <div style={{
                display: 'flex',
                gap: '50px',
                borderTop: '1px solid #e0e0e0',
                paddingTop: '40px'
            }}>

                {/* reg---------------------------------------------------------------------------------- */}
                <div style={{
                    flex: 1,
                    borderRight: '1px solid #e0e0e0',
                    paddingRight: '40px'
                }}>
                    <h2 style={{
                        fontSize: '24px',
                        marginBottom: '10px',
                        fontWeight: 'normal'
                    }}>
                        Create account
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '30px'
                    }}>
                        Register and start shopping
                    </p>

                    <form onSubmit={handleRegistration}>

                        {/* FIRST NAME */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                First name
                            </label>
                            <input
                                type="text"
                                value={regFirstName}
                                onChange={(e) => setRegFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                style={inputStyle}
                            />
                        </div>

                        {/* LAST NAME */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Last name
                            </label>
                            <input
                                type="text"
                                value={regLastName}
                                onChange={(e) => setRegLastName(e.target.value)}
                                placeholder="Enter your last name"
                                style={inputStyle}
                            />
                        </div>

                        {/* EMAIL */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                placeholder="Enter your email address"
                                style={inputStyle}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showRegPassword ? "text" : "password"}
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={inputStyle}
                                />
                                <span
                                    onClick={() => setShowRegPassword(!showRegPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '18px'
                                    }}
                                >
                                    {showRegPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {/* CONFIRM PASSWORD*/}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Confirm password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showRegPasswordAgain ? "text" : "password"}
                                    value={regPasswordAgain}
                                    onChange={(e) => setRegPasswordAgain(e.target.value)}
                                    placeholder="Confirm your password"
                                    style={inputStyle}
                                />
                                <span
                                    onClick={() => setShowRegPasswordAgain(!showRegPasswordAgain)}
                                    style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '18px'
                                    }}
                                >
                                    {showRegPasswordAgain ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {regError && (
                            <p style={{ color: 'red', fontSize: '13px', marginBottom: '15px' }}>
                                {regError}
                            </p>
                        )}
                        {regSuccess && (
                            <p style={{ color: 'green', fontSize: '13px', marginBottom: '15px' }}>
                                {regSuccess}
                            </p>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#000',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>

                {/*sign----------------------------------------------------------------- */}
                <div style={{
                    flex: 1,
                    paddingLeft: '10px'
                }}>
                    <h2 style={{
                        fontSize: '24px',
                        marginBottom: '10px',
                        fontWeight: 'normal'
                    }}>
                        Sign in
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '30px'
                    }}>
                        Already have an account? Sign in
                    </p>

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="Enter your email address"
                                style={inputStyle}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={inputStyle}
                                />
                                <span
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '18px'
                                    }}
                                >
                                    {showLoginPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {/* REMEMBER ME */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '25px'
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        cursor: 'pointer'
                                    }}
                                />
                                Remember me
                            </label>
                            <a href="#" style={{
                                fontSize: '13px',
                                color: '#666',
                                textDecoration: 'none'
                            }}>
                                Forgot password?
                            </a>
                        </div>

                        {loginError && (
                            <p style={{ color: 'red', fontSize: '13px', marginBottom: '15px' }}>
                                {loginError}
                            </p>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#000',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            SIGN IN
                        </button>
                    </form>
                </div>

            </div>

            {/* HELPER TEXT */}
            <div style={{
                marginTop: '40px',
                padding: '20px',
                borderTop: '1px solid #e0e0e0',
                textAlign: 'center',
                fontSize: '13px',
                color: '#666'
            }}>
                <p>Email format: name@domain.com</p>
                <p>Password: min. 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character</p>
            </div>

        </div>
    );
}

export default Login;