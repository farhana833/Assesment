// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from "App/Models/Department";
import DepartmentValidator from "App/Validators/DepartmentValidator";
export default class DepartmentsController {
    // import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { afterSave } from "@ioc:Adonis/Lucid/Orm"
//import Database from "@ioc:Adonis/Lucid/Database"
    
        public async selectdep() 
        {
     try{
            return await Department.all()}
        catch {
            return(" department is not found")
        }
        }


    public async insertdep({request}) {
        try{await request.validate(DepartmentValidator)}catch(err){ 
            console.log(err);
            return("validation error")}
        try{
         const Dep = new Department()
        //  Dep.id = request.input('id')
        Dep.name = request.input('name')   
        await Dep.save()}
        catch {
            return(" can't inserted")
        }
}
public async updatedep ({request}){
    //try{await request.validate(DepartmentValidator)}catch{ return("validation error")}
    try{
    const update = await Department.findOrFail(request.input('depart_id'))
    update.name = request.input("name")
    await update.save()}
    catch {
        return("can't be updated")
    }
}
public async deletedep ({request}){
    // try{await request.validate(DepartmentValidator)}catch{ return("validation error")}
    try{
    const deletedep = await Department.findOrFail(request.input('depart_id'))
    return await deletedep.delete()}
    catch {
        return("can't be deleted")
    }
}}

