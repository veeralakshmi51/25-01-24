import React, { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateOrganizationDetails } from "../../slices/thunk";
import { Button } from "primereact/button";

interface FormData {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  websiteUrl: string;
  type: string;
  hippaPrivacyOfficerName: string;
  proximityVerification: string;
  geofencing: string;
  q15Access: string;
  duration: string;
  startTime: string;
  addressLine1: string; 
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

const OrganizationUpdate = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { organizationDetails } = useSelector(
    (state: any) => state.Organization
  );
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    email: "",
    mobileNumber: "",
    websiteUrl: "",
    type: "",
    hippaPrivacyOfficerName: "",
    proximityVerification: "",
    geofencing: "",
    q15Access: "",
    duration: "",
    startTime: "",
    addressLine1: "", 
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [prevFormData, setPrevFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (location.state) {
      setFormData({
        id: location.state?.id || "",
        name: location.state?.organizationdetails && location.state?.organizationdetails[0]?.name || "",
        email: location.state?.email || "",
        mobileNumber: location.state?.mobileNumber || "",
        websiteUrl: location.state?.websiteUrl || "",
        type: location.state?.organizationdetails && location.state?.organizationdetails[0].type || "",
        hippaPrivacyOfficerName: location.state?.hippaprivacyofficer && location.state?.hippaprivacyofficer[0]?.name || "",
        startTime: location.state?.shift?.startTime || "",
        duration: location.state?.shift?.duration || "",
        proximityVerification: location.state?.proximityVerification || "",
        q15Access: location.state?.q15Access || "",
        geofencing: location.state?.geofencing || "",
        addressLine1: location.state?.contact && location.state.contact[0]?.addressLine1 || "",
        addressLine2: location.state?.contact && location.state.contact[0]?.addressLine2 || "",
        city: location.state?.contact && location.state.contact[0]?.city || "",
        state: location.state?.contact && location.state.contact[0]?.state || "",
        country: location.state?.contact && location.state.contact[0]?.country || "",
        zip: location.state?.contact && location.state.contact[0]?.zip || "",
        
      });
      setCurrentPage(location.state.currentPage || 1);

    }
  }, [location.state]);

  console.log(location.state);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Selected organization ID:", !params?.id);
    console.log("Form data:", formData);
    console.log("Previous Form Data:", prevFormData);

    if (!params.id) {
      console.error("Selected organization ID not found");
      return;
    }

    const updatedFields = {
      id: params?.id,
      organizationdetails: [
        {
          name: formData.name,
          type: formData.type,
        },
      ],
      email: formData.email,
      websiteUrl: formData.websiteUrl,
      shift: {
        duration: formData.duration,
        startTime: formData.startTime,
      },
      contact:[
        {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip: formData.zip
        }
      ],
      proximityVerification: formData.proximityVerification,
      geofencing: formData.geofencing,
      q15Access: formData.q15Access,
      hippaprivacyofficer: [
        {
          name: formData.hippaPrivacyOfficerName,
        },
      ],
      mobileNumber: formData.mobileNumber,
    };
    console.log("BeforeUpdate:", organizationDetails);
    dispatch(updateOrganizationDetails(params?.id, updatedFields));
    console.log("After Upadate", updatedFields);
    alert("Organization Details Updated Successfully");
    navigate(`/organization-details?page=${currentPage}`,{state:{currentPage}});
  };
  return (
    <div className="row w-100" >
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <h3 className="mb-2 text-center">Organization Details Update Here</h3>
        <hr></hr>
        <div className="row w-100 " style={{ marginTop: "20px" }}>
          <div className="col-md-6 mb-4">
            <TextField
              id="outlined-basic-1" label="Organization Name" variant="outlined" fullWidth onChange={handleChange} value={formData.name} name="name"/>
          </div>
          <div className="col-md-6 mb-4">
            <TextField id="outlined-basic-2" label="Organization Email" variant="outlined" fullWidth onChange={handleChange} value={formData.email} name="email"/>
          </div>
          
        </div>
        <div className="row w-100 ">
        <div className="col-md-4 mb-4">
            <TextField id="outlined-basic-1" label="Organization Type" variant="outlined" fullWidth onChange={handleChange} value={formData.type} name="organizationType"/>
          </div>
          <div className="col-md-4 mb-4">
            <TextField id="outlined-basic-1" label="Mobile Number" variant="outlined" fullWidth onChange={handleChange} value={formData.mobileNumber} name="mobileNumber"/>
          </div>
          <div className="col-md-4 mb-4">
            <TextField id="outlined-basic-1" label="Website URL" variant="outlined" fullWidth onChange={handleChange} value={formData.websiteUrl} name="websiteUrl"/>
          </div>
        </div>

        <div className="row w-100">
  <div className="col-md-4 mb-4">
    <TextField
      id="outlined-addressLine1"
      label="Address Line 1"
      variant="outlined"
      fullWidth
      onChange={handleChange}
      value={formData.addressLine1}
      name="addressLine1"
    />
  </div>
  <div className="col-md-4 mb-4">
    <TextField
      id="outlined-addressLine2"
      label="Address Line 2"
      variant="outlined"
      fullWidth
      onChange={handleChange}
      value={formData.addressLine2}
      name="addressLine2"
    />
  </div>
  <div className="col-md-4 mb-4">
    <TextField
      id="outlined-state"
      label="State"
      variant="outlined"
      fullWidth
      onChange={handleChange}
      value={formData.state}
      name="state"
    />
  </div>
</div>
<div className="row w-100">
  <div className="col-md-4 mb-4">
    <TextField
      id="outlined-city"
      label="City"
      variant="outlined"
      fullWidth
      onChange={handleChange}
      value={formData.city}
      name="city"
    />
  </div>
  <div className="col-md-4 mb-4">
    <TextField
      id="outlined-country"
      label="Country"
      variant="outlined"
      fullWidth
      onChange={handleChange}
      value={formData.country}
      name="country"
    />
  </div>
  <div className="col-md-4 mb-4">
    <TextField
      id="outlined-zip"
      label="ZIP"
      variant="outlined"
      fullWidth
      onChange={handleChange}
      value={formData.zip}
      name="zip"
    />
  </div>
</div>

        <div className="row w-100 ">
        <div className="mt-0">
                  <label htmlFor="organizationType" className="label">
                    Access Control
                  </label>
                </div>
          <div className="col-md-4 mt-2">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="proximity-label">Proximity</InputLabel>
                    <Select
                        labelId="proximity-label"
                        id="proximity"
                        label="Proximity"
                        onChange={handleChange}
                        value={formData.proximityVerification}
                        name="proximityVerification"
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                  </FormControl>
                </div>
                <div className="col-md-4 mt-2">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="q15-access-label">Q15</InputLabel>
                    <Select
                      labelId="q15-access-label"
                      id="q15Access"
                      label="Q15"
                      onChange={handleChange} 
                      value={formData.q15Access}
                      name="q15Access"
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-4 mt-2">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="geofencing-label">Geo Fencing</InputLabel>
                    <Select
                      labelId="geofencing-label"
                      id="geofencing"
                      label="Geo Fencing"
                      onChange={handleChange} 
                      value={formData.geofencing}
                      name="geofencing"
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </div>
        </div>
        <div className="row w-100">
        </div>
        <div className="d-flex gap-3 justify-content-end mt-4">
          <Button
            label="Cancel"
            onClick={() => {
              navigate(-1);
            }}
            severity="secondary"
            style={{
              color: "#000",
              backgroundColor: "#fff",
              border: "2px solid #0f3995",
            }}
          />
          <Button
            label="Save"
            style={{ backgroundColor: "#0f3995" }}
            onClick={handleSaveChanges}
          />
        </div>
      </div>
    </div>
  );
};
export default OrganizationUpdate;
