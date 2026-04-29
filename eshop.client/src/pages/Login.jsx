import { useState } from "react";

function Login() {

    //sign
    const [data, setData] = useState({
        loginEmail: '',
        loginPassword: '',
        loginError: '',
        showLoginPassword: false,
        rememberMe: false,
        //reg
        regFirstName: '',
        regLastName: '',
        regEmail: '',
        regPassword: '',
        regPasswordAgain: '',
        regError: '',
        regSuccess: '',
        showRegPassword: false,
        showRegPasswordAgain: false
    });

    // function for value change
    const updateData = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    //regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.\-/_]).{8,}$/;

    const isEmailValid = (email) => {
        return emailRegex.test(email);
    }

    const isPasswordValid = (password) => {
        return passwordRegex.test(password);
    }

    //reg
    const handleRegistration = (e) => {
        e.preventDefault();
        updateData('regError', '');
        updateData('regSuccess', '');

        const { regFirstName, regLastName, regEmail, regPassword, regPasswordAgain } = data;

        if (regFirstName === '' || regLastName === '' || regEmail === '' || regPassword === '' || regPasswordAgain === '') {
            updateData('regError', 'Please fill in all fields');
            return;
        }

        if (!isEmailValid(regEmail)) {
            updateData('regError', 'Please enter a valid email (e.g., name@domain.com)');
            return;
        }

        if (!isPasswordValid(regPassword)) {
            updateData('regError', 'Password must have: min. 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character');
            return;
        }

        if (regPassword !== regPasswordAgain) {
            updateData('regError', 'Passwords do not match');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some(user => user.email === regEmail);

        if (userExists) {
            updateData('regError', 'User with this email already exists');
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

        updateData('regSuccess', 'Registration successful! You can now log in.');
        updateData('regFirstName', '');
        updateData('regLastName', '');
        updateData('regEmail', '');
        updateData('regPassword', '');
        updateData('regPasswordAgain', '');
    };

    //sign
    const handleLogin = (e) => {
        e.preventDefault();
        updateData('loginError', '');

        const { loginEmail, loginPassword, rememberMe } = data;

        if (loginEmail === '' || loginPassword === '') {
            updateData('loginError', 'Please fill in all fields');
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
            updateData('loginError', 'Invalid email or password');
        }
    };

    //page
    return (
        <div className="container-small">

            {/* Home > Login */}
            <div className="breadcrumb">
                <span className="breadcrumb-home">Home</span>
                <span className="separator">&gt;</span>
                <span className="current">Login</span>
            </div>

            {/* vertikalni cara */}
            <div className="two-columns">

                {/* reg---------------------------------------------------------------------------------- */}
                <div className="two-columns-left">
                    <h2 className="section-title">
                        Create account
                    </h2>
                    <p className="section-subtitle">
                        Register and start shopping
                    </p>

                    <form onSubmit={handleRegistration}>

                        {/* FIRST NAME */}
                        <div className="form-group">
                            <label className="form-label">
                                First name
                            </label>
                            <input
                                type="text"
                                value={data.regFirstName}
                                onChange={(e) => updateData('regFirstName', e.target.value)}
                                placeholder="Enter your first name"
                                className="input-rounded"
                            />
                        </div>

                        {/* LAST NAME */}
                        <div className="form-group">
                            <label className="form-label">
                                Last name
                            </label>
                            <input
                                type="text"
                                value={data.regLastName}
                                onChange={(e) => updateData('regLastName', e.target.value)}
                                placeholder="Enter your last name"
                                className="input-rounded"
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="form-group">
                            <label className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={data.regEmail}
                                onChange={(e) => updateData('regEmail', e.target.value)}
                                placeholder="Enter your email address"
                                className="input-rounded"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="form-group">
                            <label className="form-label">
                                Password
                            </label>
                            <div className="password-wrapper">
                                <input
                                    type={data.showRegPassword ? "text" : "password"}
                                    value={data.regPassword}
                                    onChange={(e) => updateData('regPassword', e.target.value)}
                                    placeholder="Enter your password"
                                    className="input-rounded"
                                />
                                <span
                                    onClick={() => updateData('showRegPassword', !data.showRegPassword)}
                                    className="eye-icon"
                                >
                                    {data.showRegPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {/* CONFIRM PASSWORD*/}
                        <div className="form-group-last">
                            <label className="form-label">
                                Confirm password
                            </label>
                            <div className="password-wrapper">
                                <input
                                    type={data.showRegPasswordAgain ? "text" : "password"}
                                    value={data.regPasswordAgain}
                                    onChange={(e) => updateData('regPasswordAgain', e.target.value)}
                                    placeholder="Confirm your password"
                                    className="input-rounded"
                                />
                                <span
                                    onClick={() => updateData('showRegPasswordAgain', !data.showRegPasswordAgain)}
                                    className="eye-icon"
                                >
                                    {data.showRegPasswordAgain ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {data.regError && (
                            <p className="message-error">
                                {data.regError}
                            </p>
                        )}
                        {data.regSuccess && (
                            <p className="message-success">
                                {data.regSuccess}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                        >
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>

                {/*sign----------------------------------------------------------------- */}
                <div className="two-columns-right">
                    <h2 className="section-title">
                        Sign in
                    </h2>
                    <p className="section-subtitle">
                        Already have an account? Sign in
                    </p>

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}
                        <div className="form-group">
                            <label className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={data.loginEmail}
                                onChange={(e) => updateData('loginEmail', e.target.value)}
                                placeholder="Enter your email address"
                                className="input-rounded"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="form-group">
                            <label className="form-label">
                                Password
                            </label>
                            <div className="password-wrapper">
                                <input
                                    type={data.showLoginPassword ? "text" : "password"}
                                    value={data.loginPassword}
                                    onChange={(e) => updateData('loginPassword', e.target.value)}
                                    placeholder="Enter your password"
                                    className="input-rounded"
                                />
                                <span
                                    onClick={() => updateData('showLoginPassword', !data.showLoginPassword)}
                                    className="eye-icon"
                                >
                                    {data.showLoginPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {/* REMEMBER ME */}
                        <div className="checkbox-wrapper">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={data.rememberMe}
                                    onChange={(e) => updateData('rememberMe', e.target.checked)}
                                    className="checkbox"
                                />
                                Remember me
                            </label>
                            <a href="#" className="link">
                                Forgot password?
                            </a>
                        </div>

                        {data.loginError && (
                            <p className="message-error">
                                {data.loginError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                        >
                            SIGN IN
                        </button>
                    </form>
                </div>

            </div>

            {/* HELPER TEXT */}
            <div className="helper-text">
                <p>Email format: name@domain.com</p>
                <p>Password: min. 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character</p>
            </div>

        </div>
    );
}

export default Login;
