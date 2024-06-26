import { Request, Response } from "express";
import { db } from "../database/client-db";

export class getStudents{
    async handle(req:Request, res: Response){
        const {student_id} = req.body

        console.time()
        
        const research = await db.query('SELECT * FROM students WHERE student_id = $1', [student_id])

        console.timeEnd()

        res.send(research.rows)
    }
}