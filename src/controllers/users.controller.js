const { getApiData, setApiData, updateApiData, deleteApiData } = require('../utils/api.util');

const adminUsers = async (req, res) => {
    try {
        const data = await getApiData('http://localhost:3000/api/v1/get-users');
        if (Array.isArray(data)) {
            res.render('admin/users', { users: data });
        } else {
            console.log('Data no es un array');
            res.render('admin/users', { users: [] });
        }
    } catch (error) {
        console.error('An error occurred getting the users', error);
    }
}

module.exports = {
    adminUsers
}