

const Form_song = () => {


    const [newSong, setNewSong] = useState({
        name: "",
        url: "",
        genre: "",
    })

    const [errors, setErrors] = useState({
        name: "El nombre es obligatorio",
        url: "La url es obligatoria",
        genre: "El genero es obligatoria",
    })


    const validateName = (input) => {
        const updateErrors = {
            ...errors,
            name: ""
        }
        const regex = /^[A-Za-z\s]+$/


        if(input.name.length < 5 || input.name.length > 20) updateErrors.name = "El nombre debe tener entre 5 y 20 caracteres"

        setErrors(updateErrors)
    }

    const validateurl = (input) => {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/

        const updateErrors = {
            ...errors,
            url: ""
        }

        if(!(regex.test(input.url))) updateErrors.url = "La url debe ser una url"

        setErrors(updateErrors)
    }


    const validategenre = (input) => {
        const updateError = {
            ...errors,
            genre: ""
        }

        if(input.genre.length < 5 || input.genre.length > 20){
            updateError.genre = "El genero debe tener entre 5 y 20 caracteres"
        }

        setErrors(updateError)
    }

    // const handlesubmit = (e) => {
    //     e.preventDefault()
    //     
    // }


    const handleChange = (e) => {
        setNewSong({
            ...newSong,
            [e.target.name]: e.target.value
        })

        if(e.target.name === "name") validateName({...newSong, [e.target.name]: e.target.value})

        if(e.target.name === "url") validateurl({...newSong, [e.target.name]: e.target.value})

        if(e.target.name === "genre") validategenre({...newSong, [e.target.name]: e.target.value})
}

    const disabled = () => {
        let disabled = true;
        for(let error in errors){
            if(errors[error] === "") disabled = false;
            else{
                disabled = true;
                break;
            }
        }
        return disabled;
    }



    return (
        <div>

            <div>
            <form onSubmit={handlesubmit}>
                <div>
                    <label >Nombre: </label>
                    <input type="text" name="name" placeholder="ingrese nombre" onChange={handleChange}/>
                    {errors.name && <div>{errors.name}</div>}
                </div>
                
                <div>
                    <label>Genero: </label>
                    <input type="text" name="genre" placeholder="ingrese genero de la cancion" onChange={handleChange}/>
                    {errors.genre && <div>{errors.genre}</div>}
                </div>
                
                <div>
                    <label>URL: </label>
                    <input type="text" name="url" placeholder="ingrese url de la cancion" onChange={handleChange}/>
                    {errors.url && <div>{errors.url}</div>}
                </div>

                <button type="submit" disabled={disabled()} className={styles.boton}>Crear</button>
            </form>
            </div>

        </div>
    )
}

export default Form_song