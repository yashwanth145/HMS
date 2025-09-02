"use server"
import {connectDB} from "../lib/db"
export async function doctors() {
    try{
        const db=await connectDB();
        const [rows]=await db.query("SELECT * FROM hospitalmanagment.doctors");
        db.end();
        return rows.map(user=>({
            doctor_id:user.Doctor_ID,
            specialization:user.Specialization,
            qualification:user.Qualification,
            licence:user.License_No
        }))
    }catch(error){
        console.log("Thereis an error in fetching of doctors data");
        return [];
    };
}


export async function updateDoctor(doctorId, { specialization, qualification, licence }) {
  try {
    const db = await connectDB();
    await db.query(
      "UPDATE hospitalmanagment.doctors SET Specialization = ?, Qualification = ?, License_No = ? WHERE Doctor_ID = ?",
      [specialization, qualification, licence, doctorId]
    );
    db.end();
    return { success: true };
  } catch (error) {
    console.error("Error updating doctor data:", error);
    throw new Error("Failed to update doctor");
  }
}


export async function patients() {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Executing query: SELECT * FROM hospitalmanagment.patients');
    const start = Date.now();
    const [rows] = await db.query("SELECT * FROM hospitalmanagment.patients");
    console.log(`Query took ${Date.now() - start}ms`);
    db.end();
    return rows.map((user) => ({
      patient_id: user.Patient_ID,
      name: user.Name,
      dob: user.DOB instanceof Date ? user.DOB.toISOString().split('T')[0] : user.DOB || '',
      gender: user.Gender,
      address: user.Address,
      phone: user.Phone,
      email: user.Email,
      contact: user.Emergency_Contact,
      admission_date: user.Admission_Date instanceof Date ? user.Admission_Date.toISOString().split('T')[0] : user.Admission_Date || '',
      discharge_date: user.Discharge_Date instanceof Date ? user.Discharge_Date.toISOString().split('T')[0] : user.Discharge_Date || '',
    }));
  } catch (error) {
    console.error("Error in patients function:", error.message);
    return [];
  }
}

export async function updatePatients(patientId, { name, dob, gender, address, phone, email, contact, admission_date, discharge_date }) {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Updating patient ID:', patientId);
    await db.query(
      "UPDATE hospitalmanagment.patients SET Name = ?, DOB = ?, Gender = ?, Address = ?, Phone = ?, Email = ?, Emergency_Contact = ?, Admission_Date = ?, Discharge_Date = ? WHERE Patient_ID = ?",
      [name, dob, gender, address, phone, email, contact, admission_date, discharge_date || null, patientId]
    );
    db.end();
    return { success: true };
  } catch (error) {
    console.error("Error updating patient data:", error.message);
    throw new Error("Failed to update patient");
  }
}

export async function inventory() {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Executing query: SELECT * FROM hospitalmanagment.inventory');
    const start = Date.now();
    const [rows] = await db.query("SELECT * FROM hospitalmanagment.inventory");
    console.log(`Query took ${Date.now() - start}ms`);
    db.end();
    return rows.map((item) => ({
      name: item.Name,
      category: item.Category,
      quantity: item.Quantity,
      price: item.Price,
      expiry_date: item.Expiry_Date instanceof Date ? item.Expiry_Date.toISOString().split('T')[0] : item.Expiry_Date || '',
      supplier: item.Supplier,
    }));
  } catch (error) {
    console.error("Error in inventory function:", error.message);
    return [];
  }
}

export async function updateInventory(itemName, { quantity, price, expiry_date }) {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Updating inventory item:', itemName);
    await db.query(
      "UPDATE hospitalmanagment.inventory SET Quantity = ?, Price = ?, Expiry_Date = ? WHERE Name = ?",
      [quantity, price, expiry_date || null, itemName]
    );
    db.end();
    return { success: true };
  } catch (error) {
    console.error("Error updating inventory data:", error.message);
    throw new Error("Failed to update inventory");
  }
}

