import { Response } from "express";
import { RequestBusiness } from "../interfaces/business.interface";
import Employee from "../models/Employee";
import { checkBusiness } from "../helpers/checkBusiness";

const getEmployees = async (req: RequestBusiness, res: Response) => {
  const employees = await Employee.find()
    .where("business")
    .equals(req.business);

  res.json(employees);
};

const createEmployee = async (req: RequestBusiness, res: Response) => {
  const { name, lastname, email, password, type } = req.body;

  if (!name) {
    const error = new Error("Name is required");
    return res.status(404).json({ msg: error.message });
  }
  if (!lastname) {
    const error = new Error("Lastname is required");
    return res.status(404).json({ msg: error.message });
  }
  if (!email) {
    const error = new Error("Email is required");
    return res.status(404).json({ msg: error.message });
  }
  if (!password) {
    const error = new Error("Password is required");
    return res.status(404).json({ msg: error.message });
  }
  if (!type) {
    const error = new Error("Type is required");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const newEmployee = new Employee(req.body);
    newEmployee.business = req.business?.id;

    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.log(error);
  }
};

const getEmployee = async (req: RequestBusiness, res: Response) => {
  const { id } = req.params;
  try {
    //Verifico que el employee sea del business logueado
    const employee = await Employee.findById(id);
    checkBusiness(employee, req.business);

    res.json(employee);
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

const editEmployee = async (req: RequestBusiness, res: Response) => {
  const { id } = req.params;
  try {
    //Verifico que el employee sea del business logueado
    const employee = await Employee.findById(id);
    checkBusiness(employee, req.business);

    employee!.name = req.body.name || employee!.name;
    employee!.lastname = req.body.lastname || employee!.lastname;
    employee!.email = req.body.email || employee!.email;
    employee!.password = req.body.password || employee!.name;
    employee!.type = req.body.type || employee!.type;

    await employee?.save();
    res.json(employee);
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

const deleteEmployee = async (req: RequestBusiness, res: Response) => {
  const { id } = req.params;

  try {
    //Verifico que el employee sea del business logueado
    const employee = await Employee.findById(id);
    checkBusiness(employee, req.business);

    //TODO: Agregar que no se puede eliminar el empleado si tiene algun ship hecho

    await employee?.deleteOne();
    res.json({ msg: "Employee successfully eliminated" });
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

export {
  getEmployees,
  createEmployee,
  getEmployee,
  editEmployee,
  deleteEmployee,
};
