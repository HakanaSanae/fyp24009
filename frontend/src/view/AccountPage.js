import { useState, useEffect } from 'react';
import { fetchUserInfo, updateUserInfo } from '../interface/apiClient';
import { useNavigate } from 'react-router-dom';

function AccountPage({ setAccount }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const resetFormWithData = (user_info, options) => {
        setFormData({
            username: user_info.name,
            email: user_info.email,
            password: '',
            confirmPassword: '',
            type: user_info.type,
        });
        setOptions(options);
        setAccount(user_info.name);
    } 

    const validate = () => {
        const newErrors = {};

        if (!formData.email.endsWith('.com') && !formData.email.endsWith('.hk')) {
            newErrors.email = 'Invalid email address.';
        }

        if (formData.password !== '' && formData.confirmPassword !== '') {
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match.';
            } else if (formData.password.length < 8 || formData.password.length > 16 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
                newErrors.password = 'Password must be 8 to 16 characters long and contain both letters and numbers.';
            }
        }

        if (!formData.type) {
            newErrors.type = 'Please select an account type.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const fetchAccountData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchUserInfo(navigate);
            const data = response.message;
            const user_info = data.user_info;
            const options = data.selectable_types;

            setFormData({
                ...formData,
                username: user_info.name,
                email: user_info.email,
                type: user_info.type,
            })

            setOptions(options);

        } catch (error) {
            console.error('Error fetching account data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateAccount = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                const data = await updateUserInfo({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    type: formData.type
                }, navigate);
                if (data.success) {
                    const user_info = data.message.user_info;
                    const options = data.message.selectable_types;
                    localStorage.setItem('account', user_info.name);
                    alert('Account updated successfully!');
                    resetFormWithData(user_info, options);
                }
                else {
                    console.error('Update failed:', data.message);
                }
            } catch (error) {
                console.error('Error updating account data:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchAccountData();
    }, []);

    return (
        isLoading ? (
            <div>Loading...</div>
        ) : (
            <div className="account-page">
                <form onSubmit={updateAccount} autoComplete="off">
                    <div className="form-item">
                        <div className="form-input-error-container">
                            <input
                                type="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="User/Company Name"
                            />
                            {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                        </div>
                    </div>

                    <div className="form-item">
                        <div className="form-input-error-container">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                            />
                            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                        </div>
                    </div>


                    <div className="form-item">
                        <div className="form-input-error-container">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter New Password"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className="form-item">
                        <div className="form-input-error-container">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm New Password"
                            />
                            {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                        </div>
                    </div>

                    <div className="form-item">
                        <div className="form-input-error-container">
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="">Select Account Type</option>
                                {
                                    options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.type && <div style={{ color: 'red' }}>{errors.type}</div>}
                        </div>
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        )
    );
}

export default AccountPage;