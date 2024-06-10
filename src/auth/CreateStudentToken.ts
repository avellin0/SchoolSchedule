import { config } from "dotenv";
config({path: "./src/.env"})
import { db } from '../database/client-db';
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';

export const signInStudent = async (req: Request,res: Response) => {

    try {

        const {student_id} = req.body;


        const students_id = await fetchStudent(student_id)
        const student = await students_id.rows[0].student_id
        const student_role = await fetchStudentAccess(student)

        
        const MY_SECRET_KEY = process.env.MY_SECRET_KEY
    

        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }

        console.log(student_role.rows[0]);

        const token = sign({
            userid: student,
            userRole: student_role.rows[0]
        },MY_SECRET_KEY,{
            algorithm: "HS256",
            expiresIn: "1h"
        })

        res.json(token)

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }


    async function fetchStudent(id: number){
        const result = await db.query('SELECT * FROM students WHERE student_id = $1', [id])
        if(result.rows.length === 0){
            throw new Error("student's informations not found")
        }
        return result
    }

    async function fetchStudentAccess(Accessid: number){
        const result = await db.query('SELECT role FROM School_Access WHERE School_Access_id = $1', [Accessid])
        if(result.rows.length === 0){
            throw new Error("student's Access informations not found")
        }
        return result
    }
}