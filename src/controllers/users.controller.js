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

// Funciones de administrador para los usuarios
const newUser = (req, res) => {
    res.render('admin/new-user', { created: undefined });
}

const createUser = async (req, res) => {
    try {
        const newUser = {
            name: req.body.username,
            password: req.body.password
        }

        const data = await setApiData('http://localhost:3000/api/v1/create-user', newUser);

        if (data) {
            return res.redirect('/admin/users?mensaje=se ha creado el usuario correctamente');
        } else {
            return res.render('admin/new-user', { created: false });
        }
    } catch (error) {
        console.error('Ha ocurrido un error creando el usuario', error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await deleteApiData(`http://localhost:3000/api/v1/delete-user/${id}`);
        console.log('Data: ', data);
        if (data) {
            return res.redirect('/admin/users?mensaje=se ha eliminado el usuario correctamente');
        } else {
            return res.redirect('/admin/users?mensaje=ha ocurrido un error eliminando el usuario');
        }
    } catch (error) {
        console.error('Ha ocurrido un error eliminando el usuario', error);
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getApiData(`http://localhost:3000/api/v1/get-user/${id}`);
        if (data) {
            res.render('admin/edit-user', { user: data });
        } else {
            res.redirect('/admin/users?mensaje=ha ocurrido un error obteniendo el usuario');
        }
    } catch (error) {
        console.error('Ha ocurrido un error obteniendo el usuario', error);
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = {
            name: req.body.username,
            password: req.body.password
        }

        const data = await updateApiData(`http://localhost:3000/api/v1/update-user/${id}`, updatedUser);

        if (data) {
            return res.redirect('/admin/users?mensaje=se ha actualizado el usuario correctamente');
        } else {
            return res.render('admin/edit-user', { user: updatedUser });
        }
    } catch (error) {
        console.error('Ha ocurrido un error actualizando el usuario', error);
    }
}

module.exports = {
    adminUsers,
    newUser,
    createUser,
    deleteUser,
    editUser,
    updateUser
}