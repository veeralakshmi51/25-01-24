import React, { useEffect, useState } from "react";
import Calendar from "../../components/calendar";
import './staffconfig.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ShiftTab from "../../components/shiftTab";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import{
FaCalendar
} from 'react-icons/fa'
import { getAllRNIncharge, getAllSocialWorkers, getPSConfigByDate } from "../../slices/thunk";
import ErrorPopup from "../../components/errorPopup";
import { closeErrorPopup } from "../../slices/staffConfiguration/reducer";
import { getOrgByID } from "../../slices/organization/thunk";
import { saveOrganization } from "../../slices/login/reducer";

const Q15StaffConfiguration = () => {
    const dispatch = useDispatch<any>()
    const { loading, shiftData, isOpen, errorMsg } = useSelector((state: any) => state.PSConfig)
    const { shiftStartTime } = useSelector((state: any) => state.Org)
    const { organization } = useSelector((state: any) => state.Login)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const startTime = new Date(`2000-01-01T${shiftStartTime}`);
    const endTime = new Date(startTime.getTime() + 8 * 60 * 60 * 1000);
    const shiftAEndTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    const BEndTime = new Date(endTime.getTime() + 8 * 60 * 60 * 1000);
    const shiftBEndTime = `${BEndTime.getHours().toString().padStart(2, '0')}:${BEndTime.getMinutes().toString().padStart(2, '0')}`;
    const formatDate = (date: any) => {
        const options = { day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    // Calculate time slots based on start time
    const slot1StartTime = shiftStartTime;
    const slot2StartTime = addHours(slot1StartTime, 2);
    const slot3StartTime = addHours(slot2StartTime, 2);
    const slot4StartTime = addHours(slot3StartTime, 2);
    // Calculate time slots based on end time
    const slot1EndTime = slot2StartTime;
    const slot2EndTime = slot3StartTime;
    const slot3EndTime = slot4StartTime;
    const slot4EndTime = shiftAEndTime;

    const Bslot1StartTime = slot4EndTime;
    const Bslot2StartTime = addHours(Bslot1StartTime, 2);
    const Bslot3StartTime = addHours(Bslot2StartTime, 2);
    const Bslot4StartTime = addHours(Bslot3StartTime, 2);
    // Calculate time slots based on end time
    const Bslot1EndTime = Bslot2StartTime;
    const Bslot2EndTime = Bslot3StartTime;
    const Bslot3EndTime = Bslot4StartTime;
    const Bslot4EndTime = shiftBEndTime;
    
    const Cslot1StartTime = slot4EndTime;
    const Cslot2StartTime = addHours(Cslot1StartTime, 2);
    const Cslot3StartTime = addHours(Cslot2StartTime, 2);
    const Cslot4StartTime = addHours(Cslot3StartTime, 2);
    // Calculate time slots Cased on end time
    const Cslot1EndTime = Cslot2StartTime;
    const Cslot2EndTime = Cslot3StartTime;
    const Cslot3EndTime = Cslot4StartTime;
    const Cslot4EndTime = shiftStartTime;

  // Helper function to add hours to a given time
    function addHours(time:any, hours:any) {
        const baseTime = new Date(`2000-01-01T${time}`);
        const newTime = new Date(baseTime.getTime() + hours * 60 * 60 * 1000);
        return `${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`;
    }

    const handleDateChange = (e: any) => {
        try {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
        } catch (error) {
            alert(error)
        }
    };
    const renderDateBoxes = () => {
        const dateBoxes = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(selectedDate);
            currentDate.setDate(selectedDate.getDate() + i);

            dateBoxes.push(
                <Calendar
                    key={i}
                    day={currentDate.toLocaleDateString('en-US', { weekday: 'short' })}
                    date={formatDate(currentDate)}
                    onClick={() => setSelectedDate(currentDate)}
                    isSelected={selectedDate?.toDateString() === currentDate.toDateString()}
                />
            );
        }
        return dateBoxes;
    };
    const closePopup = () => {
        dispatch(closeErrorPopup())
    }
    useEffect(() => {
        const date = selectedDate.getDate().toString().padStart(2, '0');
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        getPSConfigByDate(dispatch, `${year}${month}${date}`)
    }, [dispatch,selectedDate])

    useEffect(() => {
        saveOrganization(dispatch)
        getAllRNIncharge(dispatch, 'Registered Nurses', organization)
        getAllSocialWorkers(dispatch, 'Social Workers', organization)
        getOrgByID(dispatch, organization)
    },[dispatch,selectedDate])
    return (
        <React.Fragment>
            {loading && <Loader />}
            <div className="w-100" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="d-flex gap-3">
                    {renderDateBoxes()}
                    <div className="inpMain">
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleDateChange}
                        />
                        <FaCalendar className="react-icons"/>
                    </div>
                </div>
            </div>
            <div className="py-3 ml-0 mt-0">
                <Tabs className='d-flex'>
                    <TabList className="vertical-tab-list d-flex align-items-center justify-content-center">
                        <Tab>Shift A</Tab>
                        <Tab>Shift B</Tab>
                        <Tab>Shift C</Tab>
                    </TabList>
                    <div className="tab-content-container">
                        <TabPanel>
                            <ShiftTab
                                shiftName={shiftData[0]?.shiftName}
                                date = {selectedDate}
                                endTime={shiftAEndTime}
                                startTime={shiftStartTime}
                                slot1Time= {slot1StartTime + "-" + slot1EndTime}
                                slot2Time= {slot2StartTime + "-" + slot2EndTime}
                                slot3Time= {slot3StartTime + "-" + slot3EndTime}
                                slot4Time= {slot4StartTime + "-" + slot4EndTime}
                                selectedIncharge={shiftData[0]?.rnIncharge}
                                selectedSWorker1={shiftData[0]?.schedule[0]?.staff1}
                                selectedSWorker2={shiftData[0]?.schedule[1]?.staff1}
                                selectedSWorker3={shiftData[0]?.schedule[2]?.staff1}
                                selectedSWorker4={shiftData[0]?.schedule[3]?.staff1}
                                selectedSWorker5={shiftData[0]?.schedule[0]?.staff2}
                                selectedSWorker6={shiftData[0]?.schedule[1]?.staff2}
                                selectedSWorker7={shiftData[0]?.schedule[2]?.staff2}
                                selectedSWorker8={shiftData[0]?.schedule[3]?.staff2}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ShiftTab
                                shiftName={shiftData[1]?.shiftName}
                                date = {selectedDate}
                                endTime={shiftBEndTime}
                                startTime={shiftAEndTime}
                                slot1Time={Bslot1StartTime + "-" + Bslot1EndTime}
                                slot2Time={Bslot2StartTime + "-" + Bslot2EndTime}
                                slot3Time={Bslot3StartTime + "-" + Bslot3EndTime}
                                slot4Time={Bslot4StartTime + "-" + Bslot4EndTime}
                                selectedIncharge={shiftData[1]?.rnIncharge}
                                selectedSWorker1={shiftData[1]?.schedule[0]?.staff1}
                                selectedSWorker2={shiftData[1]?.schedule[1]?.staff1}
                                selectedSWorker3={shiftData[1]?.schedule[2]?.staff1}
                                selectedSWorker4={shiftData[1]?.schedule[3]?.staff1}
                                selectedSWorker5={shiftData[1]?.schedule[0]?.staff2}
                                selectedSWorker6={shiftData[1]?.schedule[1]?.staff2}
                                selectedSWorker7={shiftData[1]?.schedule[2]?.staff2}
                                selectedSWorker8={shiftData[1]?.schedule[3]?.staff2}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ShiftTab
                                shiftName={shiftData[2]?.shiftName}
                                date = {selectedDate}
                                endTime={shiftStartTime}
                                startTime={shiftBEndTime}
                                slot1Time={Cslot1StartTime + "-" + Cslot1EndTime}
                                slot2Time={Cslot2StartTime + "-" + Cslot2EndTime}
                                slot3Time={Cslot3StartTime + "-" + Cslot3EndTime}
                                slot4Time={Cslot4StartTime + "-" + Cslot4EndTime}
                                selectedIncharge={shiftData[2]?.rnIncharge}
                                selectedSWorker1={shiftData[2]?.schedule[0]?.staff1}
                                selectedSWorker2={shiftData[2]?.schedule[1]?.staff1}
                                selectedSWorker3={shiftData[2]?.schedule[2]?.staff1}
                                selectedSWorker4={shiftData[2]?.schedule[3]?.staff1}
                                selectedSWorker5={shiftData[2]?.schedule[0]?.staff2}
                                selectedSWorker6={shiftData[2]?.schedule[1]?.staff2}
                                selectedSWorker7={shiftData[2]?.schedule[2]?.staff2}
                                selectedSWorker8={shiftData[2]?.schedule[3]?.staff2}
                            />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
            <ErrorPopup
                closePopup={closePopup}
                errorMsg={errorMsg}
                open={isOpen}
            />
        </React.Fragment>
    );
};

export default Q15StaffConfiguration;
