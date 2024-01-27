import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'primereact/button';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Box
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './staff.css'

interface DropdownItem {
  id: string;
  value: string;
  type: string;
}

interface Dropdown {
  id: string;
  dropdown: string;
  list: DropdownItem[];
}

interface DropdownResponse {
  message: {
    code: string;
    description: string;
  };
  data: Dropdown[];
}

const Staff = () => {
  const [dropdownData, setDropdownData] = useState<Dropdown[]>([]);
  const [userType,setUserType]=React.useState('');
  const { organization } = useSelector(
    (state: any) => state.Login
  );
  const navigate = useNavigate()
  const [selectedValues, setSelectedValues] = useState<any>({
    gender: [],
    country: [],
    roles: [],
    speciality: [],
    state:[],
  });
  const handleChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
  };
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateofBirth:'',
    ssn:'',
    npi:'',
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    postalCode:'',
    phoneNumber:'',
    email:'',
    startDate:'',
    userType:'',
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch('http://47.32.254.89:7000/api/dropdowns/get-all');
        const data: DropdownResponse = await response.json();
        if (data && data.message && data.message.code === 'MHC - 0200') {
          setDropdownData(data.data);
        } else {
          console.error('Error fetching dropdown data:', data.message.description);
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSaveClick = async (e:React.FormEvent) => {
    e.preventDefault();

    console.log("Form:", formData);
   if( !formData.firstName ||
    !formData.middleName ||
    !formData.lastName || 
    !formData.dateofBirth ||
    !formData.ssn ||
    !formData.npi ||
    !formData.addressLine1 ||
    !formData.addressLine2 ||
    !formData.city ||
    //!formData.state ||
    !formData.postalCode ||
    !formData.phoneNumber ||
    !formData.email 
   // !formData.startDate ||
   // !formData.userType
   )
    {
      console.log("Validation failed - some fields are empty");
      alert("Please Fill All The Fields");
      return;
    }
    console.log(organization)

    const requestBody = {
        id:'',
      resource: [
        // Add resource details
      ],
      name: [
        {
          use: formData.middleName,
          given: formData.firstName,
          family: formData.lastName,
        },
      ],
      gender: selectedValues.gender[0] || '', // Assuming gender is a single selection
      email: formData.email,
      role: selectedValues.roles[0] || '',
      organization,
      userType:userType,
      startDate: formData.startDate,
      speciality:[
        selectedValues.speciality[0] || ''
      ],
      dateofBirth:formData.dateofBirth,
      ssn:formData.ssn,
      npi:formData.npi,
      contact:[
        {
            address:[{
                addressLine1:formData.addressLine1,
                addressLine2:formData.addressLine2,
                city:formData.city,
                country:selectedValues.country[0] || '',
                state:formData.state,
                zip:formData.postalCode
        }],
        mobilePhone:formData.phoneNumber
        }
      ]
    };

    try {
      const response = await axios.post('http://47.32.254.89:7000/api/staff/register', requestBody)
        // if(response.data.)
      // const responseData = await response.json();
      console.log('Save response:', response);
      if (response.data.message.code === 'MHC - 0200') 
     // alert('New Staff Registered successfully')
    alert(response.data.message.description);
    navigate('/staff-table')
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    gender: false,
    country: false,
    roles: false,
    speciality: false,
    state:false,
  });

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>, dropdownName: string) => {
    setSelectedValues({ ...selectedValues, [dropdownName]: e.target.value as string[] });
    setOpenState({ ...openState, [dropdownName]: false }); // Close the dropdown after selecting
  };

  const handleClose = (dropdownName: string) => {
    setOpenState({ ...openState, [dropdownName]: false });
  };

  const handleOpen = (dropdownName: string) => {
    setOpenState({ ...openState, [dropdownName]: true });
  };

  const renderDropdown = (dropdownName: string) => {
    const dropdown = dropdownData.find((item) => item.dropdown === dropdownName);

    if (!dropdown) {
      return null;
    }

    return (
      <FormControl sx={{ marginLeft: '3px', width: '100%' }} key={dropdownName}>
        <InputLabel id={`demo-simple-name-label-${dropdownName}`}>{dropdownName}</InputLabel>
        <Select
          labelId={`demo-simple-name-label-${dropdownName}`}
          id={`demo-simple-name-${dropdownName}`}
          multiple
          value={selectedValues[dropdownName]}
          onChange={(e:any) => handleSelectChange(e, dropdownName)}
          onClose={() => setOpenState({ ...openState, [dropdownName]: false })}
          onOpen={() => setOpenState({ ...openState, [dropdownName]: true })}
          open={openState[dropdownName]}
        //   onChange={(e) => setSelectedValues({ ...selectedValues, [dropdownName]: e.target.value as string[] })}
          input={<OutlinedInput label={dropdownName} />}
        >
          {dropdown.list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  


  return (
    <div className='row w-100'>
    <div className='col-md-2'></div>
    <div className='col-md-8'>
    <h4 className='mb-2 text-center' >Staff Details</h4>
    <hr></hr>
    
      <div className="row w-100 " style={{marginTop:'10px'}}>
        <div className='col-md-4 mb-2'>
          <TextField id="outlined-basic-1" label="First Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}/>
        </div>
        <div className='col-md-4 mb-2'>
          <TextField id="outlined-basic-2" label="Middle Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}/>
        </div>
        <div className='col-md-4 mb-2'>
          <TextField id="outlined-basic-3" label="Last Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
        </div>
      </div>

    <div className="row w-100">
    <div className='col-md-4 mb-2'>
          {renderDropdown('gender')}
        </div> 
    <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-2" label="Date of Birth" variant="outlined"   fullWidth onChange={(e) => setFormData({ ...formData, dateofBirth: e.target.value })}/>
    </div> 
    <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-2" label="Phone Number" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}/>
    </div>    
  </div>

  <div className="row w-100 ">
  <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-1" label="Email" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
    </div>   
    <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-1" label="SSN" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}/>
    </div>
    <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-2" label="NPI#" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, npi: e.target.value })}/>
    </div>    
  </div>

  <div className="row w-100 ">
    <div className='col-md-4 mb-2'>
    {/* <TextField id="outlined-basic-2" label="User Type" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, userType: e.target.value })}/> */}
    
  <FormControl fullWidth>
  <InputLabel >UserType</InputLabel>
  <Select
    value={userType}
    label="User Type"
    onChange={handleChange}
  >
        <MenuItem value={'Admin'}>Admin</MenuItem>
        <MenuItem value={'Admin'}>System Admin</MenuItem>
        <MenuItem value={'Admin'}>Super Admin</MenuItem>

    <MenuItem value={'Staff'}>Staff</MenuItem>
  </Select>
  </FormControl>
 
    </div>
    <div className='col-md-4 mb-2'>
          {renderDropdown('speciality')}
          
        </div>  
        <div className='col-md-4 mb-2'>
          {renderDropdown('roles')}
        </div>   
  </div>

  <div className="row w-100 ">
    <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-1" label="Address Line 1" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}/>
    </div>
    <div className='col-md-4 mb-2'>
      <TextField id="outlined-basic-2" label="Address Line 2" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}/>
    </div> 
    <div className='col-md-4 mb-2'>
          {renderDropdown('country')}
        </div>   
  </div>

  <div className="row w-100 ">
      <div className='col-md-4 mb-2'>
        <TextField id="outlined-basic-1" label="City" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>
      </div>
      <div className='col-md-4 mb-2'>
        {renderDropdown('state')}
      </div>
      <div className='col-md-4 mb-2'>
        <TextField id="outlined-basic-3" label="Zip/Postal Code" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}/>
      </div>
    </div>


<div className="d-flex gap-3 justify-content-end mt-4">
            <Button label="Cancel"  onClick={() => { navigate(-1) }} severity="secondary" style={{color:'#000',backgroundColor:'#fff', border:'2px solid #0f3995'}}/>
            <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={handleSaveClick} />
        </div>
        </div>
</div>
)
}

export default Staff;