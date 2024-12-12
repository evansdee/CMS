import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  certNo: 25,
  name: 30,
  country: 25,
  dob: 25,
  doi: 25,
  fromToDate: 25,
  qrCode: 80,
  img: 40,
};

// Reducer function
function certificateReducer(state, action) {
  switch (action.type) {
    case "certNo":
    case "name":
    case "country":
    case "dob":
    case "doi":
    case "fromToDate":
    case "qrCode":
    case "img":
      return {
        ...state,
        [action.type]: Number(action.payload),
      };
      case 'UPDATE_ALL':
        return {
          ...state,
          ...Object.keys(state).reduce((acc, key) => {
            // Special case for `fromToDate`
            if (key === 'fromToDate') {
              const startDateItem = action.payload.find((item) => item.keys === 'startDate');
              const endDateItem = action.payload.find((item) => item.keys === 'endDate');
              acc[key] = startDateItem?.size || endDateItem?.size || 18; // Default to 18 if neither is found
            } else {
              const payloadItem = action.payload.find((item) => item.keys === key);
              acc[key] = payloadItem ? payloadItem.size : 18; // Default to 18 if no match
            }
            return acc;
          }, {}),
        };
      // case 'UPDATE_ALL':
      // return {
      //   ...state,
      //   ...Object.keys(state).reduce((acc, key) => {
      //     const payloadItem = action.payload.find((item) => item.keys === key);
      //     acc[key] = payloadItem ? payloadItem.size : 18
      //     return acc;
      //   }, {}),
      // };
    default:
      return state;
  }
}

// Create the context
const CertificateContext = createContext();

// Provider component
export function CertificateProvider({ children }) {
  const [state, dispatch] = useReducer(certificateReducer, initialState);

  return (
    <CertificateContext.Provider value={{ state, dispatch }}>
      {children}
    </CertificateContext.Provider>
  );
}

export function useCertificateState() {
    const context = useContext(CertificateContext);
    
    if (!context) {
      throw new Error("useCertificateState must be used within a CertificateProvider");
    }
  
    return context;  // Returns both state and dispatch
  }
  