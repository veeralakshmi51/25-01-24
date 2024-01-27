import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatient, getAllStaff } from "../../slices/thunk";
import { Button } from "primereact/button";

export default function ControlledAccordions() {
  const [expandedPanel1, setExpandedPanel1] = React.useState<string | false>(
    false
  );

  const dispatch = useDispatch()
  const org = useSelector((state:any) => state.Login.organization)
  const {patientData} =  useSelector((state:any) => state.Patient)
  const {staffData} =  useSelector((state:any) => state.Staff)
  const[report, setReport]= React.useState<any>(null)
  const[date, setDate]=React.useState("")
  const[date1, setDate1]=React.useState("")
  const[q15Date, setQ15Date]=React.useState("")
  const[data, setData]=React.useState(patientData)
  const formattedDate = date || new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const [expandedPanels1, setExpandedPanels1] = React.useState<Array<string | false>>(Array(patientData.length).fill(false));
  const [expandedPanels2, setExpandedPanels2] = React.useState<Array<string | false>>(Array(patientData.length).fill(false));
  const [expandedPanels3, setExpandedPanels3] = React.useState<Array<string | false>>(Array(patientData.length).fill(false));
  const [expandedPanels4, setExpandedPanels4] = React.useState<Array<string | false>>(Array(patientData.length).fill(false));

    React.useEffect(() => {
      getAllPatient(dispatch,org)
      getAllStaff(dispatch,org)
    },[dispatch])

    React.useEffect(() => {
      setData(patientData)
    },[patientData])
    
    const getPName = (pid: string) => {
      const patient = data?.find((item: any) => item.id == pid);
      if (patient ) {
        return patient.basicDetails[0].name[0].given + " " + patient.basicDetails[0].name[0].family;
      } else {
        return "--";
      }
    };

    const getInName = (id: string) => {
      const staff = staffData?.find((item: any) => item.id == id);
      if (staff ) {
        return " " + staff.name[0].given + " " + staff.name[0].family;
      } else {
        return " " + "N/A";
      }
    };

    const handleViewDetails = async (date:any) => {
      try {
        // console.log(formattedDate)
        date?setDate(date):setDate(formattedDate)
        const response = await axios.get(`http://47.32.254.89:7000/api/config/getByDate/${date}`);
        const reportData = response.data.data;
        setReport(reportData)
      } catch (error) {
        console.error("Failed to fetch staff details", error);
      }
    };
    // const handleViewDetails = async (date:any) => {
    //   try {
    //     // console.log(formattedDate)
    //     date?setDate(date):setDate(formattedDate)
    //     const response = await axios.get(`http://47.32.254.89:7000/api/config/getByDateRange?startDate=${date}`);
    //     const reportData = response.data.data;
    //     setReport(reportData)
    //   } catch (error) {
    //     console.error("Failed to fetch staff details", error);
    //   }
    // };

  React.useEffect(() => {
    handleViewDetails(formattedDate)
    // console.log(report)
  }, [date]);

  const handleChangePanel1 = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedPanel1(isExpanded ? "panel1" : false);
  };

  const handleChangePanel = (index: number, setExpandedPanelsFunction: React.Dispatch<React.SetStateAction<Array<string | false>>>) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedPanelsFunction((prevExpandedPanels) => {
      const newExpandedPanels = [...prevExpandedPanels];
      newExpandedPanels[index] = isExpanded ? `panel${index + 1}` : false;
      return newExpandedPanels;
    });
  };

  const generateTimeSlot = (slot:any,item:any) => (
    <div
      className="col-md-1 d-flex justify-content-between flex-column align-items-center"
      style={{ border: '2px solid #6581BC', borderRadius: '7px', width: '80px', height: '60px' }}
    >
      <div className="box" style={{ borderBottom: '1px solid #6581BC', height: '30px' }}>{slot}</div>
      <div className="box">
        {item.data
          .filter((item:any) => item.q15Slot === slot)
          .map((filteredItem:any) => (
            <div key={filteredItem.id}>
              <p>{filteredItem ? filteredItem.location : "-"} { "-" } {filteredItem ? filteredItem.activity : "-"}</p>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="row d-flex flex-column">
        <div className="row"> <h4>Q15 Report</h4>
        </div>
        <div className="row">
          <div className="col-md-2 h-100 d-flex flex-column"style={{backgroundColor:'#EAF2FA'}}>
            <TextField className="m-3" id="outlined-basic-1" label="Q15 Date" variant="outlined" onChange={(e:any) => setQ15Date(e.target.value)}/>
            <TextField className="m-3" id="outlined-basic-1" label="shift" variant="outlined" onChange={(e:any) => setDate(e.target.value)}/>
            <TextField className="m-3" id="outlined-basic-1" label="slot" variant="outlined" onChange={(e:any) => setDate(e.target.value)}/>
            <TextField className="m-3" id="outlined-basic-1" label="patient name" variant="outlined" onChange={(e:any) => setDate(e.target.value)}/>
            <TextField className="m-3" id="outlined-basic-1" label="nurse Incharge" variant="outlined" onChange={(e:any) => setDate(e.target.value)}/>
            <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={() => handleViewDetails(q15Date)} />

          </div>
          <div className="col-md-10">
            <Accordion
                expanded={expandedPanel1 === "panel1"}
                onChange={handleChangePanel1}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Date : {date}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>Print</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {report && (
        <>
          {report.map((item:any, index:any) => (
            
          <Accordion
          key={index}
          expanded={expandedPanels1[index] === `panel${index + 1}`}
          onChange={handleChangePanel(index, setExpandedPanels1)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Patient Name : { getPName(item.pid) }
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>Shift</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion
                  key={index}
                  expanded={expandedPanels2[index] === `panel${index + 1}`}
                  onChange={handleChangePanel(index, setExpandedPanels2)}
                style={{ backgroundColor: "#F7FAFE" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Shift A : {getInName(item.shiftIncharge.shiftInchargeA)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className="row my-2 gap-2">
            
                <div className="col-md-3">
                  <div className="box" style={{ textAlign: 'end' }}>06:00 AM to 07:45 AM:</div>
                  <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftA.slot1)}</div>
                </div>
                    {['A06', 'B06', 'C06', 'D06', 'A07', 'B07', 'C07', 'D07'].map((slot) => generateTimeSlot(slot,item))}
              </div>

                <div className="row mb-2 gap-2">
                
                    <div className="col-md-3">
                    <div className="box" style={{ textAlign: 'end' }}>08:00 AM to 09:45 AM:</div>
                    <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftA.slot2)}</div>
                </div>
                    {['A08', 'B08', 'C08', 'D08', 'A09', 'B09', 'C09', 'D09'].map((slot) => generateTimeSlot(slot,item))}
              </div>

              <div className="row gap-2">
                
                    <div className="col-md-3">
                    <div className="box" style={{ textAlign: 'end' }}>10:00 AM to 11:45 AM:</div>
                    <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftA.slot3)}</div>
                </div>
                    {['A10', 'B10', 'C10', 'D10', 'A11', 'B11', 'C11', 'D11'].map((slot) => generateTimeSlot(slot,item))}
              </div>

              <div className="row my-2 gap-2">
            
                <div className="col-md-3">
                  <div className="box" style={{ textAlign: 'end' }}>12:00 AM to 13:45 AM:</div>
                  <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftA.slot4)}</div>
                </div>
                    {['A12', 'B12', 'C12', 'D12', 'A13', 'B13', 'C13', 'D13'].map((slot) => generateTimeSlot(slot,item))}
              </div>     
                </AccordionDetails>
              </Accordion>
              <Accordion
                key={index}
                expanded={expandedPanels3[index] === `panel${index + 1}`}
                onChange={handleChangePanel(index, setExpandedPanels3)}
                style={{ backgroundColor: "#F7FAFE" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Shift B : {getInName(item.shiftIncharge.shiftInchargeB)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className="row my-2 gap-2">
            
                <div className="col-md-3">
                  <div className="box" style={{ textAlign: 'end' }}>14:00 AM to 15:45 AM:</div>
                  <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftB.slot1)}</div>
                </div>
                    {['A14', 'B14', 'C14', 'D14', 'A15', 'B15', 'C15', 'D15'].map((slot) => generateTimeSlot(slot,item))}
              </div>

                <div className="row mb-2 gap-2">
                
                    <div className="col-md-3">
                    <div className="box" style={{ textAlign: 'end' }}>16:00 AM to 17:45 AM:</div>
                    <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftB.slot2)}</div>
                </div>
                    {['A16', 'B16', 'C16', 'D16', 'A17', 'B17', 'C17', 'D17'].map((slot) => generateTimeSlot(slot,item))}
              </div>

              <div className="row gap-2">
                
                    <div className="col-md-3">
                    <div className="box" style={{ textAlign: 'end' }}>18:00 AM to 19:45 AM:</div>
                    <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftB.slot3)}</div>
                </div>
                    {['A18', 'B18', 'C18', 'D18', 'A19', 'B19', 'C19', 'D19'].map((slot) => generateTimeSlot(slot,item))}
              </div>
              
              <div className="row my-2 gap-2">
            
                <div className="col-md-3">
                  <div className="box" style={{ textAlign: 'end' }}>20:00 AM to 21:45 AM:</div>
                  <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftB.slot4)}</div>
                </div>
                    {['A20', 'B20', 'C20', 'D20', 'A21', 'B21', 'C21', 'D21'].map((slot) => generateTimeSlot(slot,item))}
              </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                key={index}
                expanded={expandedPanels4[index] === `panel${index + 1}`}
                onChange={handleChangePanel(index, setExpandedPanels4)}
                style={{ backgroundColor: "#F7FAFE" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Shift C : {getInName(item.shiftIncharge.shiftInchargeC)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className="row my-2 gap-2">
            
                <div className="col-md-3">
                  <div className="box" style={{ textAlign: 'end' }}>22:00 AM to 23:45 AM:</div>
                  <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftC.slot1)}</div>
                </div>
                    {['A22', 'B22', 'C22', 'D22', 'A23', 'B23', 'C23', 'D23'].map((slot) => generateTimeSlot(slot,item))}
              </div>

                <div className="row mb-2 gap-2">
                
                    <div className="col-md-3">
                    <div className="box" style={{ textAlign: 'end' }}>00:00 AM to 01:45 AM:</div>
                    <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftC.slot2)}</div>
                </div>
                    {['A00', 'B00', 'C00', 'D00', 'A01', 'B01', 'C01', 'D01'].map((slot) => generateTimeSlot(slot,item))}
              </div>

              <div className="row gap-2">
                
                    <div className="col-md-3">
                    <div className="box" style={{ textAlign: 'end' }}>01:00 AM to 02:45 AM:</div>
                    <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftC.slot3)}</div>
                </div>
                    {['A01', 'B01', 'C01', 'D01', 'A02', 'B02', 'C02', 'D02'].map((slot) => generateTimeSlot(slot,item))}
              </div>
              
              <div className="row my-2 gap-2">
            
                <div className="col-md-3">
                  <div className="box" style={{ textAlign: 'end' }}>02:00 AM to 03:45 AM:</div>
                  <div className="box" style={{ textAlign: 'end' }}>SocialWorkers:{getInName(item.enteredBy.shiftC.slot4)}</div>
                </div>
                    {['A02', 'B02', 'C02', 'D02', 'A03', 'B03', 'C03', 'D03'].map((slot) => generateTimeSlot(slot,item))}
              </div>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
        </Accordion>
          ))}
      </>
    )}
  </AccordionDetails>
  </Accordion>
          </div>
          </div>
          </div>
          );
        }