export async function bills() {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Executing query: SELECT * FROM hospitalmanagment.bills');
    const start = Date.now();
    const [rows] = await db.query("SELECT * FROM hospitalmanagment.bills");
    console.log(`Query took ${Date.now() - start}ms, fetched ${rows.length} rows`);
    db.end();
    return rows.map((bill) => ({
      id: bill._ID,
      patient_id: bill.Patient_ID,
      total_amount: bill.Total_Amount,
      bill_date: bill.Bill_Date instanceof Date ? bill.Bill_Date.toISOString().split('T')[0] : bill.Bill_Date || '',
      status: bill.Status,
    }));
  } catch (error) {
    console.error("Error in bills function:", error.message);
    return [];
  }
}


export async function prescriptions() {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Executing query: SELECT * FROM hospitalmanagment.prescriptions');
    const start = Date.now();
    const [rows] = await db.query("SELECT * FROM hospitalmanagment.prescriptions");
    console.log(`Query took ${Date.now() - start}ms, fetched ${rows.length} rows`);
    db.end();
    return rows.map((bill) => ({
      id:bill.Prescription_ID,
      patient_id: bill.Patient_ID,
      doctor_id: bill.Doctor_ID,
      medicine_id: bill.Medicine_ID,
      dosage:bill.Dosage,
      start_date:bill.Start_Date,
      end_date:bill.End_Date,
      quantity: bill.Quantity,
    }));
  } catch (error) {
    console.error("Error in Prescriptions function:", error.message);
    return [];
  }
}

export async function staff() {
    try{
        const db=await connectDB();
        const [rows]=await db.query("SELECT * FROM hospitalmanagment.staff");
        db.end();
        return rows.map(user=>({
            staff_id:user.Staff_ID,
            name:user.Name,
            role:user.Role,
            department:user.Department_ID,
            salary:user.Salary,
            hired:user.Hire_Date,
            phone:user.Phone
        }))
    }catch(error){
        console.log("Thereis an error in fetching of staff data");
        return [];
    };
}


export async function updateStaff(staffid, { name, role, department_id,salary,hired,phone }) {
  try {
    const db = await connectDB();
    await db.query(
      "UPDATE hospitalmanagment.staff SET Name = ?, Role = ?, Department_ID = ?, Salary = ? , Hire_Date = ? , Phone = ?  WHERE Staff_ID = ?",
      [name,role,department_id,salary,hired,phone,staffid]
    );
    db.end();
    return { success: true };
  } catch (error) {
    console.error("Error updating staff data:", error);
    throw new Error("Failed to update staff");
  }
}


export async function departments() {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Executing query: SELECT * FROM hospitalmanagment.departments');
    const start = Date.now();
    const [rows] = await db.query("SELECT * FROM hospitalmanagment.departments");
    console.log(`Query took ${Date.now() - start}ms, fetched ${rows.length} rows`);
    db.end();
    return rows.map((department) => ({
      id: department.Department_ID,
      name: department.Name,
      doctor_id: department.Head_Doctor_ID,
      beds: department.No_of_Beds,
    }));
  } catch (error) {
    console.error("Error in departments function:", error.message);
    return [];
  }
}

