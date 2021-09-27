const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wistful_dream',
    password: 'postgrepassword',
    port: 5432,
})

const getDreams = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM dream ORDER BY id", (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

/* VERIFIER CE  QUI CLOCHE DANS LE FONCTIONNEMENT */
const createDreams = (body) => {
    return new Promise((resolve, reject) => {
        const {title, category, feeling, description, level_lucidity, isreccurrent, id_user} = body
        pool.query("INSERT INTO dream (title, category, feeling, description, level_lucidity, isrecurrent, id_user)  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [title, category, feeling, description, level_lucidity, isreccurrent, id_user,
                (error, results) => {
                    if (error)
                        reject(error)

                    resolve(`A new dream has been added : ${results.rows[0]}`)
                }])
    })
}

module.exports = {
    getDreams,
    createDreams
}
