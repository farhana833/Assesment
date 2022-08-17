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
            console.log(request);

            const Emp = new Employee()
            //  Emp.id = request.input('id')
            Emp.name = request.input('name') 
            Emp.dob = request.input('dob')  
            Emp.doj = request.input('doj') 
            Emp.email = request.input('email') 
            Emp.phone = request.input('phone') 
            Emp.department_id = request.input('department_id') 

            Emp.save()}
            catch {
                return(" can't inserted")
            }
    }
    public async updateemp ({request}){
        try{await request.validate(EmployeeValidator)}catch{ return("validation error")}
        try{
        const update = await Employee.findOrFail(request.input('id'))
        update.name = request.input("name")
        update.dob = request.input('dob')  
            update.doj = request.input('doj') 
            update.phone = request.input('phone') 
            update.department_id = request.input('department_id') 
        await update.save()}
        catch {
            return("can't be updated")
        }
    }
    public async daleteemp ({request}){
        try{await request.validate(EmployeeValidator)}catch{ return("validation error")}
        try{
        const deleteemp = await Employee.findOrFail(request.input('id'))
        deleteemp.name = request.delete()
        await deleteemp.delete()}
        catch {
            return("can't be deleted")
        }
    }}

