import axios from "axios";
import React, { useEffect, useState } from "react";
import "./beacon.css";
import Scan from "./Scan";
import { Pagination, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../../configuration/url";
import { GrBeacon } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updatedSensorDetails } from "../../slices/thunk";
import{Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';
import { useDispatch } from "react-redux";
// interface Sensor{
//  id:string;
//  uuid:string;
//  deviceId:string;
//  deviceName:string;
//  orgId:string;
// }
const QRCodeScanner :React.FC = () => {
  const [editModal,setEditModal]=useState(false);
  const [data, setData] = useState([]);
  const [selecSensorId,setSelectSensorId]=useState<string|null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const dispatch=useDispatch<any>();
  const { organization } = useSelector((state: any) => state.Login);
  const {beaconData}=useSelector((state:any)=>state.Beacon)
  const [sensorData,setSensorData]=useState({
    id:"",
    uuid:"",
    deviceId:"",
    deviceName:"",
    orgId:organization,
  })
console.log("organization:", organization)
  const getAPI = async (dispatch:any,organization:string) => {   
    try {
      const res = await axios.get(`${baseURL}/sensor/getAllByorgId/${organization}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteAPI = async (deviceName: any) => {
    const del = window.confirm(`do you want to miss this data?  ${deviceName}`);
    if (del) {
      try {
        const res = await axios.delete(
          `${baseURL}/sensor/deleteByDeviceName/${deviceName}`
        );
        alert("Oops...Data was deleted.");
        getAPI(dispatch,organization);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Oh god you save this data.");
    }
  };

  useEffect(() => {
    getAPI(dispatch,organization);
  }, [dispatch,organization]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);
  const navigate = useNavigate();


  const handleSave = async () => {
    const updateFields = {
      id: sensorData.id,
      uuid: sensorData.uuid,
      deviceId: sensorData.deviceId,
      deviceName: sensorData.deviceName,
      orgId:organization,
    };
  
    console.log('before:', sensorData);
  
    setSensorData((prevData) => ({
      ...prevData,
      ...updateFields,
    }));
  
    try {
      await updatedSensorDetails(dispatch, sensorData.id, updateFields,organization);
  
      console.log('after', sensorData);
  
      setEditModal(false);
    } catch (error) {
      console.error('Error updating sensor details:', error);
    }
  };
  
  
const handleClick=(selectSensor:any)=>{
  console.log('select sensor details',selectSensor);
  if(selectSensor){
    setSensorData({
      id:selectSensor?.id,
      uuid:selectSensor?.uuid || "",
      deviceId:selectSensor?.deviceId||"",
      deviceName:selectSensor?.deviceName||"",
      orgId:organization
    });
    console.log('sensor id',selectSensor.id)
    setEditModal(true)
  } else{
    console.log('Invalid data',selectSensor);
  } 
}
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSensorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 d-flex  align-items-center">
        <p className="mb-0 me-2">Register a New Beacon<span> </span></p>
    <GrBeacon
      data-bs-target="#exampleModal"
      style={{ cursor: "pointer", fontSize: '30px' }}
      onClick={() => navigate('/beacon-creation')}
    />
        </div>
        <div className="col-md-2">
          <Scan getAPI={getAPI} />
        </div>
        
      </div>
      <br />
      <div className="row mb-2">
        <div className="text-center mb-2"> Beacon Details</div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DEVICE NAME</th>
              <th scope="col">DEVICE ID</th>
              <th scope="col">Unique-ID</th>
              <th scope="col" className="text-center">DELETE</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {currentData.map((item: any, index: any) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td onClick={() => handleClick(item)} style={{cursor:'pointer'}}>{item.deviceName}</td>
                  <td>{item.deviceId}</td>
                  <td>{item.uuid}</td>
                  <td className="text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    onClick={() => deleteAPI(item.deviceName)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <Pagination className='d-flex justify-content-center align-items-center '>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
          <ModalHeader toggle={() => setEditModal(false)}>
            Staff Details
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="form-control">
                <label
                  htmlFor="deviceName"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Device Name
                </label>
                <input
                  type="text"
                  id="deviceName"
                  name="deviceName"
                  placeholder="Enter Device Name"
                  value={sensorData.deviceName}
                  onChange={handleChange}
                />
               <label
                  htmlFor="deviceId"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  Device ID
                </label>
                <input
                  type="text"
                  id="deviceId"
                  name="deviceId"
                  placeholder="Enter Device ID"
                  value={sensorData.deviceId}
                  onChange={handleChange}
                />
                <label
                  htmlFor="uuid"
                  className="floating-label"
                  style={{ fontWeight: "bold" }}
                >
                  UUID
                </label>
                <input
                  type="text"
                  id="uuid"
                  name="uuid"
                  placeholder="Enter UUID"
                  value={sensorData.uuid}
                  onChange={handleChange}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="info" onClick={handleSave}>
              Save Changes
            </Button>{" "}
            <Button color="danger" onClick={() => setEditModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      
    </div>
  );
};

export default QRCodeScanner;