export async function updateDepartment(departmentId, { name, doctor_id, beds }) {
  try {
    if (!name) {
      throw new Error('Name is required');
    }
    if (!doctor_id || isNaN(doctor_id)) {
      throw new Error('Head_Doctor_ID must be a valid number');
    }
    if (!beds || isNaN(beds) || beds < 0) {
      throw new Error('No_of_Beds must be a non-negative number');
    }

    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Updating department ID:', departmentId, 'with data:', { name, doctor_id, beds });
    const [result] = await db.query(
      "UPDATE hospitalmanagment.departments SET Name = ?, Head_Doctor_ID = ?, No_of_Beds = ? WHERE Department_ID = ?",
      [name, doctor_id, beds, departmentId]
    );
    db.end();
    if (result.affectedRows === 0) {
      throw new Error(`No department found with Department_ID: ${departmentId}`);
    }
    console.log(`Department ID ${departmentId} updated successfully, affected rows: ${result.affectedRows}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating department data:", error.message);
    throw new Error(`Failed to update department: ${error.message}`);
  }
}
export async function beds() {
    try{
        const db=await connectDB();
        const [rows]=await db.query("SELECT * FROM hospitalmanagment.beds");
        db.end();
        return rows.map(user=>({
            bed_id:user.Bed_ID,
            department:user.Department_ID,
            bed_type:user.Bed_Type,
            status:user.Status,
            patient_id:user.Assigned_Patient_ID
        }))
    }catch(error){
        console.log("Thereis an error in fetching of beds data");
        return [];
    };
}


export async function updateBeds(bedId, { bed_type, status, patient_id }) {
  try {
   
    if (!bed_type) {
      throw new Error('Bed_Type is required');
    }
    if (!['Available', 'Occupied', 'Maintenance'].includes(status)) {
      throw new Error('Status must be Available, Occupied, or Maintenance');
    }
    if (patient_id && isNaN(patient_id)) {
      throw new Error('Assigned_Patient_ID must be a number or null');
    }

   
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Updating bed ID:', bedId, 'with data:', { bed_type, status, patient_id });
    const [result] = await db.query(
      "UPDATE hospitalmanagment.beds SET Bed_Type = ?, Status = ?, Assigned_Patient_ID = ? WHERE Bed_ID = ?",
      [bed_type, status, patient_id || "Available", bedId]
    );
    db.end();
    if (result.affectedRows === 0) {
      throw new Error(`No bed found with Bed_ID: ${bedId}`);
    }
    console.log(`Bed ID ${bedId} updated successfully, affected rows: ${result.affectedRows}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating bed data:", error.message);
    throw new Error(`Failed to update bed: ${error.message}`);
  }
}

export async function appointments() {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Executing query: SELECT * FROM hospitalmanagment.appointments');
    const start = Date.now();
    const [rows] = await db.query("SELECT * FROM hospitalmanagment.appointments");
    console.log(`Query took ${Date.now() - start}ms, fetched ${rows.length} rows`);
    db.end();
    return rows.map((appointment) => ({
      appointment_id: appointment.Appointment_ID,
      patient_id: appointment.Patient_ID,
      doctor_id: appointment.Doctor_ID,
      appointment_date: appointment.Appointment_DateTime instanceof Date 
        ? appointment.Appointment_DateTime.toISOString().slice(0, 16) 
        : appointment.Appointment_DateTime || '',
      status: appointment.Status,
    }));
  } catch (error) {
    console.error("Error in appointments function:", error.message);
    return [];
  }
}

export async function deleteAppointment(appointmentId) {
  try {
    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Deleting appointment ID:', appointmentId);
    const [result] = await db.query(
      "DELETE FROM hospitalmanagment.appointments WHERE Appointment_ID = ?",
      [appointmentId]
    );
    db.end();
    if (result.affectedRows === 0) {
      throw new Error(`No appointment found with Appointment_ID: ${appointmentId}`);
    }
    console.log(`Appointment ID ${appointmentId} deleted successfully, affected rows: ${result.affectedRows}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    throw new Error(`Failed to delete appointment: ${error.message}`);
  }
}

export async function insertAppointment({ patient_id, doctor_id, appointment_date, status }) {
  try {
    // Validate inputs
    if (!patient_id || isNaN(patient_id)) {
      throw new Error('Patient_ID must be a valid number');
    }
    if (!doctor_id || isNaN(doctor_id)) {
      throw new Error('Doctor_ID must be a valid number');
    }
    if (!appointment_date || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(appointment_date)) {
      throw new Error('Appointment_Date must be in YYYY-MM-DDTHH:mm format');
    }
    if (!['Scheduled', 'Completed', 'Cancelled'].includes(status)) {
      throw new Error('Status must be Scheduled, Completed, or Cancelled');
    }

    const db = await connectDB();
    if (!db || !db.query) {
      throw new Error('Database connection or query method is undefined');
    }
    console.log('Inserting new appointment with data:', { patient_id, doctor_id, appointment_date, status });
    const [result] = await db.query(
      "INSERT INTO hospitalmanagment.appointments (Patient_ID, Doctor_ID, Appointment_DateTime, Status) VALUES (?, ?, ?, ?)",
      [patient_id, doctor_id, appointment_date, status]
    );
    db.end();
    console.log(`New appointment inserted with ID: ${result.insertId}`);
    return { success: true, appointment_id: result.insertId };
  } catch (error) {
    console.error("Error inserting appointment:", error.message);
    throw new Error(`Failed to insert appointment: ${error.message}`);
  }
}

