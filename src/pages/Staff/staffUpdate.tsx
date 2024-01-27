import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateStaffDetails } from "../../slices/thunk";
import { Button } from 'primereact/button';
interface FormData {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateofBirth: string;
  ssn: string;
  npi: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  mobilePhone: string;
  email: string;
  gender: string;
  country: string;
  role: string;
  speciality: string;
  startDate: string;
  active: string;
  userType: string;
  organization: string;
}
const StaffUpdation = () => {

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { state: staff } = location;
  const [formData, setFormData] = useState<FormData>({
    id: "",
    firstName: "",
    middleName: " ",
    lastName: " ",
    dateofBirth: " ",
    ssn: " ",
    npi: " ",
    addressLine1: " ",
    addressLine2: " ",
    city: " ",
    state: " ",
    zip: " ",
    mobilePhone: " ",
    email: " ",
    gender: " ",
    country: " ",
    role: " ",
    speciality: "",
    startDate: " ",
    active: " ",
    userType: "",
    organization: "",
  });
  useEffect(() => {
    if (location.state) {
      setFormData({
        id: location.state?.id || "",
        firstName: location.state?.name[0]?.given || "",
        middleName: location.state?.name[0]?.use || "",
        lastName: location.state?.name[0]?.family || "",
        dateofBirth: location.state?.dateofBirth || "",
        ssn: location.state?.ssn || "",
        npi: location.state?.npi || "",
        addressLine1: location.state?.contact[0]?.address[0]?.addressLine1 || "",
        addressLine2: location.state?.contact[0]?.address[0]?.addressLine2 || "",
        city: location.state?.contact[0]?.address[0]?.city || "",
        state: location.state?.contact[0]?.address[0]?.state || "",
        zip: location.state?.contact[0]?.address[0]?.zip || "",
        mobilePhone: location.state?.contact[0]?.mobilePhone || "",
        email: location.state?.email || "",
        gender: location.state?.gender || "",
        country: location.state?.contact[0]?.address[0]?.country || "",
        role: location.state?.role || "",
        speciality: location.state?.speciality || "",
        startDate: location.state?.startDate || "",
        active: location.state?.active || "",
        userType: location.state?.userType || "",
        organization: location.state?.organization || ""
      });
    }
  }, [location.state]);
  const dispatch = useDispatch<any>();
  const { staffData } = useSelector((state: any) => state.Staff);
  const { organization } = useSelector((state: any) => state.Login);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSaveChanges = () => {
    console.log("Form Data:", formData);
    console.log('Select staff ID:', params?.id);
    if (!params.id) {
      console.log("Selected staff ID is not found");
      return;
    }

    const updatedStaffFields = {
      id: params?.id,
      active: formData.active,
      name: [
        {
          use: formData.middleName,
          given: formData.firstName,
          family: formData.lastName,
        },
      ],
      gender: formData.gender,
      email: formData.email,
      role: formData.role,
      organization,
      startDate: formData.startDate,
      //speciality: [formData.speciality],
      dateofBirth: formData.dateofBirth,
      ssn: formData.ssn,
      npi: formData.npi,
      userType: formData.userType,
      contact: [
        {
          address: [
            {
              addressLine1: formData.addressLine1,
              addressLine2: formData.addressLine2,
              city: formData.city,
              state: formData.state,
              //country: formData.country,
              zip: formData.zip,
            },
          ],
          mobilePhone: formData.mobilePhone,
        },
      ],

    };
    console.log("Before Update:", staffData)
    dispatch(updateStaffDetails(params?.id, updatedStaffFields, organization));
    console.log('After Update:', updatedStaffFields);
    alert('Staff Details Updated Successfully');
    navigate('/staff-table');
  };

  useEffect(() => {
    console.log('location:', location.state)
  }, [])
  return (

    <div className='row w-100'>
      <div className='col-md-2'></div>
      <div className='col-md-8'>
        <h4 className='mb-2 text-center' >Staff Details Update Here!</h4>
        <hr></hr>
        <div className="row w-100 " style={{ marginTop: '10px' }}>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-1" label="First Name" variant="outlined" fullWidth onChange={handleChange} value={formData.firstName} name="firstName" />
          </div>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-2" label="Middle Name" variant="outlined" fullWidth onChange={handleChange} value={formData.middleName} name="middleName" />
          </div>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-3" label="Last Name" variant="outlined" fullWidth onChange={handleChange} value={formData.lastName} name="lastName" />
          </div>
        </div>

        <div className="row w-100">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Date of Birth" variant="outlined" fullWidth onChange={handleChange} value={formData.dateofBirth} name="dateofBirth" />
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="SSN" variant="outlined" fullWidth onChange={handleChange} value={formData.ssn} />
          </div>
        </div>
        <div className="row w-100">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Role" variant="outlined" fullWidth onChange={handleChange} value={formData.role} name="role" />
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="NPI#" variant="outlined" fullWidth onChange={handleChange} value={formData.npi} name="npi" />
          </div>
        </div>

        <div className="row w-100 ">

          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="MobileNumber" variant="outlined" fullWidth onChange={handleChange} value={formData.mobilePhone} name="mobilePhone" />
          </div>
          {/* <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="StartDate" variant="outlined" fullWidth onChange={handleChange} value={formData.startDate} name="startDate"/>
          </div> */}
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="Email" variant="outlined" fullWidth onChange={handleChange} value={formData.email} />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="Address Line 1" variant="outlined" fullWidth onChange={handleChange} value={formData.addressLine1} name="addressLine1" />
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Address Line 2" variant="outlined" fullWidth onChange={handleChange} value={formData.addressLine2} name="addressLine2" />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="City" variant="outlined" fullWidth onChange={handleChange} value={formData.city} name="city" />
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-3" label="Zip/Postal Code" variant="outlined" fullWidth onChange={handleChange} value={formData.zip} name="zip" />
          </div>
        </div>



        {/* <div className="row w-100 ">
          <div className='col-md-12 mb-2'>
            <TextField id="outlined-basic-1" label="Email" variant="outlined" fullWidth onChange={handleChange} value={formData.email} />
          </div>
        </div> */}
        <div className="d-flex gap-3 justify-content-end mt-4">
          <Button label="Cancel" onClick={() => { navigate(-1) }} severity="secondary" style={{ color: '#000', backgroundColor: '#fff', border: '2px solid #0f3995' }} />
          <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={handleSaveChanges} />
        </div>
      </div>
    </div>
  )
};

export default StaffUpdation;
