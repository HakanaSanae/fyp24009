import React from 'react';

function LoginForm(){
    return (
        <div>
            <form>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required></input>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Login</button>
            </form>
            
            <p>
                Don't have an account? Click <a href="/register">here</a> to register. 
            </p>
        </div>
    )
}

export default LoginForm;