const validateParams = (params) =>{
    for (const [paramName, paramValue] of Object.entries(params)) {
        if (!paramValue) {
            throw new Error(`Debe proporcionar un ${paramName} válido.`);
        }

        if (typeof paramValue === 'string' && paramValue.trim() === '') {
            throw new Error(`El ${paramName} no puede ser una cadena vacía.`);
        }

        if (typeof paramValue === 'boolean') {
            if (typeof paramValue !== 'boolean') {
                throw new Error(`El ${paramName} debe ser un valor booleano.`);
            }
        }
    }
}

module.exports = validateParams