import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import {
  getAllBedAssign,
  deleteBedAssignDetails,
  getAllBedAssignByOrg
} from "../../slices/bedAssign/thunk";
import { getAllBed,deletePatientAssignDetails } from "../../slices/patientAssign/thunk";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  CardFooter,
  CardHeader,
  Badge,
  Input,
  Button
} from "reactstrap";
import ReactPaginate from "react-paginate";
import "./bedassign.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography,Stack, Pagination } from "@mui/material";


interface FormData {
  id: string;
  bedId: string;
  pid: string;
  orgId: string;
}
interface Bed {
  roomNoStart: string;
  roomNoEnd: string;
  bedNo: string;
  oddOrEven: string,
  organization:string,
}
const BedAssign: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [bedId, setBedId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [showModal,setShowModal]=useState(false);
  const [search, setSearch] = useState("");
  const [patientAndBedAssign, setPatientAndBedAssign] = useState<any[]>([]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
    getAllBedAssign(dispatch, organization);
    getAllBed(dispatch,organization);
  };

  const { bedAssignData = [], loading } = useSelector(
    (state: any) => state.BedAssign
  );
  const { organization } = useSelector((state: any) => state.Login);
  const { patientData } = useSelector((state: any) => state.Patient);
  const navigate = useNavigate();
  const selectedPatientId = patientData?.id;

  const [bedAssignedData, setBedAssignedData] = useState<FormData>({
    id: "",
    bedId: bedAssignData.bedId,
    pid: selectedPatientId || "",
    orgId: organization,
  });

  let [newAssignedBy, setAssignedBy] = useState<string | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const handlePatientChange = (selectedPatientId: string) => {
    setBedAssignedData((prevData) => ({ ...prevData, pid: selectedPatientId }));
  };

  useEffect(() => {
    getAllBedAssign(dispatch, organization);
    fetchPatients();
    fetchPatientsandBedAssign();
    setAssignedBy(window.localStorage.getItem("LoginData")); 
  }, [dispatch, organization, bedAssignedData]);
  console.log((newAssignedBy));

  const [formData, setFormData] = useState<Bed>({
    roomNoStart: "",
    roomNoEnd: "",
    bedNo: "",
    oddOrEven: "",
    organization:organization,
  });
  const handleSave = async () => {
    const requestBody = {
      bedId: bedId,
      pid: bedAssignedData.pid,
      assignedBy: newAssignedBy,
      admitDate: new Date().toISOString().slice(0, 10).replace(/-/g, "")
    };

    console.log("Request Payload:", JSON.stringify(requestBody));

    try {
      const response = await axios.post(
        "http://47.32.254.89:7000/api/Q15Bed/assign",
        requestBody
      );

      console.log("API bedassign Response:", response.data);

      if (
        response.data.message &&
        response.data.message.code === "MHC - 0200"
      ) {
        alert(response.data.message.description);
        setEditModal(false);  
        getAllBedAssign(dispatch, organization);
        getAllBed(dispatch,organization)
      } else {
        console.error("Error:", response.data.message);
        alert(`Error: ${response.data.message.description}`);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      alert("An error occurred. Please check console for details.");
    } finally {
      setEditModal(false);
    }
  };

  const handleClick = (selectedBed: any) => {
    if (selectedBed) {
    
      const bedAssignId = selectedBed.id || " ";
      setBedId(bedAssignId);
      console.log("Bed Id:", bedAssignId);
      console.log("Clicked details", selectedBed);
      setBedAssignedData({
        id: selectedBed.id,
        bedId: selectedBed.bedId,
        pid: selectedBed.pid,
        orgId: selectedBed.orgId,
      });
      console.log("Responses:", selectedBed);
      setEditModal(true);
    } else {
      console.error("Invalid Data:", selectedBed);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `http://47.32.254.89:7000/api/patient/get/activePatient/${organization}`
      );
      console.log("Patient API Response:", response.data);
      if (response.data.data && Array.isArray(response.data.data)) {
        setPatients(response.data.data);
      } else {
        console.error("Invalid data format for patients:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const fetchPatientsandBedAssign = async () => {
    try {
      const response = await axios.get(
        `http://47.32.254.89:7000/api/Q15Bed/getByOrg/${organization}`
      );
      console.log("Patient and Bed Assign:", response.data);
      if (response.data.data && Array.isArray(response.data.data)) {
        setPatientAndBedAssign(response.data.data);
      } else {
        console.error("Invalid data format for patients:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are You Sure Do You Want To Delete bed?");
    if (confirmDelete) {
      try {

        await dispatch(deleteBedAssignDetails(id, organization));
        alert("Bed Assigned Discharge Successfully");
      } catch {
        alert("Failed to Discharge the Details");
      }
    }
  };
 

const handlePatientClick=(e:React.FormEvent)=>{
  e.preventDefault();
  setShowModal(!showModal)
}

const { patientAssignData = [] } = useSelector(
  (state: any) => state.PatientAssign
);

console.log('patientAndBedAssign',patientAndBedAssign)
console.log("Redux Patient Data:", patientData);
console.log("patient assigned data:",patientAssignData)

const [currentPage, setCurrentPage] = useState(1);
const [currentPage1,setCurrentPage1]=useState(1);
const [currentPage2,setCurrentPage2]=useState(1);
const cardsPerPage=12;
const startIndex1 = (currentPage - 1) * cardsPerPage;
  const endIndex1 = startIndex1 + cardsPerPage;
  const startIndex2 = (currentPage1 - 1) * cardsPerPage;
  const endIndex2 = startIndex2 + cardsPerPage;
  const startIndex3 = (currentPage2 - 1) * cardsPerPage;
  const endIndex3 = startIndex3 + cardsPerPage;
  const displayedCards = bedAssignData.slice(startIndex1, endIndex1);
  const displayedCards1 = patientAssignData.slice(startIndex2, endIndex2);
  const displayedCards2 = patientAndBedAssign.slice(startIndex3, endIndex3);
  const totalPages = Math.ceil(patientAndBedAssign.length / cardsPerPage);

  const handlePage = (event: React.ChangeEvent<unknown>, values: number) => {
    setCurrentPage(values);
  };
  console.log('currentPage2', currentPage2);
console.log('startIndex3', startIndex3);
console.log('endIndex3', endIndex3);
console.log('patientAndBedAssign', patientAndBedAssign);

useEffect(() => {
  getAllBed(dispatch, organization);
}, [dispatch, organization]);


const handlePatientDelete = async (id: string) => {
  const confirmDelete = window.confirm("Are You Sure Do You Want To Discharge?");
  if (confirmDelete) {
    try {
      await dispatch(deletePatientAssignDetails(id, organization));
      alert("Bed Assigned Deleted Successfully");
    } catch {
      alert("Failed to Delete the Details");
    }
  }
};
const getPatientName = (patientId: string) => {
  console.log("patientData:", patientData);

  const selectedPatient = patientData.find((patient: any) => patient.id === patientId);

  console.log("selectedPatient:", selectedPatient);

  if (selectedPatient) {
    if (selectedPatient.name && selectedPatient.name.length > 0) {
      const { family, given } = selectedPatient.name[0];
      const fullName = `${given} ${family}`;
      
      console.log("patientName:", fullName);
      return fullName;
    } else if (selectedPatient.basicDetails && selectedPatient.basicDetails.length > 0) {
      const { family, given } = selectedPatient.basicDetails[0].name[0];
      const fullName = `${given} ${family}`;
      console.log("patientName (using basicDetails):", fullName);
      return fullName;
    }
  }
console.warn(`Patient data issue for ID: ${patientId}`, selectedPatient);
  return "Unknown";
};

  const handleSaveBed = async () => {
    if (!formData.bedNo) {
    alert("Please fill All The Fields");
    return;
  } 
  
  console.log("Organization:", organization);
    const requestBody = {    
      roomNoStart: formData.roomNoStart,
      roomNoEnd: formData.roomNoEnd,
      bedNo:formData.bedNo,
      oddOrEven:formData.oddOrEven,
      organization:formData.organization
    };    
    try {
      const response = await axios.post(
        "http://47.32.254.89:7000/api/Q15Bed/create",
        requestBody
      );
      console.log("Registered Data:", response.data);
      console.log("Request details:", requestBody);
      console.log('ID:',response.data.data.id)
      if (
        response.data.message &&
        response.data.message.code === "MHC - 0200"
      ) 
      { 
        alert(response.data.message.description);
        setEditModal(false);
        window.location.reload();
        getAllBedAssign(dispatch, organization);
        getAllBed(dispatch, organization);
      } else {
        console.log("error:", response.data.message);
        alert(`Error:${response.data.message.description}`);
      }
    } catch (error) {
      alert("Room No and Bed No Already Exists");
     
    }
    setEditModal(false);
  };

  return (
    <div className="container m15 p3" style={{ width: "90%" }}>
      <div className="row mb-2">
        <div className="col-md-8">
          <div className="heading1">
            <h4>All Bed Details</h4>
            <br />
          </div>
        </div>
        <div className="col-md-4">
          <div className="mx-2">
            {/* {bedAssignData.length === 0 &&  */}
            <FaPlus
              data-bs-target="#exampleModal"
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/management/bed-assign")}
              onClick={handlePatientClick}
            />
          {/* } */}
          </div>
        </div>
      </div>
      <hr></hr>   
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Available" value="1" />
            <Tab label="Occupied" value="2" />
            <Tab label="ALL BEDS" value="3" />
          </TabList>
        </Box>        
        <TabPanel sx={{padding:'10px'}} value="1">        
        <div>
          <Stack>
            <Typography>Page:{currentPage}</Typography>
            <Pagination
              count={Math.ceil(bedAssignData.length / cardsPerPage)}
              page={currentPage}
              onChange={handlePage}
              color="primary"
            />
          </Stack>
          <Row style={{ display: "flex", flexWrap: "wrap",marginTop:'10px' }}>
            {Array.isArray(displayedCards) && displayedCards.length > 0 ? (
              displayedCards.map((bedassign: any, index: number) => (
                <Col key={index}>
                  <div className="bed-assignment-box">
                    <Card
                      className="mb-3"
                      color="primary"
                      outline
                      style={{
                        width: "180px",
                        height: "180px",
                        padding: "5px",
                        margin: "5px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CardBody
                        key={index}
                        className="mb-2"
                        onClick={() => handleClick(bedassign)}
                        style={{ cursor: "pointer" }}
                      >
                        <CardTitle tag="h6">
                          RoomNo: {bedassign.roomNo}
                        </CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          BedNo: {bedassign.bedNo}
                        </CardSubtitle>
                      </CardBody>

                      <CardFooter style={{display:'flex'}}>
                        <Badge
                          color={bedassign.pid ? "danger" : "success"}
                          tag="h4"
                        >
                          {bedassign.pid ? "Occupied" : "Available"}
                        </Badge>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger outline"
                          onClick={() => handleDelete(bedassign.id)}
                          style={{ cursor: "pointer", marginLeft: "40%" }}
                        />
                      </CardFooter>
                    </Card>
                  </div>
                </Col>
              ))
            ) : (
              <p>No bed assignments available.</p>
            )}
          </Row>
          
        </div>     
        </TabPanel>
        <TabPanel sx={{padding:'10px',marginTop:'10px'}} value="2">   
        <Stack>
            <Typography>Page:{currentPage}</Typography>
            <Pagination
              count={Math.ceil(patientAssignData.length / cardsPerPage)}
              page={currentPage}
              onChange={handlePage}
              color="secondary"
            />
          </Stack>   
        <Row className="mt-10 mb-4 m-0">
          {Array.isArray(displayedCards1) && displayedCards1.length > 0 ? (
            displayedCards1.map((patientassign: any, index: number) => (
              <Col key={patientassign.id}>
                <div className="bed-assignment-box">
                  <Card className="mb-3" color="danger" outline style={{width:'180px',height:'180px'}}>
                  <CardHeader tag="h6">Patient Name: {getPatientName(patientassign.pid)}</CardHeader>
                  <CardBody>
                      {/* <CardTitle tag="h6">Patient ID: {patientassign.pid}</CardTitle> */}
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <div>
                        Room No: {patientassign.roomNo}
                        </div>
                        Bed No: {patientassign.bedNo}
                      </CardSubtitle>
                    </CardBody>
                    
                      <CardFooter>
                        <Badge
                          color={patientassign.pid ? "danger" : "success"}
                          tag="h4"
                        >
                          {patientassign.pid ? "Occupied" : "Available"}
                        </Badge>
                        <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger" 
                    onClick={() => handlePatientDelete(patientassign.id)}
                    style={{ cursor: "pointer",marginLeft:'40px' }}
                  />
                </CardFooter>
                      </Card>
                </div>
              </Col>
            ))
          ) : (
            <p>No bed assignments available.</p>
          )}
        </Row>            
        </TabPanel>
        <TabPanel value="3">  
        <Stack>
            <Typography>Page:{currentPage}</Typography>
            <Pagination
              count={Math.ceil(patientAndBedAssign.length / cardsPerPage)}
              page={currentPage}
              onChange={handlePage}
              color="primary"
            />
          </Stack>     
        <div>
          <Row style={{ display: "flex", flexWrap: "wrap" }}>
            {Array.isArray(displayedCards2) && displayedCards2.length > 0 ? (
              displayedCards2.map((bedassign: any, index: number) => (
               bedassign.pid !== null ? <>
                <Col key={bedassign.id}>
                <div className="bed-assignment-box">
                  <Card className="mb-3" color="danger" outline style={{width:'180px',height:'180px',}}>
                  <CardHeader tag="h6">Patient Name: {getPatientName(bedassign.pid)}</CardHeader>
                  <CardBody>
                      {/* <CardTitle tag="h6">Patient ID: {patientassign.pid}</CardTitle> */}
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <div>
                        Room No: {bedassign.roomNo}
                        </div>
                        Bed No: {bedassign.bedNo}
                      </CardSubtitle>
                    </CardBody>
                    
                      <CardFooter>
                        <Badge
                          color={bedassign.pid ? "danger" : "success"}
                          tag="h4"
                        >
                          {bedassign.pid ? "Occupied" : "Available"}
                        </Badge>
                        <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger" 
                    onClick={() => handlePatientDelete(bedassign.id)}
                    style={{ cursor: "pointer",marginLeft:'40px' }}
                  />
                </CardFooter>
                      </Card>
                </div>
              </Col>             
                </>:<> <Col key={index}>
                  <div className="bed-assignment-box">
                    <Card
                      className="mb-3"
                      color="primary"
                      outline
                      style={{
                        width: "180px",
                        height: "180px",
                        padding: "5px",
                        margin: "5px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CardBody
                        key={index}
                        className="mb-2"
                        onClick={() => handleClick(bedassign)}
                        style={{ cursor: "pointer" }}
                      >
                        <CardTitle tag="h6">
                          RoomNo: {bedassign.roomNo}
                        </CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          BedNo: {bedassign.bedNo}
                        </CardSubtitle>
                      </CardBody>

                      <CardFooter style={{display:'flex'}}>
                        <Badge
                          color={bedassign.pid ? "danger" : "success"}
                          tag="h4"
                        >
                          {bedassign.pid ? "Not Available" : "Available"}
                        </Badge>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger outline"
                          onClick={() => handleDelete(bedassign.id)}
                          style={{ cursor: "pointer", marginLeft: "40%" }}
                        />
                      </CardFooter>
                    </Card>
                  </div>
                </Col></>
              ))
            ) : (
              <p>No bed assignments available.</p>
            )}
          </Row>
         
           </div>   
        </TabPanel>
      </TabContext>
    </Box>
      
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Assign Bed For Patient</ModalHeader>
        <ModalBody>
          <div>          
            <div className="form-control">
              <label
                htmlFor="patientName"
                className="floating-label"
                style={{ fontWeight: "bold" }}
              >
                Patient Name
              </label>
              <Input
                type="select"
                id="patientName"
                name="pid"
                value={bedAssignedData.pid}
                onChange={(e) => handlePatientChange(e.target.value)}
              >
                <option value="">Select Patient</option>
                {patients
                  .filter((patient: any) =>
                    patient.basicDetails[0].name[0].given
                      .toLowerCase()
                      .includes(search.toLowerCase())
                    || patientData.basicDetails[0].name[0].family.toLowerCase().includes(search.toLowerCase()))
                  .map((patient:any) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.basicDetails[0].name[0].given}{" "}
                      {patient.basicDetails[0].name[0].family}
                    </option>
                  ))}
              </Input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditModal(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)} centered>
        <ModalHeader toggle={() => setShowModal(false)}>
          <h3>Bed Assign Details</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="form-control">
              <label 
                htmlFor="roomNo"
                className="floating-label"
                style={{ fontWeight: "bold",width:'40%', }}
              >
               Room No:
              </label>
              <hr style={{width:'20%'}}></hr>
              <div>
              <label style={{width:'2%'}}/>
              <label
                htmlFor="bedNo"
                className="floating-label"
                style={{ fontWeight: "bold",width:'28%' }}
              >
                Start:
              </label>
              <input style={{width:'20%'}}
                type="text"
                id="roomNo"
                name="roomNo"
                placeholder="Enter No"
                value={formData.roomNoStart}
                onChange={(e) => setFormData({ ...formData, roomNoStart: e.target.value })}
              ></input>
              <label style={{width:'2%'}}/>
              <label
                htmlFor="bedNo"
                className="floating-label"
                style={{ fontWeight: "bold",width:'28%' }}
              >
                End:
              </label>
              <input style={{width:'20%'}}
                type="text"
                id="bedNo"
                name="bedNo"
                placeholder="Enter No"
                value={formData.roomNoEnd}
                onChange={(e) => setFormData({ ...formData, roomNoEnd: e.target.value })}
              ></input>
              </div>
             
              <div style={{marginBottom:'20px'}}></div>
              <label 
                htmlFor="roomNo"
                className="floating-label"
                style={{ fontWeight: "bold",width:'30%' }}
              >
                Bed No:
              </label>
              <input style={{width:'20%'}}
                type="text"
                id="roomNo"
                name="roomNo"
                placeholder="Enter No"
                value={formData.bedNo}
                onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
              ></input>
              <label style={{width:'2%'}}/>
              <label
                htmlFor="bedNo"
                className="floating-label"
                style={{ fontWeight: "bold",width:'28%' }}
              >
                Type:
              </label>
              <select id="bedNo"  style={{width:'20%', height:'45px', border:'1px solid black', borderRadius:'5px' }} name="bedNo" value={formData.oddOrEven} onChange={(e) => setFormData({ ...formData, oddOrEven: e.target.value })} >
                                            <option value="" >Select</option>
                                            <option value="odd" >Odd</option>
                                            <option value="even" >Even</option>
                                        </select>             
              <ModalFooter style={{position:'relative', top:'12px'}}>
            <Button color="info" onClick={handleSaveBed}>
              Save Changes             
            </Button>{" "}
            <Button color="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BedAssign;