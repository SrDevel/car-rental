const { getApiData, setApiData, updateApiData, deleteApiData } = require("../utils/api.util")

const getOffices = async (req, res) => {
    try {
        const data = await getApiData('http://localhost:3000/api/v1/get-offices');
        if (Array.isArray(data)) {
            res.render('offices', { offices: data });
        } else {
            console.log('Data no es un array');
            res.render('offices', { offices: data });
        }
    } catch (error) {
        console.error('An error occurred getting the offices', error);
    }
}

// Funciones para el administrador
const adminOffices = async(req, res) => {
    const data = await getApiData('http://localhost:3000/api/v1/get-offices');
    if (Array.isArray(data)) {
        res.render('admin/offices', { offices: data });
    } else {
        console.log('Data no es un array');
        res.render('admin/offices', { offices: data });
    }
}

// Funciones del administrador
const newOffice = (req, res) => {
    res.render('admin/new-office', { created: undefined });
}

const createOffice = async (req, res) => {
    try {
        const newOffice = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            opening_time: req.body.opening_time,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }

        const data = await setApiData('http://localhost:3000/api/v1/create-office', newOffice);

        if (data) {
            return res.redirect('/admin/offices?mensaje=se ha creado la oficina correctamente');
        } else {
            return res.render('admin/new-office', { created: false });
        }
    } catch (error) {
        console.error('Ha ocurrido un error creando la oficina', error);
    }
}

const deleteOffice = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await deleteApiData(`http://localhost:3000/api/v1/delete-office/${id}`);
        console.log('Data: ', data);
        if (data) {
            return res.redirect('/admin/offices?deleted=true');
        } else {
            return res.redirect('/admin/offices?deleted=false');
        }
    } catch (error) {
        console.error('Ha ocurrido un error eliminando la oficina', error);
        return res.status(500).send('Error interno del servidor');
    }
}

const editOffice = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getApiData(`http://localhost:3000/api/v1/get-office/${id}`);
        if (data) {
            res.render('admin/update-office', { office: data });
        } else {
            res.redirect('/admin/offices?mensaje=ha ocurrido un error obteniendo la oficina');
        }
    } catch (error) {
        console.error('Ha ocurrido un error obteniendo la oficina', error);
        res.redirect('/admin/offices?mensaje=ha ocurrido un error obteniendo la oficina');
    }
}

const updateOffice = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await updateApiData(`http://localhost:3000/api/v1/update-office/${id}`, req.body);
        if (data) {
            return res.redirect('/admin/offices?updated=true');
        } else {
            return res.redirect('/admin/offices?updated=false');
        }
    } catch (error) {
        console.error('Ha ocurrido un error actualizando la oficina', error);
        res.redirect('/admin/offices?mensaje=ha ocurrido un error actualizando la oficina');
    }
}


module.exports = {
    getOffices,
    adminOffices,
    newOffice,
    createOffice,
    deleteOffice,
    editOffice,
    updateOffice
}