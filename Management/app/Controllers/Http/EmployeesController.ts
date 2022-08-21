// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Employee from "App/Models/Employee"
import EmployeeValidator from "App/Validators/EmployeeValidator";
export default class EmployeesController {

    public async selectemp() 
        {
     try{
            return await Employee.all()}
        catch {
            return(" department is not found")
        }
        }
        public async insertemp({request}) {
            try{await request.validate(EmployeeValidator)}catch(err){ 
                console.log(err);
                return("validation error")
            }
            try{
            // console.log(request);

            const Emp = new Employee()
            //  Emp.id = request.input('id')
            Emp.name = request.input('name') 
            Emp.dob = request.input('dob')  
            Emp.doj = request.input('doj') 
            Emp.email = request.input('email') 
            Emp.phone = request.input('phone') 
            Emp.depart_id = request.input('depart_id') 

            Emp.save()}
            catch {
                return(" can't inserted")
            }
    }
    public async updateemp ({request}){
        try{await request.validate(EmployeeValidator)}catch{ return("validation error")}
        try{
        const update = await Employee.findOrFail(request.input('emp_id'))
        update.name = request.input("name")
        update.dob = request.input('dob')  
            update.doj = request.input('doj') 
            update.phone = request.input('phone') 
            update.depart_id = request.input('depart_id') 
        await update.save()}
        catch {
            return("can't be updated")
        }
    }
    public async deleteemp ({request}){
        //try{await request.validate(EmployeeValidator)}catch{ return("validation error")}
        try{
        const deleteemp = await Employee.findOrFail(request.input('emp_id'))
        // deleteemp.name = request.delete()
        await deleteemp.delete()}
        catch {
            return("can't be deleted")
        }
    }
    // public async deletedep ({request}){
    //     // try{await request.validate(DepartmentValidator)}catch{ return("validation error")}
    //     try{
    //     const deletedep = await Department.findOrFail(request.input('depart_id'))
    //     return await deletedep.delete()}
    //     catch {
    //         return("can't be deleted")
    //     }
    // }
}

