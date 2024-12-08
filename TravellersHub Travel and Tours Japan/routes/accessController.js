const jwt = require('jsonwebtoken');

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const token =
            req.headers.authorization?.split(' ')[1] || // Check Authorization header
            req.query.token; // Check token in query parameter

        if (!token) {
            console.error('No token provided. Redirecting to AccessDenied.');
            return res.redirect('/AccessDenied');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultFallbackSecret');
            console.log('Decoded Token:', decoded);

            // Check if the user's role is allowed
            if (!allowedRoles.includes(decoded.selectRole)) {
                console.error(`Unauthorized role: ${decoded.selectRole}. Redirecting to AccessDenied.`);
                return res.redirect('/AccessDenied');
            }

            req.user = decoded; // Attach decoded token to the request
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            console.error('Token verification error:', err.message);
            return res.redirect('/AccessDenied');
        }
    };
}

module.exports = authorizeRoles;
