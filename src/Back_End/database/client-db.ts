import {config} from 'dotenv'
config({path: "../env"})

import {Client} from 'pg'
const db = new Client({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "Postgres",
    password: process.env.PASS
})

db.connect()
export {db}