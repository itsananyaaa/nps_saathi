const authService = require('./auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const tokenData = await authService.loginUser(email, password);
        res.status(200).json({
            success: true,
            token: tokenData.token,
            user: tokenData.user,
        });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user,
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        // Logic for forgot password
        res.status(200).json({
            success: true,
            message: 'Password reset link sent (Mock)',
        });
    } catch (err) {
        next(err);
    }
};
