import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const value = {}; // Define doctor-related state here if needed

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
